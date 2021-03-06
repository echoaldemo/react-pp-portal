/* eslint-disable */
import React, { Component } from "react";
import SwapIcon from "@material-ui/icons/SwapHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
// import NewSegment from "./components/NewSegment";
import {
  Paper,
  Divider,
  Snackbar,
  IconButton,
  Typography,
  Dialog,
  MenuItem
} from "@material-ui/core";

//Header
import {
  HeaderButton,
  Pagination,
  SearchBar,
  TableLoader,
  DeleteModal,
  LoadingModal,
  SuccessModal
} from "common-components";

import SegmentTable from "./components/SegmentTable";
import { get, patch, cancel } from "utils/api"; // eslint-disable-line
import { Clear } from "@material-ui/icons";
import VariableModal from "./components/VariableModal";
import BackIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

interface IProps {
  match: any;
}

interface IState {
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
  segmentVariables: any;
  searchData: any;
  segmentData: any;
  openLoading1: boolean;
  openSuccess1: boolean;
}

export default class GRapidRSegmentsVariable extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
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
      openSuccess: false,
      segmentVariables: [],
      searchData: [],
      segmentData: [],
      openLoading1: false,
      openSuccess1: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      loading: true
    });
    var arrVar: any = [];
    get(
      `/pitch/global/rapid-response/segments/${this.props.match.params.uuid}`
    ).then((res: any) => {
      for (let [key, value] of Object.entries(res.data.variables)) {
        arrVar.push({ name: key, key: `{{global.${key}}}`, values: value });
      }
      this.setState({
        segmentVariables: arrVar,
        innerLoading: false,
        loading: false,
        paginateList: arrVar,
        filterlist: arrVar,
        searchData: arrVar,
        segmentData: res.data
      });
    });
  };

  paginate = (from: number, to: number) => {
    this.setState({
      segmentVariables: this.state.paginateList.slice(from, to)
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

  UpdateSegment = (data: any, label: string) => {
    this.setState({
      data,
      openLoading1: true
    });
    var newVar: any = new Object(this.state.segmentData.variables);
    newVar[data.name] = data.values;
    var submitdata = {
      name: this.state.segmentData.name,
      active: this.state.segmentData.active,
      type: this.state.segmentData.type,
      xml: this.state.segmentData.xml,
      variables: newVar
    };
    if (label === "edit") {
      patch(
        `/pitch/global/rapid-response/segments/${this.state.segmentData.uuid}/`,
        submitdata
      )
        .then((res: any) => {
          if (res.status !== 400) {
            this.setState({
              openSnackBar: "Variable Updated!",
              loading: true,
              open: false,
              openLoading1: false
            });
            this.fetchData();
          }
        })
        .catch((err: any) => {
          if (err) console.log(err);
          return this.showErrorMessage("Error Updating! Please Try Again");
        });
    } else if (label === "create") {
      patch(
        `/pitch/global/rapid-response/segments/${this.state.segmentData.uuid}/`,
        submitdata
      )
        .then((res: any) => {
          if (res.status !== 400) {
            this.setState({
              openSnackBar: "Variable Created!",
              loading: true,
              open: false,
              openLoading1: false
            });
            this.fetchData();
          }
        })
        .catch((err: any) => {
          if (err) console.log(err);
          return this.showErrorMessage("Error Creating! Please Try Again");
        });
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

  openNewVariable = () => {
    this.setState({
      data: "",
      open: !this.state.open
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
  handleCloseSucess1 = () => {
    this.setState({
      openSuccess1: false
    });
  };

  handleDelete = () => {
    //code here
    this.setState({
      openDelete: false,
      openLoading: true
    });
    var newVar: any = new Object(this.state.segmentData.variables);
    delete newVar[this.state.data.name];
    var submitdata = {
      name: this.state.segmentData.name,
      active: this.state.segmentData.active,
      type: this.state.segmentData.type,
      xml: this.state.segmentData.xml,
      variables: newVar
    };
    patch(
      `/pitch/global/rapid-response/segments/${this.state.segmentData.uuid}/`,
      submitdata
    )
      .then((res: any) => {
        if (res.status !== 400) {
          this.setState({
            openSuccess: true,
            openLoading: false
          });
        }
      })
      .catch((err: any) => {
        if (err) console.log(err);
        return this.showErrorMessage("Error Deleting! Please Try Again");
      });
  };

  render() {
    return (
      <div
        style={{
          margin: "0 auto"
        }}
      >
        <>
          <Link
            to={"/manage/global-rapid-response/segments"}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#1194f6",
              textDecoration: "none",
              minWidth: 300,
              marginLeft: -6,
              marginBottom: 20
            }}
          >
            <BackIcon /> Back to Rapid Response Segments
          </Link>
          <div className="header-container" style={{ paddingBottom: 30 }}>
            <Typography variant="h5">Segment Variables</Typography>
            <HeaderButton
              openFunction={
                this.state.loading === true ? () => null : this.openNewVariable
              }
              buttonText="New Variable"
            />
          </div>
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
                    title="A Segment Variable"
                    userData={this.state.searchData}
                    headers={["key", "values", "name"]}
                    loading={this.state.loading}
                    setActiveDataMethod={this.setActiveDataMethod}
                    settings={
                      <>
                        <MenuItem
                          onClick={() => this.setState({ open: true })}
                          style={{
                            color: "#777777",
                            width: 250,
                            paddingTop: 0,
                            paddingBottom: 0
                          }}
                        >
                          <SwapIcon />
                          <Typography style={{ marginLeft: 40 }}>
                            Change Values
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => this.setState({ openDelete: true })}
                          style={{
                            color: "#777777",
                            width: 250,
                            paddingTop: 0,
                            paddingBottom: 0
                          }}
                        >
                          <DeleteIcon />
                          <Typography style={{ marginLeft: 40 }}>
                            Delete
                          </Typography>
                        </MenuItem>
                      </>
                    }
                  />
                </div>

                <Divider />

                <Dialog
                  fullWidth={true}
                  maxWidth="md"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <VariableModal
                    closeFn={this.handleClose}
                    data={this.state.data}
                    UpdateSegment={this.UpdateSegment}
                  />
                </Dialog>
                <LoadingModal
                  open={this.state.openLoading1}
                  text={`${this.state.data.name}`}
                  cancelFn={this.handleCancel}
                />

                {/* <Dialog open={this.state.openSuccess1}>
                  <SuccessModal
                    text={`You have added new varaible “${this.state.data.name}”`}
                    closeFn={this.handleCloseSucess1}
                  />
                </Dialog> */}
                {this.state.loading ? (
                  <div style={{ height: 600, overflow: "hidden" }}>
                    <TableLoader />
                  </div>
                ) : (
                  <>
                    {this.state.segmentVariables.length !== 0 ? (
                      <>
                        <SegmentTable
                          openDelete={this.openDelete}
                          handleClickOpen={this.handleClickOpen}
                          userData={this.state.segmentVariables}
                          innerLoading={this.state.innerLoading}
                          headers={[
                            "Key",
                            " ",
                            "Value",
                            "Variable Usage",
                            " ",
                            " ",
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
                              text={`One moment. We're removing the “${this.state.data.name}” variable...`}
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
                      <div style={{ width: "100%", height: 600 }}>
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
                              No Segment Variables have been created
                            </h4>
                          </div>
                        </div>
                      </div>
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
        </>
      </div>
    );
  }
}
