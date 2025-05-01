import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // Importing the custom CSS for the Home page

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredContent] = useState([
    {
      id: 1,
      title: 'Latest Cricket News',
      text: 'Catch up on the latest cricket updates and match highlights.',
      imageUrl: '/images/WhatsApp Image 2024-11-09 at 11.55.56_9dfd1eec.jpg',
      link: '/blog',
    },
    {
      id: 2,
      title: 'Football Insights',
      text: 'Get in-depth analysis of recent football matches and player performances.',
      imageUrl: '/images/WhatsApp Image 2024-11-08 at 21.26.57_aac16f68.jpg',
      link: '/blog',
    },
    {
      id: 3,
      title: 'Basketball Highlights',
      text: 'Discover the top highlights from recent basketball games and upcoming events.',
      imageUrl: '/images/WhatsApp Image 2024-11-09 at 12.01.30_8c7ca5b3.jpg',
      link: '/blog',
    },
    {
      id: 1,
      title: 'Soccer World Cup Updates',
      text: 'Stay updated with the latest scores, top performances, and highlights from the FIFA World Cup.',
      imageUrl: '/images/soccer_world_cup.jpg',
      link: '/blog',
    },
    {
      id: 2,
      title: 'Tennis Grand Slam Highlights',
      text: 'Catch up on the latest action from the Grand Slam tournaments, including match results and player insights.',
      imageUrl: '/images/tennis_grand_slam.webp',
      link: '/blog',
    },
    {
      id: 3,
      title: 'Basketball Highlights',
      text: 'Discover the top highlights from recent basketball games and upcoming events.',
      imageUrl: '/images/basketball_highlights.jpg',
      link: '/blog',
    },
    {
      id: 4,
      title: 'Cricket World Cup Analysis',
      text: 'Get expert analysis on team strategies, key player performances, and match predictions in the Cricket World Cup.',
      imageUrl: '/images/cricket_world_cup.webp',
      link: '/blog',
    },
    {
      id: 5,
      title: 'Formula 1 Race Recap',
      text: 'Experience the thrill of F1 with race recaps, standings, and behind-the-scenes insights from the racing world.',
      imageUrl: '/images/formula1_race.jpg',
      link: '/blog',
    },
    {
      id: 6,
      title: 'Olympics: Best Moments',
      text: 'Relive the most iconic moments from the Olympic Games, including record-breaking performances and inspirational stories.',
      imageUrl: '/images/olympics_moments.webp',
      link: '/blog',
    },
    {
      id: 7,
      title: 'IPL',
      text: 'Get a weekly breakdown of IPL, key plays, and player performances in the latest season.',
      imageUrl: '/images/ipl.jpg',
      link: '/blog',
    },
    {
      id: 8,
      title: 'TATA WPL',
      text: 'Follow the top plays, power rankings, and game results from Major League TATA Women IPL.',
      imageUrl: '/images/wpl.jpg',
      link: '/blog',
    },
    {
      id: 9,
      title: 'Hockey Championship Insights',
      text: 'Get the latest updates on international and NHL hockey championships, with expert commentary and game stats.',
      imageUrl: '/images/hockey_championship.jpg',
      link: '/blog',
    },
    
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContent = featuredContent.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-4 home-container">
      {/* Video background */}
      <video autoPlay loop muted className="background-video">
        <source src="/images/WhatsApp Video 2024-11-09 at 09.41.04_a89a5fd0.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="home-title">Welcome to SportsBlog!</h1>
      <p className="home-intro">
        Stay updated with the latest news, match analysis, and articles about your favorite sports.
        Join our community to share your own blog posts.
      </p>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </Form>

      {/* Display filtered content */}
      <Row className="mt-4">
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
            <Col md={4} key={item.id}>
              <Card className="blog-card">
                <Card.Img variant="top" src={item.imageUrl} className="blog-image" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                  <Button variant="primary" as={Link} to={item.link}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No results found for "{searchQuery}".</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
