import React, { Component } from "react";
import { get, patch, post, remove } from "utils/api";
import {
  Paper,
  Divider,
  Snackbar,
  IconButton,
  MenuItem,
  Typography,
  Dialog
} from "@material-ui/core";
import XMLDialog from "./components/Forms";
import DNDCards from "../cards/DNDCards";
import { Clear, Code, PanoramaFishEye, Delete } from "@material-ui/icons";
import {
  DeleteModal,
  LoadingModal,
  SuccessModal,
  TableLoader
} from "common-components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = {
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.30)"
      }
    }
  }
};

interface IProps {
  company: any;
}

interface IState {
  loading: boolean;
  company: Array<Object>;
  segments: Array<Object>;
  filterList: Array<Object>;
  innerLoading: boolean;
  open: boolean;
  data: Array<Object> | string;
  dataXML: any;
  error: boolean | null;
  openSnackBar: any;
  segmentData: Array<Object>;
  globalSegments: Array<Object>;
  activeData: any;
  openDelete: boolean;
  openLoading: boolean;
  openSuccess: boolean;
  activeSegments: Array<Object>;
}

export default class RRSegments extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      company: this.props.company,
      segments: [],
      filterList: [],
      innerLoading: true,
      open: false,
      data: [],
      dataXML: "",
      error: null,
      openSnackBar: "",
      segmentData: [],
      globalSegments: [],
      activeData: [],
      openDelete: false,
      openLoading: false,
      openSuccess: false,
      activeSegments: []
    };
  }

  handlClose = () => {
    this.setState({
      open: false
    });
  };

  handleClickOpen = (data: any) => {
    this.setState({
      open: !this.state.open,
      data,
      dataXML: data.xml
    });
  };

  handleChangeXML = (data: any) => {
    this.setState({
      dataXML: data
    });
  };

  showErrorMessage = (error: any) => {
    this.setState({
      error
    });
  };

  getFirst = (n: any) => {
    var x = n.firstChild;
    if (x !== null) {
      while (x.nodeType !== 1) {
        x = x.nextSibling;
      }
      return x.parentNode.nodeName;
    } else {
      return n.nodeName;
    }
  };

  UpdateSegment = (data: any, label: any) => {
    const parser = new DOMParser();
    const theDom = parser.parseFromString(data.xml, "application/xml");
    const rootNode = this.getFirst(theDom.documentElement);
    if (
      rootNode === "defaults" ||
      rootNode === "options" ||
      rootNode === "response-tests" ||
      rootNode === "failures" ||
      rootNode === "intros" ||
      rootNode === "no-responses" ||
      rootNode === "endings" ||
      rootNode === "nodes"
    ) {
      if (theDom.getElementsByTagName("parsererror").length > 0) {
        this.showErrorMessage(
          theDom
            .getElementsByTagName("parsererror")[0]
            .getElementsByTagName("div")[0].innerHTML
        );
      } else {
        this.setState({
          error: null
        });
        var submitdata = {
          name: data.name,
          active: data.active,
          type: data.type,
          xml: data.xml,
          variables: data.variables
        };
        if (label === "edit") {
          patch(
            `/pitch/company/${this.props.company.slug}/rapid-response/segments/${data.uuid}/`,
            submitdata
          )
            .then((res: any) => {
              if (res.status !== 400) {
                this.setState({
                  openSnackBar: "Segment Updated!",
                  loading: true,
                  open: false
                });
              }
            })
            .catch((err: any) => {
              if (err) console.log(err);
              return this.showErrorMessage("Error Updating! Please Try Again");
            });
        } else if (label === "create") {
          post(
            `/pitch/company/${this.props.company.slug}/rapid-response/segments/`,
            submitdata
          )
            .then((res: any) => {
              if (res.status !== 400) {
                this.setState({
                  openSnackBar: "Segment Created!",
                  loading: true,
                  open: false
                });
                this.componentDidMount();
              }
            })
            .catch((err: any) => {
              if (err) console.log(err);
              return this.showErrorMessage("Error Creating! Please Try Again");
            });
        }
      }
    } else {
      return this.showErrorMessage(
        `The xml provided contains an invalid root node "${rootNode}", allowed root nodes are: defaults, options, nodes, response-tests, failures, intros, no-responses, endings`
      );
    }
  };

  updateSegmentData = () => {
    this.componentDidMount();
  };

  componentDidMount() {
    if (!this.state.company) {
      get(`/identity/company/${this.props.company.uuid}/`).then((res: any) => {
        this.setState({
          company: res.data
        });
      });
    }

    Promise.all([
      get(`/pitch/company/${this.props.company.slug}/rapid-response/segments/`),
      get(`/pitch/global/rapid-response/segments/`)
    ]).then(segments => {
      this.setState({
        segments: segments[0].data,
        segmentData: segments[0].data,
        filterList: segments[0].data,
        globalSegments: segments[1].data,
        innerLoading: false,
        loading: false
      });
    });
  }

  closeError = () => {
    this.setState({
      error: null
    });
  };

  closeSnackBar = () => {
    this.setState({
      openSnackBar: false
    });
  };

  setActiveData = (data: any) => {
    this.setState({
      activeData: data
    });
  };
  handleClose = () => {
    this.setState({
      openDelete: false
    });
  };
  handleCancel = () => {
    this.setState({
      openLoading: false
    });
  };
  handleCloseSucess = () => {
    this.setState({
      openSuccess: false,
      loading: true
    });
    this.componentDidMount();
  };
  handleDelete = () => {
    this.setState({
      openDelete: false,
      openLoading: true
    });
    remove(
      `/pitch/company/${this.props.company.slug}/rapid-response/segments/${this.state.activeData.uuid}`
    )
      .then(() => {
        this.setState({
          openSuccess: true,
          openLoading: false
        });
      })
      .catch((err: any) => console.log(err));
  };

  saveActiveSegment = (data: any) => {
    //API request here for updating activeSegments
    this.setState({ activeSegments: data });
  };

  openNewSegment = () => {
    this.setState({
      data: "",
      open: !this.state.open,
      dataXML: " "
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <div
          style={{
            margin: "0 auto",
            height: 600
          }}
        >
          {this.state.company && (
            <>
              <Paper style={{ height: 660 }}>
                {this.state.loading ? (
                  <div style={{ height: 600, overflow: "hidden" }}>
                    <TableLoader />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignContent: "space-between",
                      height: 660
                    }}
                  >
                    {this.state.globalSegments.length !== 0 ? (
                      <div style={{ width: "100%", height: "100%" }}>
                        <div style={{ padding: 30 }}>
                          {this.state.globalSegments.length !== 0 ? (
                            <DNDCards
                              addButton3={true}
                              addFunction3={this.openNewSegment}
                              card1Title="Active segments"
                              card2Title="Global segments"
                              card3Title="Company segments"
                              card1Data={this.state.activeSegments}
                              card2Data={this.state.globalSegments}
                              card3Data={this.state.segmentData}
                              setActiveData={this.setActiveData}
                              saveActiveSegment={this.saveActiveSegment}
                              card3Popover={
                                <div>
                                  <MenuItem
                                    onClick={() =>
                                      this.handleClickOpen(
                                        this.state.activeData
                                      )
                                    }
                                    style={{
                                      color: "#777777",
                                      width: 250,
                                      paddingTop: 0,
                                      paddingBottom: 0
                                    }}
                                  >
                                    <Code />
                                    <Typography style={{ marginLeft: 40 }}>
                                      XML
                                    </Typography>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      window.location.href = `/manage/companies/edit/${this.props.company.slug}/${this.state.activeData.uuid}/segments`;
                                    }}
                                    style={{
                                      color: "#777777",
                                      width: 250,
                                      paddingTop: 0,
                                      paddingBottom: 0
                                    }}
                                  >
                                    <PanoramaFishEye />
                                    <Typography style={{ marginLeft: 40 }}>
                                      Variables
                                    </Typography>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      this.setState({ openDelete: true })
                                    }
                                    style={{
                                      color: "#777777",
                                      width: 250,
                                      paddingTop: 0,
                                      paddingBottom: 0
                                    }}
                                  >
                                    <Delete />
                                    <Typography style={{ marginLeft: 40 }}>
                                      Delete
                                    </Typography>
                                  </MenuItem>
                                </div>
                              }
                            />
                          ) : null}
                          <Dialog open={this.state.openDelete}>
                            <DeleteModal
                              open={this.state.openDelete}
                              header="Delete Company Segment"
                              msg="Segment"
                              name={`${this.state.activeData.name}`}
                              closeFn={this.handleClose}
                              delFn={this.handleDelete}
                            />
                          </Dialog>
                          <Dialog open={this.state.openLoading}>
                            <LoadingModal
                              open={this.state.openLoading}
                              text={`One moment. We're removing segment ${this.state.activeData.name}`}
                              cancelFn={this.handleCancel}
                            />
                          </Dialog>

                          <Dialog open={this.state.openSuccess}>
                            <SuccessModal
                              open={this.state.openSuccess}
                              text={`You have removed "${this.state.activeData.name}" from Company Segments`}
                              closeFn={this.handleCloseSucess}
                            />
                          </Dialog>
                        </div>
                        {this.state.dataXML !== "" ? (
                          <XMLDialog
                            error={this.state.error}
                            UpdateSegment={this.UpdateSegment}
                            handleChangeXML={this.handleChangeXML}
                            dataXML={this.state.dataXML}
                            data={this.state.data}
                            open={this.state.open}
                            handlClose={this.handlClose}
                            closeError={this.closeError}
                          />
                        ) : null}

                        <div style={{ width: "100%" }}></div>
                      </div>
                    ) : (
                      <div style={{ width: "100%", height: "100%" }}>
                        <div style={{ height: 70 }}></div>
                        <Divider />
                        <div
                          style={{
                            height: "100%",
                            padding: 100,
                            marginTop: 70
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <h4 style={{ color: "#7c8a97", fontSize: "18px" }}>
                              {"No Rapid Response Segments have been created"}
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={this.state.openSnackBar}
                  autoHideDuration={3000}
                  onClose={this.closeSnackBar}
                  ContentProps={{
                    "aria-describedby": "message-id"
                  }}
                  message={
                    <span id="message-id">{this.state.openSnackBar}</span>
                  }
                  action={[
                    // <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                    //   UNDO
                    // </Button>,
                    <IconButton
                      key="close"
                      aria-label="close"
                      color="inherit"
                      onClick={this.closeSnackBar}
                    >
                      <Clear />
                    </IconButton>
                  ]}
                />
              </Paper>
            </>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}
