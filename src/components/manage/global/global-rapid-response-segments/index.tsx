import React, { Component } from "react";
// import NewSegment from "./components/NewSegment";
import {
  Paper,
  Divider,
  Snackbar,
  IconButton,
  MenuItem,
  Typography
} from "@material-ui/core";

//Header
import {
  HeaderLink,
  HeaderButton,
  Pagination,
  SearchBar,
  TableLoader,
  DeleteModal,
  LoadingModal,
  SuccessModal,
  TableNoResult
} from "common-components";
import SegmentTable from "./components/SegmentTable";
import { get, patch, post, remove, cancel } from "utils/api"; // eslint-disable-line
import XMLDialog from "./components/Form";
import { Clear } from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import Tabs from "./components/RRTabs";
import DeleteIcon from "@material-ui/icons/Delete";
import SEO from "utils/seo";

interface IProps {}

interface IState {
  globalSegment: any;
  innerLoading: boolean;
  loading: boolean;
  paginateList: any;
  filterlist: any;
  data: any;
  open: boolean;
  dataXML: string;
  error: any;
  openSnackBar: any;
  openDelete: boolean;
  openLoading: boolean;
  openSuccess: boolean;
}

export default class GRapidResponseSegments extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      globalSegment: [],
      innerLoading: false,
      loading: false,
      paginateList: [],
      filterlist: [],
      data: [],
      open: false,
      dataXML: "",
      error: null,
      openSnackBar: false,
      openDelete: false,
      openLoading: false,
      openSuccess: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      loading: true
    });
    get(`/pitch/global/rapid-response/segments/`).then((res: any) => {
      this.setState({
        globalSegment: res.data,
        innerLoading: false,
        loading: false,
        paginateList: res.data,
        filterlist: res.data
      });
    });
  };

  paginate = (from: number, to: number) => {
    this.setState({
      globalSegment: this.state.paginateList.slice(from, to)
    });
  };

  handlClose = () => {
    this.setState({
      open: false
    });
  };

  handleClickOpen = (data: any) => {
    this.setState({
      data,
      open: !this.state.open,
      dataXML: data.xml
    });
  };

  setActiveDataMethod = (data: any) => {
    this.setState({
      data
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

  UpdateSegment = (data: any, label: string) => {
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
            `/pitch/global/rapid-response/segments/${data.uuid}/`,
            submitdata
          )
            .then((res: any) => {
              if (res.status !== 400) {
                this.setState({
                  openSnackBar: "Segment Updated!",
                  loading: true,
                  open: false
                });
                this.fetchData();
              }
            })
            .catch((err: any) => {
              if (err) console.log(err);
              return this.showErrorMessage("Error Updating! Please Try Again");
            });
        } else if (label === "create") {
          post(`/pitch/global/rapid-response/segments/`, submitdata)
            .then((res: any) => {
              if (res.status !== 400) {
                this.setState({
                  openSnackBar: "Segment Created!",
                  loading: true,
                  open: false
                });
                this.fetchData();
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

  openNewSegment = () => {
    this.setState({
      data: "",
      open: !this.state.open,
      dataXML: " "
    });
  };

  handleClose = () => {
    this.setState({
      openDelete: false,
      open: false
    });
  };
  openDelete = (data: any) => {
    this.setState({
      openDelete: true,
      data
    });
  };

  handleCancel = () => {
    cancel();
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
    //code here
    this.setState({
      openDelete: false,
      openLoading: true
    });
    remove(`/pitch/global/rapid-response/segments/${this.state.data.uuid}/`)
      .then(() => {
        this.setState({
          openSuccess: true,
          openLoading: false
        });
      })
      .catch((err: any) => console.log(err));
  };

  render() {
    return (
      <div
        style={{
          margin: "0 auto"
        }}
      >
        <>
          <SEO title="Manage Rapid Response" />
          <div className="header-container" style={{ paddingBottom: 30 }}>
            <HeaderLink
              menu={[
                {
                  title: "Phrase Books",
                  path: "/manage/global-pitch-segments/"
                },
                {
                  title: "Segments",
                  path: "/manage/global-option-group"
                },
                {
                  title: "Option Group",
                  path: "/manage/global-option-group"
                },
                {
                  title: "Rapid Response",
                  path: "/manage/global-rapid-response/tests"
                }
              ]}
              title="Rapid Response"
            />

            <Tabs
              tabs={[
                {
                  name: "RESPONSE TEST",
                  active: false,
                  path: "/manage/global-rapid-response/tests"
                },
                {
                  name: "RESPONSE SEGMENTS",
                  active: true,
                  path: "/manage/global-rapid-response/segments"
                }
              ]}
            />
          </div>
          {this.state.globalSegment.length !== 0 &&
            this.state.loading === false && (
              <div className="header-container" style={{ paddingBottom: 30 }}>
                <Typography variant="h5" style={{ paddingLeft: 10 }}>
                  Segments
                </Typography>

                <HeaderButton
                  openFunction={() => {
                    if (this.state.loading === true) {
                      return null;
                    } else {
                      this.openNewSegment();
                    }
                  }}
                  buttonText="New Segment"
                />
              </div>
            )}

          {this.state.dataXML !== "" ? (
            <>
              <XMLDialog
                stopLoading={this.state.openSnackBar}
                error={this.state.error}
                UpdateSegment={this.UpdateSegment}
                handleChangeXML={this.handleChangeXML}
                dataXML={this.state.dataXML}
                data={this.state.data}
                open={this.state.open}
                closeError={this.closeError}
                handlClose={this.handleClose}
              />
            </>
          ) : null}

          <Paper style={{ height: "auto" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "space-between",
                height: "auto"
              }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <div style={{ height: "auto" }}>
                  <SearchBar
                    title="A Rapid Response Segment"
                    userData={this.state.globalSegment}
                    headers={["name", "slug", "uuid"]}
                    active={true}
                    loading={this.state.loading}
                    setActiveDataMethod={this.setActiveDataMethod}
                    settings={
                      <>
                        <MenuItem
                          onClick={() => this.handleClickOpen(this.state.data)}
                          style={{
                            color: "#777777",
                            width: 250,
                            paddingTop: 0,
                            paddingBottom: 0
                          }}
                        >
                          <CodeIcon />{" "}
                          <Typography style={{ marginLeft: 40 }}>
                            XML
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => this.openDelete(this.state.data)}
                          style={{
                            color: "#777777",
                            width: 250,
                            paddingTop: 0,
                            paddingBottom: 0
                          }}
                        >
                          <DeleteIcon />{" "}
                          <Typography style={{ marginLeft: 40 }}>
                            Delete
                          </Typography>
                        </MenuItem>
                      </>
                    }
                  />
                </div>
                <Divider />

                {this.state.loading ? (
                  <div style={{ height: 600, overflow: "hidden" }}>
                    <TableLoader />
                  </div>
                ) : (
                  <>
                    {this.state.globalSegment.length !== 0 ? (
                      <>
                        <SegmentTable
                          openDelete={this.openDelete}
                          handleClickOpen={this.handleClickOpen}
                          userData={this.state.globalSegment}
                          innerLoading={this.state.innerLoading}
                          headers={[
                            "Name",
                            "Slug",
                            "Type",
                            "UUID",
                            "Active",
                            " "
                          ]}
                        />

                        {this.state.data.length !== 0 && (
                          <>
                            <DeleteModal
                              open={this.state.openDelete}
                              header="Delete Global Segment"
                              msg="segment"
                              name={`${this.state.data.name}`}
                              closeFn={this.handleClose}
                              delFn={this.handleDelete}
                            />
                            <LoadingModal
                              open={this.state.openLoading}
                              text={`${this.state.data.name}`}
                              cancelFn={this.handleCancel}
                            />

                            <SuccessModal
                              open={this.state.openSuccess}
                              text={`You have removed “${this.state.data.name}”`}
                              closeFn={this.handleCloseSucess}
                            />
                          </>
                        )}
                        <div style={{ width: "100%" }}>
                          <Divider />

                          <Pagination
                            paginateFn={this.paginate}
                            totalItems={this.state.paginateList.length}
                            itemsPerPage={6}
                          />
                        </div>
                      </>
                    ) : (
                      <TableNoResult
                        headerText="Global Rapid Response"
                        mainMessage="No rapid response segments have been created"
                        subMessage={
                          <span>
                            Would you like to create one? Just hit the "New
                            Segment" button
                          </span>
                        }
                        renderButton={
                          <HeaderButton
                            buttonText="New Segment"
                            openFunction={this.openNewSegment}
                          />
                        }
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(this.state.openSnackBar)}
            autoHideDuration={3000}
            onClose={this.closeSnackBar}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.openSnackBar}</span>}
            action={[
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
        </>
      </div>
    );
  }
}
