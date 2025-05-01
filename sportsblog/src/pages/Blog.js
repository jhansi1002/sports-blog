import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Ensure this context is correctly set up
import './Blog.css';

const Blog = () => {
  const { user } = useContext(UserContext);  // Ensure user is correctly provided via UserContext
  const [posts, setPosts] = useState([]);  // State for posts
  const [showModal, setShowModal] = useState(false);  // Modal for "Read More" or "Sign in"
  const [showPostModal, setShowPostModal] = useState(false);  // Modal for creating new post
  const [newPost, setNewPost] = useState({ title: '', content: '', imageUrl: '' });  // New post form
  const [searchQuery, setSearchQuery] = useState('');  // Search query for filtering posts
  const [newComment, setNewComment] = useState('');  // New comment input
  const [selectedPostId, setSelectedPostId] = useState(null);  // Store selected post ID for comments
  const [relatedPosts, setRelatedPosts] = useState([]);  // State for related posts

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts/all');  // Replace with correct API endpoint
      setPosts(res.data);  // Store posts in state
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  // Fetch related posts based on categories or tags
  const fetchRelatedPosts = async (postId) => {
    try {
      const res = await axios.get(`/api/posts/related/${postId}`);  // Replace with correct API endpoint
      setRelatedPosts(res.data);  // Store related posts in state
    } catch (err) {
      console.error('Error fetching related posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();  // Fetch posts when component mounts
  }, []);  // Empty dependency array ensures this runs once on mount

  // Handle "Read More" click
  const handleReadMoreClick = (postId) => {
    if (!user) {
      setShowModal(true);  // If user is not logged in, show modal
    } else {
      setSelectedPostId(postId);  // If logged in, set selected post
      fetchRelatedPosts(postId);  // Fetch related posts when a post is selected
    }
  };

  // Handle Like button click
  const handleLike = async (postId) => {
    if (user) {
      try {
        await axios.put(`/api/posts/like/${postId}`, { userId: user._id });
        fetchPosts();  // Refresh posts after like
      } catch (err) {
        console.error('Error liking post:', err);
      }
    } else {
      setShowModal(true);  // Show modal if user is not logged in
    }
  };

  // Handle Comment submission
  const handleComment = async (postId) => {
    if (newComment && user) {
      try {
        await axios.put(`/api/posts/comment/${postId}`, { userId: user._id, comment: newComment });
        setNewComment('');  // Clear comment input
        fetchPosts();  // Refresh posts to show new comment
      } catch (err) {
        console.error('Error submitting comment:', err);
      }
    } else if (!user) {
      setShowModal(true);  // Show modal if user is not logged in
    } else {
      alert('Please enter a comment!');
    }
  };

  // Handle new post submission
  const handlePostSubmit = async () => {
    if (!newPost.title || !newPost.content) {
      alert('Title and content are required!');
      return;
    }

    try {
      const res = await axios.post('/api/posts/create', { userId: user._id, ...newPost });

      // Add the new post directly to the posts array
      setPosts((prevPosts) => [...prevPosts, res.data]);  // Add new post at the end

      setNewPost({ title: '', content: '', imageUrl: '' });  // Reset form fields
      setShowPostModal(false);  // Close modal
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  // Handle search query
  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const res = await axios.get(`/api/posts/search?q=${searchQuery}`);
        setPosts(res.data);  // Update posts based on search
      } catch (err) {
        console.error('Error searching posts:', err);
      }
    } else {
      fetchPosts();  // If no search query, fetch all posts
    }
  };

  // Handle input changes for new post
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="mt-4">
      <h1 className="blog-title">Blog Posts</h1>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}  // Search on pressing Enter
        className="mb-4"
      />

      {/* New Post Button */}
      <Button variant="success" className="mb-4" onClick={() => setShowPostModal(true)}>
        Create New Post
      </Button>

      <Row>
        {posts.map((post) => (
          <Col md={4} key={post._id}>
            <Card className="blog-card">
              <Card.Img variant="top" src={post.imageUrl || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="outline-primary" onClick={() => handleLike(post._id)}>
                  Like {post.likes.length}
                </Button>
                <Button variant="link" onClick={() => handleReadMoreClick(post._id)}>
                  Comments
                </Button>
                <Button variant="primary" onClick={() => handleReadMoreClick(post._id)}>
                  Read More
                </Button>
                <Button variant="primary" onClick={() => handleComment(post._id)}>
                  Submit Comment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-5">
          <h3>Related Posts</h3>
          <Row>
            {relatedPosts.map((post) => (
              <Col md={4} key={post._id}>
                <Card className="blog-card">
                  <Card.Img variant="top" src={post.imageUrl || 'https://via.placeholder.com/150'} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <Button variant="outline-primary" onClick={() => handleLike(post._id)}>
                      Like {post.likes.length}
                    </Button>
                    <Button variant="primary" onClick={() => handleReadMoreClick(post._id)}>
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Sign In Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to sign in to perform this action. Please sign up or log in.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" as={Link} to="/signup">
            Sign Up
          </Button>
          <Button variant="primary" as={Link} to="/login">
            Log In
          </Button>
        </Modal.Footer>
      </Modal>

      {/* New Post Modal */}
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter content"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={newPost.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPostModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePostSubmit}>
            Submit Post
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Blog;
