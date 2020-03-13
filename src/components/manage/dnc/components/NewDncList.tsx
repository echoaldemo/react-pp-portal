import React, { useState } from "react";
import {
  Modal,
  SaveButton, //eslint-disable-line
  LoadingModal, //eslint-disable-line
  SuccessModal //eslint-disable-line
} from "common-components";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { MenuItem, TextField } from "@material-ui/core";
import { useStyles } from "../styles";

//eslint-disable-next-line
const Loading = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`;

const Btn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Cancel = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;

const CreateBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`;

const CreateText = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;

interface NewDidProps {
  open: boolean;
  handleClose: () => void;
}

const NewDncList: React.FC<NewDidProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [getUpdated, setGetUpdate] = useState<any>(false);
  const [delayedProcess, setDelayedProcess] = useState<any>(false);
  const name = useInputForm(" ");
  const expirationDays = useInputForm(" ");

  return (
    <>
      {/* <LoadingModal
        open={state.load}
        text={"One moment. We’re adding the did pool…"}
        cancelFn={() => alert("asd")}
      />
      <SuccessModal
        open={state.done}
        text={`You have Created ${data.name}`}
        btnText={"ADD DID POOL"}
        closeFn={handleClose}
        btnFn={() => {
          setState({ ...state, open: true, done: false });
        }}
      /> */}
      <Modal open={open} title="Add DNC List" onClose={handleClose}>
        <form className={classes.formWrapper}>
          <div style={{ paddingBottom: "15px" }}>
            <InputField
              fullWidth
              label="Name"
              required
              {...name}
              helperText={name.inputValue === "" ? "Name is required" : " "}
            />
          </div>
          <div className={classes.formContainer}>
            <InputField fullWidth label="Company" select value="Select">
              <MenuItem key={"1"} value={"Select"}>
                {"Select"}
              </MenuItem>
            </InputField>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={getUpdated}
                onChange={() => setGetUpdate(!getUpdated)}
                value="getUpdatedCheck"
                color="primary"
                classes={{ root: classes.checkBoxRoot }}
              />
            }
            classes={{ root: classes.labelRoot }}
            style={{ width: "145px" }}
            label="Gets updated"
          />
          <div className={classes.formContainer}>
            <InputField
              fullWidth
              label="Expiration days"
              helperText={"Number of days the number stays on the DNC List"}
              {...expirationDays}
            />
          </div>
          <div className={classes.formContainer}>
            <InputField fullWidth label="Storage engine" select value="S3">
              <MenuItem key={"1"} value={"S3"}>
                {"S3"}
              </MenuItem>
            </InputField>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={delayedProcess}
                onChange={() => setDelayedProcess(!delayedProcess)}
                value="delayedProcessCheck"
                color="primary"
                classes={{ root: classes.checkBoxRoot }}
              />
            }
            style={{ width: "165px" }}
            classes={{ root: classes.labelRoot }}
            label="Delayed process"
          />
          <div className={classes.buttonContainer}>
            <Btn type="button" onClick={handleClose}>
              <Cancel>Cancel</Cancel>
            </Btn>
            <CreateBtn data-cy="create-button" type="submit">
              <CreateText>Save</CreateText>
            </CreateBtn>
          </div>
        </form>
      </Modal>
    </>
  );
};

function useInputForm(initialValue: any) {
  const [value, setValue] = useState(initialValue);
  const error = value === "" ? true : false;
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  function handleOnblur(e: any) {
    e.target.value === "" ? setValue("") : setValue(e.target.value);
  }

  return {
    inputValue: value,
    onChange: handleChange,
    onBlur: handleOnblur,
    error: error
  };
}

export default NewDncList;
