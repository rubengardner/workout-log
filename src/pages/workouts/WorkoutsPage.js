import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Workout from "./Workout";
import { axiosReq } from "../../api/axiosDefaults";
import { Accordion, Button, ButtonGroup, Card } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/WorkoutsPage.module.css'


function WorkoutsPage({ message, filter = "" }) {
  const [workouts, setWorkouts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  // Fetches workouts from the server and updates the state
  useEffect(() => {
    let timer;

    const fetchWorkouts = async () => {
      try {
        const { data } = await axiosReq.get('/workouts');

        // Filter the results to get user-owned workouts
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
        <Card className={styles.Cards} body>
          <Row>
            <Col>
              <h2>Your list of workouts</h2>

              {currentUser && workouts.length ? (
                workouts.map((workout, index) => (
                  <Accordion key={workout.id}>
                    <Card >
                      <Card.Header className={styles.CardHeader}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className={`${styles.IndividualCard} d-flex justify-content-between align-items-center`}>
                          <span>Workout {index + 1}</span>
                          <i className="fa-solid fa-chevron-down"></i>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body className={styles.CardBody}>
                          <Workout {...workout} setWorkouts={setWorkouts} />
                          <ButtonGroup>
                            <Button className={styles.Buttons} variant="secondary" href={`/workouts/${workout.id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Button>
                            <Button className={styles.Buttons} variant="secondary" href={`/workouts/${workout.id}/`}><i className="fa-solid fa-circle-info"></i></Button>
                          </ButtonGroup>
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
