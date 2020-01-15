import React, { Component } from "react";
// import NewSegment from "./components/NewSegment";
import {
  Paper,
  Divider,
  Snackbar,
  IconButton,
  Typography,
  Dialog
} from "@material-ui/core";

//Header
import HeaderContainer from "../../../../common-components/HeaderContainer/HeaderContainer";
import HeaderButton from "../../../../common-components/HeaderButton/HeaderButton";
import SegmentTable from "./components/SegmentTable";
import { get, patch, post, remove, cancel } from "../../../../../utils/api";
import SEO from "../../../../../utils/seo";
import Pagination from "../../../../common-components/pagination/PaginationV2";
import SearchBar from "../../../../common-components/search-bar/SearchBar";
import TableLoader from "../../../../common-components/table-loader/TableLoader";
import { Clear } from "@material-ui/icons";
import DeleteModal from "../../../../common-components/delete-modal/DeleteModal";
import LoadingModal from "../../../../common-components/loading-modal/LoadingModal";
import SuccessModal from "../../../../common-components/success-modal/SuccessModal";
import VariableModal from "./components/VariableModal";
import BackIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

export default class RRSegments extends Component {
  constructor(props) {
    super();
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
      openLoading1: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    var arrVar = [];
    get(`/pitch/global/segments/${this.props.match.params.uuid}`).then(res => {
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
  }

  fetchData = () => {
    this.setState({
      loading: true
    });
    var arrVar = [];
    get(`/pitch/global/segments/${this.props.match.params.uuid}`).then(res => {
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

  paginate = (from, to) => {
    this.setState({
      segmentVariables: this.state.paginateList.slice(from, to)
    });
  };

  handlClose = () => {
    this.setState({
      open: false
    });
  };

  handleClickOpen = data => {
    this.setState({
      data,
      open: !this.state.open,
      dataXML: data.xml
    });
  };

  setActiveDataMethod = data => {
    this.setState({
      data
    });
  };

  handleChangeXML = data => {
    this.setState({
      dataXML: data
    });
  };

  showErrorMessage = error => {
    this.setState({
      error
    });
  };

  UpdateSegment = (data, label) => {
    this.setState({
      data,
      openLoading1: true
    });
    var newVar = new Object(this.state.segmentData.variables);
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
        `/pitch/global/segments/${this.state.segmentData.uuid}/`,
        submitdata
      )
        .then(res => {
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
        .catch(err => {
          if (err) console.log(err);
          return this.showErrorMessage("Error Updating! Please Try Again");
        });
    } else if (label === "create") {
      patch(
        `/pitch/global/segments/${this.state.segmentData.uuid}/`,
        submitdata
      )
        .then(res => {
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
        .catch(err => {
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
  openDelete = data => {
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
    var newVar = new Object(this.state.segmentData.variables);
    delete newVar[this.state.data.name];
    var submitdata = {
      name: this.state.segmentData.name,
      active: this.state.segmentData.active,
      type: this.state.segmentData.type,
      xml: this.state.segmentData.xml,
      variables: newVar
    };
    patch(`/pitch/global/segments/${this.state.segmentData.uuid}/`, submitdata)
      .then(res => {
        if (res.status !== 400) {
          this.setState({
            openSuccess: true,
            openLoading: false
          });
        }
      })
      .catch(err => {
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
        <SEO title="Edit Segement Variables" />
        <>
          <Link
            to={"/manage/global-pitch-segments/"}
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
            <BackIcon /> Back to Global Segments
          </Link>
          <HeaderContainer style={{ paddingBottom: 30 }}>
            <Typography variant="h5">Segment Variables</Typography>
            <HeaderButton
              openFunction={
                this.state.loading === true ? () => null : this.openNewVariable
              }
              buttonText="New Variable"
            />
          </HeaderContainer>
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
                  />
                </div>
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
                <Dialog open={this.state.openLoading1}>
                  <LoadingModal
                    text={`${this.state.data.name}`}
                    cancelFn={this.handleCancel}
                  />
                </Dialog>
                <Divider />
                {this.state.loading ? (
                  <div style={{ height: 600, overflow: "hidden" }}>
                    <TableLoader />
                  </div>
                ) : (
                  <>
                    {this.state.segmentVariables.length !== 0 ? (
                      <>
                        <SegmentTable
                          closeF={() => null}
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
                            <Dialog
                              open={this.state.openDelete}
                              onClose={this.handleClose}
                            >
                              <DeleteModal
                                header="Delete Global Segment"
                                msg="segment"
                                name={`${this.state.data.name}`}
                                closeFn={this.handleClose}
                                delFn={this.handleDelete}
                              />
                            </Dialog>
                            <Dialog open={this.state.openLoading}>
                              <LoadingModal
                                text={`${this.state.data.name}`}
                                cancelFn={this.handleCancel}
                              />
                            </Dialog>

                            <Dialog open={this.state.openSuccess}>
                              <SuccessModal
                                text={`You have removed “${this.state.data.name}”`}
                                closeFn={this.handleCloseSucess}
                              />
                            </Dialog>
                          </>
                        )}
                        <div style={{ width: "100%" }}>
                          <Divider />

                          <Pagination
                            paginateFn={this.paginate}
                            totalItems={this.state.paginateList.length}
                            paginateList={this.state.paginateList}
                            itemsPerPage={6}
                          />
                        </div>
                      </>
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
