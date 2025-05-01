// src/components/Cricket.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Cricket.css'; // Import the CSS file

const Cricket = () => {
  const cricketNews = [
    {
      id: 1,
      title: 'Latest Cricket Match Highlights',
      text: 'Catch up on the latest cricket match highlights and scores.',
      link: '/blog',
    },
    {
      id: 2,
      title: 'Cricket World Cup Updates',
      text: 'Stay updated with all the exciting action in the Cricket World Cup.',
      link: '/blog',
    },
  ];

  return (
    <Container className="cricket-container">
      <h1 className="cricket-title">Cricket News</h1>
      <Row>
        {cricketNews.map((news) => (
          <Col md={4} key={news.id}>
            <Card className="blog-card">
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.text}</Card.Text>
                <Button variant="primary" href={news.link}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cricket;