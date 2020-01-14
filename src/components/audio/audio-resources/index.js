import React, { Component } from "react";
import axios from "axios";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import {
  Divider,
  CssBaseline,
  Container,
  Grid,
  Typography,
  Tooltip
} from "@material-ui/core";

import AddAudioResource from "./components/AddAudioResource";
import LoadingAddAudioResource from "./components/LoadingAddAudioResource";
import AudioResourceCreated from "./components/AudioResourceCreated";
import UploadAudioResource from "./components/UploadAudioResource";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Toast from "../common-components/toast";

import {
  Pagination,
  SearchBar,
  TableLoader,
  HeaderButton,
  HeaderLink
} from "common-components";

import useStyles from "./audioresource.styles";
import AudioResourceTable from "./AudioResourceTable";

//import { get, remove, post, patch } from "../../../utils/api";
import { mock, profile } from "./mock";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#1194f6" },
    error: { 500: "#ff504d" }
  }
});

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

class AudioResources extends Component {
  constructor() {
    super();
    this.state = {
      addResourceModal: false,
      loadingAddAudioResource: false,
      audioResourceCreated: false,
      currentResourceInfo: null,
      uploadResourceModal: false,
      errorMessage: null,
      audioResourceData: [],
      popper: null,
      editUUID: "",
      search: "",
      loadingType: "",
      deleteConfirmation: false,
      toast: false,
      toastType: "check",
      toastMessage: "",
      copiedUIID: "",
      profile: [],
      user_group: 10,
      editRow: [],
      undo: false,
      filterlist: [],
      paginateList: []
    };
  }

  handleCancelAddAudioResource = () => {
    source.cancel("Operation canceled by the user.");
    this.setState({
      loadingAddAudioResource: false,
      addResourceModal: false,
      currentResourceInfo: null
    });
    this.handleClose();
  };

  handleAudioResourceCreated = type => {
    if (type === "close") {
      this.setState({ audioResourceCreated: false, currentResourceInfo: null });
    }
  };

  handleUploadResourceModal = type => {
    if (type === "open") {
      this.setState({ uploadResourceModal: true, audioResourceCreated: false });
    } else {
      this.setState({ uploadResourceModal: false, currentResourceInfo: null });
    }
  };
  handleCloseConfirmation = () => {
    this.setState({
      deleteConfirmation: false
    });
  };
  handleCloseToast = () => {
    this.setState({
      toast: false
    });
  };
  handleToast = () => {
    this.setState({
      toast: true,
      toastType: "check",
      toastMessage: ""
    });
  };

  saveAudioName = name => {
    /* if (!this.state.currentResourceInfo) {
      this.setState({
        loadingAddAudioResource: true,
        addResourceModal: false,
        loadingType: "audioName"
      });
      post(`/pitch/global/audio/resources/`, {
        name: name
      }).then(res => {
        this.setState({
          loadingAddAudioResource: false,
          audioResourceCreated: true,
          currentResourceInfo: res.data,
          audioResourceData: [res.data, ...this.state.audioResourceData]
        });
      });
    } else {
      this.setState({
        loadingAddAudioResource: true,
        loadingType: "audioName"
      });
      patch(
        `/pitch/global/audio/resources/${this.state.currentResourceInfo.uuid}/`,
        {
          name: name,
          company: this.state.currentResourceInfo.company
        }
      )
        .then(res => {
          this.setState({
            loadingAddAudioResource: false,
            currentResourceInfo: null,
            addResourceModal: false,
            toast: true,
            toastMessage: `Audio successfully updated`,
            toastType: "check"
          });
          let index = this.state.audioResourceData.findIndex(
            obj => obj.uuid == res.data.uuid
          );
          this.handleClose();
          if (index !== -1) {
            this.state.audioResourceData[index].name = res.data.name;
            this.forceUpdate();
          }
        })
        .catch(() =>
          this.setState({
            loadingAddAudioResource: false,
            currentResourceInfo: null,
            addResourceModal: false
          })
        );
    } */
  };

