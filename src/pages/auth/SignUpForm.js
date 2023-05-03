import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Sign up</h2>
            <Form>
              <Form.Group controlId="username">
                <Form.Label className='d-none'>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="username"/>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password'/>
              </Form.Group>
              <Form.Group controlId="passwordConfirm">
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name='passwordConfirm'/>
              </Form.Group>
              
              <Button variant="primary" type="submit">
                Sign up 
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
          <Container>
              <Link to="/login">
                Already have an account? <span>Log in</span>
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignUpForm