import React from "react";
import PropTypes from "prop-types";
import { Accordion, Button, Card } from "react-bootstrap";
import { axiosRes } from "../api/axiosDefaults";
import styles from '../styles/Set.module.css';

const Set = (props) => {
  const {
    exercise_name,
    reps,
    value_of_unit_1,
    value_of_unit_2,
    id,
    setWorkout,
    setSets,
    exercise_unit_1,
    exercise_unit_2,
  } = props;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/sets/${id}`);
      setWorkout((prevWorkout) => ({
        results: [
          {
            ...prevWorkout.results[0],
            sets_count: prevWorkout.results[0].sets_count - 1,
            exercise_count: prevWorkout.results[0].exercise_count - 1,
          },
        ],
      }));

      setSets((prevSets) => ({
        ...prevSets,
        results: prevSets.results.filter((set) => set.id !== id),
      }));
    } catch (err) {
      // Handle the error, e.g., display a notification or log the error
    }
  };

  return (
    <Accordion key={id}>
      <Card>
        <Card.Header className={styles.CardHeader}>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className={`${styles.IndividualCard} d-flex justify-content-between align-items-center`}>
            <span> Set: {exercise_name}</span>
            <i className="fa-solid fa-chevron-down"></i>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body className={styles.CardBody}>
            <p>Reps: {reps}</p>
            <p>{value_of_unit_1} {exercise_unit_1}</p>
            {exercise_unit_2 && (
              <p>{value_of_unit_2} {exercise_unit_2}</p>
            )}
              <Button className={styles.DeleteButton} variant="secondary" onClick={handleDelete}><i className="fa-solid fa-xmark"></i></Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

Set.propTypes = {
  exercise_name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  reps: PropTypes.number.isRequired,
  value_of_unit_1: PropTypes.number.isRequired,
  value_of_unit_2: PropTypes.number,
  id: PropTypes.number.isRequired,
  setWorkout: PropTypes.func.isRequired,
  setSets: PropTypes.func.isRequired,
  exercise_unit_1: PropTypes.string.isRequired,
  exercise_unit_2: PropTypes.string,
};

export default Set;
