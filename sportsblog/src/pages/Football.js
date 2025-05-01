import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Football.css'; // Import the CSS file

const Football = () => {
  const footballNews = [
    {
      id: 1,
      title: 'Latest Football Match Highlights',
      text: 'Get the latest scores and highlights from the football world.',
      link: '/blog',
    },
    {
      id: 2,
      title: 'Football World Cup Updates',
      text: 'Catch up on all the exciting moments of the Football World Cup.',
      link: '/blog',
    },
  ];

  return (
    <Container className="football-container"> {/* Add the football-container class */}
      <h1 className="football-title">Football News</h1> {/* Add the football-title class */}
      <Row>
        {footballNews.map((news) => (
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

export default Football;