import React, { Component } from "react";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import MicOffIcon from "@material-ui/icons/MicOff";
// import Select from "react-select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Clear from "@material-ui/icons/Clear";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
import Collapse from "@material-ui/core/Collapse";
import Remove from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import RecordAudio from "../record-audio";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
import Toast from "../toast";
import Loader from "../loader";
import axios from "axios";
import UploadStatus from "../upload/UploadStatus";
import NothingToUpload from "../table-components/NothingtoUpload";
import { get, remove, post } from "../../../../utils/api";


// for tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3} style={{ padding: 0 }}>
        {children}
      </Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}
// end for tabs

const uiStyles = theme => ({
  scrollBar: {
    maxHeight: 475,
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.3em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "10px",
      outline: "1px solid slategrey"
    },
    "@media (max-width: 425px)": {
      padding: 0,
      maxHeight: 648
    }
  },
  dialogTitle: {
    color: "whitesmoke",
    backgroundColor: "rgb(95,125,152)",
    "@media (max-width: 425px)": {
      height: "90px"
    }
  },
  clearBtn: {
    color: "whitesmoke",
    float: "right",
    "@media (max-width: 320px)": {
      margin: "-10px -20px 0 0"
    }
  },
  btnCont: {
    textAlign: "center",
    justifyContent: "center",
    width: "40%",
    margin: "10px 30%",
    "@media (max-width: 320px)": {
      width: "60%",
      margin: "20px 20%"
    },
    "@media (max-width: 425px)": {
      width: "60%",
      margin: "20px 20%"
    }
  },
  nameText: {
    textAlign: "center",
    justify: "center",
    margin: "20px",
    fontSize: "20px"
  },
  phraseText: {
    alignItems: "center",
    margin: "20px",
    fontSize: "18px",
    lineSpacing: "0.2px"
  },
  saveBtn: {
    color: "white",
    width: "100%",
    height: "36px",
    backgroundColor: "#a6c556",
    "&:hover": {
      backgroundColor: "#9cba4e"
    }
  },
  sessionBtn: {
    color: "white",
    width: "100%",
    height: "36px",
    backgroundColor: "rgb(95,125,152)",
    "&:hover": {
      backgroundColor: "#4d6378"
    }
  },
  text: {
    fontSize: 12,
    "& label.Mui-focused": {
      color: "#a6c556",
      marginLeft: "-1px"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#a6c556"
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#a6c556"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#a6c556"
      }
    }
  },
  mainContent: {
    color: "#voice4b4f57"
  },
  uploadFileBtn: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    color: "#566b81",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  resFilename: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  uploadIcon: {
    margin: theme.spacing(-1, 1)
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#2b9ff7",
    minWidth: "130px"
  },
  input1: {
    height: 50
  },
  checkbox: {
    color: "#777777",
    "& .MuiFormControlLabel-label": {
      fontSize: "16px"
    }
  },
  phraseContent: {
    fontSize: "16px",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: "20px"
  },
  checkText: {
    marginTop: "-5px",
    maxWidth: "320px"
  },
  micOff: {
    color: "#ccc"
  },
  micStyle: {
    fontSize: 48
  },
  recordBtn: {
    width: "100px",
    height: "100px",
    fontSize: "48px",
    border: "2px solid #e74c3c",
    borderRadius: "50%",
    cursor: "default",
    "&:hover": {
      transition: "none",
      backgroundColor: "white"
    }
  },
  recordBtnDisabled: {
    border: "2px solid #ccc",
    "&:hover": {
      transform: "none"
    }
  },
  formControl: {
    width: "100%",
    marginBottom: "10px",
    "@media (max-width: 320px)": {
      width: "100%",
      marginBottom: "0"
    },
    "@media (max-width: 425px)": {
      width: "100%",
      marginBottom: "0"
    }
  },
  label: {
    "& .label": {
      color: "#a6c556"
    }
  },
  selectMargin: {
    marginTop: "20px",
    "@media (max-width: 320px)": {
      marginTop: "10px"
    },
    "@media (max-width: 425px)": {
      marginTop: "10px"
    }
  },
  selectMargin2: {
    marginTop: "10px",
    "@media (max-width: 320px)": {
      marginTop: "-10px"
    },
    "@media (max-width: 425px)": {
      marginTop: "-10px"
    }
  },
  selectMargin3: {
    marginTop: "10px",
    "@media (max-width: 320px)": {
      marginTop: "10px"
    },
    "@media (max-width: 425px)": {
      marginTop: "10px"
    }
  },
  col2: {
    width: "50%",
    float: "left"
  },
  // for tabs
  indicator: {
    backgroundColor: "#fff"
  },
  tab: {
    color: "#fff",
    "@media (max-width: 425px)": {
      fontSize: 12
    }
  },
  table: {
    padding: "0px !important",
    position: "relative",
    "@media (max-width: 425px)": {
      overflow: "hidden"
    }
  },
  tableRow: {
    backgroundColor: "#fbfbfb"
  },
  resSession: {
    minHeight: "470px",
    padding: "0px !important"
  },
  resDropdown: {
    marginTop: -15
  },
  resRemove: {
    fontSize: 20
  },
  resPlayer: {
    height: "47px",
    "@media (max-width: 425px)": {
      height: "37px",
      width: "173px",
      marginLeft: "-33px"
    },
    "@media (max-width: 340px": {
      width: "141px !important"
    }
  },
  fontRes: {
    "@media (max-width: 425px)": {
      fontSize: 14
    }
  },
  linearLoader: {
    width: 225,
    margin: "0 auto"
  }
});

