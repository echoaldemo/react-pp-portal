import React from "react";
import styled from "styled-components";
import { SaveButton, InputField, Modal } from "common-components";
const Msg = styled.span`
  font-size: 16px;
  color: #444851;
`;
const BtnCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 12px 0;
`;
const CancelBtn = styled(SaveButton)`
  background: #eeeeee;
  strong {
    color: #444851;
  }
`;
const AddDNC = ({ state, setState }) => {
  return (
    <Modal
      open={state.dnc}
      title={`Add DNC`}
      onClose={() => setState({ ...state, dnc: false })}
    >
      <Msg>Add phone number to DNC campaign lists</Msg>
      <InputField
        style={{ marginTop: 20 }}
        fullWidth
        label="Phone"
        value={state.phone}
        onChange={(e) => setState({ ...state, phone: e.target.value })}
      />
      <BtnCont>
        <CancelBtn onClick={() => setState({ ...state, dnc: false })}>
          cancel
        </CancelBtn>
        <SaveButton
          onClick={() => alert("work in progress  ")}
          disabled={!state.phone}
        >
          save
        </SaveButton>
      </BtnCont>
    </Modal>
  );
};

export default AddDNC;
