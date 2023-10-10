import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./NavbarLocal.css";

function NavbarLocal({ handleLogout, isLoggedIn }) {
  return (
    <div className="navbar">
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="/">Pocket-Reddit</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/discussions">
              Discussions
            </Nav.Link>
            <Nav.Link as={Link} to="/newdiscussion">
              Add Discussion
            </Nav.Link>
          </Nav>
          <div>
            {!isLoggedIn ? (
              <Nav.Link as={Link} to="/login" className="ml-auto">
                <Button variant="primary">Login</Button>
              </Nav.Link>
            ) : (
              <div className="user-info">
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarLocal;
