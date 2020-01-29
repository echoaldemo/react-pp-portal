import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from "@material-ui/core/LinearProgress";
import PlayAudioIcon from "@material-ui/icons/PlayArrow";

import DeleteAudio from "../../../common-components/delete-audio";
import AddNewVoiceModal from "../../../common-components/add-new-voice";
import RerecordAudio from "../../../common-components/rerecord-audio";

import TableDataName from "../../../common-components/table-components/TableDataName";
import TableDataDialog from "../../../common-components/table-components/TableDataDialog";
import LoaderNoDataFound from "../../../common-components/table-components/TableLoader_DataNoFound";
import useStyles from "../../../common-components/styles/tableStyles";
import TableDataAction from "./table-component/TableDataAction";

interface IState {
  page: number;
  rowsPerPage: number;
  addNewVoiceModal: boolean;
  deleteAudioModal: boolean;
  rerecordAudioModal: boolean;
  anchorEl: any;
  open: boolean;
  searchPhrase: any;
  unrecordedName: any;
  id: any;
  data: any;
  audioName: any;
  dialog: any;
  isLoading: any;
  key: any;
  selectedIndex: any;
  backDisabled: boolean;
  hasMic: any;
  recordAudio?: any;
  openToast?: any;
  toastType?: any;
  message?: any;
  vertical?: any;
  horizontal?: any;
}
interface IProps {
  isLoading?: boolean;
  removeAudio?: any;
  undoPitchAudio?: any;
  voice?: any;
  version?: any;
  getRecordedName?: any;
  tblName?: any;
  searchKey?: any;
  searchPhrase?: any;
  audio?: any;
  showLoader?: any;
  playAudio?: any;
  openAddNewVoiceModal?: any;
  fetched?: any;
  file?: any;
  handleChange?: any;
  rerecordAudio?: any;
  addNewVoiceModal?: any;
  uploadLoading?: any;
  setRecordedName?: any;
  undoAudioOpen?: any;
  upload?: any;
  deleteAudio?: any;
  audio_key?: any;
  rows?: any;
  columns?: any;
  displayData?: any;
  filtered?: any;
  user_id?: any;
  refreshData?: any;
  handleAudio?: any;
  fileName?: any;
  addToRerecord?: any;
}

