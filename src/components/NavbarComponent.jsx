import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faShoppingBag} className="me-2" size="lg" />
          <div className="d-flex flex-column">
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>PENS Cashier</span>
            <small style={{ fontSize: '0.7rem', opacity: 0.9 }}>Point of Sale System</small>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="px-3">
              <FontAwesomeIcon icon={faUserCircle} className="me-2" />
              <strong>3124510030</strong> - Rakha Bagus Saktiawan
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
