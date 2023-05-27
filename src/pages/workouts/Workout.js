import React from "react";
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";
// import { MoreDropdown } from "../../components/MoreDropdown";

const Workout = (props) => {
  const {
    id,
    owner,
    sets_count,
    exercise_count,
    date
  } = props;

  const history = useHistory();

  
  const handleEdit = () => {
    history.push(`/workouts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/workouts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  

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