class CustomPaginationActionsTable extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      addNewVoiceModal: false,
      deleteAudioModal: false,
      rerecordAudioModal: false,
      anchorEl: null,
      open: false,
      searchPhrase: "",
      unrecordedName: "",
      id: null,
      data: [],
      audioName: "",
      dialog: "",
      isLoading: this.props.isLoading,
      key: "",
      selectedIndex: null,
      backDisabled: false,
      hasMic: null
    };
  }

  closeModal = () => {
    this.setState(
      prevState => ({
        addNewVoiceModal: !prevState.addNewVoiceModal
      }),
      () => this.successfulUpload()
    );
  };

  openAddNewVoiceModal = (bool: any) => {
    if (bool === false) {
      this.setState({
        addNewVoiceModal: false
      });
    } else {
      this.setState({
        addNewVoiceModal: true,
        anchorEl: null
      });
      this.props.getRecordedName(this.state.unrecordedName);
    }
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    });
  };

  handleChangePage = (e: any) => {
    if (e.currentTarget.getAttribute("aria-label") === "next page") {
      this.setState({
        page: this.state.page + 1
      });
    } else if (e.currentTarget.getAttribute("aria-label") === "previous page") {
      this.setState({
        page: this.state.page - 1
      });
    }
  };

  deleteAudioOpen = () => {
    this.setState({ deleteAudioModal: true });
    this.setState({ anchorEl: null });
  };

  deleteAudioClose = () => {
    this.setState({ deleteAudioModal: false });
  };

  rerecordAudioOpen = () => {
    this.setState({ rerecordAudioModal: true });
    this.setState({ anchorEl: null });
  };

  rerecordAudioClose = () => {
    this.setState({ rerecordAudioModal: false });
  };

  handleClick = (event: any) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClickWithName = (event: any, value: any, key: any, index: any) => {
    this.setState({
      anchorEl: event.currentTarget,
      unrecordedName: value,
      key: key,
      selectedIndex: index
    });
  };
  nextIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex + 1 });
  };
  prevIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex - 1 });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleClickOpenDialog = () => {
    this.setState({
      open: true
    });
  };
  handleCloseDialog = () => {
    this.setState({
      open: false
    });
  };
  handleClickRecord = (event: any, val: any, data: any) => {
    this.setState({
      anchorEl: event.currentTarget,
      id: val,
      data: data
    });
  };
  setAudioDetails = (name: any, dialog: any) => {
    this.setState({
      audioName: name,
      dialog: dialog
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
  setNewAudioDetails = (key: any, audioName: any, dialog: any) => {
    this.setState({ key, audioName, dialog });
  };
  handleBackButton = (index: any) => {
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

  render() {
    const {
      classes,
      columns,
      displayData,
      handleAudio,
      audio,
      removeAudio,
      fileName
    }: any = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} id="table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                style={
                  this.props.tblName === "Unrecorded"
                    ? {
                        backgroundColor: "#eeeeee",
                        fontWeight: 700,
                        color: "#444851",

                        borderTop: "5px solid red"
                      }
                    : this.props.tblName === "Rerecord"
                    ? {
                        backgroundColor: "#eeeeee",
                        fontWeight: 700,
                        color: "#444851",

                        borderTop: "5px solid #f89523"
                      }
                    : {
                        backgroundColor: "#eeeeee",
                        fontWeight: 700,
                        color: "#444851",
                        borderTop: "5px solid #a5c556"
                      }
                }
              >
                <div className={classes.tblTitle}>
                  <div className={classes.resHideTblName}>
                    {this.props.tblName}
                  </div>
                  <div className={classes.textFieldRoot}>
                    <TextField
                      id="standard-password-input"
                      placeholder={"Search For a Voice"}
                      inputProps={{
                        style: { fontSize: 15 }
                      }}
                      className={classes.textField}
                      type="text"
                      margin="normal"
                      onChange={e =>
                        this.props.handleChange(
                          this.props.searchKey,
                          e.target.value
                        )
                      }
                      value={this.props.searchPhrase}
                    />
                    <span>
                      <SearchIcon className={classes.searchIcon} />
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column}
                  style={{
                    fontWeight: 700,
                    color: "#444851",
                    textAlign: "center"
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ height: "500px" }}>
            {// filtered state
            displayData.length !== 0 ? (
              displayData
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((row: any, index: any) => {
                  if (this.props.searchPhrase !== "") {
                    if (
                      row.name
                        .toLowerCase()
                        .includes(this.props.searchPhrase.toLowerCase()) ||
                      row.text
                        .toLowerCase()
                        .includes(this.props.searchPhrase.toLowerCase())
                    ) {
                      return (
                        <TableRow key={row.key}>
                          <TableDataName
                            name={row.name}
                            style={{ wordBreak: "break-all" }}
                          />
                          {this.props.tblName === "Recorded" ? (
                            <TableCell align="center">
                              {(() => {
                                if (row.key === this.state.key) {
                                  if (this.props.isLoading) {
                                    return (
                                      <div className={classes.hideLoader}>
                                        <LinearProgress
                                          className={classes.linearLoader}
                                        />
                                      </div>
                                    );
                                  }
                                }

                                if (this.props.audio.length !== 0) {
                                  if (this.props.audio.audio.key === row.key) {
                                    return (
                                      <React.Fragment>
                                        <audio
                                          controls
                                          preload="false"
                                          className={classes.resPlayer}
                                        >
                                          <source
                                            src={this.props.audio.original_url}
                                          />
                                        </audio>
                                      </React.Fragment>
                                    );
                                  } else {
                                    return (
                                      <div
                                        className={classes.play}
                                        onClick={() => {
                                          this.props.showLoader();
                                          this.props.playAudio(
                                            this.props.version,
                                            this.props.voice,
                                            row.key
                                          );
                                          this.setState({ key: row.key });
                                          this.props.removeAudio();
                                        }}
                                      >
                                        <div className={classes.resHide}>
                                          <PlayAudioIcon
                                            className={classes.playIcon}
                                          />
                                          <Typography
                                            variant="caption"
                                            style={{ fontSize: 14 }}
                                          >
                                            Click to play audio
                                          </Typography>
                                        </div>

                                        <div className={classes.resPlay}>
                                          <PlayAudioIcon
                                            className={classes.playIcon}
                                          />
                                          <Typography
                                            variant="caption"
                                            style={{ fontSize: 14 }}
                                          >
                                            Play
                                          </Typography>
                                        </div>
                                      </div>
                                    );
                                  }
                                } else {
                                  return (
                                    <div
                                      className={classes.play}
                                      onClick={() => {
                                        this.props.showLoader();
                                        this.props.playAudio(
                                          this.props.version,
                                          this.props.voice,
                                          row.key
                                        );
                                        this.setState({ key: row.key });
                                      }}
                                    >
                                      <div className={classes.resHide}>
                                        <PlayAudioIcon
                                          className={classes.playIcon}
                                        />
                                        <Typography
                                          variant="caption"
                                          style={{ fontSize: 14 }}
                                        >
                                          Click to play audio
                                        </Typography>
                                      </div>

                                      <div className={classes.resPlay}>
                                        <PlayAudioIcon
                                          className={classes.playIcon}
                                        />
                                        <Typography
                                          variant="caption"
                                          style={{ fontSize: 14 }}
                                        >
                                          Play
                                        </Typography>
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                            </TableCell>
                          ) : (
                            <TableDataDialog dialog={row.text} />
                          )}

                          <TableDataAction
                            tblName={this.props.tblName}
                            handleClickWithName={this.handleClickWithName}
                            setAudioDetails={this.setAudioDetails}
                            anchorEl={this.state.anchorEl}
                            handleClose={this.handleClose}
                            openAddNewVoiceModal={
                              this.props.openAddNewVoiceModal
                            }
                            recordAudioDialog={this.recordAudioDialog}
                            handleClick={this.handleClick}
                            open={this.state.open}
                            handleClickOpenDialog={this.handleClickOpenDialog}
                            handleCloseDialog={this.handleCloseDialog}
                            handleClickRecord={this.handleClickRecord}
                            row={row}
                            selectedIndex={index}
                            rerecordAudioOpen={this.rerecordAudioOpen}
                            undoAudioOpen={this.props.undoAudioOpen}
                            deleteAudioOpen={this.deleteAudioOpen}
                            setRecordedName={this.props.setRecordedName}
                            rerecordAudio={this.props.rerecordAudio}
                            uploadLoading={this.props.uploadLoading}
                            version={this.props.version}
                            voice={this.props.voice}
                            audio_key={this.state.key}
                            undoPitchAudio={this.props.undoPitchAudio}
                            handleBackButton={this.handleBackButton}
                            hasMic={this.detectMic}
                          />
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  } else {
                    return (
                      <TableRow key={row.key}>
                        <TableDataName
                          name={row.name}
                          style={{ wordBreak: "break-all" }}
                        />
                        {this.props.tblName === "Recorded" ? (
                          <TableCell align="center">
                            {(() => {
                              if (row.key === this.state.key) {
                                if (this.props.isLoading) {
                                  return (
                                    <div className={classes.hideLoader}>
                                      <LinearProgress
                                        className={classes.linearLoader}
                                      />
                                    </div>
                                  );
                                }
                              }
                              if (this.props.audio.length !== 0) {
                                if (this.props.audio.audio.key === row.key) {
                                  return (
                                    <React.Fragment>
                                      <audio
                                        controls
                                        preload="false"
                                        className={classes.resPlayer}
                                      >
                                        <source
                                          src={this.props.audio.original_url}
                                        />
                                      </audio>
                                    </React.Fragment>
                                  );
                                } else {
                                  return (
                                    <div
                                      className={classes.play}
                                      onClick={() => {
                                        this.props.showLoader();
                                        this.props.playAudio(
                                          this.props.version,
                                          this.props.voice,
                                          row.key
                                        );
                                        this.setState({ key: row.key });
                                        this.props.removeAudio();
                                      }}
                                    >
                                      <div className={classes.resHide}>
                                        <PlayAudioIcon
                                          className={classes.playIcon}
                                        />
                                        <Typography
                                          variant="caption"
                                          style={{ fontSize: 14 }}
                                        >
                                          Click to play audio
                                        </Typography>
                                      </div>

                                      <div className={classes.resPlay}>
                                        <PlayAudioIcon
                                          className={classes.playIcon}
                                        />
                                        <Typography
                                          variant="caption"
                                          style={{ fontSize: 14 }}
                                        >
                                          Play
                                        </Typography>
                                      </div>
                                    </div>
                                  );
                                }
                              } else {
                                return (
                                  <div
                                    className={classes.play}
                                    onClick={() => {
                                      this.props.showLoader();
                                      this.props.playAudio(
                                        this.props.version,
                                        this.props.voice,
                                        row.key
                                      );
                                      this.setState({ key: row.key });
                                    }}
                                  >
                                    <div className={classes.resHide}>
                                      <PlayAudioIcon
                                        className={classes.playIcon}
                                      />
                                      <Typography
                                        variant="caption"
                                        style={{ fontSize: 14 }}
                                      >
                                        Click to play audio
                                      </Typography>
                                    </div>

                                    <div className={classes.resPlay}>
                                      <PlayAudioIcon
                                        className={classes.playIcon}
                                      />
                                      <Typography
                                        variant="caption"
                                        style={{ fontSize: 14 }}
                                      >
                                        Play
                                      </Typography>
                                    </div>
                                  </div>
                                );
                              }
                            })()}
                          </TableCell>
                        ) : (
                          <TableDataDialog dialog={row.text} />
                        )}

                        <TableDataAction
                          tblName={this.props.tblName}
                          handleClickWithName={this.handleClickWithName}
                          setAudioDetails={this.setAudioDetails}
                          anchorEl={this.state.anchorEl}
                          handleClose={this.handleClose}
                          openAddNewVoiceModal={this.props.openAddNewVoiceModal}
                          recordAudioDialog={this.recordAudioDialog}
                          handleClick={this.handleClick}
                          open={this.state.open}
                          handleClickOpenDialog={this.handleClickOpenDialog}
                          handleCloseDialog={this.handleCloseDialog}
                          handleClickRecord={this.handleClickRecord}
                          row={row}
                          selectedIndex={index}
                          rerecordAudioOpen={this.rerecordAudioOpen}
                          undoAudioOpen={this.props.undoAudioOpen}
                          deleteAudioOpen={this.deleteAudioOpen}
                          setRecordedName={this.props.setRecordedName}
                          rerecordAudio={this.props.rerecordAudio}
                          uploadLoading={this.props.uploadLoading}
                          version={this.props.version}
                          voice={this.props.voice}
                          audio_key={this.state.key}
                          undoPitchAudio={this.props.undoPitchAudio}
                          handleBackButton={this.handleBackButton}
                          hasMic={this.detectMic}
                        />
                      </TableRow>
                    );
                  }
                })
            ) : (
              <LoaderNoDataFound fetched={this.props.fetched} />
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                classes={{
                  actions: classes.tablePaginationActions,
                  caption: classes.tablePaginationCaptions
                }}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={displayData.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  "aria-label": "previous page"
                }}
                nextIconButtonProps={{
                  "aria-label": "next page"
                }}
                onChangePage={event => this.handleChangePage(event)}
                onChangeRowsPerPage={e => this.handleChangeRowsPerPage(e)}
              />
            </TableRow>
          </TableFooter>
        </Table>

        <AddNewVoiceModal
          addNewVoiceModal={this.props.addNewVoiceModal}
          openAddNewVoiceModal={this.props.openAddNewVoiceModal}
          closeModal={this.closeModal}
          successfulUpload={this.successfulUpload}
          // for adding audio
          handleAudio={handleAudio}
          audio={audio}
          removeAudio={removeAudio}
          fileName={fileName}
          upload={this.props.upload}
          file={this.props.file}
          audioKey={this.state.key}
          version={this.props.version}
          voice={this.props.voice}
          uploadLoading={this.props.uploadLoading}
          // props for recordAudioModal
          recordAudio={this.state.recordAudio}
          recordAudioDialog={this.recordAudioDialog}
          recordAudioClose={this.recordAudioClose}
          audioName={this.state.audioName}
          dialog={this.state.dialog}
          campaigns={displayData}
          index={this.state.selectedIndex}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          nextIndex={this.nextIndex}
          prevIndex={this.prevIndex}
          setNewAudioDetails={this.setNewAudioDetails}
          backButtonState={this.state.backDisabled}
          handleBackButton={this.handleBackButton}
          hasMic={this.state.hasMic}
          detectMic={this.detectMic}
          slug={""}
        />

        <DeleteAudio
          deleteAudioModal={this.state.deleteAudioModal}
          deleteAudioOpen={this.deleteAudioOpen}
          deleteAudioClose={this.deleteAudioClose}
          deleteAudio={this.props.deleteAudio}
          id={this.state.id}
        />

        <RerecordAudio
          rerecordAudioModal={this.state.rerecordAudioModal}
          rerecordAudioOpen={this.rerecordAudioOpen}
          rerecordAudioClose={this.rerecordAudioClose}
          rerecordAudio={this.props.rerecordAudio}
          data={this.state.data}
          id={this.state.id}
          version={this.props.version}
          voice={this.props.voice}
          audio_key={this.state.key}
        />
        {/* <RecordAudio
          recordAudio={this.state.recordAudio}
          recordAudioDialog={this.recordAudioDialog}
          recordAudioClose={this.recordAudioClose}
          audioName={this.state.audioName}
          dialog={this.state.dialog}
        /> */}
      </Paper>
    );
  }
}

export default withStyles(useStyles)(CustomPaginationActionsTable);
