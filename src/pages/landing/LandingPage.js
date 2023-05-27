// React and Router
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// import styles from "../../styles/.module.css";


const LandingPage = () => {

    const currentUser = useCurrentUser();
const logInDisplay = (<>
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

</>)

const logOutDisplay = (<>
   <CardDeck>
                <Card>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            Login into your account to see your data
                            <Link to={'/login'} className="btn btn-primary"><i className="fa-solid fa-user"></i></Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Create an account</Card.Title>
                        <Card.Text className="d-flex justify-content-between align-items-center">
                            Create an Account and start tracking your workout data!
                            <Link to={'/signup'} className="btn btn-primary"><i className="fa-solid fa-user-plus"></i></Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
  </>)

    return (
        <div>
            <h2>
                Welcome to your Workout log App
            </h2>
            {currentUser ? logInDisplay : logOutDisplay}
        </div>
    );
};

export default LandingPage;