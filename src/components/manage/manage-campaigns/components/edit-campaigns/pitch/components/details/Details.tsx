import React, { useContext, useEffect } from "react";
import "./Details.css";
import { InputField, SaveButton, TableLoader } from "common-components";
import { Grid } from "@material-ui/core";
import { IdentityContext } from "contexts/IdentityProvider";
export default function Details() {
  return (
    <div className="p-normal container">
      <DetailsForm />
    </div>
  );
}

const DetailsForm = () => {
  const { state } = useContext(IdentityContext);

  const { name, panel, active_version } = state.pitch;

  return (
    <form>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        className="input-container"
      >
        <InputField
          label="Pitch name"
          fullWidth
          margin="normal"
          value={name}
          required
          className="input"
        />
        <InputField
          label="Panel"
          fullWidth
          margin="normal"
          value={panel}
          className="input"
        />
        <InputField
          label="Active Version"
          fullWidth
          margin="normal"
          value={active_version}
          className="input"
        />
        <SaveButton>COMMIT PITCH</SaveButton>
      </Grid>
    </form>
  );
};
