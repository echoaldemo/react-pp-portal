import React from "react";
import {
  TextField,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Modal } from "common-components";
import { get, post } from "utils/api";
import styled from "styled-components";

const SelectField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
  .Mui-focused span {
    color: #1194f6 !important;
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(1);
  }
`;

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
    MuiInputLabel: {
      shrink: {
        color: "#1194f6 !important",
        "&$error": {
          color: "#f44336 !important"
        }
      }
    },
    MuiIconButton: {
      label: {
        width: 22,
        height: 22,
        padding: 0,
        margin: 0
      }
    },
    MuiCheckbox: {
      root: {
        color: "#eeeeee"
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
    }
  }
});

const useStyles = makeStyles(theme => ({
  form: {
    margin: "15px 30px 30px 30px "
  },
  input: {
    margin: "15px 0 0px 0"
  },
  buttonCon: {
    display: "flex",
    justifyContent: "center"
  },
  saveBtn: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    borderRadius: 3,
    backgroundColor: "#b6d36b",
    outline: "none",
    border: "none",
    color: "#ffffff",
    textTransform: "uppercase",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#a6c556"
    }
  },
  checked: {
    color: "#1194f6 !important"
  },
  span: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minHeight: 64
  },
  saveBtnDisabled: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    borderRadius: 3,
    backgroundColor: "#eeeeee",
    outline: "none",
    border: "none",
    color: "#bbbbbb",
    textTransform: "uppercase",
    cursor: "not-allowed"
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
};

interface Props {
  closeFn: () => void;
  handleUpdate: () => void;
  open: boolean;
}

function NewTestDialog(props: Props) {
  const classes = useStyles();
  const [formErrors, setFormErrors] = React.useState({
    name: false,
    nameErr: "",
    test_type: false,
    segments: false,
    pv: false
  });
  const [formValues, setFormValues] = React.useState({
    name: "",
    test_type: 0,
    final_revenue: null,
    segments: [] as any,
    active: false,
    live: false,
    voices: [] as any,
    tts_voice: ""
  });
  const [segmentsLoading, setSegmentsLoading] = React.useState(true);
  const [segments, setSegments] = React.useState([]);
  const [pvLoading, setPvLoading] = React.useState(true);
  const [pv, setPv] = React.useState([]);
  const [tts, setTTS] = React.useState([]);
  const [ttsLoading, setTTSLoading] = React.useState(true);

  function handleChange(val: any, label: string) {
    if (label === "name") {
      if (val === "") {
        setFormErrors({
          ...formErrors,
          name: true,
          nameErr: "Test name is required"
        });
      } else {
        setFormErrors({
          ...formErrors,
          name: false
        });
      }
    }
    if (label === "test_type") {
      if (val === undefined || val === []) {
        setFormErrors({
          ...formErrors,
          test_type: true
        });
      } else {
        setFormErrors({
          ...formErrors,
          test_type: false
        });
      }
    }
    if (label === "segments") {
      if (val.length === 0) {
        setFormErrors({
          ...formErrors,
          segments: true
        });
      } else {
        setFormErrors({
          ...formErrors,
          segments: false
        });
      }
    }
    if (label === "voices") {
      if (val.length === 0) {
        setFormErrors({
          ...formErrors,
          pv: true
        });
      } else {
        setFormErrors({
          ...formErrors,
          pv: false
        });
      }
    }
    setFormValues({
      ...formValues,
      [label]: val
    });
  }
  function getSegments() {
    if (!Boolean(segments.length)) {
      setSegmentsLoading(true);
      get("/pitch/global/rapid-response/segments/").then((res: any) => {
        setSegments(res.data);
        setSegmentsLoading(false);
      });
    }
  }
  function getPv() {
    if (!Boolean(pv.length)) {
      setPvLoading(true);
      get("/identity/user/manage/list/?groups=10").then((res: any) => {
        setPv(res.data.results);
        setPvLoading(false);
      });
    }
  }
  function getTTS() {
    if (ttsLoading) {
      get("/pitch/tts/voices/").then((res: any) => {
        setTTS(res.data);
        setTTSLoading(false);
      });
    }
  }
  function reset() {
    setFormValues({
      name: "",
      test_type: 0,
      final_revenue: null,
      segments: [],
      active: false,
      live: false,
      voices: [],
      tts_voice: ""
    });
    setFormErrors({
      name: false,
      nameErr: "",
      test_type: false,
      segments: false,
      pv: false
    });
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      name: formValues.name,
      test_type: formValues.test_type,
      final_revenue:
        formValues.final_revenue === "" ? null : formValues.final_revenue,
      segments: formValues.segments,
      active: formValues.active,
      live: formValues.live,
      voices: formValues.voices,
      tts_voice: formValues.tts_voice === "" ? null : formValues.tts_voice
    };
    post("/pitch/global/rapid-response/tests/", data)
      .then(() => {
        reset();
        props.closeFn();
        props.handleUpdate();
      })
      .catch((err: any) => {
        if (err.response) {
          if (err.response.data.non_field_errors) {
            setFormErrors({
              ...formErrors,
              name: true,
              nameErr: err.response.data.non_field_errors.join(",")
            });
          }
        }
      });
  }

  return (
    <ThemeProvider theme={materialTheme}>
      <Modal
        title="Create rapid response test"
        open={props.open}
        onClose={props.closeFn}
      >
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
          <TextField
            error={formErrors.name}
            classes={{ root: classes.input }}
            fullWidth
            label="Test Name"
            name="test-name"
            required
            value={formValues.name}
            onChange={e => handleChange(e.target.value, "name")}
            helperText={formErrors.name ? formErrors.nameErr : " "}
          />
          <TextField
            classes={{ root: classes.input }}
            fullWidth
            label="Final revenue"
            name="final-revenue"
            type="number"
            inputProps={{ min: "0" }}
            value={formValues.final_revenue || ""}
            onChange={e => handleChange(e.target.value, "final_revenue")}
            helperText={" "}
          />
          <FormControl
            required
            style={{ margin: "15px 0 10px 0", width: "100%" }}
            error={formErrors.test_type}
          >
            <InputLabel>Test type</InputLabel>
            <Select
              value={formValues.test_type}
              fullWidth
              onChange={e => handleChange(e.target.value, "test_type")}
              onBlur={e => handleChange(e.target.value, "test_type")}
            >
              <MenuItem value={0}>Short</MenuItem>
              <MenuItem value={1}>Long</MenuItem>
            </Select>
            <FormHelperText>
              {formErrors.test_type ? "Test type is required" : " "}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "0 0 10px 0", width: "100%" }}>
            <SelectField
              error={formErrors.segments}
              data-cy="segments"
              style={{ margin: "0", width: "360px" }}
              label={"Segments"}
              select
              required
              SelectProps={{
                MenuProps,
                value: formValues.segments || "",
                multiple: true,
                onClick: getSegments,
                onChange: e => handleChange(e.target.value, "segments"),
                onBlur: e => handleChange(e.target.value, "segments"),
                renderValue: (selected: any) =>
                  selected
                    .map((select: any) => {
                      return segments
                        .filter((rls: any) => rls.uuid === select)
                        .map((data: any) => data.name);
                    })
                    .join(", ")
              }}
              margin="normal"
            >
              {segmentsLoading ? (
                <span className={classes.span}>
                  <CircularProgress size={20} />
                </span>
              ) : (
                segments.map((key: any) => {
                  return (
                    <MenuItem key={key.uuid} value={key.uuid}>
                      <Checkbox
                        color="primary"
                        checked={Boolean(
                          formValues.segments.indexOf(key.uuid) > -1
                        )}
                      />
                      {key.name}
                    </MenuItem>
                  );
                })
              )}
            </SelectField>
            <FormHelperText error={formErrors.segments}>
              {formErrors.segments && "At least one segment is required"}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "0 0 10px 0", width: "100%" }}>
            <SelectField
              error={formErrors.pv}
              required
              data-cy="prospect-voice"
              style={{ margin: "0", width: "360px" }}
              label={"Prospect Voice"}
              select
              SelectProps={{
                MenuProps,
                value: formValues.voices,
                multiple: true,
                onClick: getPv,
                onChange: e => handleChange(e.target.value, "voices"),
                onBlur: e => handleChange(e.target.value, "voices"),
                renderValue: (selected: any) =>
                  selected
                    .map((select: any) => {
                      return pv
                        .filter((rls: any) => rls.uuid === select)
                        .map(
                          (data: any) => data.first_name + " | " + data.username
                        );
                    })
                    .join(", ")
              }}
              margin="normal"
            >
              {pvLoading ? (
                <span className={classes.span}>
                  <CircularProgress size={20} />
                </span>
              ) : (
                pv.map((key: any) => {
                  return (
                    <MenuItem key={key.uuid} value={key.uuid}>
                      <Checkbox
                        color="primary"
                        checked={formValues.voices.indexOf(key.uuid) > -1}
                      />
                      {key.first_name + " | " + key.username}
                    </MenuItem>
                  );
                })
              )}
            </SelectField>
            <FormHelperText error={formErrors.pv}>
              {formErrors.pv && "At least one prospect voice is required"}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "0", width: "100%" }}>
            <InputLabel>TTS Prospect Voice</InputLabel>
            <Select
              value={formValues.tts_voice}
              fullWidth
              onClick={e => getTTS()}
              onChange={e => handleChange(e.target.value, "tts_voice")}
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
          <FormGroup row style={{ marginBottom: 20 }}>
            <FormControlLabel
              control={
                <Checkbox
                  data-cy="active"
                  classes={{ checked: classes.checked }}
                  checked={formValues.active}
                  value="active"
                  onChange={e => handleChange(e.target.checked, "active")}
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  data-cy="live"
                  classes={{ checked: classes.checked }}
                  checked={formValues.live}
                  value="live"
                  onChange={e => handleChange(e.target.checked, "live")}
                />
              }
              label="Live"
            />
          </FormGroup>
          <FormGroup row className={classes.buttonCon}>
            {formValues.name !== "" &&
            formValues.test_type !== null &&
            formValues.segments.length > 0 &&
            formValues.voices.length > 0 ? (
              <button type="submit" className={classes.saveBtn}>
                SAVE TEST
              </button>
            ) : (
              <button className={classes.saveBtnDisabled} disabled>
                SAVE TEST
              </button>
            )}
          </FormGroup>
        </form>
      </Modal>
    </ThemeProvider>
  );
}

export default NewTestDialog;
