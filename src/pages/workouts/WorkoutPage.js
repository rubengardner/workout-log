import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card } from 'react-bootstrap'
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Workout from "./Workout";
import styles from '../../styles/WorkoutPage.module.css'
import Set from "../sets/Set";
import SetCreateForm from "../sets/SetCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function WorkoutPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState({ results: [] });
  const [sets, setSets] = useState({ results: [] });
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: workout }, { data: sets }] = await Promise.all([
          axiosReq.get(`/workouts/${id}`),
          axiosReq.get(`/sets/?workout=${id}`),
        ]);
        setWorkout({ results: [workout] });
        setSets(sets);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div>
      <Container>
        <Card body className={styles.Cards}>
          <Row>
            <Col>
              <h2>Workout</h2>
              <Workout {...workout.results[0]} setWorkouts={setWorkout} />
              <div>
                {currentUser ? (
                  <SetCreateForm
                    workout={id}
                    setWorkout={setWorkout}
                    setSets={setSets}
                    profile_id={currentUser.profile_id}
                  />
                ) : null}
                {sets.results.length ? <p>Sets:</p> : null}
                {sets.results.length ? (
                  sets.results.map((set) => (
                    <Set
                      key={set.id}
                      {...set}
                      setWorkout={setWorkout}
                      setSets={setSets}
                    />
                  ))
                ) : (
                  <p>No sets yet</p>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );

}

export default WorkoutPage;