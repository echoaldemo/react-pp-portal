import React, { useState, useEffect } from "react";
import { makeStyles, Collapse, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { CustomButton, InputField } from "common-components";

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

const EditPhraseBookForm = ({ editData }) => {
  const classes = useStyles();
  const [phrase, setphrase] = useState(editData);
  const [show, setShow] = useState(false);

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
  return (
    <div className={classes.formContainer}>
      <ThemeProvider theme={materialTheme}>
        <form
          onSubmit={e => {
            console.log(e);
          }}
        >
          <InputField
            className={classes.textField}
            label={
              <span className={true > 0 ? classes.label : classes.labelNormal}>
                Phrase book name
              </span>
            }
            name="phraseBookName"
            fullWidth
            value={phrase.name}
            autoFocus
            required
            onChange={e => {
              handleChange(e, "name");
            }}
            autoComplete="off"
            error={false}
            helperText={false ? "Invalid Phrase Book Name" : " "}
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
              onClick={() => {
                //   this.handleOpenDeleteModal();
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
      </ThemeProvider>
      {/* <Dialog open={this.state.loadingDelete}>
    <LoadingModal
      text="One moment. We're deleting the phrase book..."
      cancelFn={() => {
        cancel();
        this.setState({ ...defaultState });
      }}
    />
  </Dialog>
  <Dialog
    open={this.state.deleteModalOpen}
    onClose={() => {
      this.handleCloseDeleteModal();
    }}
  >
    <DeleteModal
      header="Test delete modal"
      msg="Phrase book"
      name={this.state.phraseBookName}
      closeFn={this.handleCloseDeleteModal}
      delFn={this.deletePhraseBook}
    />
  </Dialog> */}
    </div>
  );
};

export default EditPhraseBookForm;
