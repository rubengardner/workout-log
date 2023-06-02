import React, {useState} from 'react'
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from '../../styles/SignUpForm.module.css'
import { NotificationManager } from 'react-notifications';

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  })

  const {username, password1, password2} = signUpData;
  const [errors, setErrors] = useState ({})
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      NotificationManager.success("You successfully created an account", "Success!");
    } catch (err) {
      setErrors(err.response?.data);
      NotificationManager.error("Something went wrong", "Error!")
    }
  };

  return (
    <div>
      <Container className={styles.containerForm}>
      <Card body className={styles.cardBackground}>
        <Row>
          <Col>
            <h2 className='text-center mt-3'>Sign up</h2>
            <Form onSubmit={handleSubmit} className="mt-5">
              <Form.Group controlId="username">
                <Form.Label className='d-none'>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={handleChange}/>
              </Form.Group>
              {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
              ))}
              <Form.Group controlId="password1">
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control className="mt-4" type="password" placeholder="Password" name='password1' value={password1} onChange={handleChange}/>
              </Form.Group>
              {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
              <Form.Group controlId="password2" >
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control className="mt-4" type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={handleChange}/>
              </Form.Group>
              {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
              
              <Button variant="dark" type="submit" className="mt-3">
                Sign up 
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className='mt-3'>
                {message}
              </Alert>
            ))}
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
          <Container className='mt-4' >
              <div>
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </Container>
          </Col>
        </Row>
        </Card>
      </Container>
    </div>
  )
}

export default SignUpForm