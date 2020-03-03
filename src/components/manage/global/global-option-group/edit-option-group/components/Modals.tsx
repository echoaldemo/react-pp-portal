import React, { useContext } from "react";
import { store } from "contexts/EditOptionGroupContext";
import {
  Modal,
  LoadingModal,
  SuccessModal,
  DeleteModal
} from "common-components";
import { Menu, MenuItem } from "@material-ui/core";
import { Settings, DeleteOutline } from "@material-ui/icons";
import AddOption from "./AddOption";
import EditOption from "./EditOption";
import { remove, cancel } from "utils/api"; //eslint-disable-line
import { editReset } from "../../utils/const-var";
import Snackbar from "auth/component/snackbar/snackbar";

const Modals = ({ history }: any) => {
  const { state, dispatch } = useContext(store);

  const handleDeleteGroup = () => {
    dispatch({
      type: "EDIT",
      payload: { edit: { ...state.edit, load: true } }
    });
    remove(`/pitch/global/gui%2Ffield-option-group%2F${state.group.uuid}/`)
      .then(() =>
        dispatch({
          type: "EDIT",
          payload: {
            edit: { ...state.edit, load: false, done2: true, delete: false }
          }
        })
      )
      .catch((err: any) => console.log(err));
  };

  const handleDeleteOption = () => {
    dispatch({
      type: "EDIT",
      payload: { edit: { ...state.edit, load: true } }
    });
    remove(
      `/pitch/global/gui%2Ffield-option-group%2F${state.group.uuid}%2Foptions/${state.current.uuid}/`
    ).then(() => {
      dispatch({
        type: "EDIT",
        payload: {
          edit: {
            ...state.edit,
            load: false,
            done3: true,
            delete2: false
          }
        }
      });
      dispatch({
        type: "GROUP",
        payload: {
          group: {
            ...state.group,
            options: state.group.options.filter(
              (op: any) => op.uuid !== state.current.uuid
            )
          }
        }
      });
    });
  };

  const handleCancel = () => {
    cancel();
    dispatch({
      type: "EDIT",
      payload: { edit: { ...state.edit, load: false } }
    });
  };

  const handleClose = () => {
    dispatch({ type: "EDIT", payload: { edit: { ...editReset } } });
  };

  const handleBtn = () => {
    dispatch({
      type: "EDIT",
      payload: {
        edit: {
          ...state.edit,
          open: true,
          description: "",
          value: "",
          error: {
            description: "",
            value: ""
          }
        }
      }
    });
  };

  return (
    <>
      <Snackbar
        handleclose={handleClose}
        snackbar={state.edit.snackErr ? true : false}
        message={state.edit.snackErr}
      />
      <Modal open={state.edit.edit} title="Edit Option" onClose={handleClose}>
        <EditOption />
      </Modal>
      <Modal open={state.edit.open} title="Create Option" onClose={handleClose}>
        <AddOption />
      </Modal>
      <LoadingModal
        open={state.edit.load}
        text={
          state.edit.open
            ? "One moment. We’re adding the option…"
            : state.edit.delete
            ? "One moment. We’re removing the option group…"
            : state.edit.delete2
            ? "One moment. We’re removing the option…"
            : "One moment. We’re editing the option…"
        }
        cancelFn={handleCancel}
      />
      <SuccessModal
        open={state.edit.done}
        text={`You have added ${state.edit.name}`}
        btnText={"ADD GROUP"}
        closeFn={handleClose}
        btnFn={handleBtn}
      />
      <SuccessModal
        open={state.edit.done2}
        text={`You have remove ${state.group.name}`}
        closeFn={() => history.push("/manage/global-option-group/")}
      />
      <SuccessModal
        open={state.edit.done3}
        text={`You have remove ${state.current.description}`}
        btnText={"ADD OPTION"}
        closeFn={handleClose}
        btnFn={handleBtn}
      />
      <DeleteModal
        open={state.edit.delete}
        header="Delete option group"
        msg="option group"
        name={state.group.name}
        closeFn={handleClose}
        delFn={handleDeleteGroup}
      />
      <DeleteModal
        open={state.edit.delete2}
        header="Delete option"
        msg="option"
        name={state.current.description}
        closeFn={handleClose}
        delFn={handleDeleteOption}
      />
      <Menu
        anchorEl={state.anchorEl}
        keepMounted
        open={Boolean(state.anchorEl)}
        onClose={() =>
          dispatch({ type: "ANCHOR_EL", payload: { anchorEl: null } })
        }
      >
        <MenuItem
          className="menu-item"
          style={{ padding: 15 }}
          onClick={() => {
            dispatch({ type: "ANCHOR_EL", payload: { anchorEl: null } });
            dispatch({
              type: "EDIT",
              payload: { edit: { ...state.edit, edit: true } }
            });
          }}
        >
          <Settings style={{ marginRight: 16 }} />
          Modify
        </MenuItem>
        <MenuItem
          className="menu-item"
          style={{ padding: 15 }}
          onClick={() => {
            dispatch({ type: "ANCHOR_EL", payload: { anchorEl: null } });
            dispatch({
              type: "EDIT",
              payload: { edit: { ...state.edit, delete2: true } }
            });
          }}
        >
          <DeleteOutline style={{ marginRight: 16 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default Modals;
