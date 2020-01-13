import React from "react";
import { Modal, SaveButton, InputField } from "common-components";
import { BtnCont } from "../styles";
import { MenuItem } from "@material-ui/core";

const data = [
  {
    uuid: "1",
    name: "POSA Pledge Assistence"
  },
  {
    uuid: "2",
    name: "POSA Pledge Assistence 2"
  }
];

interface IProps {
  state: any;
  setState: any;
}

const SendPost: React.FC<IProps> = ({ state, setState }) => {
  return (
    <Modal
      open={state.post}
      title="Send post"
      onClose={() => setState({ ...state, post: false })}
    >
      <InputField
        fullWidth
        style={{ margin: "30px 0" }}
        value={state.postUUID}
        select
        onChange={(e: any) => setState({ ...state, postUUID: e.target.value })}
      >
        {data.map(post => (
          <MenuItem key={post.uuid} value={post.uuid}>
            {post.name}
          </MenuItem>
        ))}
      </InputField>
      <BtnCont>
        <SaveButton onClick={() => alert("work in progress")}>Send</SaveButton>
      </BtnCont>
    </Modal>
  );
};

export default SendPost;