  uploadResourceAudio = (file, modification, convert, fadeIn, fadeOut) => {
    /* this.setState({
      uploadResourceModal: false,
      loadingAddAudioResource: true,
      loadingType: "audioFile"
    });
    post(
      `/pitch/global/audio/resources/${this.state.currentResourceInfo.uuid}/upload/?no_modifications=${modification}&convert=${convert}&fade_in=${fadeIn}&fade_out=${fadeOut}`,
      file
    )
      .then(res => {
        this.setState({
          loadingAddAudioResource: false,
          currentResourceInfo: null
        });
        let index = this.state.audioResourceData.findIndex(
          obj => obj.uuid == res.data.audio
        );
        if (index !== -1) {
          this.state.audioResourceData[index].file = res.data;
          this.setState({
            toast: true,
            toastMessage: `Audio successfully uploaded`,
            toastType: "check"
          });
          this.forceUpdate();
        }
      })
      .catch(res => {
        this.setState({
          loadingAddAudioResource: false,
          errorMessage: res,
          currentResourceInfo: null
        });
        alert("Error Uploading Audio File");
      }); */
  };

  componentDidMount() {
    document.title = "Audio Resources";
    /* get("/identity/user/profile/").then(profileData => {
      this.setState({
        profile: profileData.data,
        user_group: profileData.data.groups[0]
      });
    });
    get("/pitch/global/audio/resources/").then(res => {
      this.setState({
        audioResourceData: [...res.data],
        filterlist: [...res.data],
        paginateList: [...res.data]
      });
    }); */
    /* mock */
    this.setState({
      profile: profile,
      user_group: profile.groups[0],
      audioResourceData: mock,
      filterlist: mock,
      paginateList: mock
    });
  }

  handleDelete = () => {
    let index = this.state.audioResourceData.findIndex(
      obj => obj.uuid == this.state.editUUID
    );
    let newArr = this.state.audioResourceData;
    newArr.splice(index, 1);
    this.forceUpdate();
    this.setState({
      audioResourceData: newArr,
      currentResourceInfo: null,
      toast: true,
      toastMessage: "Audio Deleted",
      toastType: "caution",
      undo: true
    });
  };

  undoDelete = () => {
    let newArr = this.state.audioResourceData;
    newArr.unshift(this.state.editRow);
    this.setState({ audioResourceData: newArr, undo: false, toast: false });
  };

  finalDelete = () => {
    /* remove(`/pitch/global/audio/resources/${this.state.editUUID}/`); */
  };

  handleClick = event => {
    this.setState({ popper: event });
  };

  handleClose = () => {
    this.setState({ popper: null, currentResourceInfo: null });
  };

