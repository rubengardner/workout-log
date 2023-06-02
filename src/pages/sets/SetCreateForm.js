import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import { Button, Alert, Modal } from "react-bootstrap";
import styles from '../../styles/SetCreateForm.module.css'
import { NotificationManager } from "react-notifications";

function SetCreateForm(props) {
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false);
  const { workout, setWorkout, setSets, profile_id } = props;
  const [setData, setSetData] = useState({
    exercise: "", // Change field name to "exercise"
    reps: "",
    value_of_unit_1: "",
    value_of_unit_2: ""
  });
  const { exercise, reps, value_of_unit_1, value_of_unit_2 } = setData;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axiosReq.get("/exercises/", {
          params: {
            owner: profile_id
          },
        });
        setExercises(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercises();
  }, []);

  const handleChange = (event) => {
    setSetData({
      ...setData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/sets/", {
        exercise: exercise, // Send exercise ID 
        reps,
        value_of_unit_1,
        value_of_unit_2,
        workout: workout // Send workout ID 
      });
      setSets((prevSets) => ({
        ...prevSets,
        results: [data, ...prevSets.results]
      }));
      setWorkout((prevWorkout) => ({
        results: [
          {
            ...prevWorkout.results[0],
            sets_count: prevWorkout.results[0].sets_count + 1
          }
        ]
      }));
      setSetData({
        exercise: "", // Reset to empty string
        reps: "",
        value_of_unit_1: "",
        value_of_unit_2: ""
      });
      handleClose(); // Close the modal after successful submission
      setErrors({});
      NotificationManager.success("You successfully created a set", "Success!");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button className={styles.Buttons} variant="secondary" onClick={handleShow}><i className="fa-solid fa-plus"></i></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className={styles.ModalFooterHeader} closeButton>
          <Modal.Title>Create a set</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.ModalBody}>
          <Form onSubmit={handleSubmit} className="mt-5">
            <Form.Group controlId="exercise">
              <Form.Label className="d-none">Exercise name</Form.Label>
              <Form.Control
                as="select"
                name="exercise"
                value={exercise}
                onChange={handleChange}
              >
                <option value="">Select Exercise</option>
                {exercises && exercises.length > 0 ? (
                  exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}> {/* Use exercise ID as option value */}
                      {exercise.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No exercises available
                  </option>
                )}
              </Form.Control>
            </Form.Group>
            {errors.exercise?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="reps">
              <Form.Label className='d-none'>Reps</Form.Label>
              <Form.Control
                type="text"
                className="mt-4"
                name="reps"
                value={reps}
                onChange={handleChange}
                pattern="[0-9]*" // Restrict input to only digits
                inputMode="numeric" // Show numeric keyboard on mobile devices
                placeholder='Reps'
              />
            </Form.Group>
            {errors.reps?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="value_of_unit_1">
              <Form.Label className='d-none'>Value of unit 1</Form.Label>
              <Form.Control
                type="text"
                className="mt-4"
                name="value_of_unit_1"
                value={value_of_unit_1}
                onChange={handleChange}
                pattern="[0-9]*" // Restrict input to only digits
                inputMode="numeric" // Show numeric keyboard on mobile devices
                placeholder='Value of unit 1'
              />
            </Form.Group>
            {errors.value_of_unit_1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="value_of_unit_2">
              <Form.Label className='d-none'>Value of unit 2</Form.Label>
              <Form.Control
                type="text"
                className="mt-4"
                name="value_of_unit_2"
                value={value_of_unit_2}
                onChange={handleChange}
                pattern="[0-9]*" // Restrict input to only digits
                inputMode="numeric" // Show numeric keyboard on mobile devices
                placeholder='Value of unit 2'
              />
            </Form.Group>
            {errors.value_of_unit_2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Modal.Footer className={styles.ModalFooterHeader}>
              <Button className={styles.Buttons} variant="primary" type="submit">
                <i className="fa-solid fa-plus"></i>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SetCreateForm;
