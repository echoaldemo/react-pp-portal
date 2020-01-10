import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Input,
  Divider,
  Dialog,
  Checkbox
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CustomText } from "./CustomText";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";
//import { uploadAudioFile } from '../../../../../actions/AudioResource'

import {
  LoadingModal as Loading,
  SuccessModal as Success,
  CustomButton,
  Modal
} from "common-components";

// #region theme
const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
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
    },
    MuiSwitch: {
      track: {
        backgroundColor: "#f1f1f1 !important"
      }
    }
  }
});

// #endregion

//#region styles
const styles = theme => ({
  text: {
    width: "43px",
    height: "16px",
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal"
  },
  textWhite: {
    color: "#ffffff"
  },
  textDark: {
    color: "#444851"
  },
  textFade: {
    color: "#777777"
  },
  active: {
    borderBottom: "none !important",
    padding: "0 !important"
  },
  hidden: {
    display: "none !important"
  }
});

const useStyles = makeStyles(styles);

// #endregion

const Upload = props => {
  // #region useStates
  const [mod, setMod] = useState(false);
  const [convert, setConvert] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [audio, setAudio] = useState(null);
  const [filename, setFilename] = useState("Not file chosen");
  const [loading_state, setLoadingState] = useState(false);
  const [error, setError] = useState(null);
  const [success_state, setSuccessState] = useState(false);
  // #endregion

  //#region resetValuesofState
  function resetValues() {
    setMod(false);
    setConvert(true);
    setFadeIn(true);
    setFadeOut(false);
    setAudio(null);
    setFilename("Not file chosen");
    setLoadingState(false);
    setError(null);
    setSuccessState(false);
  }
  //#endregion

  //#region modifications array
  const modifications = [
    {
      title: "No modifications",
      description: "Disable modifications to the audio file upon uploading.",
      value: mod,
      set: setMod
    },
    {
      title: "Convert",
      description: "Enable converting the audio file to a different format.",
      value: convert,
      set: setConvert
    },
    {
      title: "Fade in",
      description: "Enable fading in the audio when played.",
      value: fadeIn,
      set: setFadeIn
    },
    {
      title: "Fade out",
      description: "Enable fading out the audio when played.",
      value: fadeOut,
      set: setFadeOut
    }
  ];
  //#endregion
  // #region initialization
  const classes = useStyles();
  // #endregion
  //#region upload function

  function upload(e) {
    try {
      setFilename(e.target.files[0].name);
      setAudio(e.target.files[0]);
    } catch (e) {
      console.log(e);
    }
  }
  //#endregion
  //#region upload to server
  async function upload2Server() {
    setLoadingState(true);
    if (audio) {
      let { slug, uuid } = props.payload;

      let queryObject = Object.create({
        slug,
        uuid,
        no_modifications: mod,
        convert,
        fade_in: fadeIn,
        fade_out: fadeOut,
        file_ext: filename.split(".")[filename.split(".").length - 1],
        file: audio
      });

      /* let response = await uploadAudioFile(queryObject)
      setLoadingState(false)
      if (response.status < 300) {
        setError(null)
        setSuccessState(true)
      } else {
        setError('Cannot upload file too big!')
      } */
    }
  }
  //#endregion
  //#region Checkbox
  function checkboxComponent() {
    return (
      <div
        style={{
          display: "flex",
          marginTop: "36px",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {modifications.map(mods => {
          return (
            <>
              <div
                style={{
                  width: "174px",
                  marginBottom: "27px"
                }}
              >
                <span
                  style={{
                    marginBottom: "7px",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  <Checkbox
                    checked={mods.value}
                    onClick={() => mods.set(!mods.value)}
                    color="primary"
                    style={{
                      padding: 0,
                      marginRight: "11px"
                    }}
                  />
                  <CustomText size="16px" color="tableDataColor">
                    {mods.title}
                  </CustomText>
                </span>
                <CustomText size="13px" color="tableDataColor">
                  {mods.description}
                </CustomText>
              </div>
            </>
          );
        })}
        <CustomButton
          onClick={() => upload2Server()}
          style={{
            margin: "18px auto 17px auto",
            backgroundColor: "var(--saveColor)"
          }}
        >
          <CustomText size="14px" color="light">
            SAVE AUDIO FILE
          </CustomText>
        </CustomButton>
      </div>
    );
  }
  //#endregion
  //#region renderUploadComponent
  function renderUploadComponent() {
    return (
      <div>
        <Input
          id="files"
          inputProps={{
            accept: "audio/*"
          }}
          onChange={upload}
          type="file"
          className={classes.hidden}
        />
        <label
          for="files"
          style={{
            margin: "24px 0 7px 0",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <CustomText size="16px" color="tableDataColor">
            {filename}
          </CustomText>

          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Icon
              path={mdiUpload}
              title="Copy"
              size={1}
              rotate={360}
              color="#1194f6"
            />
            <div style={{ width: "3px" }} />
            <CustomText size="16px" color="activeInput">
              Choose file
            </CustomText>
          </div>
        </label>
        <Divider />
      </div>
    );
  }
  //#endregion
  // #region closeUpload
  function closeUpload() {
    resetValues();
    props.onClose();
  }
  // #endregion
  // #region cancel upload
  function cancelUpload() {
    resetValues();
    props.cancelUpload();
  }
  //#endregion
  // #region loadingComponent
  function loading() {
    return (
      <Dialog open={true}>
        <Loading
          text={"One moment. We're uploading the audio"}
          cancelFn={cancelUpload}
        />
      </Dialog>
    );
  }
  // #endregion

  //#region reupload
  function reUpload() {
    resetValues();
  }
  // #endregion

  // #region successComponent
  function success() {
    return (
      <Dialog open={true}>
        <Success text={`You have uploaded the audio!`} closeFn={closeUpload} />
      </Dialog>
    );
  }
  //#endregion
  return (
    <MuiThemeProvider theme={theme}>
      {loading_state && !success_state && loading()}
      {success_state && !loading_state && success()}
      <Modal
        open={props.open && !loading_state && !success_state}
        title={props.title}
        onClose={closeUpload}
      >
        <Grid container direction="column" alignItems="center" justify="start">
          <Grid
            item
            style={{
              width: "360px"
            }}
          >
            <CustomText size="14px" color="error">
              {error ? error : " "}
            </CustomText>
            {renderUploadComponent()}
            {checkboxComponent()}
          </Grid>
        </Grid>
      </Modal>
    </MuiThemeProvider>
  );
};

export default Upload;
