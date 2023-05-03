import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../styles/NavBar.module.css'
const NavBar = () => {
  return (
    <Container>
       <Navbar bg="light" expand="md" fixed='top'>
            <Navbar.Brand href="#home">Workout Log</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />  
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to='/'>Home</NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/login'>Log in</NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup'>Sign up</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
  )
}

export default NavBar

