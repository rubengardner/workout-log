import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Workout from "./Workout";
import styles from '../../styles/WorkoutPage.module.css'

function WorkoutPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: workout }] = await Promise.all([
          axiosReq.get(`/workouts/${id}`),
        ]);
        setWorkout({ results: [workout] });
        console.log(workout);
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
              <h2>Workout</h2>
              <Workout {...workout.results[0]} setWorkouts={setWorkout} />
              
              
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default WorkoutPage;