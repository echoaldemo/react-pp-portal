import React from "react";
import { SaveButton, InputField, Modal, Upload } from "common-components";
import { MenuItem, Checkbox } from "@material-ui/core";
import styled from "styled-components";

const BtnCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0 20px 0;
`;
const CancelBtn = styled(SaveButton)`
  background: #eeeeee;
  strong {
    color: #444851;
  }
`;
const CheckBoxCont = styled.div`
  position: relative;
  right: 10px;
`;
const NewProspectList = ({ state, setState }) => {
  return (
    <Modal
      open={state.list}
      title={`New prospect list`}
      onClose={() => setState({ ...state, list: false })}
    >
      <InputField
        label="Source"
        select
        value="Select"
        fullWidth
        margin="normal"
      >
        <MenuItem value={"Select"}>Select</MenuItem>
      </InputField>
      <InputField label="Name" fullWidth margin="normal" />
      <InputField label="Slug" fullWidth margin="normal" />
      <CheckBoxCont>
        <Checkbox color="primary" /> Dynamic
        <Checkbox color="primary" style={{ marginLeft: 25 }} /> Click to call
        <br />
        <Checkbox color="primary" /> Delayed process
      </CheckBoxCont>
      <InputField
        label="Storage engine"
        select
        value="s3"
        fullWidth
        margin="normal"
      >
        <MenuItem value={"s3"}>S3</MenuItem>
        <MenuItem value={"s4"}>S4</MenuItem>
      </InputField>
      <Upload
        accept="audio/*"
        labelText="Data"
        style={{ marginTop: 20 }}
        limit={20}
        helperText="Associated data file"
        getAudio={(e) => console.log("I am the file", e)}
      />
      <BtnCont>
        <CancelBtn onClick={() => setState({ ...state, list: false })}>
          cancel
        </CancelBtn>
        <SaveButton onClick={() => alert("work in progress  ")}>
          save
        </SaveButton>
      </BtnCont>
    </Modal>
  );
};

export default NewProspectList;
