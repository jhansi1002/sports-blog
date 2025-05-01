import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Baseball.css'; // Import the CSS file

const Baseball = () => {
  const baseballNews = [
    {
      id: 1,
      title: 'Latest Baseball Game Highlights',
      text: 'Catch up on the latest baseball games and player performances.',
      link: '/blog',
    },
    {
      id: 2,
      title: 'MLB News & Updates',
      text: 'Get updates from Major League Baseball, including scores and analyses.',
      link: '/blog',
    },
  ];

  return (
    <Container className="baseball-container"> {/* Add the baseball-container class */}
      <h1 className="baseball-title">Baseball News</h1> {/* Add the baseball-title class */}
      <Row>
        {baseballNews.map((news) => (
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

export default Baseball;