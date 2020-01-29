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
import AddNewVoiceModal from "../../../common-components/add-new-voice";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import DeleteAudio from "../../../common-components/delete-audio";
import RerecordAudio from "../../../common-components/rerecord-audio";
import UndoAudio from "../../../common-components/undo-audio";
import Toast from "../../../common-components/toast";
import LinearProgress from "@material-ui/core/LinearProgress";
import PlayAudioIcon from "@material-ui/icons/PlayArrow";
import Typography from "@material-ui/core/Typography";

import TableDataName from "../../../common-components/table-components/TableDataName";
import TableDataDialog from "../../../common-components/table-components/TableDataDialog";
import LoaderNoDataFound from "../../../common-components/table-components/TableLoader_DataNoFound";
import useStyles from "../../../common-components/styles/tableStyles";
import TableDataAction from "./table-component/TableDataAction";
interface IState {
  page: any;
  rowsPerPage: number;
  addNewVoiceModal: boolean;
  deleteAudioModal: boolean;
  rerecordAudioModal: boolean;
  undoAudioModal: boolean;
  anchorEl: any;
  open: boolean;
  searchPhrase: any;
  unrecordedName: any;
  id: any;
  data: any;
  audioName: any;
  dialog: any;
  key: any;
  uuid: any;
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
  classes?: any;
  tblName: any;
  rows: any;
  columns: any;
  openAddNewVoiceModal: any;
  displayData: any;
  filtered: any;
  handleChange: any;
  searchPhrase: any;
  searchKey: any;
  user_id: any;
  playAudio?: any;
  version: any;
  voice: any;
  audio: any;
  fetched: any;
  isLoading?: any;
  showLoader?: any;
  removeAudio: any;
  refreshData: any;
  rerecordAudio?: any;
  uploadLoading: any;
  handleAudio: any;
  getRecordedName: any;
  fileName: any;
  file: any;
  addNewVoiceModal: any;
  slug?: any;
  addToRerecord?: any;
  addToRecorded?: any;
  uploadAudio?: any;
  upload?: any;
  preview?: any;
  deleteAudio?: any;
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

  undoAudioOpen = () => {
    this.setState({ undoAudioModal: true });
    this.setState({ anchorEl: null });
  };

  rerecordAudioClose = () => {
    this.setState({ rerecordAudioModal: false });
  };

  undoAudioClose = () => {
    this.setState({ undoAudioModal: false });
  };

