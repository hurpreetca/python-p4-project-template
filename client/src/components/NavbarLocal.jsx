import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./NavbarLocal.css";

function NavbarLocal(setUser, setIsLoggedIn, setUserId) {
  console.log(setUser);
  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
      } else {
        console.error("Logout error:", res.statusText);
      }
    });
  };
  return (
    <div className="navbar">
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="/home">Pocket-Reddit</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/discussions">
              Discussions
            </Nav.Link>
          </Nav>
          <div>
            {!setUser || setUser.error ? (
              <Nav.Link as={Link} to="/login" className="ml-auto">
                <Button variant="primary" onClick={handleLogout}>
                  Login
                </Button>
              </Nav.Link>
            ) : (
              <div className="user-info">
                <span className="user-name-with-space">👤: {setUser.name}</span>
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
