import React, {useState, useContext} from 'react'
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from '../../styles/SignUpForm.module.css'
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { NotificationManager } from "react-notifications";


function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const [logInData, setLogInData] = useState({
    username: '',
    password: '',
  })

  const {username, password} = logInData;
  const [errors, setErrors] = useState ({})
  const history = useHistory();

  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      history.push("/");
      NotificationManager.success("You login successfully", "Success!");
    } catch (err) {
      setErrors(err.response?.data);
      NotificationManager.error("Something went wrong", "Error!");
    }
  };

  return (
    <div>
      <Container className={styles.containerForm}>
      <Card body className={styles.cardBackground}>
        <Row>
          <Col>
          
            <h2 className='text-center mt-3'>Log in</h2>
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
              <Form.Group controlId="password">
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control className="mt-4" type="password" placeholder="Password" name='password' value={password} onChange={handleChange}/>
              </Form.Group>
              {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
              <Button variant="dark" type="submit" className="mt-3">
                Log in
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
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </Container>
          </Col>
        </Row>
        </Card>
      </Container>
    </div>
  )
}

export default SignInForm;