  handleClick = (event: any) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClickWithName = (event: any, value: any, uuid: any, index: any) => {
    this.setState({
      anchorEl: event.currentTarget,
      unrecordedName: value,
      uuid: uuid,
      selectedIndex: index
    });
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
  setAudioDetails = (name: any, dialog: any, uuid: any) => {
    this.setState({
      audioName: name,
      dialog: dialog,
      uuid: uuid
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

  // prev and back button
  nextIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex + 1 });
  };

  prevIndex = () => {
    this.setState({ selectedIndex: this.state.selectedIndex - 1 });
  };

  setNewAudioDetails = (key: any, audioName: any, dialog: any) => {
    this.setState({ uuid: key, audioName, dialog });
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
      rows,
      columns,
      displayData,
      filtered,
      handleAudio,
      audio,
      removeAudio,
      fileName
    }: any = this.props;

    return (
      <Paper className={classes.root}>
        {/* <div className={classes.tableWrapper}> */}
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
          <TableBody>
            {displayData.length !== 0 ? (
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
                      row.phrase
                        .toLowerCase()
                        .includes(this.props.searchPhrase.toLowerCase())
                    ) {
                      return (
                        <TableRow key={row.uuid}>
                          <TableDataName name={row.name} />

                          {this.props.tblName === "Recorded" ? (
                            //<TableDataAudio audioFile={row.audioFile} />
                            <TableCell align="center">
                              {(() => {
                                if (row.uuid === this.state.key) {
                                  if (this.props.isLoading) {
                                    return (
                                      <div className={classes.hideLoader}>
                                        <LinearProgress
                                          className={classes.linearLoader}
                                        />{" "}
                                      </div>
                                    );
                                  }
                                }

                                if (this.props.audio.length !== 0) {
                                  if (
                                    this.props.audio.audio.uuid === row.uuid
                                  ) {
                                    return (
                                      <React.Fragment>
                                        <audio
                                          controls
                                          preload="false"
                                          className={classes.resPlayer}
                                        >
                                          {" "}
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
                                            row.key,
                                            row.uuid
                                          );
                                          this.setState({ key: row.uuid });
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
                                          row.key,
                                          row.uuid
                                        );
                                        this.setState({ key: row.uuid });
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
                              })()}
                            </TableCell>
                          ) : (
                            <TableDataDialog dialog={row.phrase} />
                          )}

                          <TableDataAction
                            tblName={this.props.tblName}
                            handleClickWithName={this.handleClickWithName}
                            setAudioDetails={this.setAudioDetails}
                            name={row.name}
                            dialog={row.phrase}
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
                            rerecordAudioOpen={this.rerecordAudioOpen}
                            undoAudioOpen={this.undoAudioOpen}
                            deleteAudioOpen={this.deleteAudioOpen}
                            // prev and next button
                            selectedIndex={index}
                            handleBackButton={this.handleBackButton}
                            detectMic={this.detectMic}
                          />
                        </TableRow>
                      );
                    } else {
                      return null;
                    }
                  } else {
                    return (
                      <TableRow key={row.uuid}>
                        <TableDataName name={row.name} />

                        {this.props.tblName === "Recorded" ? (
                          // <TableDataAudio audioFile={row.audioFile} />

                          <TableCell align="center">
                            {(() => {
                              if (row.uuid === this.state.key) {
                                if (this.props.isLoading) {
                                  return (
                                    <div className={classes.hideLoader}>
                                      <LinearProgress
                                        className={classes.linearLoader}
                                      />{" "}
                                    </div>
                                  );
                                }
                              }

                              if (this.props.audio.length !== 0) {
                                if (this.props.audio.audio.uuid === row.uuid) {
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
                                          row.key,
                                          row.uuid
                                        );
                                        this.setState({ key: row.uuid });
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
                                        row.key,
                                        row.uuid
                                      );
                                      this.setState({ key: row.uuid });
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
                            })()}
                          </TableCell>
                        ) : (
                          <TableDataDialog dialog={row.phrase} />
                        )}

                        <TableDataAction
                          tblName={this.props.tblName}
                          handleClickWithName={this.handleClickWithName}
                          setAudioDetails={this.setAudioDetails}
                          name={row.name}
                          dialog={row.phrase}
                          uuid={row.uuid}
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
                          rerecordAudioOpen={this.rerecordAudioOpen}
                          undoAudioOpen={this.undoAudioOpen}
                          deleteAudioOpen={this.deleteAudioOpen}
                          // prev and next button
                          selectedIndex={index}
                          handleBackButton={this.handleBackButton}
                          detectMic={this.detectMic}
                        />
                      </TableRow>
                    );
                  }
                })
            ) : (
              <LoaderNoDataFound fetched={this.props.fetched} />
            )}
          </TableBody>
          {!filtered ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  classes={{
                    actions: classes.tablePaginationActions,
                    caption: classes.tablePaginationCaptions
                  }}
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
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
                  data-testid="pagination"
                />
              </TableRow>
            </TableFooter>
          ) : (
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
                  data-testid="pagination"
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
        {/* </div> */}

        <AddNewVoiceModal
          addNewVoiceModal={this.props.addNewVoiceModal}
          openAddNewVoiceModal={this.props.openAddNewVoiceModal}
          closeModal={this.closeModal}
          successfulUpload={this.successfulUpload}
          handleAudio={handleAudio}
          audio={audio}
          removeAudio={removeAudio}
          fileName={fileName}
          unrecordedName={this.state.unrecordedName}
          voice={this.props.voice}
          version={this.props.version}
          slug={this.props.slug}
          audioKey={this.state.uuid} //phrase selected
          file={this.props.file} //file selected
          uploadLoading={this.props.uploadLoading}
          displayData={this.props.displayData}
          upload={this.props.upload} //upload audio
          // props for recording in phrase audio
          recordAudio={this.state.recordAudio}
          recordAudioDialog={this.recordAudioDialog}
          recordAudioClose={this.recordAudioClose}
          audioName={this.state.audioName}
          dialog={this.state.dialog}
          // prev and next button
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
          typeOfAudio={"phrase"}
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
          rerecordAudio={this.props.addToRerecord}
          data={this.state.data}
          id={this.state.id}
        />

        <UndoAudio
          undoAudioModal={this.state.undoAudioModal}
          undoAudioOpen={this.undoAudioOpen}
          undoAudioClose={this.undoAudioClose}
          undoAudio={this.props.addToRecorded}
          data={this.state.data}
          id={this.state.id}
        />

        {/* <RecordAudio
          recordAudio={this.state.recordAudio}
          recordAudioDialog={this.recordAudioDialog}
          recordAudioClose={this.recordAudioClose}
          audioName={this.state.audioName}
          dialog={this.state.dialog}
        /> */}

        <Toast
          open={this.state.openToast}
          handleClose={this.handleCloseToast}
          toastType={this.state.toastType}
          message={this.state.message}
          vertical={this.state.vertical}
          horizontal={this.state.horizontal}
        />
      </Paper>
    );
  }
}

export default withStyles(useStyles)(CustomPaginationActionsTable);
