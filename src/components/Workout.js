import React from "react";
import { Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";

const Workout = (props) => {
  const {
    sets_count,
    exercise_count,
    date
  } = props;
  
  return (
   <div>
          <Row>
            <Col>
              <p>Date: {date}</p>
              <p>Sets count: {sets_count}</p>
              <p>Exercise count: {exercise_count}</p>

            </Col>
          </Row>
          
   </div>
  );
};

export default Workout;