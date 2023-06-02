import React from "react";
import PropTypes from "prop-types";

const Exercise = (props) => {
  const { name, unit_1, unit_2 } = props;

  return (
    <div>
      <p>Exercise: {name}</p>
      <p>Unit 1: {unit_1}</p>
      {unit_2 && <p>Unit 2: {unit_2}</p>}
    </div>
  );
};

Exercise.propTypes = {
  name: PropTypes.string.isRequired,
  unit_1: PropTypes.string.isRequired,
  unit_2: PropTypes.string,
};

export default Exercise;
