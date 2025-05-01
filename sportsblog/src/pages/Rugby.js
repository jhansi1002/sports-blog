import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Rugby = () => {
  const rugbyNews = [
    {
      id: 1,
      title: 'Rugby World Cup Updates',
      text: 'Stay updated with all the action from the Rugby World Cup.',
      link: '/blog',
    },
    {
      id: 2,
      title: 'Latest Rugby Match Highlights',
      text: 'Get the latest rugby match results and analysis.',
      link: '/blog',
    },
  ];

  return (
    <Container className="mt-4">
      <h1>Rugby News</h1>
      <Row>
        {rugbyNews.map((news) => (
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

export default Rugby;
