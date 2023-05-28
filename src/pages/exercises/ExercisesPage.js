import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Exercise from "./Exercise";
import { axiosReq } from "../../api/axiosDefaults";
import { Accordion, Button, ButtonGroup, Card } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from '../../styles/ExercisesPage.module.css'


function ExercisesPage({ message, filter = "" }) {
  const [exercises, setExercises] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    let timer;

    const fetchExercises = async () => {
      try {
        const { data } = await axiosReq.get('/exercises');

        const userExercises = data.results.filter(exercise => exercise.is_owner === true);
        setExercises(userExercises);

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExercises();

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
              <h2>Your list of Exercise</h2>
              {currentUser && exercises.length ? (
                exercises.map((exercise, index) => (
                  <Accordion key={index}>
                    <Card >
                      <Card.Header className={styles.CardHeader}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className={`${styles.IndividualCard} d-flex justify-content-between align-items-center`}>
                          <span>Exercise: {exercise.name}</span>
                          <i className="fa-solid fa-chevron-down"></i>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='0'>
                        <Card.Body className={styles.CardBody}>
                          <Exercise {...exercise} setExercises={setExercises} />
                          <ButtonGroup>
                            <Button className={styles.Buttons} variant="secondary" href={`/exercises/${exercise.id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Button>
                            <Button className={styles.Buttons} variant="secondary" href={`/exercises/${exercise.id}/`}><i className="fa-solid fa-circle-info"></i></Button>
                          </ButtonGroup>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>

                ))
              ) : (
                <h3> No Exercise yet! Add some!</h3>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default ExercisesPage;
