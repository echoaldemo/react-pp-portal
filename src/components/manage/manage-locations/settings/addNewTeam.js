import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  makeStyles,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Search from "../common-components/Search";
import { Grid, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    backgroundColor: "#5f7d98",
    color: "#ffff"
  },
  textFieldSize: {
    width: "420px",
    "@media (max-width: 425px)": {
      width: "200px"
    },
    "@media (max-width: 320px)": {
      width: "170px"
    }
  },
  customTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5f7d98",
    fontWeight: "600",
    fontSize: "20px",
    color: "#ffffff",
    padding: "0 20px",
    "@media (max-width: 425px)": {
      fontSize: "12pt"
    },
    "@media (max-width: 320px)": {
      fontSize: "10.5pt"
    }
  },
  saveBtn: {
    width: "50%",
    backgroundColor: "#b6d36b",
    padding: "10px",
    fontWeight: "700",
    margin: "auto",
    color: "white",
    "&:hover": {
      backgroundColor: "#b6d36b"
    },
    "@media (max-width: 425px)": {
      width: "80%"
    },
    "@media (max-width: 320px)": {
      fontSize: "8pt"
    }
  },
  resize: {
    fontSize: "30px"
  },
  dialogRoot: {
    zIndex: "0 !important"
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1194f6"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1194f6"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#1194f6"
    }
  }
})(TextField);

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1194f6" },
    error: { 500: "#ff504d" }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid rgba(238, 238, 238, 0.99)`
        },
        "&:hover:not($disabled):before": {
          borderBottom: "1px solid #1194f6"
        },
        "&:after": {
          borderBottom: "1px solid #1194f6"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#ffffff"
        }
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    }
  }
});

export default function AddNewTeam(props) {
  const classes = useStyles();
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState("");

  function selectedVoice(val) {
    setLeader(val.uuid);
  }
  return (
    <div>
      <Dialog
        data-cy="add-ar-modal"
        open={props.open}
        onClose={() => {
          // props.handleAddResourceModal("close");
          props.handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        classes={{ root: classes.dialogRoot }}
      >
        <ThemeProvider theme={theme}>
          <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
            <div className={classes.customTitle}>
              <span>New Team</span>
              <span
                style={{
                  position: "absolute",
                  right: "20px",
                  cursor: "pointer"
                }}
              >
                <CloseIcon
                  onClick={() => {
                    props.handleClose();
                  }}
                  className={classes.closeIcon}
                />
              </span>
            </div>
          </DialogTitle>
          <DialogContent style={{ paddingTop: "40px" }}>
            <CssTextField
              onChange={e => setTeamName(e.target.value)}
              className={classes.textFieldSize}
              label="Team Name*"
              id="textfield-ar"
              InputLabelProps={{
                classes: {
                  input: classes.resize
                }
              }}
              defaultValue={
                props.currentResourceInfo ? props.currentResourceInfo.name : ""
              }
            />
          </DialogContent>

          <DialogContent style={{ paddingTop: "40px" }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className={classes.inputContainer}
            >
              <FormControl fullWidth disabled>
                <Search
                  searchOption="modal"
                  searchText="Search for location leader"
                  data={props.leader}
                  searchFunction={selectedVoice}
                  // voices={props.voices}
                />
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: "30px" }}>
            <Button
              data-cy="save-ar-btn"
              onClick={() => props.createTeam(teamName, leader)}
              className={classes.saveBtn}
              style={{
                backgroundColor:
                  teamName.length === 0 || leader.length === 0
                    ? "#eeeeee"
                    : "#b6d36b"
              }}
              disabled={
                teamName.length === 0 || leader.length === 0 ? true : false
              }
            >
              Create
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}
