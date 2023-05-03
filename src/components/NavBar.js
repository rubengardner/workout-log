import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
const NavBar = () => {
  return (
    <Container>
       <Navbar bg="light" expand="md" fixed='top'>
            <Navbar.Brand href="#home">Workout Log</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Log a workout</Nav.Link>
                    <Nav.Link href="#link">Records</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
  )
}

export default NavBar

