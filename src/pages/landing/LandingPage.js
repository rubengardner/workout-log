// React and Router
import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Card, CardDeck } from "react-bootstrap";

// import styles from "../../styles/Splash.module.css";


const LandingPage = () => {
    return (
        <div>
            <CardDeck>
                <Card>
                    <Card.Body>
                        <Card.Title>Workout</Card.Title>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            See your workouts 
                            <Link to={`/feed-workout`} className="btn btn-primary"><i className="fa-solid fa-magnifying-glass"></i></Link>
                        </Card.Text>
                        <br/>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            Create a workout
                        <Link to={'/workouts/create'} className="btn btn-primary"><i className="fa-solid fa-plus"></i></Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Exercise</Card.Title>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            See your Exercises 
                            <Link to={'/feed-exercise'} className="btn btn-primary"><i className="fa-solid fa-magnifying-glass"></i></Link>
                        </Card.Text>
                        <br/>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            Create an exercise
                        <Link to={'/exercises/create'} className="btn btn-primary"><i className="fa-solid fa-plus"></i></Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );
};

export default LandingPage;