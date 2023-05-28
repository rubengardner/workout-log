import React, { useState } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import styles from '../../styles/WorkoutCreateForm.module.css'

const WorkoutCreateForm = () => {
  const [errors, setErrors] = useState({})
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedDate = startDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD" format

    const formData = new FormData();
    if (formattedDate) {
      formData.append("date", formattedDate);
    }
    try {
      const { data } = await axiosReq.post("/workouts/", formData);
      console.log(data);
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
      <Container>
        <Card className={styles.Cards} body>
          <Row>
            <Col>
              <h2 className='text-center mt-3'>Choose a date for your workout</h2>
              <Form onSubmit={handleSubmit} className="mt-5">
                <Form.Group controlId="dateField">
                  <Form.Label>Date</Form.Label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Select a date" />
                </Form.Group>

                <Button className={`${styles.Buttons} mt-3`} variant="dark" type="submit" >
                <i className="fa-solid fa-plus"></i>
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

export default WorkoutCreateForm