/* eslint-disable */
import React, { useContext, useState } from "react";
import {
  withWidth,
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
import Tabs from "../../common-components/tabs/Mobile";
import TabsDesktop from "../../common-components/tabs/Desktop";
import useStyles from "./styles";
import Filter from "./pitch_audio/Filter";
import Search from "./pitch_audio/Search";
import Table from "./pitch_audio/Table";
import Toast from "../../common-components/toast";
import { TableLoader, HeaderLink } from "common-components";
import UnrecordedCard from "../../common-components/cards/Unrecorded";
import RerecordCard from "../../common-components/cards/Rerecord";
import RecordedCard from "../../common-components/cards/Recorded";
import { get, patch, post } from "utils/api";
import { store } from "contexts/ManageComponent";

interface IState {
  user: number;
  loaders: Boolean;
  links: any;
  state1: string;
  campaigns: any;
  versions: any;
  selected: any;
  tabSelected: any;
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
  token: any;
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
  hasMic: any;
  currentMode: any;
  isAudioLoadingRerec: boolean;
  addNewVoiceModal_Desktop: boolean;
  [x: number]: any;
  voiceSelected?: any;
  anchorEl?: any;
  asd: any;
}
interface Props {
  classes: any;
  width: any;
}
const Pitch: React.FC<Props> = (props: any) => {
  const { state } = useContext(store);
  const [states, setStates] = useState<IState>({
    user: 1,
    asd: "asd",
    loaders: false,
    links: [
      { name: "pitch audio", link: "/pitch" },
      { name: "phrase audio", link: "/phrase" },
      { name: "prospect audio", link: "/prospect" }
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
    token: "",
    audio: [],
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
    error: false,
    file: null,
    addNewVoiceModal: false,
    uploadLoading: false,
    user_group: 1,
    profile: [],
    user_uuid: "",
    hasMic: null,
    currentMode: null,
    isAudioLoadingRerec: false,
    addNewVoiceModal_Desktop: true
  });

  React.useEffect(() => {
    document.title = "Pitch Audio";
    if (localStorage.getItem("error")) {
      setStates({
        ...states,
        openToast: true,
        toastType: "caution",
        message: `Your user does not have access to that page. You may need to sign-in.`,
        vertical: "top",
        horizontal: "right"
      });
      localStorage.removeItem("error");
    } else {
      get(`/identity/user/profile/`).then((profileData: any) => {
        if (profileData.data.groups[0] === 10) {
          recorderCamp(state.campaigns);
        } else {
          setStates({
            ...states,
            state1: "DATA_LOADED",
            profile: profileData.data,
            user_uuid: profileData.data.uuid,
            user_group: profileData.data.groups[0]
          });
        }
      });
    }
  }, []);

  const recorderCamp = (camps: any) => {
    let campaigns: any = [],
      user_data: any = [];
    get(`/identity/user/profile/`).then((user: any) => {
      user_data = user.data.campaigns;
      campaigns = camps.filter((camp: any) => {
        return user_data.includes(camp.uuid);
      });
      if (campaigns.length) {
        setStates({
          ...states,
          campaigns,
          state1: "DATA_LOADED",
          searchVoice: user.data.uuid,
          user_data: user.data,
          profile: user.data,
          user_uuid: user.data.uuid,
          user_group: user.data.groups[0]
        });
      } else {
        setStates({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right",
          loaders: false
        });
      }
    });
  };

  const toTitleCase = (str: any) => {
    return str.replace(/\w\S*/g, function(txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const tabSelected = (val: any) => {
    setStates({
      ...states,
      tabSelected: val
    });
  };

  const selectCampaign = (value: any) => {
    const dataCampaigns: any = state.campaigns.filter(
      (camp: any) => camp.slug === value
    );
    const uuid = dataCampaigns[0].company;
    const dataCompanies: any = state.companies.filter(
      (comp: any) => comp.uuid === uuid
    );
    setStates({
      ...states,
      selectedVersion: "",
      selectedCampaign: value
    });
    get(`/pitch/company/${dataCompanies[0].slug}/campaign/${value}/`)
      .then((versions: any) => {
        if (versions.data.versions.length > 0) {
          setStates({
            ...states,
            versions: versions.data.versions.reverse(),
            selectedCampaign: value
          });
        } else {
          setStates({
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
        setStates({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `There are no pitch versions available for this campaign.`,
          vertical: "top",
          horizontal: "right"
        });
      });
  };

  const selectVersion = (value: any) => {
    setStates({
      ...states,
      selectedVersion: value
    });
    get(
      `/pitch/audio/version/${value}/voice/${states.user_data.uuid}/unrecorded/`
    ).then((pitchunrecorded: any) => {
      setStates({
        ...states,
        selectedVersion: value,
        unrecordedList: pitchunrecorded.data
      });
    });
  };

  const selectUnrecorded = (value: any) => {
    setStates({
      ...states,
      unrecordedSelected: value
    });
  };

  const filterData1 = async (pitch_version: any) => {
    const data1 = await get(
      `/pitch/audio/version/${pitch_version}/voice/${states.user_data.uuid}/unrecorded/`
    );
    const data2 = await get(
      `/pitch/audio/version/${pitch_version}/voice/${states.user_data.uuid}/rerecord/`
    );
    const data3 = await get(
      `/pitch/audio/version/${pitch_version}/voice/${states.user_data.uuid}/recorded/`
    );
    Promise.all([data1, data2, data3]).then(values => {
      setStates({
        ...states,
        showTable: true,
        loaders: false,
        display: values[0].data,
        fetchedUnrecorded: values[0].status === 200 ? true : false,
        displayRerecord: values[1].data,
        fetchedRerecord: values[1].status === 200 ? true : false,
        displayRecorded: values[2].data,
        fetchedRecorded: values[2].status === 200 ? true : false
      });
    });
  };
  const filterData = (pitch_version: any, filtered: any) => {
    setStates({
      ...states,
      loaders: true,
      filtered: filtered === null ? states.filtered : filtered
    });
    filterData1(pitch_version);
  };

  const resetFilters = (val: any) => {
    setStates({
      ...states,
      display: [],
      showTable: val
    });
  };

  const handleChange = (key: any, val: any) => {
    setStates({
      ...states,
      [key]: val
    });
  };

  const selectedVoice = (val: any) => {
    setStates({
      ...states,
      campaigns: [],
      versions: [],
      selectedCampaign: "",
      selectedVersion: ""
    });
    let campaigns: any = [];
    get(`/identity/user/manage/${val}/`).then((user: any) => {
      campaigns = state.campaigns.filter((camp: any) => {
        return user.data.campaigns.indexOf(camp.uuid) > -1;
      });
      if (campaigns.length) {
        setStates({
          ...states,
          campaigns,
          state1: "DATA_LOADED",
          user_data: user.data,
          versions: [],
          selectedCampaign: "",
          selectedVersion: "",
          voiceSelected: val,
          searchVoice: val
        });
      } else {
        setStates({
          ...states,
          state1: "DATA_LOADED",
          user_data: user.data,
          versions: [],
          voiceSelected: val,
          searchVoice: val,
          campaigns: [],
          selectedCampaign: "",
          selectedVersion: "",
          openToast: true,
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right"
        });
      }
    });
  };

  const deleteAudio = (val: any) => {
    states.recorded.map((data: any, id: any) => {
      if (val === data.name) {
        states.recorded.splice(id, 1);
      }
      return null;
    });
  };

  // for uploading audio
  const handleAudio = (e: any) => {
    if (e.target.files && e.target.value) {
      setStates({
        ...states,
        audioFile: e.target.value
      });
      let files = e.target.files;
      var uploadFile = new FormData();
      uploadFile.append("file", files[0]);
      setStates({
        ...states,
        fileName: files[0].name,
        file: uploadFile
      });
    }
  };

  const removeAudio = () => {
    setStates({
      ...states,
      file: "",
      audioFile: "",
      fileName: ""
    });
  };

  const getRecordedName = (val: any) => {
    setStates({
      ...states,
      recordedName: val
    });

    states.unrecorded.map((data: any, id: any) => {
      if (val === data.name) {
        states.unrecorded.splice(id, 1);
      }
      return null;
    });
  };
  // end for uploading audio

  const addToRerecord = (version: any, voice: any, val: any) => {
    setStates({
      ...states,
      loaders: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    patch(`/pitch/audio/version/${version}/voice/${voice}/${val.key}/`, {
      rerecord: true
    }).then((res: any) => {
      if (res.status === 201 || res.status === 200) {
        setStates({
          ...states,
          openToast: true,
          toastType: "check",
          message: `Successfully added to rerecord`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false,
          loaders: false
        });
      } else {
        setStates({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `Error uploading file`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false
        });
      }
      filterData(version, null);
    });
  };

  // main audio adding
  function openAddNewDialog() {
    setStates({
      ...states,
      openAddNew: true
    });
  }

  function closeAddNewDialog() {
    setStates({
      ...states,
      openAddNew: false,
      voiceSelected: "",
      campaignSelected: "",
      versionSelected: "",
      selectedCampaign: "",
      selectedVersion: "",
      unrecordedSelected: "",
      versions: [],
      unrecordedList: []
    });
  }

  const savingAudio = () => {
    setStates((prevState: any) => ({
      ...states,
      openAddNew: !prevState.openAddNew
    }));
    // () => showSuccessBar()
  };

  const showSuccessBar = () => {
    setStates({
      ...states,
      openToast: true,
      toastType: "check",
      message: `Successfully uploaded`,
      vertical: "top",
      horizontal: "right",
      campaignSelected: "",
      versionSelected: "",
      unrecordedSelected: ""
    });
  };

  const handleCloseToast = () => {
    setStates({
      ...states,
      openToast: false
    });
  };

  const getUpdatedRecorded = (val: any) => {
    setStates({
      ...states,
      recorded: val
    });

    states.unrecorded.map((data: any, id: any) => {
      if (val.name === data.name) {
        states.unrecorded.splice(id, 1);
      }
      return null;
    });
  };

  const playAudio = (version: any, voice: any, key: any) => {
    get(`/pitch/audio/version/${version}/voice/${voice}/${key}/`).then(
      (res: any) => {
        setStates({
          ...states,
          audio: res.data,
          isAudioLoading: false,
          isAudioLoadingRerec: false
        });
      }
    );
  };

  const stopLoading = () => {
    setStates({
      ...states,
      isAudioLoading: false
    });
  };

  const showLoader = (type: any) => {
    if (type === "recorded") {
      setStates({
        ...states,
        isAudioLoading: true
      });
    } else {
      setStates({
        ...states,
        isAudioLoadingRerec: true
      });
    }
  };

  const removeAudioPlayed = () => {
    setStates({
      ...states,
      audio: []
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
      setStates({
        ...states,
        openToast: true,
        toastType: "caution",
        message: `Please Select Audio File`,
        vertical: "top",
        horizontal: "right"
      });
    } else {
      setStates({
        ...states,
        uploadLoading: true
      });
      post(
        `/pitch/audio/version/${version}/voice/${voice}/${key}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
        file
      )
        .then((res: any) => {
          setStates({
            ...states,
            display: [],
            displayRerecord: [],
            displayRecorded: [],
            fetchedRecorded: false,
            fetchedUnrecorded: false,
            fetchedRerecord: false,
            audio: [],
            fileName: "",
            file: null,
            uploadLoading: false,
            openAddNew: false
          });
          filterData(version, null);

          // checks if status response was 201.
          if (res.status === 201 || res.status === 200) {
            setStates({
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
            setStates({
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
        // if there is no response we will show a failed upload message
        .catch((err: any) => {
          setStates({
            ...states,
            openToast: true,
            toastType: "caution",
            message: `Error uploading file`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false,
            openAddNew: false
          });
        });
    }
  };

  //ANCHOR UPLOAD SESSION START

  const uploadSession = (session: any) => {
    setStates({
      ...states,
      uploadLoading: true
    });
    const requests = session.map((audio: any) => {
      return post(
        `/pitch/audio/version/${audio.version}/voice/${audio.voice}/${audio.audioKey}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
        audio.file
      );
    });
    Promise.all(requests)
      .then(() => {
        setStates({
          ...states,
          display: [],
          displayRerecord: [],
          displayRecorded: [],
          fetchedRecorded: false,
          fetchedUnrecorded: false,
          fetchedRerecord: false,
          audio: [],
          fileName: "",
          file: null,
          uploadLoading: false,
          openAddNew: false
        });
        filterData(states.selectedVersion, null);
        setStates({
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
      // if there is no response we will show a failed upload message
      .catch(err => {
        setStates({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `Error uploading file`,
          vertical: "top",
          horizontal: "right",
          addNewVoiceModal: false,
          uploadLoading: false,
          openAddNew: false
        });
      });
  };

  const rerecordAudio = (version: any, voice: any, key: any) => {
    setStates({
      ...states,
      display: [],
      displayRecorded: [],
      displayRerecord: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });

    patch(`/pitch/audio/version/${version}/voice/${voice}/${key}/`, {
      rerecord: true
    })
      .then((res: any) => {
        filterData(version, null);

        // checks if status response was 201.
        if (res.status === 201 || res.status === 200) {
          setStates({
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
          setStates({
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
      // if there is no response we will show a failed upload message
      .catch((err: any) => {
        setStates({
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

  //Update a specific pitch audio
  const undoPitchAudio = (version: any, voice: any, key: any) => {
    setStates({
      ...states,
      loaders: true,
      display: [],
      displayRecorded: [],
      displayRerecord: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });
    patch(
      `/pitch/audio/version/${states.selectedVersion}/voice/${states.searchVoice}/${key}/`,
      { rerecord: false }
    )
      .then((res: any) => {
        filterData(states.selectedVersion, null);
        if (res.status === 201 || res.status === 200) {
          setStates({
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
          setStates({
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
      // if there is no response we will show a failed upload message
      .catch((err: any) => {
        setStates({
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

  const closeModal = () => {
    setStates(
      (prevState: any) => ({
        ...states,
        addNewVoiceModal: !prevState.addNewVoiceModal
      })
      // () => this.successfulUpload()
    );
  };

  const openAddNewVoiceModal = (bool: any, currentMode: any) => {
    if (bool === false) {
      setStates({
        ...states,
        addNewVoiceModal: false
      });
    } else {
      setStates({
        ...states,
        currentMode,
        addNewVoiceModal: true,
        anchorEl: null
      });
    }
  };
  const refreshData = (version: any) => {
    setStates({
      ...states,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });
  };
  const detectMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        // Code for success
        setStates({
          ...states,
          hasMic: true
        });
      })
      .catch(err => {
        setStates({
          ...states,
          hasMic: false
        });
      });
  };
  const handleUnrecordedSelected = (val: any) => {
    setStates({
      ...states,
      unrecordedSelected: val
    });
  };
  const showToastSession = (type: any, message: any) => {
    setStates({
      ...states,
      openToast: true,
      toastType: type,
      message: message,
      vertical: "top",
      horizontal: "right"
    });
  };

  const { classes, width }: any = props;
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
                  md={3}
                  lg={3}
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
                  <Grid item xs={8} sm={8}>
                    {/* <DropdownDesktop groupID={this.state.user_group} /> */}
                  </Grid>
                  <Grid item xs={4} sm={4}>
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
                  md={9}
                  lg={7}
                  className={classes.desktopCon}
                >
                  <TabsDesktop
                    tabSelected={tabSelected}
                    reset={resetFilters}
                    defaultValue={0}
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
                    {width === "xl" || width === "lg" || width === "md" ? (
                      /* Search and FilterToolbar */
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
                              voices={state.users}
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
                            // filtered={(val: any) =>
                            //   setStates({
                            //     ...states,
                            //     filtered: val
                            //   })
                            // }
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
                    ) : null}
                  </Paper>

                  <Paper
                    className={classes.tableWrapper}
                    style={
                      states.showTable
                        ? { background: "white" }
                        : { background: "#fafafa" }
                    }
                  >
                    {states.loaders ? (
                      <>
                        <TableLoader />
                      </>
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
                            addToRecorded={undoPitchAudio}
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
                            //undoAudio={this.undoPitchAudio}
                            rerecordAudio={rerecordAudio}
                            //playing audio
                            preview={states.audio}
                            showLoader={showLoader}
                            playAudio={playAudio}
                            isLoading={states.isAudioLoadingRerec}
                            typeOfAudio="pitch"
                            //toast
                            showToast={showToastSession}
                            //upload session
                            uploadSession={uploadSession}
                          />
                        </Grid>
                        {/* ANCHOR Recorded */}
                        <Grid item sm={12} xs={12} md={4} lg={4}>
                          <RecordedCard
                            //rerecordAudio={this.rerecordAudio}
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
                            undoPitchAudio={undoPitchAudio}
                            handleAudio={handleAudio}
                            getRecordedName={getRecordedName}
                            fileName={states.fileName}
                            file={states.file}
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
                            {toTitleCase("pitch audio recordings")}
                          </Typography>
                        </div>
                        {states.user_uuid ? (
                          <div className={classes.emptyPitch}>
                            <b> No pitch selected </b>
                            <br />
                            Select voice, campaign and pitch version to view
                            pitch audio
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
                    {width === "xs" || width === "sm" ? (
                      /* Search and FilterToolbar */
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
                              voices={state.users}
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
                            // filtered={(val: any) =>
                            //   setStates({
                            //     ...states,
                            //     filtered: val
                            //   })
                            // }
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
                    ) : null}
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
                              getRecordedName={getRecordedName}
                              fileName={states.fileName}
                              user_id={states.user}
                              file={states.file}
                              upload={uploadAudio}
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
                              openAddNewVoiceModal={openAddNewVoiceModal}
                              displayData={states.displayRerecord}
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
                              upload={uploadAudio}
                              voice={states.searchVoice}
                              addNewVoiceModal={
                                states.currentMode === "RerecTable"
                                  ? states.addNewVoiceModal
                                  : false
                              }
                              uploadLoading={states.uploadLoading}
                              undoPitchAudio={undoPitchAudio}
                              rerecordAudio={rerecordAudio}
                              //playing audio
                              showLoader={showLoader}
                              playAudio={playAudio}
                              isLoading={states.isAudioLoading}
                              //upload session
                            />
                          </React.Fragment>
                        ) : states.tabSelected === 2 ? (
                          <React.Fragment>
                            <Table
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
                              addToRerecord={addToRerecord}
                              playAudio={playAudio}
                              version={states.selectedVersion}
                              voice={states.searchVoice}
                              audio={states.audio}
                              fetched={states.fetchedRecorded}
                              isLoading={states.isAudioLoading}
                              showLoader={showLoader}
                              removeAudio={removeAudioPlayed}
                              refreshData={refreshData}
                              rerecordAudio={rerecordAudio}
                              uploadLoading={states.uploadLoading}
                              undoPitchAudio={undoPitchAudio}
                              handleAudio={handleAudio}
                              getRecordedName={getRecordedName}
                              fileName={states.fileName}
                              file={states.file}
                              addNewVoiceModal={states.addNewVoiceModal}
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
                            {toTitleCase("pitch audio recordings")}
                          </Typography>
                        </div>
                        {states.user_uuid ? (
                          <div className={classes.emptyPitch}>
                            <b> No pitch selected </b>
                            <br />
                            Select voice, campaign and pitch version to view
                            pitch audio
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
              {/* Main Content - MOBILE VERSION END*/}
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
      {/* <MainAddNewAudio
          addNewVoiceModal={this.props.addNewVoiceModal}
          openAddNewVoiceModal={this.props.openAddNewVoiceModal}
          label1="Select Campaign"
          label2="Select Pitch Version"
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
          campaignSelected={this.state.selectedCampaign}
          versionSelected={this.state.selectedVersion}
          unrecordedSelected={this.state.unrecordedSelected}
          mainFile={this.state.file}
          mainFileName={this.state.fileName}
          audioToBeUploaded={this.state.audioToBeUploaded}
          changeAudioToBeUploaded={this.handleAudio}
          // recorded={this.state.recorded}
          getUpdatedRecorded={this.getUpdatedRecorded}
          getRecordedName={this.getRecordedName}
          mainUploadAudio={this.uploadAudio}
          loading={this.state.uploadLoading}
          hasMic={this.state.hasMic}
          user_group={this.state.user_group}
          handleUnrecordedSelected={this.handleUnrecordedSelected}
          selectedVoice={this.state.searchVoice}
          token={this.state.token}
          open={this.state.openAddNew}
          typeOfAudio="pitch"
          showToast={this.showToastSession}
        /> */}

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

export default withWidth()(withStyles(useStyles)(Pitch));
