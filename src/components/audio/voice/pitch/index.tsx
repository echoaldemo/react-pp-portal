import React, { Component } from "react";
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
// import DropdownDesktop from "../../common-components/dropdown/Desktop";
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
import {
  pitchMockData,
  manageListMockData,
  selectedVoiceData,
  campaignMockData,
  versionMockData,
  UnrecordedVoicesPitchData,
  RerecordedVoicesPitchData,
  RecordVoicesPitchData
} from "./pitchMockData";
import { get, patch } from "../../utils/api";

interface State {
  loader: boolean;
  user: number;
  links: any;
  state: string;
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
}

class Pitch extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      loader: false,
      user: 1,
      links: [
        { name: "pitch audio", link: "/pitch" },
        { name: "phrase audio", link: "/phrase" },
        { name: "prospect audio", link: "/prospect" }
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
    };
  }

  componentDidMount() {
    document.title = "Pitch Audio";
    // var tokenLogin = localStorage.getItem("ngStorage-ppToken");
    // console.log(tokenLogin);
    // if (localStorage.getItem("error")) {
    //   this.setState({
    //     openToast: true,
    //     toastType: "caution",
    //     message: `Your user does not have access to that page. You may need to sign-in.`,
    //     vertical: "top",
    //     horizontal: "right"
    //   });
    //   localStorage.removeItem("error");
    // }
    // this.setState({ token: tokenLogin });
    // get(`/identity/user/profile/`).then(profileData => {
    //   this.setState({
    //     state: "DATA_LOADED",
    //     profile: profileData.data,
    //     user_uuid: profileData.data.uuid,
    //     user_group: profileData.data.groups[0]
    //   });
    //   if (profileData.data.groups[0] === 10) {
    //     this.recorderCamp(profileData.data.uuid, tokenLogin);
    //   } else {
    //     get("/identity/user/manage/list/?groups=10&limit=100").then(
    //       voiceData => {
    //         this.setState({
    //           state: "DATA_LOADED",
    //           voices: voiceData.data.results
    //         });
    //       }
    //     );
    //   }
    // });

    //setState of mockData
    //=================================
    setTimeout(() => {
      this.setState({
        state: "DATA_LOADED",
        profile: pitchMockData,
        user_uuid: pitchMockData.uuid,
        user_group: pitchMockData.groups[0]
      });
      if (pitchMockData.groups[0] === 10) {
        this.recorderCamp(pitchMockData.uuid);
      } else {
        this.setState({
          state: "DATA_LOADED",
          voices: manageListMockData.results
        });
      }
    }, 1000);
    //====================================
  }

  recorderCamp = (uuid: any) => {
    this.setState({
      searchVoice: uuid
    });
    // let campaigns: any = [],
    //   user_data: any = [];
    // const data1 = await get(`/identity/user/profile/`).then(user => {
    //   user_data = user.data.campaigns;
    //   this.setState({
    //     state: "DATA_LOADED",
    //     user_data: user.data
    //   });
    // });
    // const data2 = await get(`/identity/campaign/list/`)
    //   .then(campaign => {
    //     campaigns = campaign.data.filter((camp: any) => {
    //       return user_data.indexOf(camp.uuid) > -1;
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // Promise.all([data1, data2]).then(() => {
    //   if (campaigns.length) {
    //     this.setState({
    //       campaigns
    //     });
    //   } else {
    //     this.setState({
    //       openToast: true,
    //       toastType: "caution",
    //       message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
    //       vertical: "top",
    //       horizontal: "right"
    //     });
    //   }
    // });
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
      selectedCampaign: value
    });
    //setState of mockData
    //=================================
    setTimeout(() => {
      this.setState({
        versions: versionMockData.versions.reverse()
      });
    }, 1000);
    //====================================

    // get(`/identity/company/${uuid}/`).then(res => {
    //   get(`/pitch/company/${res.data.slug}/campaign/${value}/`)
    //     .then(versions => {
    //       if (versions.data.versions.length > 0) {
    //         this.setState({
    //           versions: versions.data.versions.reverse()
    //         });
    //       } else {
    //         this.setState({
    //           openToast: true,
    //           toastType: "caution",
    //           message: `There are no pitch versions available for this campaign.`,
    //           vertical: "top",
    //           horizontal: "right"
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       this.setState({
    //         openToast: true,
    //         toastType: "caution",
    //         message: `There are no pitch versions available for this campaign.`,
    //         vertical: "top",
    //         horizontal: "right"
    //       });
    //     });
    // });
  };

  selectVersion = (value: any) => {
    this.setState({
      selectedVersion: value
    });
    // get(
    //   `/pitch/audio/version/${value}/voice/${this.state.user_data.uuid}/unrecorded/`
    // ).then(pitchunrecorded => {
    //   this.setState({
    //     unrecordedList: pitchunrecorded.data
    //   });
    // });
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

    //setState of mockData
    //=================================
    setTimeout(() => {
      this.setState({
        display: UnrecordedVoicesPitchData,
        fetchedUnrecorded: true,
        displayRerecord: RerecordedVoicesPitchData,
        fetchedRerecord: false,
        displayRecorded: RecordVoicesPitchData,
        fetchedRecorded: true,
        showTable: true,
        loader: false
      });
    }, 1000);
    //====================================
    // const data1 = get(
    //   `/pitch/audio/version/${pitch_version}/voice/${this.state.user_data.uuid}/unrecorded/`
    // ).then(unrecorded => {
    //   this.setState({
    //     display: unrecorded.data,
    //     fetchedUnrecorded: unrecorded.status === 200 ? true : false
    //   });
    // });
    // const data2 = get(
    //   `/pitch/audio/version/${pitch_version}/voice/${this.state.user_data.uuid}/rerecord/`
    // ).then(rerecord => {
    //   this.setState({
    //     displayRerecord: rerecord.data,
    //     fetchedRerecord: rerecord.status === 200 ? true : false
    //   });
    // });
    // const data3 = get(
    //   `/pitch/audio/version/${pitch_version}/voice/${this.state.user_data.uuid}/recorded/`
    // ).then(recorded => {
    //   this.setState({
    //     displayRecorded: recorded.data,
    //     fetchedRecorded: recorded.status === 200 ? true : false
    //   });
    // });
    // Promise.all([data1, data2, data3]).then(() => {
    //   this.setState({
    //     showTable: true,
    //     loader: false
    //   });
    // });
  };

  resetFilters = (val: any) => {
    this.setState({
      display: [],
      showTable: val
    });
  };

  handleChange = (key: any, val: any) => {
    this.setState({
      [key]: val
    });
  };

  selectedVoice = (val: any) => {
    console.log(val);
    this.setState({
      campaigns: [],
      versions: [],
      voiceSelected: val,
      searchVoice: val
    });

    //setState of mockData
    //=================================
    setTimeout(() => {
      this.setState({
        state: "DATA_LOADED",
        user_data: selectedVoiceData,
        campaigns: campaignMockData
      });
    }, 1000);
    //====================================

    // let campaigns:any = [],
    //   user_data:any = [];
    // const data1 = await get(`/identity/user/manage/${val}/`).then(user => {
    //   user_data = user.data.campaigns;
    //   this.setState({
    //     state: "DATA_LOADED",
    //     user_data: user.data
    //   });
    // });
    // const data2 = await get(`/identity/campaign/list/`)
    //   .then(campaign => {
    //     campaigns = campaign.data.filter(camp => {
    //       return user_data.indexOf(camp.uuid) > -1;
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // Promise.all([data1, data2]).then(() => {
    //   if (campaigns.length) {
    //     this.setState({
    //       campaigns
    //     });
    //   } else {
    //     this.setState({
    //       openToast: true,
    //       toastType: "caution",
    //       message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
    //       vertical: "top",
    //       horizontal: "right"
    //     });
    //   }
    // });
  };

  deleteAudio = (val: any) => {
    this.state.recorded.map((data: any, id: any) => {
      if (val === data.name) {
        this.state.recorded.splice(id, 1);
      }
      return null;
    });
  };

  // for uploading audio
  handleAudio = (e: any) => {
    if (e.target.files && e.target.value) {
      this.setState({ audioFile: e.target.value });
      let files = e.target.files;
      var uploadFile = new FormData();
      uploadFile.append("file", files[0]);
      this.setState({
        fileName: files[0].name,
        file: uploadFile
      });
    }
  };

  removeAudio = () => {
    this.setState({
      file: "",
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
  // end for uploading audio

  addToRerecord = (version: any, voice: any, val: any) => {
    this.setState({
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    //setState of mockData
    //=================================
    setTimeout(() => {
      this.setState({
        display: UnrecordedVoicesPitchData,
        fetchedUnrecorded: true,
        displayRerecord: RecordVoicesPitchData,
        fetchedRerecord: true,
        displayRecorded: RerecordedVoicesPitchData,
        fetchedRecorded: false,
        showTable: true,
        loader: false
      });
    }, 1000);
    //====================================
    // if (this.state.checkIfGlobal === true) {
    //   patch(
    //     `/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data.uuid}/phrase/${val.uuid}/file/`,
    //     { rerecord: true }
    //   ).then(audio => {
    //     this.filterData();
    //   });
    // } else {
    //   patch(`/pitch/audio/version/${version}/voice/${voice}/${val.key}/`, {
    //     rerecord: true
    //   }).then(res => {
    //     if (res.status === 201 || res.status === 200) {
    //       this.setState({
    //         openToast: true,
    //         toastType: "check",
    //         message: `Successfully added to rerecord`,
    //         vertical: "top",
    //         horizontal: "right",
    //         addNewVoiceModal: false,
    //         uploadLoading: false,
    //         loader: false
    //       });
    //     } else {
    //       this.setState({
    //         openToast: true,
    //         toastType: "caution",
    //         message: `Error uploading file`,
    //         vertical: "top",
    //         horizontal: "right",
    //         addNewVoiceModal: false,
    //         uploadLoading: false
    //       });
    //     }
    //     this.filterData(version);
    //   });
    // }
  };

  // main audio adding
  openAddNewDialog() {
    this.setState({
      openAddNew: true
    });
  }

  closeAddNewDialog() {
    this.setState({
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

  savingAudio = () => {
    this.setState(
      prevState => ({
        openAddNew: !prevState.openAddNew
      }),
      () => this.showSuccessBar()
    );
  };

  showSuccessBar = () => {
    this.setState({
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

  handleCloseToast = () => {
    this.setState({
      openToast: false
    });
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
    get(`/pitch/audio/version/${version}/voice/${voice}/${key}/`).then(res => {
      this.setState({
        audio: res.data,
        isAudioLoading: false,
        isAudioLoadingRerec: false
      });
    });
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
      // post(
      //   `/pitch/audio/version/${version}/voice/${voice}/${key}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
      //   file
      // )
      //   .then(res => {
      //     this.setState({
      //       display: [],
      //       displayRerecord: [],
      //       displayRecorded: [],
      //       fetchedRecorded: false,
      //       fetchedUnrecorded: false,
      //       fetchedRerecord: false,
      //       audio: [],
      //       fileName: "",
      //       file: null,
      //       uploadLoading: false,
      //       openAddNew: false
      //     });
      //     this.filterData(version);

      //     // checks if status response was 201.
      //     if (res.status === 201 || res.status === 200) {
      //       this.setState({
      //         openToast: true,
      //         toastType: "check",
      //         message: `Successfully uploaded`,
      //         vertical: "top",
      //         horizontal: "right",
      //         addNewVoiceModal: false,
      //         uploadLoading: false
      //       });
      //     } else {
      //       this.setState({
      //         openToast: true,
      //         toastType: "caution",
      //         message: `Failed to upload file`,
      //         vertical: "top",
      //         horizontal: "right",
      //         addNewVoiceModal: false,
      //         uploadLoading: false
      //       });
      //     }
      //   })
      // if there is no response we will show a failed upload message
      // .catch(err => {
      //   this.setState({
      //     openToast: true,
      //     toastType: "caution",
      //     message: `Error uploading file`,
      //     vertical: "top",
      //     horizontal: "right",
      //     addNewVoiceModal: false,
      //     uploadLoading: false,
      //     openAddNew: false
      //   });
      // });
    }
  };

  //ANCHOR UPLOAD SESSION START

  uploadSession = (session: any) => {
    this.setState({
      uploadLoading: true
    });
    // const requests = session.map((audio: any) => {
    //   return post(
    //     `/pitch/audio/version/${audio.version}/voice/${audio.voice}/${audio.audioKey}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
    //     audio.file
    //   );
    // });
    // Promise.all(requests)
    //   .then(() => {
    //     this.setState({
    //       display: [],
    //       displayRerecord: [],
    //       displayRecorded: [],
    //       fetchedRecorded: false,
    //       fetchedUnrecorded: false,
    //       fetchedRerecord: false,
    //       audio: [],
    //       fileName: "",
    //       file: null,
    //       uploadLoading: false,
    //       openAddNew: false
    //     });
    //     this.filterData(this.state.selectedVersion);
    //     this.setState({
    //       openToast: true,
    //       toastType: "check",
    //       message: `Successfully uploaded`,
    //       vertical: "top",
    //       horizontal: "right",
    //       addNewVoiceModal: false,
    //       uploadLoading: false
    //     });
    //   })
    //   // if there is no response we will show a failed upload message
    //   .catch(err => {
    //     this.setState({
    //       openToast: true,
    //       toastType: "caution",
    //       message: `Error uploading file`,
    //       vertical: "top",
    //       horizontal: "right",
    //       addNewVoiceModal: false,
    //       uploadLoading: false,
    //       openAddNew: false
    //     });
    //   });
  };

  rerecordAudio = (version: any, voice: any, key: any) => {
    this.setState({
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
      .then(res => {
        this.filterData(version);

        // checks if status response was 201.
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
      // if there is no response we will show a failed upload message
      .catch(err => {
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

  //Update a specific pitch audio
  undoPitchAudio = (version: any, voice: any, key: any) => {
    this.setState({
      loader: true,
      display: [],
      displayRecorded: [],
      displayRerecord: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });
    //setState of mockData
    //=================================
    setTimeout(() => {
      this.setState({
        display: UnrecordedVoicesPitchData,
        fetchedUnrecorded: true,
        displayRerecord: RerecordedVoicesPitchData,
        fetchedRerecord: false,
        displayRecorded: RecordVoicesPitchData,
        fetchedRecorded: true,
        showTable: true,
        loader: false
      });
    }, 1000);
    //====================================
    // patch(
    //   `/pitch/audio/version/${this.state.selectedVersion}/voice/${this.state.searchVoice}/${key}/`,
    //   { rerecord: false }
    // )
    //   .then(res => {
    //     //added
    //     this.filterData(this.state.selectedVersion);

    //     // checks if status response was 201.
    //     if (res.status === 201 || res.status === 200) {
    //       this.setState({
    //         openToast: true,
    //         toastType: "check",
    //         message: `Undo successful`,
    //         vertical: "top",
    //         horizontal: "right",
    //         addNewVoiceModal: false,
    //         uploadLoading: false
    //       });
    //     } else {
    //       this.setState({
    //         openToast: true,
    //         toastType: "caution",
    //         message: `Request failed`,
    //         vertical: "top",
    //         horizontal: "right",
    //         addNewVoiceModal: false,
    //         uploadLoading: false
    //       });
    //     }
    //   })
    //   // if there is no response we will show a failed upload message
    //   .catch(err => {
    //     this.setState({
    //       openToast: true,
    //       toastType: "caution",
    //       message: `Request failed`,
    //       vertical: "top",
    //       horizontal: "right",
    //       addNewVoiceModal: false,
    //       uploadLoading: false
    //     });
    //   });
  };

  closeModal = () => {
    this.setState(
      prevState => ({
        addNewVoiceModal: !prevState.addNewVoiceModal
      })
      // () => this.successfulUpload()
    );
  };

  openAddNewVoiceModal = (bool: any, currentMode: any) => {
    if (bool === false) {
      this.setState({
        addNewVoiceModal: false
      });
    } else {
      this.setState({
        currentMode,
        addNewVoiceModal: true,
        anchorEl: null
      });
    }
  };

  // handleCloseToast = () => {
  //   this.setState({
  //     openToast: false
  //   });
  // };

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
  detectMic = () => {
    this.setState({ hasMic: true });
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true })
    //   .then(stream => {
    //     // Code for success
    //     this.setState({ hasMic: true });
    //   })
    //   .catch(err => {
    //     this.setState({ hasMic: false });
    //   });
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
    const { classes, width }: any = this.props;
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
                    md={9}
                    lg={7}
                    className={classes.desktopCon}
                  >
                    <TabsDesktop
                      tabSelected={this.tabSelected}
                      reset={this.resetFilters}
                      defaultValue={0}
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
                                searchFunction={this.selectedVoice}
                                voices={this.state.voices}
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
                      ) : null}
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
                              addToRecorded={this.undoPitchAudio}
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
                              //undoAudio={this.undoPitchAudio}
                              rerecordAudio={this.rerecordAudio}
                              //playing audio
                              preview={this.state.audio}
                              showLoader={this.showLoader}
                              playAudio={this.playAudio}
                              isLoading={this.state.isAudioLoadingRerec}
                              typeOfAudio="pitch"
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
                              undoPitchAudio={this.undoPitchAudio}
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
                              {this.toTitleCase("pitch audio recordings")}
                            </Typography>
                          </div>
                          {this.state.user_uuid ? (
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
                                searchFunction={this.selectedVoice}
                                voices={this.state.voices}
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
                      ) : null}
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
                                getRecordedName={this.getRecordedName}
                                fileName={this.state.fileName}
                                user_id={this.state.user}
                                file={this.state.file}
                                upload={this.uploadAudio}
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
                                openAddNewVoiceModal={this.openAddNewVoiceModal}
                                displayData={this.state.displayRerecord}
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
                                upload={this.uploadAudio}
                                voice={this.state.searchVoice}
                                addNewVoiceModal={
                                  this.state.currentMode === "RerecTable"
                                    ? this.state.addNewVoiceModal
                                    : false
                                }
                                uploadLoading={this.state.uploadLoading}
                                undoPitchAudio={this.undoPitchAudio}
                                rerecordAudio={this.rerecordAudio}
                                //playing audio
                                showLoader={this.showLoader}
                                playAudio={this.playAudio}
                                isLoading={this.state.isAudioLoading}
                                //upload session
                              />
                            </React.Fragment>
                          ) : this.state.tabSelected === 2 ? (
                            <React.Fragment>
                              <Table
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
                                addToRerecord={this.addToRerecord}
                                playAudio={this.playAudio}
                                version={this.state.selectedVersion}
                                voice={this.state.searchVoice}
                                audio={this.state.audio}
                                fetched={this.state.fetchedRecorded}
                                isLoading={this.state.isAudioLoading}
                                showLoader={this.showLoader}
                                removeAudio={this.removeAudioPlayed}
                                refreshData={this.refreshData}
                                rerecordAudio={this.rerecordAudio}
                                uploadLoading={this.state.uploadLoading}
                                undoPitchAudio={this.undoPitchAudio}
                                handleAudio={this.handleAudio}
                                getRecordedName={this.getRecordedName}
                                fileName={this.state.fileName}
                                file={this.state.file}
                                addNewVoiceModal={this.state.addNewVoiceModal}
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
                              {this.toTitleCase("pitch audio recordings")}
                            </Typography>
                          </div>
                          {this.state.user_uuid ? (
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
                  this.openAddNewDialog();
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

export default withWidth()(withStyles(useStyles)(Pitch));
