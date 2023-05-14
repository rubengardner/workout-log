import React, {useState, useContext} from 'react'
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'

import axios from "axios";
import styles from '../../styles/SignUpForm.module.css'

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

const ExerciseCreateForm = () => {
    const [exerciseData, setExerciseData] = useState({
        exerciseName: '',
        unit1: '',
        unit2: '',
      })
    
    const {exerciseName, unit1, unit2} = exerciseData;
    const [errors, setErrors] = useState ({})
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
        formData.append("unit1", unit1);
        formData.append("unit2", unit2);
    
        try {
          const { data } = await axiosReq.post("/exercises/", formData);
          history.push(`/exercises/${data.id}`);
        } catch (err) {
          console.log(err);
          if (err.response?.status !== 401) {
            setErrors(err.response?.data);
          }
        }
      };

      return (
        <div>
          <Container className={styles.containerForm}>
          <Card body className={styles.cardBackground}>
            <Row>
              <Col>
              
                <h2 className='text-center mt-3'>Create an Exercise</h2>
                <Form onSubmit={handleSubmit} className="mt-5">
                  <Form.Group controlId="exerciseName">
                    <Form.Label className='d-none'>Exercise name</Form.Label>
                    <Form.Control type="text" placeholder="Exercise name" name="exerciseName" value={exerciseName} onChange={handleChange}/>
                  </Form.Group>
                  {errors.name?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                  ))}
                  <Form.Group controlId="unit1">
                    <Form.Label className='d-none'>Unit 1</Form.Label>
                    <Form.Control
                        as="select"
                        className="mt-4"
                        name='unit1'
                        value={unit1}
                        onChange={handleChange}
                    >
                        <option value="">Select a unit</option>
                        <option value="kg">kg</option>
                        <option value="m">m</option>
                        <option value="sec">sec</option>
                        <option value="null">None</option>
                    </Form.Control>
                    </Form.Group>
                  {errors.unit1?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                  <Form.Group controlId="unit2">
                    <Form.Label className='d-none'>Unit 2</Form.Label>
                    <Form.Control
                        as="select"
                        className="mt-4"
                        name='unit2'
                        value={unit2}
                        onChange={handleChange}
                    >
                        <option value="">Select a unit 2</option>
                        <option value="kg">kg</option>
                        <option value="m">m</option>
                        <option value="sec">sec</option>
                        <option value="null">None</option>
                    </Form.Control>
                    </Form.Group>
                  {errors.unit2?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>  
                  ))}
                  <Button variant="dark" type="submit" className="mt-3">
                    Create
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


  



