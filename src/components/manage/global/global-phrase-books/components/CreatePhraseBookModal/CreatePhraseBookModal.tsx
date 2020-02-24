import React, { useState } from "react";
import { Button, Collapse, FormHelperText } from "@material-ui/core";
import {
  Modal,
  InputField,
  LoadingModal,
  SuccessModal
} from "common-components";
import { useStyles } from "../../styles/CreatePhraseBookModal.style";

interface Props {
  open: boolean;
  onClose: () => void;
  addPhraseBook: (data: any, fn: any) => void;
  afterAdd: () => void;
}

const CreatePhraseBook = ({
  open,
  onClose,
  addPhraseBook,
  afterAdd
}: Props) => {
  const classes = useStyles();
  const [phrasebookName, setPhraseBookName] = useState<string>("");
  const [phrasebookNameError, setPhraseBookNameError] = useState<boolean>(
    false
  );
  const [creation, setCreation] = useState<any>({
    creating: false,
    created: false
  });

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
    onClick: (e: any) => {
      e.preventDefault();
      const data: any = {
        name: phrasebookName,
        uuid: uuidv4(),
        slug: phrasebookName.replace(" ", "-"),
        company: "",
        phrases: []
      };
      if (phrasebookName.length !== 0) {
        onClose();
        setCreation({ ...creation, creating: true });
        addPhraseBook(data, () => {
          setCreation({ ...creation, creating: false, created: true });
        });
      }
    }
  };
  const handleFieldChanges = (e: any) => {
    setPhraseBookName(e.target.value);
  };

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const reset = () => {
    setPhraseBookName("");
  };

  return (
    <div>
      <LoadingModal
        open={creation.creating}
        text="One moment. We're creating the new phrase..."
        cancelFn={() => {
          console.log("");
        }}
      />
      <SuccessModal
        open={creation.created}
        text={`${phrasebookName} Phrase book was added`}
        btnText="OK"
        closeFn={() => setCreation({ ...creation, created: false })}
        btnFn={() => {
          setCreation({ ...creation, created: false });
          afterAdd();
        }}
      />
      <Modal title="Create Phrase Book" open={open} onClose={onClose}>
        <form
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
            <Button {...ButtonProps}>Create Phrase</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePhraseBook;
