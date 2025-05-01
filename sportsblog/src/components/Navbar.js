import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import './Navbar.css'; // Custom CSS for styling

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">SportsBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Regular Navigation Links */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            
            {/* Dropdown for Sports Categories */}
            <Dropdown className="dropdown-sports">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sports Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/cricket">Cricket</Dropdown.Item>
                <Dropdown.Item as={Link} to="/football">Football</Dropdown.Item>
                <Dropdown.Item as={Link} to="/basketball">Basketball</Dropdown.Item>
                <Dropdown.Item as={Link} to="/tennis">Tennis</Dropdown.Item>
                <Dropdown.Item as={Link} to="/baseball">Baseball</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
