import React, {useState, useContext} from 'react'
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import styles from '../../styles/SignUpForm.module.css'

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";





const WorkoutCreateForm2 = () => {
    const [workoutData, setWorkoutData] = useState({
        date: '2023-05-17',
      })
    
    const {date} = workoutData;
    const [errors, setErrors] = useState ({})
    const history = useHistory();

    const handleChange = (event) => {
        setWorkoutData({
          ...workoutData,
          [event.target.name]: event.target.value,
        })
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
    
        formData.append("date", date);
        try {
          const { data } = await axiosReq.post("/workouts/", formData);
          history.push(`/workouts/${data.id}`);
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
                  
                    <h2 className='text-center mt-3'>Choose a date for your workout</h2>
                    <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group controlId="date">
                        <Form.Label className='d-none'>date</Form.Label>
                        <Form.Control type="text" placeholder="Exercise name" name="date" value={date} onChange={handleChange}/>
                    </Form.Group>
            
                      <Button variant="dark" type="submit" className="mt-3">
                        Create
                      </Button>
                    </Form>
                  </Col>
                </Row>
                </Card>
              </Container>
            </div>
          )
    }

export default WorkoutCreateForm2