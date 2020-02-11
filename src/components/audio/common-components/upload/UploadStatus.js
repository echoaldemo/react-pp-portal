import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import FabIcon from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import FailIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
const uiStyles = theme => ({
  container: {
    color: "slategray",
    width: "100%",
    height: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  circular: {
    color: "#a6c556",
    textAlign: "center"
  },
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
    backgroundColor: "rgb(95,125,152)"
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 425px)": {
      position: "fixed"
    }
  },
  clearBtn: {
    color: "whitesmoke",
    float: "right",
    "@media (max-width: 320px)": {
      margin: "-10px -20px 0 0"
    }
  },

  linearLoader: {
    width: 225,
    margin: "0 auto"
  },
  btn: {
    backgroundColor: "#a6c556",
    "&:hover": {
      backgroundColor: "#9cba4e"
    },
    textAlign: "center",
    justifyContent: "center"
  }
});

class UploadStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: "fail",
      hasFailed: false,
      uploads: this.props.uploads,
      failedUploads: [],
      uploadingFailed: false
    };
  }

  handleLoading = () => {
    this.setState({ uploads: this.props.uploads });
  };

  componentDidMount() {
    window.setInterval(() => {
      if (this.state.failedUploads.length !== this.props.arrToMatch.length) {
        this.handleLoading();
      } else {
        this.handleLoading();

        clearInterval();
      }
    }, 2000);
  }
  componentDidUpdate() {
    if (this.state.uploadingFailed) {
      window.setInterval(() => {
        if (this.props.uploads.length !== this.state.uploads.length) {
          this.handleLoading();
        } else {
          this.handleLoading();
          this.setState({ uploadingFailed: false });
          clearInterval();
        }
      }, 2000);
    }
  }

  render() {
    const { classes } = this.props;

    let failedUploads = [];
    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.props.open}
          maxWidth={"md"}
          //onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {this.state.uploads.length === this.props.arrToMatch.length ? (
            <React.Fragment>
              <DialogTitle
                id="alert-dialog-title"
                className={classes.dialogTitle}
              >
                {"Uploading Status"}
              </DialogTitle>

              <DialogContent>
                <div className={classes.scrollBar}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow className={classes.tableRow}>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Audio</TableCell>
                        <TableCell align="center">Uploading Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.uploads !== undefined
                        ? this.props.uploads.length ===
                          this.props.arrToMatch.length
                          ? this.props.uploads.map((data, index) => {
                              if (
                                data.status === "Upload Failed" ||
                                data.status ===
                                  "Audio file appears to be empty."
                              ) {
                                if (!this.state.hasFailed) {
                                  this.setState({ hasFailed: true });
                                }
                                failedUploads.push(data.data);
                                if (this.state.failedUploads.length === 0) {
                                  this.setState({
                                    failedUploads
                                  });
                                }
                              }
                              return (
                                <TableRow key={"1"}>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    {data.data.audioName}
                                  </TableCell>
                                  <TableCell align="center">
                                    <audio
                                      controls
                                      preload="false"
                                      className={classes.resPlayer}
                                    >
                                      <source src={data.data.audioUrl} />
                                    </audio>
                                  </TableCell>
                                  <TableCell align="center">
                                    {data.status === 201 ? (
                                      <Tooltip
                                        title="Upload Successful"
                                        placement="top"
                                      >
                                        <FabIcon
                                          size="medium"
                                          style={{
                                            backgroundColor: "#00db07",
                                            color: "white"
                                          }}
                                          aria-label="success"
                                        >
                                          <CheckIcon />
                                        </FabIcon>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip
                                        title={data.status}
                                        placement="top"
                                      >
                                        <FabIcon
                                          size="medium"
                                          style={{
                                            backgroundColor: "red",
                                            color: "white"
                                          }}
                                          aria-label="add"
                                          onMouseEnter={() => {
                                            this.setState({ fail: "retry" });
                                          }}
                                          onMouseLeave={() => {
                                            this.setState({ fail: "fail" });
                                          }}
                                        >
                                          <FailIcon />
                                        </FabIcon>
                                      </Tooltip>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          : null
                        : null}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </React.Fragment>
          ) : (
            <div className={classes.container}>
              <CircularProgress
                size={80}
                thickness={5}
                className={classes.circular}
                onAnimationStart={this.handleLoading}
              />
              <br />
              <Typography
                variant="subtitle1"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Please wait. We are saving your audio session...
              </Typography>
            </div>
          )}
          <DialogActions>
            {this.state.uploads.length === this.props.arrToMatch.length &&
            this.state.failedUploads.length !== 0 ? (
              <Button
                className={classes.btn}
                variant="contained"
                onClick={() => {
                  this.props.setArrToMatch(this.state.failedUploads);
                  this.setState({
                    uploads: [],
                    uploadingFailed: true,
                    hasFailed: false
                  });

                  var Url = window.location.href.split("/");
                  var audioUrl = Url[Url.length - 1];
                  if (audioUrl === "") {
                    audioUrl = "pitch";
                  }
                  this.props.retryUpload(
                    this.props.voice,
                    this.props.version,
                    this.props.modification,
                    this.props.fadeIn,
                    this.props.fadeOut,
                    this.props.convert,
                    this.state.failedUploads,
                    audioUrl
                  );
                }}
                color="primary"
                autoFocus
              >
                Retry Upload
              </Button>
            ) : null}
            {this.state.uploads.length === this.props.arrToMatch.length ? (
              <Button
                className={classes.btn}
                onClick={() => {
                  this.props.handleClose();
                  this.props.closeMainAdd();
                  this.props.setValue();
                  this.setState({ failedUploads: [] });
                }}
                color="primary"
                variant="contained"
                autoFocus
              >
                OK
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(uiStyles)(UploadStatus);
