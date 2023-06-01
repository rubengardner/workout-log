import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Alert, Card, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/WorkoutEditForm.module.css'

const WorkoutEditForm = () => {
  const [errors, setErrors] = useState({})
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/workouts/${id}`);
        const { date, is_owner } = data;

        // Split the date value using a hyphen ("-")
        const [year, month, day] = date.split("-");

        const parsedDate = new Date(year, month - 1, day);

        // Check if parsedDate is a valid date
        if (!isNaN(parsedDate.getTime())) {
          is_owner ? setStartDate(parsedDate) : history.push("/");
        } else {
          // Handle invalid date
          console.error("Invalid date:", date);
        }
      } catch (err) {
        // Handle the error
      }
    };

    handleMount();
  }, [history, id]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedDate = startDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD" format

    const formData = new FormData();
    if (formattedDate) {
      formData.append("date", formattedDate);
    }

    try {
      await axiosReq.put(`/workouts/${id}`, formData);
      history.push(`/workouts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/workouts/${id}`);
      history.push(`/workouts`);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <Container>
        <Card body className={styles.Cards}>
          <Row>
            <Col>

              <h2 className='text-center mt-3'>Edit the date of your workout</h2>
              <Form onSubmit={handleSubmit} className="mt-5">
                <Form.Group controlId="dateField">
                  <Form.Label>Date</Form.Label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Select a date" />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                  <Button className={`${styles.Buttons} mt-3`} variant="dark" type="submit">
                    Update <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button variant="danger" onClick={handleShow} className={`${styles.DeleteButton} mt-3`}>
                    Delete <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the workout?</Modal.Body>
        <Modal.Footer>
          <Button className={styles.DeleteButton} variant="primary" type="submit" onClick={(event) => { handleDelete(event); handleClose(); }}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default WorkoutEditForm