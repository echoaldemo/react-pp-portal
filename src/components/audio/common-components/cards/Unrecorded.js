import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  IconButton,
  TextField,
  Link,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DesktopAddNewVoice from "../record-new-voice";
import Loader from "../loader";
import AddNewVoiceModal from "../add-new-voice";
import Toast from "../toast";

import styles from "../common-styles/cardStyles";

class Unrerecord extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      showSearch: false,
      searchValue: "",
      page: 0,
      rowsPerPage: 10,
      addNewVoiceModal: false,
      deleteAudioModal: false,
      rerecordAudioModal: false,
      undoAudioModal: false,
      anchorEl: null,
      open: false,
      searchPhrase: "",
      unrecordedName: "",
      id: null,
      data: [],
      audioName: "",
      dialog: "",
      key: "",
      uuid: "",
      selectedIndex: null,
      backDisabled: false,
      hasMic: null
    };
  }
  handleClickWithName = (value, uuid, index) => {
    this.setState({
      unrecordedName: value,
      uuid: uuid,
      selectedIndex: index
    });
  };
  setAudioDetails = (name, dialog, uuid) => {
    this.setState({
      unrecordedName: name,
      audioName: name,
      dialog: dialog,
      uuid: uuid
    });
  };
  handleBackButton = index => {
    if (index === 0) {
      this.setState({ backDisabled: true });
    } else {
      this.setState({ backDisabled: false });
    }
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
  nextIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex + 1 });
  };
  prevIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex - 1 });
  };
  setNewAudioDetails = (key, audioName, dialog) => {
    this.setState({ uuid: key, audioName, dialog });
  };
  handleBackButton = index => {
    if (index === 0) {
      this.setState({ backDisabled: true });
    } else {
      this.setState({ backDisabled: false });
    }
  };
  closeModal = () => {
    this.setState(
      prevState => ({
        addNewVoiceModal: !prevState.addNewVoiceModal
      }),
      () => this.successfulUpload()
    );
  };
  successfulUpload = () => {
    this.setState({
      openToast: true,
      toastType: "check",
      message: `Successfully uploaded`,
      vertical: "top",
      horizontal: "right"
    });
  };
  handleCloseToast = () => {
    this.setState({
      openToast: false
    });
  };
  render() {
    const { classes, unrecorded } = this.props;
    let dialog;
    return (
      <Card id="unrecorded-card" className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          classes={{ title: classes.cardTitle }}
          style={{ borderTop: "5px solid #ff504d" }}
          title={`Unrecorded (${unrecorded.length})`}
          action={
            unrecorded.length > 0 ? (
              <IconButton
                aria-label="settings"
                onClick={() =>
                  this.setState({ showSearch: !this.state.showSearch })
                }
              >
                <SearchIcon />
              </IconButton>
            ) : null
          }
        />
        <CardContent style={{ padding: 0 }}>
          {/* WITH DATA START */}

          {unrecorded.length > 0 ? (
            <div
              className={
                this.state.showSearch
                  ? classes.showSearchDiv
                  : classes.showSearchDivHidden
              }
            >
              <TextField
                id="standard-bare"
                margin="normal"
                placeholder="Search dialog"
                className={classes.textField}
                onChange={e => this.setState({ searchValue: e.target.value })}
                value={this.state.searchValue}
              />
              <div style={{ marginTop: "21px" }}>
                <Link
                  className={classes.cancel}
                  onClick={() => this.setState({ searchValue: "" })}
                >
                  Cancel
                </Link>
              </div>
            </div>
          ) : null}
          {unrecorded.length > 0 ? (
            <div className={classes.scroll}>
              <Table stickyHeader={true}>
                <TableHead>
                  <TableRow style={{ background: "#fbfbfb" }}>
                    <TableCell align="left" className={classes.tableHeader}>
                      Name
                    </TableCell>
                    <TableCell align="left" className={classes.tableHeader}>
                      Dialog
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody stripedRows>
                  {unrecorded.length
                    ? unrecorded.map((row, i) => {
                        if (this.state.searchValue) {
                          if (row.text) {
                            dialog = row.text;
                          } else {
                            dialog = row.phrase;
                          }
                          if (
                            dialog
                              .toLowerCase()
                              .includes(this.state.searchValue.toLowerCase()) ||
                            row.name
                              .toLowerCase()
                              .includes(this.state.searchValue.toLowerCase())
                          ) {
                            return (
                              <TableRow
                                key={i}
                                style={
                                  i % 2
                                    ? { background: "#fbfbfb" }
                                    : { background: "white" }
                                }
                              >
                                <TableCell
                                  onClick={() => {
                                    this.handleClickWithName(
                                      row.name,
                                      row.uuid || row.key,
                                      i
                                    );
                                    this.setAudioDetails(
                                      row.name,
                                      row.phrase || row.text,
                                      row.uuid || row.key
                                    );
                                    this.handleBackButton(i);
                                    this.detectMic();
                                    this.props.openAddNewVoiceModal(
                                      null,
                                      "Unrecorded"
                                    );
                                  }}
                                  align="left"
                                  className={classes.name}
                                >
                                  {row.name}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  classes={{ root: classes.tableCell }}
                                >
                                  <Typography className={classes.dialog}>
                                    {row.phrase || row.text}
                                  </Typography>
                                  <br />
                                </TableCell>
                              </TableRow>
                            );
                          }
                        } else {
                          return (
                            <TableRow
                              key={i}
                              style={
                                i % 2
                                  ? { background: "#fbfbfb" }
                                  : { background: "white" }
                              }
                            >
                              <TableCell
                                onClick={() => {
                                  this.handleClickWithName(
                                    row.name,
                                    row.uuid || row.key,
                                    i
                                  );
                                  this.setAudioDetails(
                                    row.name,
                                    row.phrase || row.text,
                                    row.uuid || row.key
                                  );
                                  this.handleBackButton(i);
                                  this.detectMic();
                                  this.props.openAddNewVoiceModal(
                                    null,
                                    "Unrecorded"
                                  );
                                }}
                                align="left"
                                className={classes.name}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                <Typography className={classes.dialog}>
                                  {row.phrase || row.text}
                                </Typography>
                                <br />
                              </TableCell>
                            </TableRow>
                          );
                        }
                        return null;
                      })
                    : null}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Grid container>
              <Grid item sm={12} xs={12} className={classes.noAudioCon}>
                <Typography className={classes.noAudioText} gutterBottom>
                  No unrecorded audio
                </Typography>
              </Grid>
            </Grid>
          )}

          {/* NO AUDIO START */}

          {/* NO AUDIO END */}
        </CardContent>
        {/* ANCHOR Add new voice modal */}
        {this.props.mode === "prospect" ? (
          <AddNewVoiceModal
            addNewVoiceModal={this.props.addNewVoiceModal}
            openAddNewVoiceModal={this.props.openAddNewVoiceModal}
            handleAudio={this.props.handleAudio}
            audio={this.props.audio}
            removeAudio={this.props.removeAudio}
            fileName={this.props.fileName}
            voice={this.props.voice}
            version={this.props.version}
            slug={this.props.slug}
            file={this.props.file}
            uploadLoading={this.props.uploadLoading}
            displayData={this.props.displayData}
            upload={this.props.uploadAudio}
            campaigns={this.props.rerecord}
            //state
            recordAudio={this.state.recordAudio}
            unrecordedName={this.state.unrecordedName}
            recordAudioDialog={this.recordAudioDialog}
            recordAudioClose={this.recordAudioClose}
            audioName={this.state.audioName}
            dialog={this.state.dialog}
            audioKey={this.state.uuid}
            index={this.state.selectedIndex}
            hasMic={this.state.hasMic}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
            backButtonState={this.state.backDisabled}
            //end state
            nextIndex={this.nextIndex}
            prevIndex={this.prevIndex}
            setNewAudioDetails={this.setNewAudioDetails}
            handleBackButton={this.handleBackButton}
            closeModal={this.closeModal}
            successfulUpload={this.successfulUpload}
          />
        ) : (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.props.addNewVoiceModal}
            onClose={() => this.props.openAddNewVoiceModal(false)}
            maxWidth="lg"
            fullWidth={true}
          >
            {this.props.uploadLoading ? (
              <Loader />
            ) : (
              <DesktopAddNewVoice
                //type
                typeOfAudio={this.props.typeOfAudio}
                addNewVoiceModal={this.props.addNewVoiceModal}
                openAddNewVoiceModal={this.props.openAddNewVoiceModal}
                handleAudio={this.props.handleAudio}
                //audio={this.props.audio}
                removeAudio={this.props.removeAudio}
                fileName={this.props.fileName}
                voice={this.props.voice}
                version={this.props.version}
                slug={this.props.slug}
                file={this.props.file}
                uploadLoading={this.props.uploadLoading}
                displayData={this.props.displayData}
                upload={this.props.uploadAudio}
                audio={unrecorded}
                //state
                recordAudio={this.state.recordAudio}
                unrecordedName={this.state.unrecordedName}
                recordAudioDialog={this.recordAudioDialog}
                recordAudioClose={this.recordAudioClose}
                audioName={this.state.audioName}
                dialog={this.state.dialog}
                audioKey={this.state.uuid}
                index={this.state.selectedIndex}
                hasMic={this.state.hasMic}
                page={this.state.page}
                rowsPerPage={this.state.rowsPerPage}
                backButtonState={this.state.backDisabled}
                //end state
                nextIndex={this.nextIndex}
                prevIndex={this.prevIndex}
                setNewAudioDetails={this.setNewAudioDetails}
                handleBackButton={this.handleBackButton}
                closeModal={this.closeModal}
                successfulUpload={this.successfulUpload}
                handleClose={() => {
                  this.props.openAddNewVoiceModal(false);
                  this.props.removeAudio();
                }}
                //showtoast
                showToast={this.props.showToast}
                //upload session
                uploadSession={this.props.uploadSession}
              />
            )}
          </Dialog>
        )}
        <Toast
          open={this.state.openToast}
          handleClose={this.handleCloseToast}
          toastType={this.state.toastType}
          message={this.state.message}
          vertical="top"
          horizontal="right"
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Unrerecord);
