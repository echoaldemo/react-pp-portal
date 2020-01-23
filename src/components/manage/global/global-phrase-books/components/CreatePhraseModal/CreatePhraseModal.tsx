import React, { useState } from "react";
import { Collapse } from "@material-ui/core";
import {
  CustomButton,
  InputField,
  Modal,
  LoadingModal,
  SuccessModal
} from "common-components";
import { useStyles } from "../../styles/CreatePhraseModal.style";

interface Props {
  open: boolean;
  onClose: () => void;
  openFn: () => void;
  handleAdd: (data: Obj, fn: any) => void;
}
interface Obj {
  [index: string]: any;
}

const defaultState: Obj = {
  phrase_name: "",
  phrase_nameValid: false,
  phrase_nameError: false,

  phrase: "",
  phraseError: false,
  phraseValid: false,
  errorMessage: ""
};

const CreatePhraseModal = ({ open, onClose, openFn, handleAdd }: Props) => {
  const classes = useStyles();
  const [state, setState] = useState<Obj>({
    ...defaultState,
    loading: false,
    createSuccess: false
  });
  const nameProps: Obj = {
    label: "Phrase name",
    fullWidth: true,
    value: state.phrase_name || "",
    className: classes.textField,
    name: "phrase_name",
    onChange: (e: any) => {
      handleFieldChanges(e);
    },
    autoComplete: "off",
    autoFocus: true,
    required: true,
    error: state.phraseError
  };
  const phraseProps: Obj = {
    label: "Phrase",
    fullWidth: true,
    value: state.phrase || "",
    className: classes.textField,
    name: "phrase",
    onChange: (e: any) => {
      handleFieldChanges(e);
    },
    autoComplete: "off",
    required: true,
    error: state.phraseError
  };

  const handleFieldChanges = (e: any) => {
    if (e.target.value.length > 0) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        [`${e.target.name}Valid`]: true,
        [`${e.target.name}Error`]: false
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        [`${e.target.name}Valid`]: false,
        [`${e.target.name}Error`]: true
      });
    }
  };

  return (
    <div>
      <SuccessModal
        open={state.createSuccess}
        text={`You have created ${state.phrase_name}`}
        btnText={"Create Another"}
        closeFn={() => {
          setState({
            createSuccess: false
          });
        }}
        btnFn={() => {
          setState({ ...defaultState, createSuccess: false });
          openFn();
        }}
      />
      <LoadingModal
        open={state.loading}
        text="One moment. We're creating the new phrase..."
        cancelFn={() => {
          setState({ loading: false });
        }}
      />
      <Modal open={open} onClose={onClose} title={<b>Create Phrase</b>}>
        <form
          className={classes.formStyle}
          onSubmit={(e: any) => {
            e.preventDefault(e);
            onClose();
            setState({ loading: true });
            handleAdd(
              {
                name: state.phrase_name,
                phrase: state.phrase,
                slug: state.phrase_name.replace("-", " ")
              },
              () => {
                setState({
                  loading: false,
                  createSuccess: true,
                  ...defaultState
                });
              }
            );
          }}
        >
          <div className={classes.formControl}>
            <InputField {...nameProps} />
            <Collapse in={state.phrase_nameError} timeout={1000}>
              <span style={{ color: "red" }}>{state.errorMessage}</span>
            </Collapse>
          </div>

          <div className={classes.formControl}>
            <div style={{ width: "100%" }}>
              <InputField {...phraseProps} />
            </div>
          </div>
          <div style={{ paddingBottom: 15 }}>
            <CustomButton
              type="submit"
              handleClick={(e) => {
                console.log(e);
              }}
              disabled={!state.phrase_nameValid || !state.phraseValid}
            >
              Create Phrase
            </CustomButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default CreatePhraseModal;
