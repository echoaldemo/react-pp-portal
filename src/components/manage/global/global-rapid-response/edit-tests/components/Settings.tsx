import React from "react";
import {
  Button,
  CircularProgress,
  createMuiTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider } from "@material-ui/styles";
import styled from "styled-components";
import { cancel, get, remove } from "utils/api";
import { DeleteModal, LoadingModal } from "common-components";
import { dialogStyles, useStyles } from "./Form-style";

const materialTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "2px solid rgba(0,0,0,0.12)"
        },
        "&::after": {
          borderBottom: "2px solid rgba(0,0,0,0.12)"
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid rgba(0,0,0,0.12)"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "none"
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
          color: "rgb(95,125,152)",
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    },
    MuiSwitch: {
      colorPrimary: {
        color: "#bbbbbb",
        "&$checked": {
          color: "#1194f6",
          "&.MuiSwitch-track": {
            backgroundColor: "#eeeeee"
          }
        }
      },
      track: {
        backgroundColor: "#bbbbbb !important"
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "#1194f6"
      }
    }
  }
});

const CustomSwitch = styled(Switch)`
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #1194f6 !important;
  }
  .MuiSwitch-track {
    color: #f1f1f1 !important;
    background-color: #999 !important;
  }
`;

interface Props {
  test: any;
  handleUpdate: Function;
  history: any;
}

