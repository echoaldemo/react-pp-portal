import React, { useContext, useState } from "react";
import { IdentityContext } from "contexts/IdentityProvider";
import {
  TableNoResult,
  SaveButton,
  Modal,
  InputField,
  LoadingModal
} from "common-components";
import { MenuItem } from "@material-ui/core";
import { IoIosGlobe } from "react-icons/io";
import { Add, KeyboardArrowDown } from "@material-ui/icons";

const DropdownIcon = () => {
  return <KeyboardArrowDown style={{ color: "#444851" }} />;
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};
const AddNewPitch = () => {
  const { state } = useContext(IdentityContext);
  const [modalState, setModalState] = useState(false);

  return (
    <React.Fragment>
      <TableNoResult
        headerText="Pitch Settings"
        mainMessage="No pitch have been created"
        subMessage="Would you like to create one? Just hit the “New Pitch” button."
        renderButton={
          <SaveButton
            onClick={() => {
              setModalState(true);
            }}
          >
            <Add />
            New Pitch
          </SaveButton>
        }
      />
      <Modal
        open={modalState}
        title={<b>Create New Pitch</b>}
        onClose={() => setModalState(false)}
      >
        <PitchForm />
      </Modal>
    </React.Fragment>
  );
};

const PitchForm = () => {
  const initialState = {
    name: "",
    panel: "Generic",
    active_version: 1
  };

  const [formState, setFormState] = useState(initialState);
  const { dispatch, setLoading, state } = useContext(IdentityContext);

  const addNewPitch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({
        type: "NEW_PITCH",
        payload: {
          new_pitch: formState
        }
      });
    }, 500);
  };
  return (
    <React.Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          addNewPitch();
        }}
        className="add-pitch-form"
      >
        <InputField
          value={formState.name}
          required
          label="Pitch name"
          autoFocus
          fullWidth
          onChange={(e: any) => {
            setFormState({ ...formState, name: e.target.value });
          }}
        />

        <InputField
          label="Panel"
          fullWidth
          select
          value={formState.panel}
          SelectProps={{
            IconComponent: () => <DropdownIcon />,
            ...MenuProps
          }}
          onChange={(e: any) => {
            setFormState({ ...formState, panel: e.target.value });
          }}
        >
          {["Generic", "Standard"].map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </InputField>

        <InputField
          label="Panel"
          fullWidth
          select
          value={formState.active_version}
          SelectProps={{
            IconComponent: () => <DropdownIcon />,
            ...MenuProps
          }}
          onChange={(e: any) => {
            setFormState({ ...formState, active_version: e.target.value });
          }}
        >
          {[1, 2, 3].map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </InputField>
        <SaveButton>CREATE NEW PITCH</SaveButton>
      </form>
      <LoadingModal
        open={state.loading}
        text={"One moment. We’re creating a new pitch"}
        cancelFn={() => {
          return null;
        }}
      />
    </React.Fragment>
  );
};

export default AddNewPitch;
