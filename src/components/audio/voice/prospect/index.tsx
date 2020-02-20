import React, { useState, useEffect, useContext } from "react";
import {
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
import { store } from "contexts/ManageComponent";
interface State {
  loader?: boolean;
  user: number;
  links: any;
  state1: string;
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
const Prospect: React.FC<{ location: any }> = ({ location }) => {
  const { state } = useContext(store);
  const classes = useStyles();
  const [states, setState] = useState<State>({
    user: 1,
    links: [
      { name: "prospect audio", link: "/prospect" },
      { name: "pitch audio", link: "/pitch" },
      { name: "phrase audio", link: "/phrase" }
    ],
    state1: "DATA_LOADED",
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
    user_group: localStorage.getItem("type"),
    profile: [],
    user_uuid: state.roles.length !== 0 ? localStorage.getItem("uuid") : "",
    currentMode: null,
    isAudioLoadingRerec: false,
    defaultVoice: null
  });
  useEffect(() => {
    document.title = "Prospect Audio";
    var tokenLogin = localStorage.getItem("ngStorage-ppToken");
    if (localStorage.getItem("error")) {
      setState({
        ...states,
        openToast: true,
        toastType: "caution",
        message: `Your user does not have access to that page. You may need to sign-in.`,
        vertical: "top",
        horizontal: "right"
      });
      localStorage.removeItem("error");
    }
    setState({
      ...states,
      state1: "DATA_LOADED",
      token: tokenLogin,
      loader: true,
      showTable: false
    });
    if (states.user_group === "10") {
      recorderCamp(states.user_uuid);
    } else {
      setState({
        ...states,
        state1: "DATA_LOADED",
        voices: state.users
      });
    }
  }, []);
  const recorderCamp = async (uuid: any) => {
    setState({ ...states, voiceSelected: uuid });
    let campaigns: any = [],
      user_data: any = [];
    get(`/identity/user/profile/`).then((user: any) => {
      user_data = user.data.campaigns;
      campaigns = state.campaigns.filter((camp: any) => {
        return user_data.includes(camp.uuid);
      });
      if (campaigns.length) {
        setState({
          ...states,
          campaigns,
          voiceSelected: uuid
        });
      } else {
        setState({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right"
        });
      }
    });
    setState({ ...states, campaigns });
  };
  const toTitleCase = (str: any) => {
    return str.replace(/\w\S*/g, function(txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const tabSelected = (val: any) => {
    setState({ ...states, tabSelected: val });
  };
  const selectCampaign = (value: any, uuids: any) => {
    const dataCampaigns: any = state.campaigns.filter(
      (camp: any) => camp.slug === value
    );
    const uuid = dataCampaigns[0].company;
    const dataCompanies: any = state.companies.filter(
      (comp: any) => comp.uuid === uuid
    );
    setState({
      ...states,
      selectedVersion: "",
      selectedCampaign: value
    });
    get(`/pitch/company/${dataCompanies[0].slug}/campaign/${value}/`)
      .then((versions: any) => {
        if (versions.data.versions.length > 0) {
          setState({
            ...states,
            selectedVersion: "",
            versions: versions.data.versions.reverse(),
            selectedCampaign: value
          });
          console.log(versions.data.versions);
        } else {
          setState({
            ...states,
            openToast: true,
            selectedVersion: "",
            selectedCampaign: value,
            toastType: "caution",
            message: `There are no pitch versions available for this campaign.`,
            vertical: "top",
            horizontal: "right"
          });
        }
      })
      .catch((err: any) => {
        setState({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `There are no pitch versions available for this campaign.`,
          vertical: "top",
          horizontal: "right"
        });
      });
  };

  const selectVoiceCampaign = (value: any, uuid: any) => {
    setState({ ...states, campaignSelected: value });
    get(`/identity/company/${uuid}/`).then((res: any) => {
      get(`/pitch/company/${res.data.slug}/campaign/${value}/`).then(
        (ver: any) => {
          setState({ ...states, versions: ver.data.versions.reverse() });
        }
      );
    });
  };

  // this function is used for main adding of audio

  const selectVersion = (value: any) => {
    setState({ ...states, selectedVersion: value });
  };

  const selectUnrecorded = (value: any) => {
    setState({ ...states, unrecordedSelected: value });
  };

  const filterData = (pitch_version: any) => {
    var data1, data2, data3;
    setState({
      ...states,
      loader: true,
      showTable: false,
      display: [],
      displayRerecord: [],
      fetchedRecorded: false,
      fetchedRerecord: false,
      fetchedUnrecorded: false
    });
    ///pitch/audio/version/${states.selectedVersion}/prospect/${states.voiceSelected}/recorded/
    data1 = get(
      `/pitch/audio/version/${states.selectedVersion}/prospect/${states.voiceSelected}/unrecorded/`
    );
    data2 = get(
      `/pitch/audio/version/${states.selectedVersion}/prospect/${states.voiceSelected}/rerecord/`
    );
    data3 = get(
      `/pitch/audio/version/${states.selectedVersion}/prospect/${states.voiceSelected}/recorded/`
    );

    Promise.all([data1, data2, data3]).then(values => {
      setState({
        ...states,
        loader: false,
        showTable: true,
        display: values[0].data,
        fetchedUnrecorded: values[0].status === 200 ? true : false,
        displayRerecord: values[1].data,
        fetchedRerecord: values[1].status === 200 ? true : false,
        displayRecorded: values[2].data,
        fetchedRecorded: values[2].status === 200 ? true : false,
        filtered: true
      });
    });
  };
  const resetFilters = (val: any) => {
    setState({
      ...states,
      display: [],
      //filtered: false,
      showTable: val
    });
  };
  const handleChange = (key: any, val: any) => {
    setState({ ...states, [key]: val });
  };
  const selectedVoice = async (val: any) => {
    setState({
      ...states,
      campaigns: [],
      versions: [],
      selectedCampaign: "",
      selectedVersion: ""
    });
    let user_data: any = [],
      campaigns: any = [];
    get(`/identity/user/manage/${val}/`).then((user: any) => {
      user_data = user.data;
      campaigns = state.campaigns.filter((camp: any) => {
        return user_data.campaigns.includes(camp.uuid);
      });
      if (campaigns.length !== 0) {
        setState({
          ...states,
          campaigns,
          selectedCampaign: "",
          selectedVersion: "",
          versions: [],
          state1: "DATA_LOADED",
          user_data: user.data,
          voiceSelected: val
        });
      } else {
        setState({
          ...states,
          openToast: true,
          campaigns: [],
          versions: [],
          selectedCampaign: "",
          selectedVersion: "",
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right"
        });
      }
    });

    // Promise.all([data1, data2]).then(() => {
    //   if (campaigns.length) {
    //     setState({ ...states, campaigns });
    //   } else {
    // setState({
    //   ...states,
    //   openToast: true,
    //   toastType: "caution",
    //   message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
    //   vertical: "top",
    //   horizontal: "right"
    // });
    //   }
    // });
  };

  const deleteAudio = (val: any) => {
    states.recorded.map((data: any, id: any) => {
      if (val === data.name) {
        states.recorded.splice(id, 1);
      }
      return null;
    });
  };
  const handleAudio = (e: any) => {
    setState({ ...states, audioFile: e.target.value });
    let files = e.target.files;
    var uploadFile = new FormData();
    uploadFile.append("file", files[0]);
    setState({ ...states, fileName: files[0].name, file: uploadFile });
  };
  const removeAudio = () => {
    setState({ ...states, audioFile: "", fileName: "" });
  };
  const getRecordedName = (val: any) => {
    setState({ ...states, recordedName: val });
    states.unrecorded.map((data: any, id: any) => {
      if (val === data.name) {
        states.unrecorded.splice(id, 1);
      }
      return null;
    });
  };
  const addToRerecord = (version: any, voice: any, key: any) => {
    setState({
      ...states,
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(
      `/pitch/audio/version/${version}/prospect/${states.voiceSelected}/${key.key}/`,
      {
        rerecord: true
      }
    )
      .then((res: any) => {
        filterData(states.selectedVersion);
        if (res.status === 201 || res.status === 200) {
          setState({
            ...states,
            openToast: true,
            toastType: "check",
            message: `Successfully uploaded`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        } else {
          setState({
            ...states,
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
        setState({
          ...states,
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
  function openAddNewDialog() {
    setState({ ...states, openAddNew: true });
  }
  function closeAddNewDialog() {
    setState({
      ...states,
      openAddNew: false,
      selectedCampaign: "",
      selectedVersion: "",
      unrecordedSelected: ""
    });
  }
  const savingAudio = () => {
    setState(
      prevState => ({ ...states, openAddNew: !prevState.openAddNew })
      // () => showSuccessBar()
    );
  };
  const getUpdatedRecorded = (val: any) => {
    setState({ ...states, recorded: val });
    states.unrecorded.map((data: any, id: any) => {
      if (val.name === data.name) {
        states.unrecorded.splice(id, 1);
      }
      return null;
    });
  };
  const playAudio = (version: any, voice: any, key: any) => {
    get(
      `/pitch/audio/version/${version}/prospect/${states.voiceSelected}/${key}/`
    ).then((res: any) => {
      setState({ ...states, audio: res.data, isAudioLoading: false });
    });
  };
  const stopLoading = () => {
    setState({ ...states, isAudioLoading: false });
  };
  const showLoader = (type: any) => {
    if (type === "recorded") {
      setState({ ...states, isAudioLoading: true });
    } else {
      setState({ ...states, isAudioLoadingRerec: true });
    }
  };
  const removeAudioPlayed = () => {
    setState({ ...states, audio: [] });
  };
  const rerecordAudio = (version: any, voice: any, key: any) => {
    setState({
      ...states,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(
      `/pitch/audio/version/${version}/prospect/${states.voiceSelected}/${key}/`,
      {
        rerecord: true
      }
    )
      .then((res: any) => {
        filterData(states.selectedVersion);
        if (res.status === 201 || res.status === 200) {
          setState({
            ...states,
            openToast: true,
            toastType: "check",
            message: `Successfully added to rerecord`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        } else {
          setState({
            ...states,
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
        setState({
          ...states,
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
  const uploadAudio = (
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
      setState({
        ...states,
        openToast: true,
        toastType: "caution",
        message: `Please Select Audio File`,
        vertical: "top",
        horizontal: "right"
      });
    } else {
      setState({ ...states, uploadLoading: true });
      post(
        `/pitch/audio/version/${version}/prospect/${states.voiceSelected}/${key}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
        file
      )
        .then((res: any) => {
          setState({
            ...states,
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
          if (res.status === 201 || res.status === 200) {
            filterData(version);
            setState({
              ...states,
              openToast: true,
              toastType: "check",
              message: `Successfully uploaded`,
              vertical: "top",
              horizontal: "right",
              addNewVoiceModal: false,
              uploadLoading: false
            });
          } else {
            setState({
              ...states,
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
          setState({
            ...states,
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
  const uploadSession = (session: any) => {
    setState({ ...states, uploadLoading: true });
    const requests = session.map((audio: any) => {
      return post(
        `/pitch/audio/version/${audio.version}/prospect/${states.voiceSelected}/${audio.audioKey}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
        audio.file
      );
    });
    Promise.all(requests)
      .then(() => {
        setState({
          ...states,
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
        filterData(states.selectedVersion);
        setState({
          ...states,
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
        setState({
          ...states,
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
  const undoProspectAudio = (version: any, voice: any, key: any) => {
    setState({
      ...states,
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(
      `/pitch/audio/version/${states.selectedVersion}/prospect/${states.voiceSelected}/${key}/`,
      {
        rerecord: false
      }
    )
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          filterData(states.selectedVersion);
          setState({
            ...states,
            openToast: true,
            toastType: "check",
            message: `Undo successful`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        } else {
          setState({
            ...states,
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
        setState({
          ...states,
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
  const openAddNewVoiceModal = (bool: any, currentMode: any) => {
    if (bool === false) {
      setState({
        ...states,
        addNewVoiceModal: false,
        audioFile: "",
        fileName: "",
        file: ""
      });
    } else {
      setState({
        ...states,
        currentMode,
        addNewVoiceModal: true,
        anchorEl: null
      });
    }
  };
  const handleCloseToast = () => {
    setState({ ...states, openToast: false });
  };
  const refreshData = (version: any) => {
    setState({
      ...states,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });
    filterData(version);
  };
  const handleUnrecordedSelected = (val: any) => {
    setState({ ...states, unrecordedSelected: val });
  };
  const showToastSession = (type: any, message: any) => {
    setState({
      ...states,
      openToast: true,
      toastType: type,
      message: message,
      vertical: "top",
      horizontal: "right"
    });
  };
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
                      links={states.links}
                      refreshData={refreshData}
                      version={states.selectedVersion}
                      fetchedRecorded={states.fetchedRecorded}
                      fetchedUnrecorded={states.fetchedUnrecorded}
                      fetchedRerecord={states.fetchedRerecord}
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
                    tabSelected={tabSelected}
                    reset={resetFilters}
                    defaultValue={2}
                  />
                </Grid>
                {/* TABS - DESKTOP VERSION END */}

                {/* TABS - MOBILE VERSION START */}
                <Grid item xs={12} sm={12} className={classes.mobileCon}>
                  <Tabs tabSelected={tabSelected} reset={resetFilters} />
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
                            searchFunction={selectedVoice}
                            voices={states.voices}
                            defaultVoice={states.defaultVoice}
                          />
                        )}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={localStorage.getItem("type") === "10" ? 12 : 8}
                      >
                        <Filter
                          campaigns={states.campaigns}
                          versions={states.versions}
                          tab={states.tabSelected}
                          unrecorded={states.unrecorded}
                          rerecord={states.rerecord}
                          recorded={states.recorded}
                          filterData={filterData}
                          user={states.user}
                          searched={states.searchVoice}
                          selectCampaign={selectCampaign}
                          selectVersion={selectVersion}
                          selectedCampaign={states.selectedCampaign}
                          selectedVersion={states.selectedVersion}
                          refreshData={refreshData}
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  <Paper
                    className={classes.tableWrapper}
                    style={
                      states.showTable
                        ? { background: "white" }
                        : { background: "#fafafa" }
                    }
                  >
                    {states.loader ? (
                      <TableLoader />
                    ) : states.showTable ? (
                      <Grid container className={classes.pitchTable}>
                        <Grid item sm={12} xs={12} md={4} lg={4}>
                          <UnrecordedCard
                            unrecorded={states.display}
                            tblName={"Unrecorded"}
                            rows={states.unrecorded}
                            columns={states.unrecordedTblName}
                            displayData={states.display}
                            filtered={states.filtered}
                            handleChange={handleChange}
                            searchPhrase={states.searchDialogUnrecord}
                            searchKey={"searchDialogUnrecord"}
                            fetched={states.fetchedUnrecorded}
                            // for adding audio
                            handleAudio={handleAudio}
                            removeAudio={removeAudio}
                            getRecordedName={getRecordedName}
                            fileName={states.fileName}
                            user_id={states.user}
                            file={states.file}
                            uploadAudio={uploadAudio}
                            version={states.selectedVersion}
                            voice={states.searchVoice}
                            audio={states.audio}
                            openAddNewVoiceModal={openAddNewVoiceModal}
                            addNewVoiceModal={
                              states.currentMode === "Unrecorded"
                                ? states.addNewVoiceModal
                                : false
                            }
                            typeOfAudio="prospect"
                            uploadLoading={states.uploadLoading}
                            refreshData={refreshData}
                            //toast
                            showToast={showToastSession}
                            //upload session
                            uploadSession={uploadSession}
                          />
                        </Grid>
                        {/* ANCHOR Rerecord */}
                        <Grid item sm={12} xs={12} md={4} lg={4}>
                          <RerecordCard
                            undoProspectAudio={undoProspectAudio}
                            rerecord={states.displayRerecord}
                            tblName={"Rerecord"}
                            rows={states.rerecord}
                            columns={states.rerecordTblName}
                            openAddNewVoiceModal={openAddNewVoiceModal}
                            filtered={states.filtered}
                            handleChange={handleChange}
                            searchPhrase={states.searchDialogRerecord}
                            searchKey={"searchDialogRerecord"}
                            user_id={states.user}
                            fetched={states.fetchedRerecord}
                            refreshData={refreshData}
                            version={states.selectedVersion}
                            handleAudio={handleAudio}
                            audio={states.audioFile}
                            removeAudio={removeAudio}
                            getRecordedName={getRecordedName}
                            fileName={states.fileName}
                            file={states.file}
                            uploadAudio={uploadAudio}
                            voice={states.searchVoice}
                            addNewVoiceModal={
                              states.currentMode === "Rerecord"
                                ? states.addNewVoiceModal
                                : false
                            }
                            uploadLoading={states.uploadLoading}
                            addToRecorded={undoProspectAudio}
                            rerecordAudio={rerecordAudio}
                            //playing audio
                            preview={states.audio}
                            showLoader={showLoader}
                            playAudio={playAudio}
                            isLoading={states.isAudioLoadingRerec}
                            //debugging
                            typeOfAudio="prospect"
                            //toast
                            showToast={showToastSession}
                            //upload session
                            uploadSession={uploadSession}
                          />
                        </Grid>
                        {/* ANCHOR Recorded */}
                        <Grid item sm={12} xs={12} md={4} lg={4}>
                          <RecordedCard
                            //rerecordAudio={rerecordAudio}
                            recorded={states.displayRecorded}
                            tblName={"Recorded"}
                            rows={states.recorded}
                            columns={states.recordedTblName}
                            openAddNewVoiceModal={openAddNewVoiceModal}
                            displayData={states.displayRecorded}
                            filtered={states.filtered}
                            handleChange={handleChange}
                            searchPhrase={states.searchDialogRecord}
                            searchKey={"searchDialogRecord"}
                            deleteAudio={deleteAudio}
                            user_id={states.user}
                            rerecordAudio={addToRerecord}
                            playAudio={playAudio}
                            version={states.selectedVersion}
                            voice={states.searchVoice}
                            audio={states.audio}
                            fetched={states.fetchedRecorded}
                            isLoading={states.isAudioLoading}
                            showLoader={showLoader}
                            removeAudio={removeAudioPlayed}
                            refreshData={refreshData}
                            uploadLoading={states.uploadLoading}
                            //undoPitchAudio={undoPitchAudio}
                            handleAudio={handleAudio}
                            getRecordedName={getRecordedName}
                            fileName={states.fileName}
                            file={states.file}
                            //addNewVoiceModal={states.addNewVoiceModal}
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
                            {toTitleCase("prospect audio recordings")}
                          </Typography>
                        </div>
                        {states.user_uuid ? (
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
                      {states.user_group === 10 ? (
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
                              searchFunction={selectedVoice}
                              voices={states.voices}
                              defaultVoice={states.defaultVoice}
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
                          campaigns={states.campaigns}
                          versions={states.versions}
                          tab={states.tabSelected}
                          unrecorded={states.unrecorded}
                          rerecord={states.rerecord}
                          recorded={states.recorded}
                          filterData={filterData}
                          user={states.user}
                          searched={states.searchVoice}
                          selectCampaign={selectCampaign}
                          selectVersion={selectVersion}
                          selectedCampaign={states.selectedCampaign}
                          selectedVersion={states.selectedVersion}
                          uploadLoading={states.uploadLoading}
                          refreshData={refreshData}
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  <Divider />

                  <Paper
                    className={classes.tableWrapper}
                    style={
                      states.showTable
                        ? { background: "white" }
                        : { background: "#fafafa" }
                    }
                  >
                    {/* Pitch Audio Recordings Title*/}
                    {states.showTable ? (
                      <Grid item xs={12}>
                        {states.tabSelected === 0 ? (
                          <React.Fragment>
                            <Table
                              tblName={"Unrecorded"}
                              rows={states.unrecorded}
                              columns={states.unrecordedTblName}
                              displayData={states.display}
                              filtered={states.filtered}
                              handleChange={handleChange}
                              searchPhrase={states.searchDialogUnrecord}
                              searchKey={"searchDialogUnrecord"}
                              fetched={states.fetchedUnrecorded}
                              // for adding audio
                              handleAudio={handleAudio}
                              removeAudio={removeAudio}
                              fileName={states.fileName}
                              user_id={states.user}
                              //for uploading audio
                              upload={uploadAudio}
                              file={states.file}
                              version={states.selectedVersion}
                              voice={states.searchVoice}
                              audio={states.audio}
                              openAddNewVoiceModal={openAddNewVoiceModal}
                              addNewVoiceModal={
                                states.currentMode === "UnrecTable"
                                  ? states.addNewVoiceModal
                                  : false
                              }
                              uploadLoading={states.uploadLoading}
                              refreshData={refreshData}
                            />
                          </React.Fragment>
                        ) : states.tabSelected === 1 ? (
                          <React.Fragment>
                            <Table
                              tblName={"Rerecord"}
                              rows={states.rerecord}
                              columns={states.rerecordTblName}
                              displayData={states.displayRerecord}
                              filtered={states.filtered}
                              handleChange={handleChange}
                              searchPhrase={states.searchDialogRerecord}
                              searchKey={"searchDialogRerecord"}
                              fetched={states.fetchedRerecord}
                              uploadFetched={states.fetchedUploadAudio}
                              // for adding audio
                              handleAudio={handleAudio}
                              removeAudio={removeAudio}
                              fileName={states.fileName}
                              user_id={states.user}
                              //for uploading audio
                              upload={uploadAudio}
                              file={states.file}
                              version={states.selectedVersion}
                              voice={states.searchVoice}
                              audio={states.audio}
                              openAddNewVoiceModal={openAddNewVoiceModal}
                              addNewVoiceModal={
                                states.currentMode === "RerecTable"
                                  ? states.addNewVoiceModal
                                  : false
                              } // dagdag para sa prospect
                              undoProspectAudio={undoProspectAudio}
                              uploadLoading={states.uploadLoading}
                              refreshData={refreshData}
                            />
                          </React.Fragment>
                        ) : states.tabSelected === 2 ? (
                          <React.Fragment>
                            <Table
                              tblName={"Recorded"}
                              rows={states.recorded}
                              columns={states.recordedTblName}
                              displayData={states.displayRecorded}
                              filtered={states.filtered}
                              handleChange={handleChange}
                              searchPhrase={states.searchDialogRecord}
                              searchKey={"searchDialogRecord"}
                              deleteAudio={deleteAudio}
                              user_id={states.user}
                              addToRerecord={addToRerecord}
                              playAudio={playAudio}
                              version={states.selectedVersion}
                              voice={states.searchVoice}
                              audio={states.audio}
                              fetched={states.fetchedRecorded}
                              isLoading={states.isAudioLoading}
                              showLoader={showLoader}
                              removeAudio={removeAudioPlayed}
                              rerecordAudio={rerecordAudio}
                              openAddNewVoiceModal={openAddNewVoiceModal}
                              addNewVoiceModal={states.addNewVoiceModal}
                              refreshData={refreshData}
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
                            {toTitleCase("phrase audio recordings")}
                          </Typography>
                        </div>
                        {states.user_uuid ? (
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
                openAddNewDialog();
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
        onClose={() => closeAddNewDialog()}
        voices={states.voices}
        campaigns={states.campaigns}
        versions={states.versions}
        audio={states.unrecordedList}
        selectVoice={selectedVoice}
        selectCampaign={selectCampaign}
        selectVersion={selectVersion}
        selectUnrecorded={selectUnrecorded}
        voiceSelected={states.searchVoice}
        versionSelected={states.selectedVersion}
        unrecordedSelected={states.unrecordedSelected}
        mainFile={states.file}
        mainFileName={states.fileName}
        audioToBeUploaded={states.audioToBeUploaded}
        changeAudioToBeUploaded={handleAudio}
        // recorded={states.recorded}
        getUpdatedRecorded={getUpdatedRecorded}
        getRecordedName={getRecordedName}
        // savingAudio={savingAudio}
        // token={states.token}
        // savedAudio={savedAudio}
        mainUploadAudio={uploadAudio}
        loading={states.uploadLoading}
        campaignSelected={states.selectedCampaign}
        user_group={states.user_group}
        handleUnrecordedSelected={handleUnrecordedSelected}
        selectedVoice={states.searchVoice}
        token={states.token}
        open={states.openAddNew}
        typeOfAudio="prospect"
        showToast={showToastSession}
      />

      <Toast
        open={states.openToast}
        handleClose={handleCloseToast}
        toastType={states.toastType}
        message={states.message}
        vertical={states.vertical}
        horizontal={states.horizontal}
      />
    </React.Fragment>
  );
};

export default Prospect;
