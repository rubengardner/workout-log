import React, { useState } from "react";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Exercise = (props) => {
  const {
    name,
    unit_1,
    unit_2,
    id,
    setExercise,
  } = props;


  const currentUser = useCurrentUser();

  

  return (
    <div>
      <p>Exercise: {name}</p>
      <p>Unit 1: {unit_1}</p>
      {unit_2 && (
        <p>Unit 2: {unit_2}</p>
      )}

    </div>
  );
};

export default Exercise;