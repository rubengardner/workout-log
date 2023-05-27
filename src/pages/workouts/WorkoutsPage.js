import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Workout from "./Workout";
import { axiosReq } from "../../api/axiosDefaults";
import { Accordion, Card } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function WorkoutsPage({ message, filter = "" }) {
  const [workouts, setWorkouts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    let timer;

    const fetchWorkouts = async () => {
      try {
        const { data } = await axiosReq.get('/workouts');
  
        const userWorkouts = data.results.filter(workout => workout.is_owner === true);
        setWorkouts(userWorkouts);

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkouts();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Container>
        
        <Card body>
          <Row>
            <Col>
              <h2>Your list of workouts</h2>

                {currentUser && workouts.length ? (
                    workouts.map((workout, index) => (
                      <Accordion key={workout.id}>
                            <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="d-flex justify-content-between align-items-center">
                            <span>Workout {index + 1}</span>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey='0'>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                            <Workout {...workout} setWorkouts={setWorkouts} />
                            <Link to={`/workouts/${workout.id}/edit`} className="btn btn-primary">Edit</Link>
                            </Card.Body>
                            </Accordion.Collapse>
                            </Card>
                        </Accordion>
                       
                    ))
                ) : (
                    <h3> No Workouts yet! Get moving!</h3>
                )}
  
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default WorkoutsPage;