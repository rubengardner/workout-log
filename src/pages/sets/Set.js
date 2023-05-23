import React, { useState } from "react";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import DropdownEditDelete from "../../components/DropdownEditDelete";

const Set = (props) => {
  const {
    exercise_name,
    owner,
    reps,
    value_of_unit_1,
    value_of_unit_2,
    id,
    setWorkout,
    setSets,
    exercise_unit_1,
    exercise_unit_2
  } = props;


  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/sets/${id}/`);
      setWorkout((prevWorkout) => ({
        results: [
          {
            ...prevWorkout.results[0],
            sets_count: prevWorkout.results[0].sets_count - 1,
          },
        ],
      }));

      setSets((prevSets) => ({
        ...prevSets,
        results: prevSets.results.filter((set) => set.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div>
      <hr />
      <DropdownEditDelete handleDelete={handleDelete}/>
      <p>Exercise: {exercise_name}</p>
      <p>Reps {reps}</p>
      <p>{value_of_unit_1} {exercise_unit_1}</p>
      {exercise_unit_2 && (
        <p>{value_of_unit_2} {exercise_unit_2}</p>
      )}
    </div>
  );
};

export default Set;