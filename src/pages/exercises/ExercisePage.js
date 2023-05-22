import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import styles from '../../styles/ExercisePage.module.css'
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Exercise from "./Exercise";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ExercisePage() {
    const{id} = useParams();
    const [exercise, setExercise] = useState({ results: [] });
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: exercise }] = await Promise.all([
              axiosReq.get(`/exercises/${id}`),
            ]);
            setExercise({ results: [exercise] });
            console.log(exercise);
          } catch (err) {
            console.log(err);
          }
        };
        handleMount();
    }, [id]);

    return (
      <div>
        <Container className={styles.containerForm}>
          <Card body className={styles.cardBackground}>
            <Row>
              <Col>
                <h2>Exercise</h2>
                  {currentUser ? (
                     <Exercise {...exercise.results[0]} setExercise={setExercise} />
                  ) : null}
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    );
  
  }

export default ExercisePage;