import React, { useState, useEffect } from "react";
import { makeStyles, Collapse, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  CustomButton,
  InputField,
  LoadingModal,
  DeleteModal,
  SuccessModal
} from "common-components";

const materialTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "2px solid rgba(0,0,0,0.12)"
        },
        "&::after": {
          borderBottom: "2px solid #1194f6"
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid rgba(0,0,0,0.12)"
        }
      }
    }
  }
});

const useStyles = makeStyles(() => ({
  formContainer: {
    width: 800,
    padding: 15,
    marginTop: 15
  },
  textField: {
    paddingBottom: 40
  },
  label: {
    fontWeight: 600,
    fontSize: 20
  },
  labelNormal: {
    fontWeight: 500,
    fontSize: 20
  },
  btnFormControl: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 15
  },
  btnSaveFormControl: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  btn: {
    marginLeft: 10,
    marginRight: 10
  },
  underline: {
    "&:before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    },
    "&::after": {
      borderBottom: "2px solid #1194f6"
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid rgba(0,0,0,0.12)"
    }
  }
}));

const EditPhraseBookForm = ({ editData, save }) => {
  const classes = useStyles();
  const [phrase, setphrase] = useState(editData);
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletion, setDeletion] = useState({
    deleting: false,
    deleted: false
  });

  useEffect(() => {
    setphrase(editData);
  }, [editData]);

  const handleChange = (e, label) => {
    setShow(true);
    setphrase({
      ...phrase,
      [label]: e.target.value
    });
  };
  const handleSave = () => {
    if (phrase.name.length !== 0) {
      setSaving(true);
      save(phrase, data => {
        setSaving(false);
        localStorage.setItem("edit_pb_dataname", data.name);
      });
    }
  };

  const handleDelete = () => {
    fetch(
      `http://5e12f35c6e229f0014678f56.mockapi.io/global-phrase-books/${phrase.id}`,
      {
        method: "DELETE"
      }
    )
      .then(response => response.json())
      .then(data => {
        setDeletion({
          ...deletion,
          deleting: false,
          deleted: true
        });
      })
      .catch(error => {
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
            handleSave(phrase);
          }}
        >
          <InputField
            className={classes.textField}
            label={
              <span
                className={
                  phrase.name.length > 0 ? classes.label : classes.labelNormal
                }
              >
                Phrase book name
              </span>
            }
            name="phraseBookName"
            fullWidth
            value={phrase.name}
            required
            onChange={e => {
              handleChange(e, "name");
            }}
            autoComplete="off"
            error={phrase.name.length === 0}
            helperText={
              phrase.name.length === 0 ? "Invalid Phrase Book Name" : " "
            }
            onBlur={() => {
              // this.setState({ phraseBookNameError: false });
            }}
            onFocus={() => {
              // this.setState({ phraseBookNameError: false });
            }}
          />
          <InputField
            className={classes.textField}
            label={
              <span className={classes.label} style={{ color: "#777" }}>
                Slug
              </span>
            }
            disabled
            fullWidth
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
              <CustomButton style={{ margin: 5 }} type="submit">
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
        <LoadingModal open={saving} text="Saving..." />
        <LoadingModal
          open={deletion.deleting}
          text="One moment. We're deleting the phrase book..."
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
          btnText="OK"
          text="Successfully deleted!"
          btnFn={() =>
            (window.location.href = "/manage/global-pitch-phrasebooks")
          }
        />
      </ThemeProvider>
    </div>
  );
};

export default EditPhraseBookForm;
