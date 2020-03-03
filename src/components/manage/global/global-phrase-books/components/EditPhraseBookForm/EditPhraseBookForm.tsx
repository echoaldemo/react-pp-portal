import React, { useState, useEffect } from "react";
import { Collapse } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  CustomButton,
  InputField,
  LoadingModal,
  DeleteModal,
  SuccessModal
} from "common-components";
import {
  useStyles,
  materialTheme
} from "../../styles/EditPhraseBookForm.style";

import { remove } from "utils/api";

interface Props {
  editData: Obj;
  save: any;
}
interface Obj {
  [index: string]: any;
}

const EditPhraseBookForm = ({ editData, save }: Props) => {
  const classes = useStyles();
  const [phrase, setphrase] = useState(editData);
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletion, setDeletion] = useState({
    deleting: false,
    deleted: false
  });

  const inputFieldNameProps = {
    className: classes.textField,
    name: "phraseBookName",
    fullWidth: true,
    required: true,
    autoComplete: "off",
    error: phrase.name.length === 0,
    helperText: phrase.name.length === 0 ? "Invalid Phrase Book Name" : " "
  };

  const inputFieldPhraseProps = {
    className: classes.textField,
    name: "phraseBookName",
    fullWidth: true,
    required: true,
    autoComplete: "off",
    disabled: true
  };

  useEffect(() => {
    setphrase(editData);
  }, [editData]);

  const handleChange = (e: any, label: string) => {
    if (e.target.value.length === 0) {
      setShow(false);
    } else {
      setShow(true);
    }
    setphrase({
      ...phrase,
      [label]: e.target.value
    });
  };
  const handleSave = () => {
    if (phrase.name.length !== 0) {
      setSaving(true);
      save(phrase, (data: Obj) => {
        setSaving(false);
        localStorage.setItem("edit_pb_dataname", data.name);
      });
    }
  };

  const handleDelete = () => {
    remove(`/pitch/global/phrases/${phrase.uuid}`)
      .then((data: any) => {
        setDeletion({
          ...deletion,
          deleting: false,
          deleted: true
        });
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={classes.formContainer}>
      <ThemeProvider theme={materialTheme}>
        <form
          onSubmit={e => {
            e.preventDefault();
            setSaving(true);
            setShow(false);
            handleSave();
          }}
        >
          <InputField
            {...inputFieldNameProps}
            label={
              <span
                className={
                  phrase.name.length > 0 ? classes.label : classes.labelNormal
                }
              >
                Phrase book name
              </span>
            }
            value={phrase.name}
            onChange={(e: any) => {
              handleChange(e, "name");
            }}
          />
          <InputField
            {...inputFieldPhraseProps}
            label={
              <span className={classes.label} style={{ color: "#777" }}>
                Slug
              </span>
            }
            value={phrase.slug}
          />

          <div className={classes.btnFormControl}>
            <span
              className={classes.label}
              style={{ color: "#888", fontSize: 16 }}
            >
              Delete phrase book
            </span>
            <CustomButton
              style={{ background: "rgb(255,80,77)" }}
              type="button"
              handleClick={e => {
                setOpenDelete(true);
              }}
            >
              Delete
            </CustomButton>
          </div>
          <Collapse in={show} timeout={500}>
            <div className={classes.btnSaveFormControl}>
              <CustomButton
                style={{ margin: 5 }}
                type="submit"
                handleClick={() => {}}
              >
                Save
              </CustomButton>
              <CustomButton
                style={{ background: "#eee", margin: 5 }}
                type="button"
                handleClick={() => {
                  setShow(false);
                  setphrase(editData);
                }}
              >
                <span style={{ color: "#444" }}>Cancel</span>
              </CustomButton>
            </div>
          </Collapse>
        </form>
        <LoadingModal open={saving} text="Saving..." cancelFn={() => {}} />
        <LoadingModal
          open={deletion.deleting}
          text="One moment. We're deleting the phrase book..."
          cancelFn={() => {}}
        />
        <DeleteModal
          open={openDelete}
          closeFn={() => setOpenDelete(false)}
          name={editData.name}
          msg="phrase book"
          delFn={() => {
            setOpenDelete(false);
            setDeletion({
              ...deletion,
              deleting: true
            });
            handleDelete();
          }}
        />
        <SuccessModal
          open={deletion.deleted}
          text="Successfully deleted!"
          noDoNext={true}
          closeFn={() =>
            (window.location.href = "/manage/global-pitch-phrasebooks")
          }
        />
      </ThemeProvider>
    </div>
  );
};

export default EditPhraseBookForm;
