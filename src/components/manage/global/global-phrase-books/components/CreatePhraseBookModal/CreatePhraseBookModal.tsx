import React, { Component } from "react";
import {
  Dialog,
  Button,
  Collapse,
  FormHelperText,
  makeStyles
} from "@material-ui/core";
import { Modal, InputField, LoadingModal } from "common-components";
const useStyles = makeStyles(() => ({
  btnStyle: {
    backgroundColor: "#b6d36b",
    color: "#FFF",
    fontSize: "14px",
    fontWeight: 700,
    height: "40px",
    borderRadius: "3px",
    textTransform: "none",
    paddingLeft: 15,
    paddingRight: 15
  },
  underline: {
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.12)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    },
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6 !important"
    }
  }
}));

const defaultState = {
  phrasebook_name: "",
  phrasebook_nameError: false,

  creationSuccess: false
};
const CreatePhraseBook = () => {
  const classes = useStyles();
  const InputFieldProps = {
    autoFocus: true,
    label: "Phrase book name",
    required: true,
    fullWidth: true,
    value: "",
    name: "phrasebook_name",
    onChange: (e: any) => {
      console.log("");
    },
    autoComplete: "off",
    onfocus: () => {
      // this.setState({ phrasebook_nameError: false });
    },
    onBlur: () => {
      // if (!this.state.phrasebook_name.length > 0) {
      //   this.setState({ phrasebook_nameError: true });
      // }
    },
    error: false,
    classes: { underline: classes.underline }
  };

  const ButtonProps = {
    classes: { root: classes.btnStyle },
    htmlType: "submit",
    onClick: (e: any) => {
      console.log(e);
    }
  };
  // handleFieldChanges = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // submitPhraseBook = e => {
  //   e.preventDefault();
  //   this.setState({ loading: true });
  //   post("/pitch/global/phrases/", {
  //     name: this.state.phrasebook_name
  //   }).then(result => {
  //     this.setState({ loading: false, creationSuccess: true });
  //     this.props.handleUpdate(result.data);
  //   });

  //   this.props.closeModal();
  //   this.clearState();
  // };

  // clearState = () => {
  //   this.setState({ ...defaultState });
  // };
  return (
    <div>
      <LoadingModal
        open={false}
        text="One moment. We're creating the new phrase..."
        cancelFn={() => {
          console.log("");
        }}
      />
      <Modal
        title="Create Phrase Book"
        open={false}
        onClose={() => console.log("")}
      >
        <form
          onSubmit={e => {
            console.log(e);
          }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ width: "100%", paddingBottom: 45 }}>
            <InputField
              // autoFocus={true}
              // label="Phrase book name"
              // required
              // fullWidth
              // value={""}
              // name="phrasebook_name"
              // onChange={e => {
              //   this.handleFieldChanges(e);
              // }}
              // autoComplete="off"
              // onFocus={() => {
              //   this.setState({ phrasebook_nameError: false });
              // }}
              // onBlur={() => {
              //   if (!this.state.phrasebook_name.length > 0) {
              //     this.setState({ phrasebook_nameError: true });
              //   }
              // }}
              // error={false}
              {...InputFieldProps}
            />
            <Collapse in={false} timeout={500}>
              <FormHelperText style={{ color: "red" }}>
                Phrase book is invalid
              </FormHelperText>
            </Collapse>
          </div>

          <div style={{ paddingBottom: 15 }}>
            <Button
              onClick={(e: any) => {
                console.log(e);
              }}
              {...ButtonProps}
            >
              Create Phrase
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePhraseBook;
