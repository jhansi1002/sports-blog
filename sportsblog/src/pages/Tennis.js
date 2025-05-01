import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Tennis.css'; // Import the CSS file

const Tennis = () => {
  const tennisNews = [
    {
      id: 1,
      title: 'Latest Tennis Match Updates',
      text: 'Catch up on the latest updates from major tennis tournaments.',
      link: '/blog',
    },
    {
      id: 2,
      title: 'US Open Tennis Updates',
      text: 'Stay updated on the thrilling moments at the US Open.',
      link: '/blog',
    },
  ];

  return (
    <Container className="tennis-container"> {/* Add the tennis-container class */}
      <h1 className="tennis-title">Tennis News</h1> {/* Add the tennis-title class */}
      <Row>
        {tennisNews.map((news) => (
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

export default Tennis;