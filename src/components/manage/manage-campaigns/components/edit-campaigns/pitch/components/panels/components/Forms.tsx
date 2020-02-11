import React, { useState, useContext } from "react";
import {
  InputField,
  SaveButton,
  LoadingModal,
  CustomButton
} from "common-components";
import { IdentityContext } from "contexts/IdentityProvider";
import { Grid } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

const EditPanelForm = () => {
  const { state } = useContext(IdentityContext);

  const initialState = state.panels[state.panel_tab].name;

  const [panelName, setPanelName] = useState(initialState);
  const [err, setErr] = useState(false);
  return (
    <div className="panel-header">
      <Grid container>
        <Grid item xs={5}>
          <InputField
            label="Group name"
            fullWidth
            margin="normal"
            value={panelName}
            onChange={(e: any) => {
              if (e.target.value.length > 0) {
                setErr(false);
              } else {
                setErr(true);
              }
              setPanelName(e.target.value);
            }}
            error={err}
            helperText={err ? "Group name is required" : " "}
            required
            autoFocus
            onBlur={(e: any) => {
              if (e.target.value.length > 0) {
                setErr(false);
              } else {
                setErr(true);
              }
            }}
          />
        </Grid>
        <Grid item xs={4} className="grid-normal">
          <SaveButton disabled={panelName === initialState || err}>
            SAVE
          </SaveButton>
          <CustomButton
            handleClick={() => {
              alert("Delete");
            }}
            style={{
              width: "130px",
              background: "#ff504d",
              color: "white",
              float: "right"
            }}
          >
            <DeleteIcon fontSize="small" style={{ marginRight: 5 }} /> DELETE
          </CustomButton>
        </Grid>
        <Grid item xs={3} className="grid-display-left">
          <CustomButton
            handleClick={() => {
              setPanelName(initialState);
            }}
            style={{
              width: "130px",
              background: "#eee",

              float: "right"
            }}
            textStyle={{
              color: "#333"
            }}
          >
            CANCEL
          </CustomButton>
        </Grid>
      </Grid>
    </div>
  );
};

const CreateNewPanelForm = () => {
  const { dispatch, state, setOpenCreatePanelModal } = useContext(
    IdentityContext
  );

  const initialState = {
    name: "",
    description: ""
  };
  const [formState, setFormState] = useState(initialState);
  const [createLoading, setCreateLoading] = useState(false);
  const addNewPanel = () => {
    setCreateLoading(true);
    setOpenCreatePanelModal(false);
    setTimeout(() => {
      dispatch({
        type: "CREATE_PANEL",
        payload: { panel: [...state.panels, { ...formState }] }
      });
      setCreateLoading(false);
      dispatch({
        type: "SET_PANEL_TAB",
        payload: { panel_tab: state.panels.length }
      });
    }, 500);
  };

  return (
    <React.Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          addNewPanel();
        }}
        className="option-group-form-container"
      >
        <div className="field">
          <InputField
            autoFocus
            label="Panel Name"
            fullWidth
            margin="normal"
            value={formState.name}
            onChange={(e: any) => {
              setFormState({ ...formState, name: e.target.value });
            }}
            required
          />
          <br />
          <InputField
            label="Description"
            fullWidth
            margin="normal"
            value={formState.description}
            onChange={(e: any) => {
              setFormState({ ...formState, description: e.target.value });
            }}
          />
        </div>

        <div>
          <SaveButton type="submit">Save Panel</SaveButton>
        </div>
      </form>

      <LoadingModal
        open={createLoading}
        text={"One moment. We’re Create a new panel"}
        cancelFn={() => {
          return null;
        }}
      />
    </React.Fragment>
  );
};

const CreateNewFieldForm = () => {
  return (
    <div>
      <h1>Create New Field</h1>
    </div>
  );
};

export { CreateNewPanelForm, CreateNewFieldForm, EditPanelForm };
