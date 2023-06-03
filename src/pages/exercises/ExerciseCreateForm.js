import React, { useState } from 'react'
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import styles from '../../styles/ExerciseCreateForm.module.css'
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { NotificationManager } from 'react-notifications';

const ExerciseCreateForm = () => {
  const [exerciseData, setExerciseData] = useState({
    exerciseName: '',
    unit_1: '',
    unit_2: '',
  })

  const { exerciseName, unit_1, unit_2 } = exerciseData;
  const [errors, setErrors] = useState({})
  const history = useHistory();

  const handleChange = (event) => {
    setExerciseData({
      ...exerciseData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", exerciseName);
    formData.append("unit_1", unit_1);
    formData.append("unit_2", unit_2);
  
    try {
      await axiosReq.post("/exercises/", formData);
      history.push(`/exercises/`);
      NotificationManager.success("You successfully created an exercise", "Success!");
    } catch (err) {
      NotificationManager.error("Something went wrong", "Error!");
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div>
      <Container>
        <Card body className={styles.Cards}>
          <Row>
            <Col>

              <h2 className='text-center mt-3'>Create an Exercise</h2>
              <Form onSubmit={handleSubmit} className="mt-5">
                <Form.Group controlId="exerciseName">
                  <Form.Label className='d-none'>Exercise name</Form.Label>
                  <Form.Control type="text" placeholder="Exercise name" name="exerciseName" value={exerciseName} onChange={handleChange} />
                </Form.Group>
                {errors.name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <Form.Group controlId="unit_1">
                  <Form.Label className='d-none'>Unit 1</Form.Label>
                  <Form.Control
                    as="select"
                    className="mt-4"
                    name='unit_1'
                    value={unit_1}
                    onChange={handleChange}
                  >
                    <option value="">Select a unit (default is kg)</option>
                    <option value="kg">kg</option>
                    <option value="m">m</option>
                    <option value="sec">sec</option>
                  </Form.Control>
                </Form.Group>
                {errors.unit_1?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <Form.Group controlId="unit_2">
                  <Form.Label className='d-none'>Unit 2</Form.Label>
                  <Form.Control
                    as="select"
                    className="mt-4"
                    name='unit_2'
                    value={unit_2}
                    onChange={handleChange}
                  >
                    <option value="Select">Select a unit 2</option>
                    <option value="kg">kg</option>
                    <option value="m">m</option>
                    <option value="sec">sec</option>
                    <option value="">None</option>
                  </Form.Control>
                </Form.Group>
                {errors.unit_2?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <Button className={`${styles.Buttons} mt-3`} variant="dark" type="submit" >
                  <i className="fa-solid fa-plus"></i>
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className='mt-3'>
                    {message}
                  </Alert>
                ))}
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

export default ExerciseCreateForm