  handleAddResourceModal = type => {
    source = CancelToken.source();
    if (type === "open") {
      this.setState({ addResourceModal: true });
    } else if (type === "close") {
      this.setState({ addResourceModal: false, currentResourceInfo: null });
    }
  };

  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  handleFilter = url => {
    this.setState({ innerLoading: true });
    const token = localStorage.getItem("ngStorage-ppToken");
    axios
      .get(url, {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => {
        this.setState({ userData: res.data });
        this.setState({ innerLoading: false });
      });
  };

  //reuse
  FilterApplyButton = params => {
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.realm !== " " && { realms: params.realm }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    /* get("/pitch/global/audio/resources/", parameter).then(res => {
      this.setState({
        audioResourceData: [...res.data],
        filterlist: [...res.data],
        paginateList: [...res.data]
      });
    }) */
  };

  paginate = (from, to) => {
    this.setState({
      audioResourceData: this.state.paginateList.slice(from, to)
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <main className={classes.content}>
            <Container maxWidth="xl" className={classes.container}>
              <div className={classes.navwrapper}>
                <HeaderLink
                  menu={[
                    {
                      title: "Voice",
                      path: "/manage/audio/pitch"
                    }
                  ]}
                  title="Audio Resources"
                />
                <HeaderButton
                  buttonText="New Audio Resource"
                  openFunction={() => this.handleAddResourceModal("open")}
                />
              </div>
              <div style={{ marginTop: 36 }}>
                <SearchBar
                  title="Audio Resource"
                  userData={this.state.filterlist}
                  headers={["name", "slug", "uuid"]}
                />
                <Divider />

                <Divider />
                <div style={{ overflow: "auto" }}>
                  {this.state.audioResourceData.length != 0 ? (
                    <React.Fragment>
                      <AudioResourceTable
                        userData={this.state.audioResourceData}
                        // handleUpdated={this.handleUpdate}
                        // innerLoading={this.state.innerLoading}
                        filterlist={this.state.filterlist}
                        headers={["Name", "SLUG", "UUID", "Status", ""]}
                        upload={campaign => {
                          this.setState({
                            currentResourceInfo: campaign,
                            uploadResourceModal: true
                          });
                        }}
                        edit={row => {
                          this.setState({
                            editRow: row,
                            editUUID: row.uuid,
                            currentResourceInfo: row
                          });
                        }}
                        openModal={() => this.handleAddResourceModal("open")}
                        handleCLose={() => this.handleClose()}
                        deleteConfirmation={() => {
                          this.setState({ deleteConfirmation: true });
                        }}
                        editUUID={this.state.editUUID}
                      />
                      <div style={{ width: "100%" }}>
                        <Divider />
                        {Boolean(this.state.paginateList.length) && (
                          <Pagination
                            paginateFn={this.paginate}
                            totalItems={this.state.paginateList.length}
                            paginateList={this.state.paginateList}
                            itemsPerPage={7}
                          />
                        )}
                      </div>
                    </React.Fragment>
                  ) : (
                    <Grid item xs={12}>
                      <div className={classes.largeTitle} id="table-title">
                        <Typography
                          variant="h3"
                          className={classes.headerTitle}
                        >
                          {this.toTitleCase("Audio Resources")}
                        </Typography>
                      </div>
                      <div className={classes.emptyPitch}>
                        <TableLoader />
                      </div>
                    </Grid>
                  )}
                </div>
              </div>
            </Container>
          </main>
        </ThemeProvider>

        {this.state.addResourceModal ? (
          <AddAudioResource
            addResourceModal={this.state.addResourceModal}
            handleAddResourceModal={this.handleAddResourceModal}
            saveAudioName={this.saveAudioName}
            currentResourceInfo={this.state.currentResourceInfo}
            handleClose={this.handleClose}
          />
        ) : null}

        {this.state.loadingAddAudioResource ? (
          <LoadingAddAudioResource
            handleCancelAddAudioResource={this.handleCancelAddAudioResource}
            loadingType={this.state.loadingType}
            currentResourceInfo={this.state.currentResourceInfo}
          />
        ) : null}

        {this.state.audioResourceCreated ? (
          <AudioResourceCreated
            currentResourceInfo={this.state.currentResourceInfo}
            handleAudioResourceCreated={this.handleAudioResourceCreated}
            handleUploadResourceModal={this.handleUploadResourceModal}
          />
        ) : null}

        {this.state.uploadResourceModal ? (
          <UploadAudioResource
            currentResourceInfo={this.state.currentResourceInfo}
            handleUploadResourceModal={this.handleUploadResourceModal}
            uploadResourceAudio={this.uploadResourceAudio}
          />
        ) : null}

        <DeleteConfirmation
          deleteAudioModal={this.state.deleteConfirmation}
          deleteAudioClose={this.handleCloseConfirmation}
          id={this.state.editUUID}
          deleteAudio={this.handleDelete}
        />
        <Toast
          undo={this.state.undo}
          undoAction={this.undoDelete}
          finalDelete={this.finalDelete}
          open={this.state.toast}
          handleClose={this.handleCloseToast}
          toastType={this.state.toastType}
          message={this.state.toastMessage}
          vertical={"top"}
          horizontal={"right"}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(AudioResources);
