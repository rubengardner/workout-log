// React and Router
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck, Col, Container, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/LandingPage.module.css";


const LandingPage = () => {

    const currentUser = useCurrentUser();
    const logInDisplay = (<>
        <CardDeck  >
            <Card className={styles.cards}>
                <Card.Body>
                    <Card.Title>Workout</Card.Title>
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        See your workouts
                        <Link to={`/feed-workout`} className={`${styles.buttons} btn`}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    </Card.Text>
                    <br />
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        Create a workout
                        <Link to={'/workouts/create'} className={`${styles.buttons} btn`}><i className="fa-solid fa-plus"></i></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={styles.cards}>
                <Card.Body>
                    <Card.Title>Exercise</Card.Title>
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        See your Exercises
                        <Link to={'/feed-exercise'} className={`${styles.buttons} btn`}><i className="fa-solid fa-magnifying-glass"></i></Link>
                    </Card.Text>
                    <br />
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        Create an exercise
                        <Link to={'/exercises/create'} className={`${styles.buttons} btn`}><i className="fa-solid fa-plus"></i></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </CardDeck>

    </>)

    const logOutDisplay = (<>
        <CardDeck>
            <Card className={styles.cards}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        Login into your account to see your data
                        <Link to={'/login'} className={`${styles.buttons} btn`}><i className="fa-solid fa-user"></i></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={styles.cards}>
                <Card.Body>
                    <Card.Title>Create an account</Card.Title>
                    <Card.Text className="d-flex justify-content-between align-items-center">
                        Create an Account and start tracking your workout data!
                        <Link to={'/signup'}  className={`${styles.buttons} btn`}><i className="fa-solid fa-user-plus"></i></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </CardDeck>
    </>)

    return (
        <Container fluid>
            <Row className='mt-3 text-center'>
                <Col>
                    <h2 >
                        Welcome to your Workout log App
                    </h2>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col >
                    {currentUser ? logInDisplay : logOutDisplay}
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;