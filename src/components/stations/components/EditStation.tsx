import React, { useContext, useState } from "react";
import { Modal, SaveButton } from "common-components";
import styled from "styled-components";
import {
  TextField,
  MenuItem,
  FormControl,
  InputAdornment,
  InputBase,
  Button,
  InputLabel,
  Divider
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { InputField as SelectField } from "common-components";
import { KeyboardArrowDown } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { CustomText } from "./style";
import { store } from "contexts/ManageComponent";
import { makeStyles } from "@material-ui/styles";

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
const useStyles = makeStyles({
  removeLeader: {
    color: "#bbbbbb",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 15
  },
  shrink: {
    transform: "translate(0,1.5px) scale(1)"
  },
  focused: {
    color: "#1194f6 !important"
  },
  delBtn: {
    fontSize: 16,
    fontWeight: 600,
    width: 130,
    height: 40,
    backgroundColor: "#ff504d",
    color: "rgba(255,255,255,0.87)",
    "&:hover": {
      backgroundColor: "rgb(255,55,51)"
    }
  }
});
const selectStyle = { margin: "14px 0 26px 0", width: "360px" };

interface Props {
  closeEdit: () => void;
  createFnEdit: Function;
  selectFnEdit: Function;
  selectedEdit: any;
  openEdit: any;
  data: any;
  openDelete: any;
}

const EditStation: React.FC<Props> = ({
  openEdit,
  closeEdit,
  createFnEdit,
  selectFnEdit,
  selectedEdit,
  data,
  openDelete
}) => {
  const [active, setActive] = useState<any>(data.active);
  const [username, setUsername] = useState<any>(data.username);
  const [password, setPassword] = useState<any>(data.password);
  const { state } = useContext(store);
  const selectProps = {
    SelectProps: {
      IconComponent: () => <KeyboardArrowDown />,
      MenuProps,
      multiple: true,
      onChange: selectFnEdit("realms"),
      value: selectedEdit,
      renderValue: (selectedEdit: any) =>
        selectedEdit
          .map((select: any) => {
            return state.realms
              .filter((rls: any) => rls.uuid === select)
              .map((data: any) => data.name);
          })
          .join(", ")
    }
  };
  const classes = useStyles();
  return (
    <Modal open={openEdit} title="Edit Station" onClose={closeEdit}>
      <InputField
        disabled
        inputProps={{ "data-cy": "option-group-name" }}
        value={data.uuid}
        // error={state.groupState.errMsg ? true : false}
        fullWidth
        label="UUID"
        margin="normal"
        // helperText={state.groupState.errMsg ? state.groupState.errMsg : " "}
        onBlur={e => null}
      />
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
                checked={selectedEdit.indexOf(key.uuid) > -1}
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
      ></Checkbox>
      <span
        onClick={() => setActive(!active)}
        style={{ color: "#777777", fontSize: "16px" }}
      >
        Active
      </span>
      <Divider />
      <FormControl
        fullWidth
        disabled
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <InputLabel
          classes={{
            root: classes.removeLeader,
            shrink: classes.shrink,
            focused: classes.focused
          }}
          htmlFor="delete"
        >
          Delete Station
        </InputLabel>
        <InputBase
          style={{
            margin: 8
          }}
          value={" "}
          id="delete"
          endAdornment={
            <InputAdornment position="end">
              <Button
                onClick={openDelete}
                variant="contained"
                classes={{ root: classes.delBtn }}
              >
                <DeleteIcon /> Delete
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
      <Divider />
      <div className="option-btn-cont">
        <Btn onClick={closeEdit} type="button" style={{ marginRight: 10 }}>
          <Cancel>Cancel</Cancel>
        </Btn>
        <SaveButton
          onClick={() => createFnEdit(username, password, active, data.uuid)}
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

export default EditStation;