// MuiThemeProvider;
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#bfd87e"
    }
  }
});

const StyledSwitch = withStyles({
  switchBase: {
    color: "#a6c556",
    "&$checked": {
      color: "#a6c556"
    },
    "&$checked + $track": {
      backgroundColor: "#a6c556"
    }
  },
  checked: {},
  track: {}
})(Switch);

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1)
      // color: "red"
    },
    "&label": {
      color: "red"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    height: "25px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 10px 5px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#c9e388",
      boxShadow: "0 0 0 0.5px #d8eba9"
    }
  }
}))(InputBase);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 240,
      marginTop: "60px"
    }
  }
};

class MainAddNewAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      recordAudio: false,
      anchorEl: null,
      // loading: false,
      openToast: false,
      vertical: "top",
      horizontal: "right",
      toastType: "",
      fileName: "",
      file: null,
      unrecordedPhrase: "",
      unrecordedName: "",
      modification: false,
      fadein: true,
      fadeout: true,
      convert: true,
      checked: false,
      audioFile: null,
      hasMic: null,
      audioToBeUploaded: this.props.audioToBeUploaded,
      value: 0,
      unrec_uuid: "",
      selectedIndex: null,
      backDisabled: false,
      recordedAudio: [],
      session: [],
      uploadedStatus: [],
      uploadSession: false,
      uploadingDone: false,
      slug: "",
      phrasebook: "",
      open: this.props.openAddNew
    };
    this.handleCloseAudio = this.handleCloseAudio.bind(this);
    this.setNewAudioDetails = this.setNewAudioDetails.bind(this);
  }

  handleCheckbox = type => {
    if (type === "modification") {
      this.setState(prevState => ({
        modification: !prevState.modification
      }));
    } else if (type === "fadeout") {
      this.setState(prevState => ({
        fadeout: !prevState.fadeout
      }));
    } else if (type === "fadein") {
      this.setState(prevState => ({
        fadein: !prevState.fadein
      }));
    } else {
      this.setState(prevState => ({
        convert: !prevState.convert
      }));
    }
  };

  recordAudioDialog = () => {
    this.setState({
      recordAudio: true,
      anchorEl: null
    });
  };

  recordAudioClose = () => {
    this.setState({
      recordAudio: false
    });
  };

  handleCloseAudio() {
    this.setState({
      openLoading: false
    });
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false
    });
  };

  getPhrase = val => {
    this.setState({
      unrecordedPhrase: val
    });
  };

  getAudioName = val => {
    this.setState({
      unrecordedName: val
    });
  };

  switchAudio() {
    this.setState(prevState => ({
      checked: !prevState.checked
      // audioToBeUploaded: ""
    }));
  }

  toggleMenu = () => {
    const { active } = this.state;
    this.setState({
      active: !active
    });
    if (active === true) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  };

  startRecording = () => {
    this.setState({
      record: true,
      recorded: false
    });
  };

  stopRecording = () => {
    this.setState({
      record: false,
      recorded: true
    });
  };

  onStop = recordedBlob => {
    this.setState({ audio: recordedBlob });
  };

  handleAudioFile = file => {
    this.setState({ audioFile: file });
  };

  detectMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        // Code for success
        this.setState({ hasMic: true });
      })
      .catch(err => {
        this.setState({ hasMic: false });
      });
  };

  toggleSessionUpload = newValue => {
    this.setState({
      value: newValue
    });
  };

  nextIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex + 1 });
  };

  prevIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex - 1 });
  };
  setNewAudioDetails = (
    unrec_uuid,
    unrecordedName,
    unrecordedPhrase,
    slug,
    phrasebook,
    selectedIndex
  ) => {
    this.setState({
      unrec_uuid,
      unrecordedName,
      unrecordedPhrase,
      slug,
      phrasebook
    });
    if (selectedIndex !== undefined) {
      this.setState({ selectedIndex });
    }

    this.props.handleUnrecordedSelected(unrec_uuid);
  };

  handleBackButton = index => {
    if (index === 0) {
      this.setState({ backDisabled: true });
    } else {
      this.setState({ backDisabled: false });
    }
  };
  handleRecordedAudio = recordedAudio => {
    this.setState({ recordedAudio });
  };

  handleSessionAdd = (
    blob,
    name,
    key,
    url,
    slug,
    phrasebook,
    recordingText,
    recordingName,
    recordingKey
  ) => {
    let temp = {
      audioKey: this.audioKey,
      file: this.file,
      audioUrl: this.audioUrl,
      audioName: this.audioName,
      slug: this.slug,
      phrasebook: this.phrasebook
    };
    let tempArray = [];
    var form = new FormData();
    var file = new File([blob], `${name}`, {
      type: "audio/wav"
    });

    form.append("file", file);
    temp.audioKey = key;
    temp.file = form;
    temp.audioName = name;
    temp.audioUrl = url;
    temp.slug = slug;
    temp.phrasebook = phrasebook;
    let push;
    setTimeout(() => {
      if (this.state.session.length !== 0) {
        this.state.session.find(() => {
          this.state.session.map(data => {
            if (data.audioKey === temp.audioKey) {
              push = true;
            }
            return null;
          });
          return null;
        });
        if (!push) {
          tempArray.push(temp);
          this.props.showToast("success", "Added to session");
        } else {
          this.props.showToast(
            "caution",
            "Error adding to session. Recording currently in session"
          );
        }
        this.setState(prevState => ({
          session: [...prevState.session, ...tempArray],
          recordedAudio: []
        }));
      } else {
        this.props.showToast("success", "Added to session");
        tempArray.push(temp);
        this.setState({
          session: [temp],
          recordedAudio: []
        });
      }
    }, 200);
    if (
      recordingKey !== undefined &&
      recordingName !== undefined &&
      recordingText !== undefined
    ) {
      this.nextIndex();
      this.setNewAudioDetails(
        recordingKey,
        recordingName,
        recordingText,
        slug,
        phrasebook
      );
      this.props.handleUnrecordedSelected(recordingKey);
    }
  };

  sessionUpload = (
    voice,
    version,
    modification,
    fadein,
    fadeout,
    convert,
    arr,
    audioType
  ) => {
    let uploadStatArr = [];
    if (audioType === "pitch") {
      arr.map((data, index) => {
        post(
          `/pitch/audio/version/${version}/voice/${voice}/${data.audioKey}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
          data.file
        )
          .then(res => {
            // checks if status response was 201.
            if (res.data.key === data.key) {
              if (res.status === "201" || res.status === "200") {
                let uploadStat = {
                  data,
                  status: res.status,
                  key: data.audioKey,
                  index
                };
                uploadStatArr.push(uploadStat);
              } else {
                let uploadStat = {
                  data,
                  status: res.status,
                  key: data.audioKey,
                  index
                };
                uploadStatArr.push(uploadStat);
              }
            }
          })
          // if there is no response we will show a failed upload message
          .catch(err => {
            let text = "Upload Failed";

            if (err.response !== undefined) {
              text = err.response.data[0];
            }
            let uploadStat = {
              data,
              status: text,
              key: data.audioKey,
              index
            };
            uploadStatArr.push(uploadStat);
          });

        if (uploadStatArr.length !== arr.length) {
        }
        return null;
      });
      this.setState({
        uploadedStatus: uploadStatArr
      });
      this.setState({ uploadSession: false, uploadingDone: true });
    }
    //phrase
    else if (audioType === "phrase") {
      arr.map((data, index) => {
        if (this.props.campaignSelected === "global") {
          post(
            `/pitch/global/audio/phrase-book/${data.phrasebook}/voice/${voice}/phrase/${data.audioKey}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
            data.file
          )
            .then(res => {
              // checks if status response was 201.
              if (res.data.key === data.key) {
                if (res.status === "201" || res.status === "200") {
                  let uploadStat = {
                    data,
                    status: res.status,
                    key: data.audioKey,
                    index
                  };
                  uploadStatArr.push(uploadStat, () => {
                    this.props.onClose();
                  });
                } else {
                  let uploadStat = {
                    data,
                    status: res.status,
                    key: data.audioKey,
                    index
                  };
                  uploadStatArr.push(uploadStat);
                }
              }
            })
            // if there is no response we will show a failed upload message
            .catch(err => {
              let text = "Upload Failed";
              if (err.response !== undefined) {
                text = err.response.data[0];
              }
              let uploadStat = {
                data,
                status: text,
                key: data.audioKey,
                index
              };
              uploadStatArr.push(uploadStat);
            });

          if (uploadStatArr.length !== arr.length) {
          }
          this.setState({
            uploadedStatus: uploadStatArr
          });
          this.setState({ uploadSession: false, uploadingDone: true });
        } else {
          post(
            `/pitch/company/${data.slug}/audio/phrase-book/${data.phrasebook}/voice/${voice}/phrase/${data.audioKey}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
            data.file
          )
            .then(res => {
              // checks if status response was 201.
              if (res.data.key === data.key) {
                if (res.status === "201" || res.status === "200") {
                  let uploadStat = {
                    data,
                    status: res.status,
                    key: data.audioKey,
                    index
                  };
                  uploadStatArr.push(uploadStat);
                } else {
                  let uploadStat = {
                    data,
                    status: res.status,
                    key: data.audioKey,
                    index
                  };
                  uploadStatArr.push(uploadStat);
                }
              }
            })
            // if there is no response we will show a failed upload message
            .catch(err => {
              let text = "Upload Failed";
              if (err.response !== undefined) {
                text = err.response.data[0];
              }
              let uploadStat = {
                data,
                status: text,
                key: data.audioKey,
                index
              };
              uploadStatArr.push(uploadStat);
            });

          if (uploadStatArr.length !== arr.length) {
          }
        }
        return null;
      });
      this.setState({
        uploadedStatus: uploadStatArr
      });
      this.setState({ uploadSession: false, uploadingDone: true });
    }
    //prospect
    else {
      arr.map((data, index) => {
        post(
          `/pitch/audio/version/${version}/prospect/${voice}/${data.audioKey}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
          data.file
        )
          .then(res => {
            // checks if status response was 201.
            if (res.data.key === data.key) {
              if (res.status === "201" || res.status === "200") {
                let uploadStat = {
                  data,
                  status: res.status,
                  key: data.audioKey,
                  index
                };
                uploadStatArr.push(uploadStat);
              } else {
                let uploadStat = {
                  data,
                  status: res.status,
                  key: data.audioKey,
                  index
                };
                uploadStatArr.push(uploadStat);
              }
            }
          })
          // if there is no response we will show a failed upload message
          .catch(err => {
            let text = "Upload Failed";

            if (err.response !== undefined) {
              text = err.response.data[0];
            }
            let uploadStat = {
              data,
              status: text,
              key: data.audioKey,
              index
            };
            uploadStatArr.push(uploadStat);
          });

        if (uploadStatArr.length !== arr.length) {
        }
        return null;
      });
      this.setState({
        uploadedStatus: uploadStatArr
      });
      this.setState({ uploadSession: false, uploadingDone: true });
    }
  };

  handleRemoveSession = audioKey => {
    let newSession = this.state.session.splice(
      this.state.session.indexOf(audioKey),
      1
    );
    this.setState({ session: newSession });
  };

  render() {
    const {
      classes,
      onClose,
      loading,
      voices,
      campaigns,
      versions,
      audio
    } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="md"
          open={this.props.open}
          fullScreen={window.innerWidth < "425" ? true : false}
        >
          {loading ? (
            <Loader />
          ) : (
              <React.Fragment>
                <DialogTitle className={classes.dialogTitle}>
                  <div className={classes.flex} style={{ color: "#fff" }}>
                    <Tabs
                      value={this.state.value}
                      variant="fullWidth"
                      aria-label="full width tabs example"
                      classes={{
                        indicator: classes.indicator
                      }}
                      fullWidth={true}
                    >
                      <Tab
                        label="Add New Audio"
                        {...a11yProps(0)}
                        onClick={() => {
                          this.toggleSessionUpload(0);
                        }}
                        className={classes.tab}
                      />
                      <Tab
                        label="Session Upload"
                        {...a11yProps(1)}
                        onClick={() => {
                          this.toggleSessionUpload(1);
                        }}
                        className={classes.tab}
                      />
                    </Tabs>
                    <IconButton
                      id="close-add-new"
                      className={classes.clearBtn}
                      onClick={onClose}
                    >
                      <Clear />
                    </IconButton>
                  </div>
                </DialogTitle>

                <DialogContent
                  style={{
                    padding: 0,
                    borderBottom: "1px solid #e0e0e0"
                  }}
                >
                  <TabPanel
                    value={this.state.value}
                    index={0}
                    style={{ padding: 30 }}
                  >
                    {/* Add New Audio */}
                    <Grid container spacing={2}>
                      {this.props.user_group === 10 ? (
                        <React.Fragment>
                          {/* VOICE USER */}
                          <Grid item xs={12} sm={4} style={{ marginTop: "20px" }}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel
                                className={classes.label}
                                htmlFor="age-customized-select"
                              >
                                {this.props.label1}
                              </InputLabel>
                              <Select
                                required
                                value={this.props.campaignSelected}
                                onChange={e => {
                                  this.props.selectCampaign(
                                    e.target.value,
                                    e.currentTarget.getAttribute("uuid"),
                                    e.currentTarget.getAttribute("slug")
                                  );
                                }}
                                input={
                                  <BootstrapInput
                                    // name="Select a voice"
                                    id="age-customized-select"
                                  />
                                }
                                MenuProps={MenuProps}
                              >
                                {campaigns.map(res => (
                                  <MenuItem
                                    key={res.uuid}
                                    uuid={res.company}
                                    value={res.slug}
                                  >
                                    {res.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.selectMargin}
                          >
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel
                                className={classes.label}
                                htmlFor="age-customized-select"
                              >
                                {this.props.label2}
                              </InputLabel>
                              <Select
                                required
                                disabled={
                                  this.props.campaignSelected !== "" &&
                                    versions.length !== 0
                                    ? false
                                    : true
                                }
                                value={this.props.versionSelected}
                                onChange={e => {
                                  this.props.selectVersion(e.target.value);
                                }}
                                input={
                                  <BootstrapInput
                                    // name="Select a voice"
                                    id="age-customized-select"
                                  />
                                }
                                MenuProps={MenuProps}
                              >
                                {versions.map(res => (
                                  <MenuItem key={res.uuid} value={res.uuid}>
                                    {res.name || res.version}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.selectMargin}
                          >
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel
                                className={classes.label}
                                htmlFor="age-customized-select"
                              >
                                Select Recordings
                            </InputLabel>
                              <Select
                                required
                                disabled={
                                  this.props.versionSelected !== "" &&
                                    audio.length !== 0
                                    ? false
                                    : true
                                }
                                value={this.props.unrecordedSelected}
                                onChange={e => {
                                  this.setNewAudioDetails(
                                    e.target.value,
                                    e.currentTarget.getAttribute("name"),
                                    e.currentTarget.getAttribute("phrase"),
                                    e.currentTarget.getAttribute("slug"),
                                    e.currentTarget.getAttribute("phrasebook"),
                                    parseInt(
                                      e.currentTarget.getAttribute(
                                        "selectedIndex"
                                      )
                                    )
                                  );
                                  this.handleBackButton(
                                    parseInt(
                                      e.currentTarget.getAttribute(
                                        "selectedIndex"
                                      )
                                    )
                                  );
                                  this.props.selectUnrecorded(e.target.value);
                                }}
                                input={
                                  <BootstrapInput
                                    // name="Select a voice"
                                    id="age-customized-select"
                                  />
                                }
                                MenuProps={MenuProps}
                              >
                                {audio.map((res, index) => (
                                  <MenuItem
                                    key={res.uuid || res.key}
                                    value={res.uuid || res.key}
                                    name={res.name}
                                    phrase={res.phrase || res.text}
                                    slug={res.slug || ""}
                                    phrasebook={res.phrase_book || ""}
                                    selectedIndex={index}
                                  >
                                    {res.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </React.Fragment>
                      ) : (
                          <React.Fragment>
                            {/* NON-VOICE USER */}
                            <Grid container spacing={2}>
                              <Grid item sm={1}></Grid>
                              <Grid
                                item
                                xs={12}
                                sm={5}
                                style={{ marginTop: "20px" }}
                              >
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel
                                    className={classes.label}
                                    htmlFor="age-customized-select"
                                  >
                                    Select a voice
                              </InputLabel>
                                  <Select
                                    required
                                    value={this.props.voiceSelected}
                                    onChange={e => {
                                      this.props.selectVoice(e.target.value);
                                    }}
                                    input={
                                      <BootstrapInput
                                        // name="Select a voice"
                                        id="age-customized-select"
                                      />
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {voices.map(res => (
                                      <MenuItem
                                        key={res.uuid}
                                        value={res.uuid}
                                        uuid={res.uuid}
                                      >
                                        {res.first_name} {res.last_name} |{" "}
                                        {res.username}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={5}
                                className={classes.selectMargin}
                              >
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel
                                    className={classes.label}
                                    htmlFor="age-customized-select"
                                  >
                                    {this.props.label1}
                                  </InputLabel>
                                  <Select
                                    required
                                    disabled={
                                      this.props.voiceSelected !== "" &&
                                        campaigns.length !== 0
                                        ? false
                                        : true
                                    }
                                    value={this.props.campaignSelected}
                                    onChange={e => {
                                      this.props.selectCampaign(
                                        e.target.value,
                                        e.currentTarget.getAttribute("uuid"),
                                        e.currentTarget.getAttribute("slug")
                                      );
                                    }}
                                    input={
                                      <BootstrapInput
                                        // name="Select a voice"
                                        id="age-customized-select"
                                      />
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {campaigns.map(res => (
                                      <MenuItem
                                        key={res.uuid}
                                        uuid={res.company}
                                        // slug={res.slug}
                                        value={res.slug}
                                      >
                                        {res.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item sm={1}></Grid>
                              <Grid item sm={1}></Grid>
                              <Grid
                                item
                                xs={12}
                                sm={5}
                                className={classes.selectMargin2}
                              >
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel
                                    className={classes.label}
                                    htmlFor="age-customized-select"
                                  >
                                    {this.props.label2}
                                  </InputLabel>
                                  <Select
                                    required
                                    disabled={
                                      this.props.campaignSelected !== "" &&
                                        versions.length !== 0
                                        ? false
                                        : true
                                    }
                                    value={this.props.versionSelected}
                                    onChange={e => {
                                      this.props.selectVersion(e.target.value);
                                    }}
                                    input={
                                      <BootstrapInput
                                        // name="Select a voice"
                                        id="age-customized-select"
                                      />
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {versions.map(res => (
                                      <MenuItem key={res.uuid} value={res.uuid}>
                                        {res.name || res.version}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={5}
                                className={classes.selectMargin3}
                              >
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel
                                    className={classes.label}
                                    htmlFor="age-customized-select"
                                  >
                                    Select Recordings
                              </InputLabel>
                                  <Select
                                    required
                                    disabled={
                                      this.props.versionSelected !== "" &&
                                        audio.length !== 0
                                        ? false
                                        : true
                                    }
                                    value={this.props.unrecordedSelected}
                                    onChange={e => {
                                      this.setNewAudioDetails(
                                        e.target.value,
                                        e.currentTarget.getAttribute("name"),
                                        e.currentTarget.getAttribute("phrase"),
                                        e.currentTarget.getAttribute("slug"),
                                        e.currentTarget.getAttribute("phrasebook"),
                                        parseInt(
                                          e.currentTarget.getAttribute(
                                            "selectedIndex"
                                          )
                                        )
                                      );
                                      this.handleBackButton(
                                        parseInt(
                                          e.currentTarget.getAttribute(
                                            "selectedIndex"
                                          )
                                        )
                                      );
                                      this.props.selectUnrecorded(e.target.value);
                                    }}
                                    input={
                                      <BootstrapInput
                                        // name="Select a voice"
                                        id="age-customized-select"
                                      />
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {audio.map((res, index) => (
                                      <MenuItem
                                        key={res.uuid || res.key}
                                        value={res.uuid || res.key}
                                        name={res.name}
                                        phrase={res.phrase || res.text}
                                        slug={res.slug || ""}
                                        phrasebook={res.phrase_book || ""}
                                        selectedIndex={index}
                                      >
                                        {res.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item sm={1}></Grid>
                            </Grid>
                          </React.Fragment>
                        )}

                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} style={{ marginTop: "15px" }}>
                          {this.props.unrecordedSelected !== "" ? (
                            <FormControlLabel
                              control={
                                <StyledSwitch
                                  checked={this.state.checked}
                                  onChange={() => {
                                    this.switchAudio();
                                    this.detectMic();
                                  }}
                                />
                              }
                              label={
                                this.state.checked
                                  ? "Record Audio"
                                  : "Upload Audio"
                              }
                            />
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>

                    {this.state.checked ? (
                      <Collapse in={this.state.checked}>
                        {/* Record Audio */}

                        {/* to know if a "VOICE USER" or not */}
                        {this.props.user_group === 10 ? (
                          (this.props.campaignSelected &&
                            this.props.versionSelected &&
                            this.props.unrecordedSelected) !== "" ? (
                              <RecordAudio
                                audioUpload={this.handleAudioFile}
                                recordAudio={this.state.recordAudio}
                                recordAudioDialog={this.recordAudioDialog}
                                recordAudioClose={this.recordAudioClose}
                                audioName={this.state.unrecordedName}
                                dialog={this.state.unrecordedPhrase}
                                hasMic={this.state.hasMic}
                                audio={audio}
                                nextIndex={this.nextIndex}
                                prevIndex={this.prevIndex}
                                setNewAudioDetails={this.setNewAudioDetails}
                                handleBackButton={this.handleBackButton}
                                index={parseInt(this.state.selectedIndex)}
                                handleRecordedAudio={this.handleRecordedAudio}
                                backButtonState={this.state.backDisabled}
                                recordedAudio={this.state.recordedAudio}
                                typeOfAudio={this.props.typeOfAudio}
                              />
                            ) : (
                              //end of second if
                              <React.Fragment>
                                <center className={classes.recordOff}>
                                  <Button
                                    active={this.state.active}
                                    className={`${classes.recordBtn} ${classes.recordBtnDisabled}`}
                                  >
                                    <MicOffIcon
                                      className={`${classes.micStyle} ${classes.micOff} `}
                                    />
                                  </Button>
                                  <Typography variant="subtitle1" gutterBottom>
                                    Select recordings(s) first
                              </Typography>
                                </center>
                              </React.Fragment>
                            )
                        ) : //end of first if
                          (this.props.voiceSelected &&
                            this.props.campaignSelected &&
                            this.props.versionSelected &&
                            this.props.unrecordedSelected) !== "" ? (
                              <RecordAudio
                                audioUpload={this.handleAudioFile}
                                recordAudio={this.state.recordAudio}
                                recordAudioDialog={this.recordAudioDialog}
                                recordAudioClose={this.recordAudioClose}
                                audioName={this.state.unrecordedName}
                                dialog={this.state.unrecordedPhrase}
                                hasMic={this.state.hasMic}
                                audio={audio}
                                nextIndex={this.nextIndex}
                                prevIndex={this.prevIndex}
                                setNewAudioDetails={this.setNewAudioDetails}
                                handleBackButton={this.handleBackButton}
                                index={parseInt(this.state.selectedIndex)}
                                handleRecordedAudio={this.handleRecordedAudio}
                                backButtonState={this.state.backDisabled}
                                recordedAudio={this.state.recordedAudio}
                                typeOfAudio={this.props.typeOfAudio}
                              />
                            ) : (
                              <React.Fragment>
                                <center>
                                  <Button
                                    active={this.state.active}
                                    className={`${classes.recordBtn} ${classes.recordBtnDisabled}`}
                                  >
                                    <MicOffIcon
                                      className={`${classes.micStyle} ${classes.micOff} `}
                                    />
                                  </Button>
                                  <Typography variant="subtitle1" gutterBottom>
                                    Select recording(s) first
                            </Typography>
                                </center>
                              </React.Fragment>
                            )}
                      </Collapse>
                    ) : (
                        <React.Fragment>
                          {/* Upload audio files here */}
                          <Typography className={classes.phraseContent}>
                            {this.state.unrecordedPhrase}
                          </Typography>
                          <input
                            accept="audio/*"
                            style={{ display: "none" }}
                            id="raised-button-file"
                            type="file"
                            name="file"
                            onChange={e => this.props.changeAudioToBeUploaded(e)}
                            disabled={
                              this.props.unrecordedSelected !== "" ? false : true
                            }
                          />
                          <label htmlFor="raised-button-file">
                            <Button
                              component="span"
                              className={classes.uploadFileBtn}
                              disabled={
                                this.props.unrecordedSelected !== "" ? false : true
                              }
                            >
                              {this.props.mainFileName
                                ? this.props.mainFileName
                                : "No file chosen"}
                              <div className={classes.flex}>
                                <CloudUploadIcon className={classes.uploadIcon} />
                                Choose File
                          </div>
                            </Button>
                          </label>
                          <Divider />
                          <br />
                        </React.Fragment>
                      )}

                    <Grid container spacing={2}>
                      <MuiThemeProvider theme={theme}>
                        <Grid item container justify="center">
                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              className={classes.checkbox}
                              label="No Modification"
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={this.state.modification}
                                />
                              }
                              checked={this.state.modification}
                              onChange={() => this.handleCheckbox("modification")}
                            />
                            <FormHelperText className={classes.checkText}>
                              Disable any modifications to the audio file upon
                              upload
                          </FormHelperText>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              className={classes.checkbox}
                              label="Convert"
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={this.state.convert}
                                />
                              }
                              onChange={() => this.handleCheckbox("convert")}
                            />
                            <FormHelperText className={classes.checkText}>
                              Enable converting the audio file to a different
                              format
                          </FormHelperText>
                          </Grid>
                        </Grid>

                        <Grid item container xs justify="center">
                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              className={classes.checkbox}
                              label="Fade In"
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={this.state.fadein}
                                />
                              }
                              onChange={() => this.handleCheckbox("fadein")}
                            />
                            <FormHelperText className={classes.checkText}>
                              Enable fading in the recordings audio
                          </FormHelperText>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <FormControlLabel
                              className={classes.checkbox}
                              label="Fade Out"
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={this.state.fadeout}
                                />
                              }
                              onChange={() => this.handleCheckbox("fadeout")}
                            />
                            <FormHelperText className={classes.checkText}>
                              Enable fading out the recordings audio
                          </FormHelperText>
                          </Grid>
                        </Grid>
                      </MuiThemeProvider>
                    </Grid>
                    <br />
                  </TabPanel>
                  <TabPanel
                    value={this.state.value}
                    index={1}
                    className={classes.resSession}
                  >
                    {/* Session Upload */}
                    <div className={classes.scrollBar}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow className={classes.tableRow}>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Audio</TableCell>
                            {!this.state.uploadSession ? (
                              <TableCell align="center">Remove</TableCell>
                            ) : (
                                <TableCell align="center">
                                  Uploading Status
                            </TableCell>
                              )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.session.length !== 0 ? (
                            this.state.session.map((data, index) => {
                              return (
                                <TableRow key={"1"}>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    {data.audioName}
                                  </TableCell>
                                  <TableCell align="center">
                                    <audio
                                      controls
                                      preload="false"
                                      className={classes.resPlayer}
                                    >
                                      <source src={data.audioUrl} />
                                    </audio>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Tooltip title="Remove" placement="right">
                                      <IconButton
                                        onClick={() => {
                                          let arr = this.state.session;
                                          arr.splice(index, 1);
                                          this.setState({ session: arr });
                                        }}
                                      >
                                        <Remove className={classes.resRemove} />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                              <NothingToUpload />
                            )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabPanel>
                  {/* </SwipeableViews> */}
                </DialogContent>
                <Toast
                  open={this.state.openToast}
                  handleClose={this.handleCloseToast}
                  toastType={this.state.toastType}
                  message={this.state.message}
                  vertical={this.state.vertical}
                  horizontal={this.state.horizontal}
                />
                <DialogActions className={classes.btnCont}>
                  {(() => {
                    if (this.state.value === 0) {
                      if (!this.state.checked) {
                        return (
                          <Button
                            id="main-save-audio-btn"
                            variant="contained"
                            className={classes.saveBtn}
                            // onClick={this.submitFile}
                            onClick={() => {
                              this.props.mainUploadAudio(
                                this.props.voiceSelected,
                                this.props.versionSelected,
                                this.props.campaignSelected,
                                this.props.unrecordedSelected,
                                this.props.mainFile,
                                this.state.modification,
                                this.state.fadein,
                                this.state.fadeout,
                                this.state.convert
                              );
                            }}
                          >
                            Save Audio File
                        </Button>
                        );
                      } else {
                        return (
                          <Button
                            variant="contained"
                            className={classes.saveBtn}
                            disabled={this.state.recordedAudio.length === 0}
                            onClick={() => {
                              if (
                                audio[this.state.selectedIndex + 1] !== undefined
                              ) {
                                this.handleSessionAdd(
                                  this.state.recordedAudio.blob,
                                  this.state.unrecordedName,
                                  this.state.unrec_uuid,
                                  this.state.recordedAudio.blobURL,
                                  this.props.campaignSelected,
                                  this.props.versionSelected,
                                  audio[this.state.selectedIndex + 1].text ||
                                  audio[this.state.selectedIndex + 1].phrase,
                                  audio[this.state.selectedIndex + 1].name,
                                  audio[this.state.selectedIndex + 1].key ||
                                  audio[this.state.selectedIndex + 1].uuid
                                );
                              } else {
                                this.handleSessionAdd(
                                  this.state.recordedAudio.blob,
                                  this.state.unrecordedName,
                                  this.state.unrec_uuid,
                                  this.state.recordedAudio.blobURL,
                                  this.props.campaignSelected,
                                  this.props.versionSelected
                                );
                              }
                            }}
                          >
                            Add to session
                        </Button>
                        );
                      }
                    } else {
                      return (
                        <Button
                          variant="contained"
                          className={classes.saveBtn}
                          disabled={this.state.session.length === 0}
                          onClick={() => {
                            var Url = window.location.href.split("/");
                            var audioUrl = Url[Url.length - 1];
                            if (audioUrl === "phrase") {
                              this.sessionUpload(
                                this.props.selectedVoice ||
                                this.props.voiceSelected,
                                this.props.versionSelected,
                                this.state.modification,
                                this.state.fadein,
                                this.state.fadeout,
                                this.state.convert,
                                this.state.session,
                                // onClose,
                                "phrase"
                              );
                              this.setState({ uploadSession: true });
                            } else if (audioUrl === "prospect") {
                              this.sessionUpload(
                                this.props.selectedVoice ||
                                this.props.voiceSelected,
                                this.props.versionSelected,
                                this.state.modification,
                                this.state.fadein,
                                this.state.fadeout,
                                this.state.convert,
                                this.state.session,
                                //  onClose,
                                "prospect"
                              );
                              this.setState({ uploadSession: true });
                            } else {
                              this.sessionUpload(
                                this.props.selectedVoice ||
                                this.props.voiceSelected,
                                this.props.versionSelected,
                                this.state.modification,
                                this.state.fadein,
                                this.state.fadeout,
                                this.state.convert,
                                this.state.session,
                                // onClose,
                                "pitch"
                              );
                              this.setState({ uploadSession: true });
                            }
                            // onClose()
                          }}
                        >
                          Upload Session
                      </Button>
                      );
                    }
                  })()}
                </DialogActions>
              </React.Fragment>
            )}
        </Dialog>
        <UploadStatus
          open={this.state.uploadingDone}
          handleClose={() => {
            this.setState({ uploadingDone: false });
          }}
          uploads={this.state.uploadedStatus}
          setArrToMatch={newArr => {
            this.setState({ session: newArr });
          }}
          arrToMatch={this.state.session}
          closeMainAdd={onClose}
          setValue={() => {
            this.setState({ value: 0, session: [], uploadedStatus: [] });
          }}
          retryUpload={this.sessionUpload}
          voice={this.props.selectedVoice || this.props.voiceSelected}
          modification={this.state.modification}
          fadeIn={this.state.fadein}
          fadeOut={this.state.fadeout}
          convert={this.state.convert}
          version={this.props.versionSelected}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(uiStyles)(MainAddNewAudio);