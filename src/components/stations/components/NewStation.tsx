import React, { useContext, useState } from "react";
import { Modal, SaveButton } from "common-components";
import styled from "styled-components";
import { TextField, MenuItem } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { InputField as SelectField } from "common-components";
import { KeyboardArrowDown } from "@material-ui/icons";
import { CustomText } from "./style";
import { store } from "contexts/ManageComponent";

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
  .Mui-focused span {
    color: #1194f6 !important;
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(1);
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const selectStyle = { margin: "14px 0 26px 0", width: "360px" };

interface Props {
  closeCreate: () => void;
  createFn: Function;
  selectFn: Function;
  selected: any;
  open: any;
}

const NewStation: React.FC<Props> = ({
  open,
  closeCreate,
  createFn,
  selectFn,
  selected
}) => {
  const [active, setActive] = useState<any>(false);
  const [username, setUsername] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const { state } = useContext(store);
  const selectProps = {
    SelectProps: {
      IconComponent: () => <KeyboardArrowDown />,
      MenuProps,
      multiple: true,
      onChange: selectFn("realms"),
      value: selected,
      renderValue: (selected: any) =>
        selected
          .map((select: any) => {
            return state.realms
              .filter((rls: any) => rls.uuid === select)
              .map((data: any) => data.name);
          })
          .join(", ")
    }
  };
  return (
    <Modal open={open} title="Add Station" onClose={closeCreate}>
      <InputField
        inputProps={{ "data-cy": "option-group-name" }}
        value={username}
        // error={state.groupState.errMsg ? true : false}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        label="Username"
        required
        margin="normal"
        // helperText={state.groupState.errMsg ? state.groupState.errMsg : " "}
        onBlur={e => null}
      />
      <InputField
        inputProps={{ "data-cy": "option-group-name" }}
        value={password}
        // error={state.groupState.errMsg ? true : false}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        label="Password"
        type="password"
        required
        margin="normal"
        // helperText={state.groupState.errMsg ? state.groupState.errMsg : " "}
        onBlur={e => null}
      />
      <SelectField
        data-cy="roles"
        style={selectStyle}
        label="Realms (Optional)"
        select={true}
        margin="normal"
        {...selectProps}
      >
        {state.realms.map((key: any) => {
          return (
            <MenuItem key={key.id} value={key.uuid} data-cy="roles-list">
              <Checkbox
                color="primary"
                checked={selected.indexOf(key.uuid) > -1}
              />
              <CustomText>{key.name}</CustomText>
            </MenuItem>
          );
        })}
      </SelectField>
      <Checkbox
        color="primary"
        checked={active}
        onClick={() => setActive(!active)}
      />
      <span style={{ color: "#777777", fontSize: "16px" }}>Active</span>
      <div className="option-btn-cont">
        <Btn onClick={closeCreate} type="button" style={{ marginRight: 10 }}>
          <Cancel>Cancel</Cancel>
        </Btn>
        <SaveButton
          onClick={() => createFn(username, password, active)}
          disabled={
            username.length !== 0 && password.length !== 0 ? false : true
          }
          data-cy="option-group-btn"
        >
          SAVE
        </SaveButton>
      </div>
    </Modal>
  );
};

export default NewStation;
