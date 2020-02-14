import React, { Component } from "react";
import {
  withStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
  Divider,
  Fab,
  Tooltip,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Dropdown from "../../common-components/dropdown/Mobile";
import DropdownDesktop from "../../common-components/dropdown/Desktop";
import Tabs from "../../common-components/tabs/Mobile";
import TabsDesktop from "../../common-components/tabs/Desktop";
import useStyles from "./styles";
import Filter from "./prospect_audio/Filter";
import Search from "./prospect_audio/Search";
import Table from "./prospect_audio/Table";
import Toast from "../../common-components/toast";
import MainAddNewAudio from "../../common-components/add-new-voice/MainAddNewVoice";
// import Loader from '../../common-components/loader';
import UnrecordedCard from "../../common-components/cards/Unrecorded";
import RerecordCard from "../../common-components/cards/Rerecord";
import RecordedCard from "../../common-components/cards/Recorded";
import { get, patch, post } from "utils/api";
import { TableLoader, HeaderLink } from "common-components";
interface State {
  loader?: boolean;
  user: number;
  links: any;
  state: string;
  campaigns: any;
  versions: any;
  selected: any;
  tabSelected: any;
  audioToBeUploaded?: any;
  unrecorded: any;
  rerecord: any;
  recorded: any;
  unrecordedTblName: any;
  rerecordTblName: any;
  recordedTblName: any;
  display: any;
  displayRerecord: any;
  displayRecorded: any;
  filtered: boolean;
  searchVoice: any;
  searchDialogRecord: any;
  searchDialogRerecord: any;
  searchDialogUnrecord: any;
  openAddNew: boolean;
  showTable: boolean;
  audioFile: any;
  recordedName: any;
  fileName: any;
  voices: any;
  user_data: any;
  selectedCampaign: any;
  selectedVersion: any;
  token?: any;
  audio: any;
  fetchedUnrecorded: boolean;
  fetchedRerecord: boolean;
  fetchedRecorded: boolean;
  isAudioLoading: boolean;
  campaignSelected: any;
  versionSelected: any;
  openToast: boolean;
  toastType: any;
  message: any;
  vertical: any;
  horizontal: any;
  campaignList: any;
  unrecordedList: any;
  unrecordedSelected: any;
  error: boolean;
  file: any;
  addNewVoiceModal: boolean;
  uploadLoading: boolean;
  user_group: any;
  profile: any;
  user_uuid: any;
  currentMode: any;
  isAudioLoadingRerec: boolean;
  addNewVoiceModal_Desktop?: boolean;
  [x: number]: any;
  voiceSelected?: any;
  anchorEl?: any;
  fetchedUploadAudio: any;
  campaign_uuids: any;
  prospect_campaigns: any;
  defaultVoice: any;
}
class Prospect extends Component<{ location: any }, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: 1,
      links: [
        { name: "prospect audio", link: "/prospect" },
        { name: "pitch audio", link: "/pitch" },
        { name: "phrase audio", link: "/phrase" }
      ],
      state: "DATA_LOADED",
      campaigns: [],
      versions: [],
      selected: "",
      tabSelected: 0,

      unrecorded: [],
      rerecord: [],
      recorded: [],
      unrecordedTblName: ["Name", "Dialog", "Action"],
      rerecordTblName: ["Name", "Dialog", "Action"],
      recordedTblName: ["Name", "Audio", "Action"],
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      filtered: false,
      searchVoice: null,
      searchDialogRecord: "",
      searchDialogRerecord: "",
      searchDialogUnrecord: "",
      openAddNew: false,
      showTable: false,
      audioFile: "",
      recordedName: "",
      fileName: "",
      voices: [],
      user_data: [],
      selectedCampaign: [],
      selectedVersion: "",
      audio: [],
      fetchedUploadAudio: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false,
      isAudioLoading: false,
      campaignSelected: "",
      versionSelected: "",
      openToast: false,
      toastType: "",
      message: "",
      vertical: "top",
      horizontal: "right",
      campaignList: [],
      unrecordedList: [],
      unrecordedSelected: "",
      token: "",
      error: false,
      file: null,
      campaign_uuids: [],
      prospect_campaigns: [],
      addNewVoiceModal: false,
      uploadLoading: false,
      user_group: 10,
      profile: [],
      user_uuid: "",
      currentMode: null,
      isAudioLoadingRerec: false,
      defaultVoice: null
    };
  }
  async componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        defaultVoice: this.props.location.state
      });
      await this.selectedVoice(this.props.location.state.uuid);
    }
    document.title = "Prospect Audio";
    var tokenLogin = localStorage.getItem("ngStorage-ppToken");
    if (localStorage.getItem("error")) {
      this.setState({
        openToast: true,
        toastType: "caution",
        message: `Your user does not have access to that page. You may need to sign-in.`,
        vertical: "top",
        horizontal: "right"
      });
      localStorage.removeItem("error");
    }
    this.setState({ token: tokenLogin });
    get("/identity/user/profile/").then((profileData: any) => {
      this.setState({
        state: "DATA_LOADED",
        profile: profileData.data,
        user_uuid: profileData.data.uuid,
        user_group: profileData.data.groups[0]
      });
      if (profileData.data.groups[0] === 10) {
        this.recorderCamp(profileData.data.uuid);
      } else {
        get("/identity/user/manage/list/?groups=10&limit=100").then(
          (voiceData: any) => {
            this.setState({
              state: "DATA_LOADED",
              voices: voiceData.data.results
            });
          }
        );
      }
    });
  }
  recorderCamp = async (uuid: any) => {
    this.setState({
      searchVoice: uuid
    });
    let campaigns: any = [],
      user_data: any = [];
    const data1 = await get(`/identity/user/profile/`).then((user: any) => {
      user_data = user.data.campaigns;
      this.setState({
        state: "DATA_LOADED",
        user_data: user.data
      });
    });
    const data2 = await get(`/identity/campaign/list/`)
      .then((campaign: any) => {
        campaigns = campaign.data.filter((camp: any) => {
          return user_data.indexOf(camp.uuid) > -1;
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    Promise.all([data1, data2]).then(() => {
      if (campaigns.length) {
        this.setState({
          campaigns
        });
      } else {
        this.setState({
          openToast: true,
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right"
        });
      }
    });
  };
  toTitleCase = (str: any) => {
    return str.replace(/\w\S*/g, function(txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  tabSelected = (val: any) => {
    this.setState({
      tabSelected: val
    });
  };
  selectCampaign = (value: any, uuid: any) => {
    this.setState({
      error: false,
      selectedCampaign: value
    });
    get(`/identity/company/${uuid}/`).then((res: any) => {
      get(`/pitch/company/${res.data.slug}/campaign/${value}/`)
        .then((versions: any) => {
          if (versions.data.versions.length > 0) {
            this.setState({
              versions: versions.data.versions.reverse()
            });
          } else {
            this.setState({
              openToast: true,
              toastType: "caution",
              message: `There are no pitch versions available for this campaign.`,
              vertical: "top",
              horizontal: "right"
            });
          }
        })
        .catch((err: any) => {
          this.setState({
            openToast: true,
            toastType: "caution",
            message: `There are no pitch versions available for this campaign.`,
            vertical: "top",
            horizontal: "right"
          });
        });
    });
  };

  selectVoiceCampaign = (value: any, uuid: any) => {
    this.setState({
      campaignSelected: value
    });
    get(`/identity/company/${uuid}/`).then((res: any) => {
      get(`/pitch/company/${res.data.slug}/campaign/${value}/`).then(
        (ver: any) => {
          this.setState({
            versions: ver.data.versions.reverse()
          });
        }
      );
    });
  };

  // this function is used for main adding of audio

  selectVersion = (value: any) => {
    this.setState({
      selectedVersion: value
    });
    get(
      `/pitch/audio/version/${value}/prospect/${this.state.user_data.uuid}/unrecorded/`
    ).then((unrecorded: any) => {
      this.setState({
        unrecordedList: unrecorded.data
      });
    });
  };

  selectUnrecorded = (value: any) => {
    this.setState({
      unrecordedSelected: value
    });
  };

  filterData = (pitch_version: any) => {
    this.setState({
      showTable: false,
      loader: true
    });
    //UNCOMMENT FOR ACTUAL DATA
    const data1 = get(
      `/pitch/audio/version/${pitch_version}/prospect/${this.state.user_data.uuid}/unrecorded/`
    ).then((unrecorded: any) => {
      this.setState({
        display: unrecorded.data,
        fetchedUnrecorded: unrecorded.status === 200 ? true : false
      });
    });

    const data2 = get(
      `/pitch/audio/version/${pitch_version}/prospect/${this.state.user_data.uuid}/rerecord/`
    ).then((rerecord: any) => {
      this.setState({
        displayRerecord: rerecord.data,
        fetchedRerecord: rerecord.status === 200 ? true : false
      });
    });
    const data3 = get(
      `/pitch/audio/version/${pitch_version}/prospect/${this.state.user_data.uuid}/recorded/`
    ).then((recorded: any) => {
      this.setState({
        displayRecorded: recorded.data,
        fetchedRecorded: recorded.status === 200 ? true : false
      });
    });
    Promise.all([data1, data2, data3]).then(() => {
      this.setState({
        showTable: true,
        loader: false
      });
    });
  };
  resetFilters = (val: any) => {
    this.setState({
      display: [],
      //filtered: false,
      showTable: val
    });
  };
  handleChange = (key: any, val: any) => {
    this.setState({
      [key]: val
    });
  };
  selectedVoice = async (val: any) => {
    this.setState({
      searchVoice: val,
      campaigns: [],
      versions: [],
      voiceSelected: val
    });
    let campaigns: any = [],
      user_data: any = [];
    const data1 = await get(`/identity/user/manage/${val}/`).then(
      (user: any) => {
        user_data = user.data.campaigns;
        this.setState({
          state: "DATA_LOADED",
          user_data: user.data
        });
      }
    );
    const data2 = await get(`/identity/campaign/list/`)
      .then((campaign: any) => {
        campaigns = campaign.data.filter((camp: any) => {
          return user_data.indexOf(camp.uuid) > -1;
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    Promise.all([data1, data2]).then(() => {
      if (campaigns.length) {
        this.setState({
          campaigns
        });
      } else {
        this.setState({
          openToast: true,
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right"
        });
      }
    });
  };

  deleteAudio = (val: any) => {
    this.state.recorded.map((data: any, id: any) => {
      if (val === data.name) {
        this.state.recorded.splice(id, 1);
      }
      return null;
    });
  };
  handleAudio = (e: any) => {
    this.setState({ audioFile: e.target.value });
    let files = e.target.files;
    var uploadFile = new FormData();
    uploadFile.append("file", files[0]);
    this.setState({
      fileName: files[0].name,
      file: uploadFile
    });
  };
  removeAudio = () => {
    this.setState({
      audioFile: "",
      fileName: ""
    });
  };
  getRecordedName = (val: any) => {
    this.setState({
      recordedName: val
    });
    this.state.unrecorded.map((data: any, id: any) => {
      if (val === data.name) {
        this.state.unrecorded.splice(id, 1);
      }
      return null;
    });
  };
  addToRerecord = (version: any, voice: any, key: any) => {
    this.setState({
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(`/pitch/audio/version/${version}/prospect/${voice}/${key.key}/`, {
      rerecord: true
    })
      .then((res: any) => {
        this.filterData(this.state.selectedVersion);
        if (res.status === 201 || res.status === 200) {
          this.setState({
            openToast: true,
            toastType: "check",
            message: `Successfully uploaded`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        } else {
          this.setState({
            openToast: true,
            toastType: "caution",
            message: `Request failed`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        }
      })
      .catch((err: any) => {
        this.setState({
          openToast: true,
          toastType: "caution",
          message: `Request failed`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false
        });
      });
  };
  openAddNewDialog() {
    this.setState({
      openAddNew: true
    });
  }
  closeAddNewDialog() {
    this.setState({
      openAddNew: false,
      selectedCampaign: "",
      selectedVersion: "",
      unrecordedSelected: ""
    });
  }
  savingAudio = () => {
    this.setState(
      prevState => ({
        openAddNew: !prevState.openAddNew
      })
      // () => this.showSuccessBar()
    );
  };
  getUpdatedRecorded = (val: any) => {
    this.setState({
      recorded: val
    });
    this.state.unrecorded.map((data: any, id: any) => {
      if (val.name === data.name) {
        this.state.unrecorded.splice(id, 1);
      }
      return null;
    });
  };
  playAudio = (version: any, voice: any, key: any) => {
    get(`/pitch/audio/version/${version}/prospect/${voice}/${key}/`).then(
      (res: any) => {
        this.setState({ audio: res.data, isAudioLoading: false });
      }
    );
  };
  stopLoading = () => {
    this.setState({ isAudioLoading: false });
  };
  showLoader = (type: any) => {
    if (type === "recorded") {
      this.setState({ isAudioLoading: true });
    } else {
      this.setState({ isAudioLoadingRerec: true });
    }
  };
  removeAudioPlayed = () => {
    this.setState({ audio: [] });
  };
  rerecordAudio = (version: any, voice: any, key: any) => {
    this.setState({
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(`/pitch/audio/version/${version}/prospect/${voice}/${key}/`, {
      rerecord: true
    })
      .then((res: any) => {
        this.filterData(this.state.selectedVersion);
        if (res.status === 201 || res.status === 200) {
          this.setState({
            openToast: true,
            toastType: "check",
            message: `Successfully added to rerecord`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        } else {
          this.setState({
            openToast: true,
            toastType: "caution",
            message: `Request failed`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        }
      })
      .catch((err: any) => {
        this.setState({
          openToast: true,
          toastType: "caution",
          message: `Request failed`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false
        });
      });
  };
  uploadAudio = (
    voice: any,
    version: any,
    slug: any,
    key: any,
    file: any,
    modification: any,
    fadein: any,
    fadeout: any,
    convert: any
  ) => {
    if (file == null) {
      this.setState({
        openToast: true,
        toastType: "caution",
        message: `Please Select Audio File`,
        vertical: "top",
        horizontal: "right"
      });
    } else {
      this.setState({
        uploadLoading: true
      });
      post(
        `/pitch/audio/version/${version}/prospect/${voice}/${key}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
        file
      )
        .then((res: any) => {
          this.setState({
            display: [],
            displayRerecord: [],
            displayRecorded: [],
            fetchedUnrecorded: false,
            fetchedRerecord: false,
            fetchedRecorded: false,
            audio: [],
            fileName: "",
            file: null,
            uploadLoading: false,
            openAddNew: false
          });
          this.filterData(version);
          if (res.status === 201 || res.status === 200) {
            this.setState({
              openToast: true,
              toastType: "check",
              message: `Successfully uploaded`,
              vertical: "top",
              horizontal: "right",
              addNewVoiceModal: false,
              uploadLoading: false
            });
          } else {
            this.setState({
              openToast: true,
              toastType: "caution",
              message: `Failed to upload file`,
              vertical: "top",
              horizontal: "right",
              addNewVoiceModal: false,
              uploadLoading: false
            });
          }
        })
        .catch((err: any) => {
          this.setState({
            openToast: true,
            toastType: "caution",
            message: `Error uploading file`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        });
    }
  };
  uploadSession = (session: any) => {
    console.log(session);
    this.setState({
      uploadLoading: true
    });
    const requests = session.map((audio: any) => {
      return post(
        `/pitch/audio/version/${audio.version}/prospect/${audio.voice}/${audio.audioKey}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
        audio.file
      );
    });
    Promise.all(requests)
      .then(() => {
        this.setState({
          display: [],
          displayRerecord: [],
          displayRecorded: [],
          fetchedUnrecorded: false,
          fetchedRerecord: false,
          fetchedRecorded: false,
          audio: [],
          fileName: "",
          file: null,
          uploadLoading: false,
          openAddNew: false
        });
        this.filterData(this.state.selectedVersion);
        this.setState({
          openToast: true,
          toastType: "check",
          message: `Successfully uploaded`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false
        });
      })
      .catch(err => {
        this.setState({
          openToast: true,
          toastType: "caution",
          message: `Error uploading file`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false
        });
      });
  };
  undoProspectAudio = (version: any, voice: any, key: any) => {
    this.setState({
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(
      `/pitch/audio/version/${this.state.selectedVersion}/prospect/${this.state.user_data.uuid}/${key}/`,
      {
        rerecord: false
      }
    )
      .then((res: any) => {
        this.filterData(this.state.selectedVersion);
        if (res.status === 201 || res.status === 200) {
          this.setState({
            openToast: true,
            toastType: "check",
            message: `Undo successful`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        } else {
          this.setState({
            openToast: true,
            toastType: "caution",
            message: `Request failed`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        }
      })
      .catch((err: any) => {
        this.setState({
          openToast: true,
          toastType: "caution",
          message: `Request failed`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false
        });
      });
  };
  openAddNewVoiceModal = (bool: any, currentMode: any) => {
    if (bool === false) {
      this.setState({
        addNewVoiceModal: false,
        audioFile: "",
        fileName: "",
        file: ""
      });
    } else {
      this.setState({
        currentMode,
        addNewVoiceModal: true,
        anchorEl: null
      });
    }
  };
  handleCloseToast = () => {
    this.setState({
      openToast: false
    });
  };
  refreshData = (version: any) => {
    this.setState({
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });
    this.filterData(version);
  };
  handleUnrecordedSelected = (val: any) => {
    this.setState({ unrecordedSelected: val });
  };
  showToastSession = (type: any, message: any) => {
    this.setState({
      openToast: true,
      toastType: type,
      message: message,
      vertical: "top",
      horizontal: "right"
    });
  };
  render() {
    const { classes }: any = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <CssBaseline />
          {/* Navbar */}
          <main className={classes.content}>
            <Container maxWidth="xl" className={classes.container}>
              <Grid container spacing={3}>
                {/* Header */}
                <Grid container className={classes.navBar}>
                  {/* HEADER - DESKTOP VERSION START */}
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    md={5}
                    lg={5}
                    className={classes.desktopCon}
                  >
                    {localStorage.getItem("type") !== "10" && (
                      <HeaderLink
                        menu={[
                          {
                            title: "Audio Resources",
                            path: "/manage/audio/resources"
                          }
                        ]}
                        title="Voice"
                      />
                    )}
                  </Grid>
                  {/* HEADER - DESKTOP VERSION END */}

                  {/* HEADER - MOBILE VERSION START */}
                  <Grid container className={classes.mobileConDropdown}>
                    <Grid item xs={7} sm={8}>
                      <DropdownDesktop />
                    </Grid>
                    <Grid item xs={5} sm={4}>
                      <Dropdown
                        links={this.state.links}
                        refreshData={this.refreshData}
                        version={this.state.selectedVersion}
                        fetchedRecorded={this.state.fetchedRecorded}
                        fetchedUnrecorded={this.state.fetchedUnrecorded}
                        fetchedRerecord={this.state.fetchedRerecord}
                      />
                    </Grid>
                  </Grid>
                  {/* HEADER - MOBILE VERSION START */}

                  {/* TABS - DESKTOP VERSION START */}
                  <Grid
                    item
                    xs={12}
                    sm={9}
                    md={7}
                    lg={7}
                    className={classes.desktopCon}
                  >
                    <TabsDesktop
                      tabSelected={this.tabSelected}
                      reset={this.resetFilters}
                      defaultValue={2}
                    />
                  </Grid>
                  {/* TABS - DESKTOP VERSION END */}

                  {/* TABS - MOBILE VERSION START */}
                  <Grid item xs={12} sm={12} className={classes.mobileCon}>
                    <Tabs
                      tabSelected={this.tabSelected}
                      reset={this.resetFilters}
                    />
                  </Grid>
                  {/* TABS - MOBILE VERSION END */}
                </Grid>

                {/* Main Content - DESKTOP VERSION START*/}
                <React.Fragment>
                  <Grid item xs={12} className={classes.desktopCon}>
                    <Paper className={classes.filterWrapper}>
                      {/* Search and FilterToolbar */}
                      <Grid container className={classes.header}>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          className={classes.searchMargin}
                        >
                          {localStorage.getItem("type") !== "10" && (
                            <Search
                              searchFunction={this.selectedVoice}
                              voices={this.state.voices}
                              defaultVoice={this.state.defaultVoice}
                            />
                          )}
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={localStorage.getItem("type") === "10" ? 12 : 8}
                        >
                          <Filter
                            campaigns={this.state.campaigns}
                            versions={this.state.versions}
                            tab={this.state.tabSelected}
                            unrecorded={this.state.unrecorded}
                            rerecord={this.state.rerecord}
                            recorded={this.state.recorded}
                            filterData={this.filterData}
                            filtered={(val: any) =>
                              this.setState({ filtered: val })
                            }
                            user={this.state.user}
                            searched={this.state.searchVoice}
                            selectCampaign={this.selectCampaign}
                            selectVersion={this.selectVersion}
                            selectedCampaign={this.state.selectedCampaign}
                            selectedVersion={this.state.selectedVersion}
                            refreshData={this.refreshData}
                          />
                        </Grid>
                      </Grid>
                    </Paper>

                    <Paper
                      className={classes.tableWrapper}
                      style={
                        this.state.showTable
                          ? { background: "white" }
                          : { background: "#fafafa" }
                      }
                    >
                      {this.state.loader ? (
                        <TableLoader />
                      ) : this.state.showTable ? (
                        <Grid container className={classes.pitchTable}>
                          <Grid item sm={12} xs={12} md={4} lg={4}>
                            <UnrecordedCard
                              unrecorded={this.state.display}
                              tblName={"Unrecorded"}
                              rows={this.state.unrecorded}
                              columns={this.state.unrecordedTblName}
                              displayData={this.state.display}
                              filtered={this.state.filtered}
                              handleChange={this.handleChange}
                              searchPhrase={this.state.searchDialogUnrecord}
                              searchKey={"searchDialogUnrecord"}
                              fetched={this.state.fetchedUnrecorded}
                              // for adding audio
                              handleAudio={this.handleAudio}
                              removeAudio={this.removeAudio}
                              getRecordedName={this.getRecordedName}
                              fileName={this.state.fileName}
                              user_id={this.state.user}
                              file={this.state.file}
                              uploadAudio={this.uploadAudio}
                              version={this.state.selectedVersion}
                              voice={this.state.searchVoice}
                              audio={this.state.audio}
                              openAddNewVoiceModal={this.openAddNewVoiceModal}
                              addNewVoiceModal={
                                this.state.currentMode === "Unrecorded"
                                  ? this.state.addNewVoiceModal
                                  : false
                              }
                              typeOfAudio="prospect"
                              uploadLoading={this.state.uploadLoading}
                              refreshData={this.refreshData}
                              //toast
                              showToast={this.showToastSession}
                              //upload session
                              uploadSession={this.uploadSession}
                            />
                          </Grid>
                          {/* ANCHOR Rerecord */}
                          <Grid item sm={12} xs={12} md={4} lg={4}>
                            <RerecordCard
                              undoProspectAudio={this.undoProspectAudio}
                              rerecord={this.state.displayRerecord}
                              tblName={"Rerecord"}
                              rows={this.state.rerecord}
                              columns={this.state.rerecordTblName}
                              openAddNewVoiceModal={this.openAddNewVoiceModal}
                              filtered={this.state.filtered}
                              handleChange={this.handleChange}
                              searchPhrase={this.state.searchDialogRerecord}
                              searchKey={"searchDialogRerecord"}
                              user_id={this.state.user}
                              fetched={this.state.fetchedRerecord}
                              refreshData={this.refreshData}
                              version={this.state.selectedVersion}
                              handleAudio={this.handleAudio}
                              audio={this.state.audioFile}
                              removeAudio={this.removeAudio}
                              getRecordedName={this.getRecordedName}
                              fileName={this.state.fileName}
                              file={this.state.file}
                              uploadAudio={this.uploadAudio}
                              voice={this.state.searchVoice}
                              addNewVoiceModal={
                                this.state.currentMode === "Rerecord"
                                  ? this.state.addNewVoiceModal
                                  : false
                              }
                              uploadLoading={this.state.uploadLoading}
                              addToRecorded={this.undoProspectAudio}
                              rerecordAudio={this.rerecordAudio}
                              //playing audio
                              preview={this.state.audio}
                              showLoader={this.showLoader}
                              playAudio={this.playAudio}
                              isLoading={this.state.isAudioLoadingRerec}
                              //debugging
                              typeOfAudio="prospect"
                              //toast
                              showToast={this.showToastSession}
                              //upload session
                              uploadSession={this.uploadSession}
                            />
                          </Grid>
                          {/* ANCHOR Recorded */}
                          <Grid item sm={12} xs={12} md={4} lg={4}>
                            <RecordedCard
                              //rerecordAudio={this.rerecordAudio}
                              recorded={this.state.displayRecorded}
                              tblName={"Recorded"}
                              rows={this.state.recorded}
                              columns={this.state.recordedTblName}
                              openAddNewVoiceModal={this.openAddNewVoiceModal}
                              displayData={this.state.displayRecorded}
                              filtered={this.state.filtered}
                              handleChange={this.handleChange}
                              searchPhrase={this.state.searchDialogRecord}
                              searchKey={"searchDialogRecord"}
                              deleteAudio={this.deleteAudio}
                              user_id={this.state.user}
                              rerecordAudio={this.addToRerecord}
                              playAudio={this.playAudio}
                              version={this.state.selectedVersion}
                              voice={this.state.searchVoice}
                              audio={this.state.audio}
                              fetched={this.state.fetchedRecorded}
                              isLoading={this.state.isAudioLoading}
                              showLoader={this.showLoader}
                              removeAudio={this.removeAudioPlayed}
                              refreshData={this.refreshData}
                              uploadLoading={this.state.uploadLoading}
                              //undoPitchAudio={this.undoPitchAudio}
                              handleAudio={this.handleAudio}
                              getRecordedName={this.getRecordedName}
                              fileName={this.state.fileName}
                              file={this.state.file}
                              //addNewVoiceModal={this.state.addNewVoiceModal}
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <div className={classes.largeTitle} id="table-title">
                            <Typography
                              variant="h3"
                              className={classes.headerTitle}
                            >
                              {this.toTitleCase("prospect audio recordings")}
                            </Typography>
                          </div>
                          {this.state.user_uuid ? (
                            <div className={classes.emptyPitch}>
                              <b> No prospect selected </b>
                              <br />
                              Select voice, campaign and pitch version to view
                              prospect audio
                            </div>
                          ) : (
                            <div className={classes.emptyPitch}>
                              <TableLoader />
                            </div>
                          )}
                        </Grid>
                      )}
                    </Paper>
                  </Grid>
                  {/* Main Content - DESKTOP VERSION END */}

                  {/* Main Content - MOBILE VERSION START*/}
                  <Grid item xs={12} className={classes.mobileCon}>
                    <Paper className={classes.filterWrapper}>
                      {/* Search and FilterToolbar */}
                      <Grid container className={classes.header}>
                        {this.state.user_group === 10 ? (
                          <React.Fragment></React.Fragment>
                        ) : (
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            className={classes.searchMargin}
                          >
                            {localStorage.getItem("type") !== "10" && (
                              <Search
                                searchFunction={this.selectedVoice}
                                voices={this.state.voices}
                                defaultVoice={this.state.defaultVoice}
                              />
                            )}
                          </Grid>
                        )}

                        <Grid
                          item
                          xs={12}
                          sm={localStorage.getItem("type") === "10" ? 12 : 8}
                        >
                          <Filter
                            campaigns={this.state.campaigns}
                            versions={this.state.versions}
                            tab={this.state.tabSelected}
                            // unrecorded={this.state.unrecorded}
                            // rerecord={this.state.rerecord}
                            // recorded={this.state.recorded}
                            filterData={this.filterData}
                            filtered={(val: any) =>
                              this.setState({ filtered: val })
                            }
                            user={this.state.user}
                            searched={this.state.searchVoice}
                            selectCampaign={this.selectCampaign}
                            selectVersion={this.selectVersion}
                            selectedCampaign={this.state.selectedCampaign}
                            selectedVersion={this.state.selectedVersion}
                            uploadLoading={this.state.uploadLoading}
                            refreshData={this.refreshData}
                          />
                        </Grid>
                      </Grid>
                    </Paper>

                    <Divider />

                    <Paper
                      className={classes.tableWrapper}
                      style={
                        this.state.showTable
                          ? { background: "white" }
                          : { background: "#fafafa" }
                      }
                    >
                      {/* Pitch Audio Recordings Title*/}
                      {this.state.showTable ? (
                        <Grid item xs={12}>
                          {this.state.tabSelected === 0 ? (
                            <React.Fragment>
                              <Table
                                tblName={"Unrecorded"}
                                rows={this.state.unrecorded}
                                columns={this.state.unrecordedTblName}
                                displayData={this.state.display}
                                filtered={this.state.filtered}
                                handleChange={this.handleChange}
                                searchPhrase={this.state.searchDialogUnrecord}
                                searchKey={"searchDialogUnrecord"}
                                fetched={this.state.fetchedUnrecorded}
                                // for adding audio
                                handleAudio={this.handleAudio}
                                removeAudio={this.removeAudio}
                                fileName={this.state.fileName}
                                user_id={this.state.user}
                                //for uploading audio
                                upload={this.uploadAudio}
                                file={this.state.file}
                                version={this.state.selectedVersion}
                                voice={this.state.searchVoice}
                                audio={this.state.audio}
                                openAddNewVoiceModal={this.openAddNewVoiceModal}
                                addNewVoiceModal={
                                  this.state.currentMode === "UnrecTable"
                                    ? this.state.addNewVoiceModal
                                    : false
                                }
                                uploadLoading={this.state.uploadLoading}
                                refreshData={this.refreshData}
                              />
                            </React.Fragment>
                          ) : this.state.tabSelected === 1 ? (
                            <React.Fragment>
                              <Table
                                tblName={"Rerecord"}
                                rows={this.state.rerecord}
                                columns={this.state.rerecordTblName}
                                displayData={this.state.displayRerecord}
                                filtered={this.state.filtered}
                                handleChange={this.handleChange}
                                searchPhrase={this.state.searchDialogRerecord}
                                searchKey={"searchDialogRerecord"}
                                fetched={this.state.fetchedRerecord}
                                uploadFetched={this.state.fetchedUploadAudio}
                                // for adding audio
                                handleAudio={this.handleAudio}
                                removeAudio={this.removeAudio}
                                fileName={this.state.fileName}
                                user_id={this.state.user}
                                //for uploading audio
                                upload={this.uploadAudio}
                                file={this.state.file}
                                version={this.state.selectedVersion}
                                voice={this.state.searchVoice}
                                audio={this.state.audio}
                                openAddNewVoiceModal={this.openAddNewVoiceModal}
                                addNewVoiceModal={
                                  this.state.currentMode === "RerecTable"
                                    ? this.state.addNewVoiceModal
                                    : false
                                } // dagdag para sa prospect
                                undoProspectAudio={this.undoProspectAudio}
                                uploadLoading={this.state.uploadLoading}
                                refreshData={this.refreshData}
                              />
                            </React.Fragment>
                          ) : this.state.tabSelected === 2 ? (
                            <React.Fragment>
                              <Table
                                tblName={"Recorded"}
                                rows={this.state.recorded}
                                columns={this.state.recordedTblName}
                                displayData={this.state.displayRecorded}
                                filtered={this.state.filtered}
                                handleChange={this.handleChange}
                                searchPhrase={this.state.searchDialogRecord}
                                searchKey={"searchDialogRecord"}
                                deleteAudio={this.deleteAudio}
                                user_id={this.state.user}
                                addToRerecord={this.addToRerecord}
                                playAudio={this.playAudio}
                                version={this.state.selectedVersion}
                                voice={this.state.searchVoice}
                                audio={this.state.audio}
                                fetched={this.state.fetchedRecorded}
                                isLoading={this.state.isAudioLoading}
                                showLoader={this.showLoader}
                                removeAudio={this.removeAudioPlayed}
                                rerecordAudio={this.rerecordAudio}
                                openAddNewVoiceModal={this.openAddNewVoiceModal}
                                addNewVoiceModal={this.state.addNewVoiceModal}
                                refreshData={this.refreshData}
                              />
                            </React.Fragment>
                          ) : null}
                        </Grid>
                      ) : (
                        <Grid item xs={12}>
                          <div className={classes.largeTitle} id="table-title">
                            <Typography
                              variant="h3"
                              className={classes.headerTitle}
                            >
                              {this.toTitleCase("phrase audio recordings")}
                            </Typography>
                          </div>
                          {this.state.user_uuid ? (
                            <div className={classes.emptyPitch}>
                              <b> No prospect selected </b>
                              <br />
                              Select voice, campaign and pitch version to view
                              prospect audio
                            </div>
                          ) : (
                            <div className={classes.emptyPitch}>
                              <TableLoader />
                            </div>
                          )}
                        </Grid>
                      )}
                    </Paper>
                  </Grid>
                </React.Fragment>
                {/* Main Content - MOBILE VERSION START*/}
              </Grid>
            </Container>
          </main>
          {localStorage.getItem("type") !== "10" && (
            <Tooltip title="Add New Audio" placement="top">
              <Fab
                color="secondary"
                size="large"
                aria-label="add"
                className={classes.addBtn}
                onClick={() => {
                  this.openAddNewDialog();
                }}
              >
                <AddIcon fontSize="large" className={classes.resIcon} />
              </Fab>
            </Tooltip>
          )}
        </div>
        {/* Dialogs */}

        <MainAddNewAudio
          label1="Select Campaign"
          label2="Select Version"
          onClose={() => this.closeAddNewDialog()}
          voices={this.state.voices}
          campaigns={this.state.campaigns}
          versions={this.state.versions}
          audio={this.state.unrecordedList}
          selectVoice={this.selectedVoice}
          selectCampaign={this.selectCampaign}
          selectVersion={this.selectVersion}
          selectUnrecorded={this.selectUnrecorded}
          voiceSelected={this.state.searchVoice}
          versionSelected={this.state.selectedVersion}
          unrecordedSelected={this.state.unrecordedSelected}
          mainFile={this.state.file}
          mainFileName={this.state.fileName}
          audioToBeUploaded={this.state.audioToBeUploaded}
          changeAudioToBeUploaded={this.handleAudio}
          // recorded={this.state.recorded}
          getUpdatedRecorded={this.getUpdatedRecorded}
          getRecordedName={this.getRecordedName}
          // savingAudio={this.savingAudio}
          // token={this.state.token}
          // savedAudio={this.savedAudio}
          mainUploadAudio={this.uploadAudio}
          loading={this.state.uploadLoading}
          campaignSelected={this.state.selectedCampaign}
          user_group={this.state.user_group}
          handleUnrecordedSelected={this.handleUnrecordedSelected}
          selectedVoice={this.state.searchVoice}
          token={this.state.token}
          open={this.state.openAddNew}
          typeOfAudio="prospect"
          showToast={this.showToastSession}
        />

        <Toast
          open={this.state.openToast}
          handleClose={this.handleCloseToast}
          toastType={this.state.toastType}
          message={this.state.message}
          vertical={this.state.vertical}
          horizontal={this.state.horizontal}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Prospect);
