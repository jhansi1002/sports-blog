// src/pages/Auth.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import './Auth.css'; // Import custom CSS for authentication pages

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and SignUp
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login validation
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      console.log('Logged in with:', email, password);
    } else {
      // Sign Up validation
      if (!username || !email || !password || !confirmPassword) {
        setError('Please fill out all fields');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      console.log('Signed up with:', username, email, password);
    }
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="auth-card">
            <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <p className="error-message">{error}</p>}
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="auth-input"
                  />
                </Form.Group>
              )}

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

              {!isLogin && (
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="auth-input"
                  />
                </Form.Group>
              )}

              <Button variant="primary" type="submit" className="auth-button">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </Form>
            <p className="auth-footer">
              {isLogin ? (
                <>
                  Don't have an account? <span onClick={() => setIsLogin(false)} className="auth-link">Sign Up</span>
                </>
              ) : (
                <>
                  Already have an account? <span onClick={() => setIsLogin(true)} className="auth-link">Login</span>
                </>
              )}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
