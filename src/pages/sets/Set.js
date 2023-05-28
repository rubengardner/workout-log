import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Row, Col, Container, Accordion, Button, ButtonGroup, Card } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import styles from '../../styles/Set.module.css'

const Set = (props) => {
  const {
    exercise_name,
    owner,
    reps,
    value_of_unit_1,
    value_of_unit_2,
    id,
    setWorkout,
    setSets,
    exercise_unit_1,
    exercise_unit_2
  } = props;


  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/sets/${id}/`);
      setWorkout((prevWorkout) => ({
        results: [
          {
            ...prevWorkout.results[0],
            sets_count: prevWorkout.results[0].sets_count - 1,
          },
        ],
      }));

      setSets((prevSets) => ({
        ...prevSets,
        results: prevSets.results.filter((set) => set.id !== id),
      }));
    } catch (err) { }
  };

  return (
    <Accordion key={id}>
      <Card >
        <Card.Header className={styles.CardHeader}>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className={`${styles.IndividualCard} d-flex justify-content-between align-items-center`}>
            <span> Set: {exercise_name}</span>
            <i className="fa-solid fa-chevron-down"></i>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body className={styles.CardBody}>
            <p>Reps: {reps}</p>
            <p>Unit: {value_of_unit_1} {exercise_unit_1}</p>
            {exercise_unit_2 && (
              <p>{value_of_unit_2} {exercise_unit_2}</p>
            )}
            <ButtonGroup>
              <Button className={styles.Buttons} variant="secondary" href={`/workouts/${id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Button>
              <Button className={styles.Buttons} variant="secondary" href={`/workouts/${id}/`}><i className="fa-solid fa-circle-info"></i></Button>
            </ButtonGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Set;