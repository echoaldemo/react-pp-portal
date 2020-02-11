import React, { useContext } from "react";
import { Modal, SaveButton } from "common-components";
import { store } from "contexts/OptionGroupContext";
import { InputField } from "../utils/const-var";

interface Props {
  closeCreate: () => void;
  createFn: Function;
}

const NewOptionGroup: React.FC<Props> = ({ closeCreate, createFn }) => {
  const { state, dispatch } = useContext(store);
  return (
    <Modal
      open={state.groupState.create}
      title="Create option group"
      onClose={closeCreate}
    >
      <InputField
        inputProps={{ "data-cy": "option-group-name" }}
        value={state.groupState.name}
        error={state.groupState.errMsg ? true : false}
        onChange={e => {
          if (e.target.value) {
            dispatch({
              type: "GROUP_STATE",
              payload: {
                groupState: {
                  ...state.groupState,
                  errMsg: "",
                  name: e.target.value
                }
              }
            });
          } else {
            dispatch({
              type: "GROUP_STATE",
              payload: {
                groupState: {
                  ...state.groupState,
                  errMsg: "Option group name is required",
                  name: e.target.value
                }
              }
            });
          }
        }}
        fullWidth
        label="Group name"
        required
        margin="normal"
        helperText={state.groupState.errMsg ? state.groupState.errMsg : " "}
        onBlur={e => {
          if (e.target.value) {
            dispatch({
              type: "GROUP_STATE",
              payload: {
                groupState: { ...state.groupState, errMsg: "" }
              }
            });
          } else {
            dispatch({
              type: "GROUP_STATE",
              payload: {
                groupState: {
                  ...state.groupState,
                  errMsg: "Option group name is required"
                }
              }
            });
          }
        }}
      />
      <div className="option-btn-cont">
        <SaveButton
          onClick={createFn}
          disabled={!state.groupState.name}
          data-cy="option-group-btn"
        >
          Save Group
        </SaveButton>
      </div>
    </Modal>
  );
};

export default NewOptionGroup;
