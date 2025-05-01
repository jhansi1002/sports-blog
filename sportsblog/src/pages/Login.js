import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import axios from 'axios'; // Axios for HTTP requests
import './Auth.css'; // Import custom CSS for authentication pages

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      // Make API call to login the user
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, store token (if needed) and redirect
      localStorage.setItem('authToken', response.data.token); // Save token to localStorage (optional)

      // Clear errors and fields
      setError('');
      setEmail('');
      setPassword('');

      // Redirect to blog page
      navigate('/blog');
    } catch (err) {
      // If there's an error (e.g., wrong credentials)
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="auth-card">
            <h2 className="auth-title">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="auth-button">
                Login
              </Button>
            </Form>
            <p className="auth-footer">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