export default function Form(props: Props) {
  const classes = useStyles();
  const dialog = dialogStyles();
  const [testDetails, setTestDetails] = React.useState(props.test);
  const [collapse, setCollapse] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [errors] = React.useState<any>({
    name: false,
    final_revenue: false
  });
  const [tts, setTTS] = React.useState([]);
  const [ttsLoading, setTTSLoading] = React.useState(true);

  React.useEffect(() => {
    get("/pitch/tts/voices/").then((res: any) => {
      setTTS(res.data);
      setTTSLoading(false);
    });
  }, []);
  React.useEffect(() => {
    setTestDetails(props.test);
  }, [props.test]);
  function handleInputChange(value: any, label: any) {
    setCollapse(true);
    setTestDetails({
      ...testDetails,
      [label]: value
    });
  }
  function getTTS() {
    if (ttsLoading) {
      get("/pitch/tts/voices/").then((res: any) => {
        setTTS(res.data);
        setTTSLoading(false);
      });
    }
  }
  function handleSave(e: any) {
    e.preventDefault();
    setCollapse(false);
    const data = {
      name: testDetails.name,
      active: testDetails.active,
      live: testDetails.live,
      test_type: testDetails.test_type,
      final_disposition_regex: testDetails.final_disposition_regex,
      final_revenue:
        testDetails.final_revenue === "" ? null : testDetails.final_revenue,
      segments: testDetails.segments,
      variables: testDetails.variables,
      voices: testDetails.voices,
      tts_voice: testDetails.tts_voice === "" ? null : testDetails.tts_voice
    };
    props.handleUpdate(data);
  }
  function handleCancel(e: any) {
    e.preventDefault();
    setCollapse(false);
    setTestDetails(props.test);
  }
  function handleDelCancel() {
    setDeleting(false);
    cancel();
  }
  function handleDelete() {
    setDeleting(true);
    remove(`/pitch/global/rapid-response/tests/${testDetails.uuid}/`).then(
      () => {
        setDeleting(false);
        setDeleted(true);
      }
    );
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={materialTheme}>
        <div className={classes.container}>
          <div className={classes.formContainer}>
            <form style={{ marginBottom: 20 }} onSubmit={e => handleSave(e)}>
              <Grid container spacing={8}>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth error={testDetails.name === ""}>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="name"
                      required
                    >
                      Rapid response test name
                    </InputLabel>
                    <Input
                      autoComplete="off"
                      classes={{
                        root: classes.input,
                        underline: classes.textField
                      }}
                      id="name"
                      required
                      value={testDetails.name || ""}
                      onChange={e => handleInputChange(e.target.value, "name")}
                    />
                    <FormHelperText
                      id="company-name"
                      error={testDetails.name === ""}
                    >
                      {testDetails.name === "" && "Test name is required"}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="slug"
                    >
                      Slug
                    </InputLabel>
                    <Input
                      autoComplete="off"
                      className={classes.textField}
                      id="slug"
                      value={testDetails.slug || ""}
                      disabled
                    />
                    <FormHelperText id="slug" error={errors.email}>
                      {errors.email && "Invalid email format"}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth error={errors.final_revenue}>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                    >
                      Final revenue
                    </InputLabel>
                    <Input
                      autoComplete="off"
                      className={classes.textField}
                      value={testDetails.final_revenue || ""}
                      inputProps={{ type: "number", min: 0 }}
                      onChange={e =>
                        handleInputChange(e.target.value, "final_revenue")
                      }
                    />
                    <FormHelperText error={errors.final_revenue}>
                      {errors.final_revenue && "Enter a number"}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl required style={{ margin: "0", width: "100%" }}>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                    >
                      Test type
                    </InputLabel>
                    <Select
                      value={testDetails.test_type ? 1 : 0}
                      fullWidth
                      onChange={e =>
                        handleInputChange(e.target.value, "test_type")
                      }
                    >
                      <MenuItem value={0}>Short</MenuItem>
                      <MenuItem value={1}>Long</MenuItem>
                    </Select>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth disabled>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="status"
                    >
                      Test status
                    </InputLabel>
                    <Input
                      className={classes.textField}
                      id="status"
                      value={testDetails.active ? "Active" : "Inactive"}
                      endAdornment={
                        <InputAdornment position="end">
                          <CustomSwitch
                            checked={testDetails.active ? true : false}
                            color="primary"
                            onChange={e =>
                              handleInputChange(e.target.checked, "active")
                            }
                          />
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id="status"></FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth disabled>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="status"
                    >
                      Live
                    </InputLabel>
                    <Input
                      className={classes.textField}
                      id="status"
                      value={testDetails.live ? "Active" : "Inactive"}
                      endAdornment={
                        <InputAdornment position="end">
                          <CustomSwitch
                            checked={testDetails.live ? true : false}
                            color="primary"
                            onChange={e =>
                              handleInputChange(e.target.checked, "live")
                            }
                          />
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id="status"></FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="fdr"
                    >
                      Final Disposition Regex
                    </InputLabel>
                    <Input
                      autoComplete="off"
                      className={classes.textField}
                      id="fdr"
                      value={testDetails.final_disposition_regex || ""}
                      onChange={e =>
                        handleInputChange(
                          e.target.value,
                          "final_disposition_regex"
                        )
                      }
                    />
                    <FormHelperText id="slug" error={errors.email}>
                      {errors.email && "Invalid email format"}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl style={{ margin: "0", width: "100%" }}>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                    >
                      TTS Prospect Voice
                    </InputLabel>
                    <Select
                      value={testDetails.tts_voice || ""}
                      fullWidth
                      onClick={getTTS}
                      onChange={e =>
                        handleInputChange(e.target.value, "tts_voice")
                      }
                    >
                      {!ttsLoading && (
                        <MenuItem key={0} value={""}>
                          None
                        </MenuItem>
                      )}
                      {ttsLoading ? (
                        <span className={classes.span}>
                          <CircularProgress size={20} color="primary" />
                        </span>
                      ) : (
                        tts.map((item: any) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.voice}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={6} className={classes.inputContainer}></Grid>
                <Grid item xs={6} className={classes.inputContainer}>
                  <FormControl fullWidth disabled>
                    <InputLabel
                      classes={{
                        root: classes.inputLabel,
                        shrink: classes.shrink,
                        focused: classes.focused
                      }}
                      htmlFor="website"
                    >
                      Delete test
                    </InputLabel>
                    <InputBase
                      style={{
                        margin: 8
                      }}
                      value={" "}
                      id="del"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            classes={{ root: classes.delBtn }}
                            onClick={e => setOpen(true)}
                          >
                            Delete
                          </Button>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id="del"></FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Collapse
                in={collapse}
                classes={{ wrapper: classes.collapseWrapper }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  transition: "all 1s ease",
                  margin: "36px 0"
                }}
              >
                <span
                  style={{
                    width: "50%",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <button
                    disabled={testDetails.name === ""}
                    type="submit"
                    className={classes.savebutton}
                    id="save"
                  >
                    SAVE
                  </button>
                  <button
                    className={classes.cancelbutton}
                    onClick={e => handleCancel(e)}
                    type="button"
                    id="cancel"
                  >
                    CANCEL
                  </button>
                </span>
              </Collapse>
            </form>
            <small style={{ fontSize: 14, color: "#bbbbbb" }}>
              *Required fields
            </small>
            <div style={{ height: 30 }}></div>
          </div>
        </div>
      </ThemeProvider>
      <DeleteModal
        open={open}
        header="Delete test"
        msg="test"
        name={testDetails.name}
        closeFn={() => setOpen(false)}
        delFn={() => handleDelete()}
      />
      <LoadingModal
        open={deleting}
        text={`Deleting ${testDetails.name}...`}
        cancelFn={handleDelCancel}
      />
      <Dialog open={deleted}>
        <DialogTitle className={dialog.title}>
          <Typography
            component={"span"}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <span className={dialog.span}>Delete test</span>
          </Typography>
        </DialogTitle>
        <DialogContent dividers style={{ minHeight: 200, maxWidth: 450 }}>
          <Typography className={dialog.grayText} style={{ color: "#2B957A" }}>
            <span>{testDetails.name} was deleted</span>
          </Typography>
          <Typography
            style={{ display: "flex", justifyContent: "center", minWidth: 350 }}
          >
            <Button
              variant="contained"
              classes={{ contained: dialog.buttonClose }}
              onClick={() =>
                props.history.push("/manage/global-rapid-response/tests")
              }
            >
              CLOSE
            </Button>
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
