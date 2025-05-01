import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Basketball.css'; // Import the CSS file

const Basketball = () => {
  const basketballNews = [
    {
      id: 1,
      title: 'NBA Latest Scores and Highlights',
      text: 'Check out the latest scores and highlights from the NBA games.',
      link: '/blog',
    },
    {
      id: 2,
      title: 'Basketball World Cup Updates',
      text: 'Stay up-to-date with all the action from the Basketball World Cup.',
      link: '/blog',
    },
  ];

  return (
    <Container className="basketball-container"> {/* Add the basketball-container class */}
      <h1 className="basketball-title">Basketball News</h1> {/* Add the basketball-title class */}
      <Row>
        {basketballNews.map((news) => (
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

export default Basketball;