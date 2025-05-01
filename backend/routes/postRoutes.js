const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Fetch all posts
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Server Error');
  }
});

// Fetch related posts (you can enhance this logic by filtering based on tags or categories)
router.get('/related/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const relatedPosts = await Post.find({ _id: { $ne: post._id } }).limit(5);
    res.json(relatedPosts);
  } catch (err) {
    console.error('Error fetching related posts:', err);
    res.status(500).send('Server Error');
  }
});

// Create a new post
router.post('/create', async (req, res) => {
  try {
    const { title, content, imageUrl, userId } = req.body;

    const newPost = new Post({ title, content, imageUrl, userId });
    await newPost.save();

    res.json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).send('Server Error');
  }
});

// Like a post
router.put('/like/:postId', async (req, res) => {
  try {
    const { userId } = req.body;

    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(userId)) {
      return res.status(400).send('Already liked');
    }

    post.likes.push(userId);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).send('Server Error');
  }
});

// Comment on a post
router.put('/comment/:postId', async (req, res) => {
  try {
    const { userId, comment } = req.body;

    const post = await Post.findById(req.params.postId);
    post.comments.push({ userId, comment });
    await post.save();

    res.json(post);
  } catch (err) {
    console.error('Error commenting on post:', err);
    res.status(500).send('Server Error');
  }
});

// Search posts (basic implementation)
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({ title: { $regex: q, $options: 'i' } });
    res.json(posts);
  } catch (err) {
    console.error('Error searching posts:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
