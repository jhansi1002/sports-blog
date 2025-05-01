const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/create', async (req, res) => {
  try {
    const { userId, title, content, imageUrl } = req.body;
    const newPost = new Post({ userId, title, content, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all posts
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a post
router.put('/like/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== req.body.userId);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comment on a post
router.post('/comment/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ userId: req.body.userId, comment: req.body.comment });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search posts
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const posts = await Post.find({ title: { $regex: query, $options: 'i' } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
