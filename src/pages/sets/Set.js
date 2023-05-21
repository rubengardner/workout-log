import React, { useState } from "react";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Set = (props) => {
  const {
    profile_id,
    owner,
    updated_at,
    exercise,
    id,
    setWorkout,
    setSets,
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
          <p >This is the owner{owner}</p>
          <p >Time updated at {updated_at}</p>
          <p >This is the exercise name:{exercise}</p>
    </div>
  );
};

export default Set;