import React, { useContext, useState } from "react";
import { IdentityContext } from "contexts/IdentityProvider";
const AddNewPitch = () => {
  const { dispatch } = useContext(IdentityContext);

  const [formState, setFormState] = useState({});

  const addNewPitch = () => {
    dispatch({
      type: "NEW_PITCH",
      payload: {
        new_pitch: formState
      }
    });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addNewPitch();
      }}
      className="add-pitch-form"
    >
      <input
        type="text"
        placeholder="Name"
        required
        onChange={e => {
          setFormState({ ...formState, name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="panel"
        onChange={e => {
          setFormState({ ...formState, panel: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="active_version"
        onChange={e => {
          setFormState({ ...formState, active_version: e.target.value });
        }}
      />

      <button type="submit">ADD PITCH</button>
    </form>
  );
};

export default AddNewPitch;
