import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Alert, Card, Modal } from 'react-bootstrap'
import { useHistory } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../../styles/ExerciseEditForm.module.css'

const ExerciseEditForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [exerciseData, setExerciseData] = useState({
    name: '',
    unit_1: '',
    unit_2: '',
  })

  const { name, unit_1, unit_2 } = exerciseData;
  const [errors, setErrors] = useState({})
  const history = useHistory();
  const { id } = useParams();



  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/exercises/${id}`);
        const { name, unit_1, unit_2, is_owner } = data;
        console.log(data)
        is_owner ? setExerciseData({ name, unit_1, unit_2 }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);


  const handleChange = (event) => {
    setExerciseData({
      ...exerciseData,
      [event.target.name]: event.target.value,
    })
  }
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/exercises/${id}`);
      history.push(`/exercises`);

    } catch (err) { }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("unit_1", unit_1);
    formData.append("unit_2", unit_2);
    try {
      await axiosReq.put(`/exercises/${id}`, formData);
      history.push(`/exercises/${id}`);
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
        <Card body className={styles.Cards}>
          <Row>
            <Col>

              <h2 className='text-center mt-3'>Edit the Exercise</h2>
              <Form onSubmit={handleSubmit} className="mt-5">
                <Form.Group controlId="name">
                  <Form.Label className='d-none'>Exercise name</Form.Label>
                  <Form.Control type="text" placeholder="Exercise name" name="name" value={name} onChange={handleChange} />
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
                <div className="d-flex justify-content-between align-items-center">
                  <Button className={`${styles.Buttons} mt-3`} variant="dark" type="submit">
                    Update <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button variant="danger" onClick={handleShow} className={`${styles.DeleteButton} mt-3`}>
                    Delete <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
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

export default ExerciseEditForm






