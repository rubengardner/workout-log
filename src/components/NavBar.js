import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../styles/NavBar.module.css'
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { NotificationManager } from "react-notifications";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      NotificationManager.success("You log out succesfully", "Success!");
    } catch (err) {
      NotificationManager.error("Something went wrong", "Error!");
    }
  };
  const logOutDisplay = (<>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/login'>Log in</NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup'>Sign up</NavLink>
  </>)

  const logInDisplay = (<>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed-workout">Workouts</NavLink>
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed-exercise">Exercises</NavLink>
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>Sign out</NavLink>
  </>)

  return (
    <Container >
      <Navbar className={styles.NavBar} expand="md" expanded={expanded} fixed='top'>
        <Navbar.Brand href="/" id={styles.Logo}>Workout Log</Navbar.Brand>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          id={styles.Toggle}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBar}>
          <Nav className={`${styles.NavBar} mr-auto`}>
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to='/'>Home</NavLink>
            {currentUser ? logInDisplay : logOutDisplay}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default NavBar

