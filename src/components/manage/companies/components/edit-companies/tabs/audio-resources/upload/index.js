/* eslint-disable */
import React, { useState } from "react";
import { Grid, Input, Divider, Checkbox, Typography } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
//import { Alert } from "@material-ui/lab";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";
import { Alert } from "common-components";
import { uploadStyles as useStyles, uploadTheme as theme } from "../styles";
import { post } from "utils/api";

import {
  LoadingModal as Loading,
  SuccessModal as Success,
  Modal
} from "common-components";

const Upload = ({
  company,
  audioItem,
  getAudioResources,
  title,
  onClose,
  cancelUpload,
  open
}) => {
  const [mod, setMod] = useState(false);
  const [convert, setConvert] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Not file chosen");
  const [loading_state, setLoadingState] = useState(false);
  const [error, setError] = useState(null);
  const [success_state, setSuccessState] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState(["", ""]);

  function NoteAlert(props) {
    return <Alert elevation={6} variant="filled" {...props} />;
  }

  function resetValues() {
    setMod(false);
    setConvert(true);
    setFadeIn(true);
    setFadeOut(false);
    setFile(null);
    setFilename("No file chosen");
    setLoadingState(false);
    setError(null);
    setSuccessState(false);
  }

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

  const classes = useStyles();

  function upload(e) {
    let file_name = e.target.files[0].name.substring(0, 25) + "...";
    let files = e.target.files[0];
    var uploadFile = new FormData();
    uploadFile.append("file", files);
    setFilename(file_name);
    setFile(uploadFile);
  }

  // mock func api
  const uploadAudioFile = () => {
    return true;
  };

  const upload_to_server = () => {
    if (file) {
      setLoadingState(true);
      post(
        `/pitch/company/${company.slug}/audio/resources/${audioItem.uuid}/upload/?no_modifications=${mod}&convert=${convert}&fade_in=${fadeIn}&fade_out=${fadeOut}`,
        file
      ).then(res => {
        setLoadingState(false);
        setSuccessState(true);
      });
    }
  };

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
        {modifications.map((mods, i) => {
          let dynamicClass = classes.uploadTag;
          if (i % 2 !== 0) {
            dynamicClass = dynamicClass + classes.textDarken;
          }
          return (
            <React.Fragment key={i}>
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
                  <Typography className={dynamicClass}>{mods.title}</Typography>
                </span>
                <Typography className={classes.tagText}>
                  {mods.description}
                </Typography>
              </div>
            </React.Fragment>
          );
        })}

        <div className={classes.saveBtn}>
          <button
            className={classes.saveAudioBtn}
            onClick={() => upload_to_server()}
          >
            <Typography className={classes.saveText}>
              SAVE AUDIO FILE
            </Typography>
          </button>
        </div>
      </div>
    );
  }

  const renderUploadComponent = () => {
    return (
      <div>
        <input
          accept="audio/*"
          style={{ display: "none", padding: "30px 0" }}
          id="files"
          type="file"
          name="file"
          onChange={e => upload(e)}
          className={classes.hidden}
        />
        <label className={classes.labelStyle} {...{ for: "files" }}>
          <Typography className={classes.uploadTag}>{filename}</Typography>

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
            <Typography className={(classes.uploadTag, classes.textPrimary)}>
              Choose file
            </Typography>
          </div>
        </label>
        <Divider />
      </div>
    );
  };

  function closeUpload() {
    onClose();
    getAudioResources();
  }

  function cancel() {
    resetValues();
    cancelUpload();
  }

  function renderLoading() {
    return (
      <Loading
        open={loading_state}
        text={"One moment. We're uploading the audio"}
        cancelFn={cancel}
      />
    );
  }

  function reUpload() {
    resetValues();
  }

  function renderSuccess() {
    return (
      <Success
        open={success_state}
        text={`You have uploaded the audio!`}
        closeFn={closeUpload}
      />
    );
  }

  const renderNotification = () => {
    return (
      <Alert
        open={notify}
        setOpen={setNotify}
        type={message[0]}
        message={message[1]}
      />
    );
  };

  const gridProp = {
    direction: "column",
    alignItems: "center",
    justify: "start"
  };

  return (
    <MuiThemeProvider theme={theme}>
      {renderNotification()}
      {renderLoading()}
      {renderSuccess()}
      <Modal
        open={open && !loading_state && !success_state}
        title={title}
        onClose={closeUpload}
      >
        <Grid container {...gridProp}>
          <Grid
            item
            style={{
              width: "360px"
            }}
          >
            <Typography className={classes.errorText}>
              {error ? error : " "}
            </Typography>
            {renderUploadComponent()}
            {checkboxComponent()}
          </Grid>
        </Grid>
      </Modal>
    </MuiThemeProvider>
  );
};

export default Upload;
