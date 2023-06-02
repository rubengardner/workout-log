import React from "react";
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
          {/* Display workout details */}
          <p>Date: {date}</p>
          <p>Sets count: {sets_count}</p>
          <p>Exercise count: {exercise_count}</p>
        </Col>
      </Row>
    </div>
  );
};

Workout.propTypes = {
  sets_count: PropTypes.number.isRequired,
  exercise_count: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default Workout;
