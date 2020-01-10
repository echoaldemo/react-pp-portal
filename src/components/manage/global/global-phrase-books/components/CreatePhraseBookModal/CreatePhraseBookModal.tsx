import React, { useState } from "react";
import { Button, Collapse, FormHelperText } from "@material-ui/core";
import { Modal, InputField, LoadingModal } from "common-components";
import { useStyles } from "../../styles/CreatePhraseBookModal.style";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreatePhraseBook = ({ open, onClose }: Props) => {
  const classes = useStyles();
  const [phrasebookName, setPhraseBookName] = useState<string>("");
  const [phrasebookNameError, setPhraseBookNameError] = useState<boolean>(
    false
  );

  const InputFieldProps = {
    autoFocus: true,
    label: "Phrase book name",
    required: true,
    fullWidth: true,
    value: phrasebookName,
    name: "phrasebook_name",
    onChange: (e: any) => {
      handleFieldChanges(e);
    },
    autoComplete: "off",
    onFocus: () => {
      setPhraseBookNameError(false);
    },
    onBlur: () => {
      if (phrasebookName.length === 0) {
        setPhraseBookNameError(true);
      }
    },
    error: phrasebookNameError,
    classes: { underline: classes.underline }
  };

  const ButtonProps = {
    classes: { root: classes.btnStyle },
    htmlType: "submit",
    onClick: (e: any) => {
      console.log(e);
    }
  };
  const handleFieldChanges = (e: any) => {
    setPhraseBookName(e.target.value);
  };

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
      <Modal title="Create Phrase Book" open={open} onClose={onClose}>
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
            <InputField {...InputFieldProps} />
            <Collapse in={phrasebookNameError} timeout={500}>
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
