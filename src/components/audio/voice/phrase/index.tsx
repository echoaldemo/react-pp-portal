import React, { Component, useEffect, useState, useContext } from "react";
import clsx from "clsx";
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
import DropdownDesktop from "../../common-components/dropdown/Desktop";
import Tabs from "../../common-components/tabs/Mobile";
import TabsDesktop from "../../common-components/tabs/Desktop";
import useStyles from "./styles";
import Filter from "./phrase_audio/Filter";
import Search from "./phrase_audio/Search";
import Table from "./phrase_audio/Table";

import Toast from "../../common-components/toast";
import MainAddNewAudio from "../../common-components/add-new-voice/MainAddNewVoice";
// import Loader from '../../common-components/loader';

//CARDS
import UnrecordedCard from "../../common-components/cards/Unrecorded";
import RerecordCard from "../../common-components/cards/Rerecord";
import RecordedCard from "../../common-components/cards/Recorded";

import { get, patch, post } from "utils/api";
import { TableLoader, HeaderLink } from "common-components";
import { IProps, IState } from "./interfacePhrase";
import { store } from "contexts/ManageComponent";

const Phrase: React.FC<IProps> = props => {
  const { state } = useContext(store);
  const [states, setStates] = useState<IState>({
    loader: false,
    user: 1,
    links: [
      { name: "phrase audio", link: "/phrase" },
      { name: "pitch audio", link: "/pitch" },
      { name: "prospect audio", link: "/prospect" }
    ],
    state1: "DATA_LOADED",
    campaigns: [],
    versions: [],
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
    voices: [],
    user_data: [],
    checkIfGlobal: false,
    companySlug: "",
    campaignList: [],
    unrecordedList: [],
    unrecordedSelected: "",
    voiceSelected: "",
    campaignSelected: "",
    versionSelected: "",
    audioToBeUploaded: "",
    openToast: false,
    toastType: "",
    message: "",
    vertical: "top",
    horizontal: "right",
    token: "",
    fetchedUnrecorded: false,
    fetchedRerecord: false,
    fetchedRecorded: false,
    file: null,
    audioFile: "",
    fileName: "",
    recordedName: "",
    addNewVoiceModal: false,
    uploadLoading: false,
    mainFileName: "",
    mainFile: "",
    mainUploadLoading: false,
    isAudioLoading: false,
    audio: [],
    profile: [],
    user_uuid: state.roles.length !== 0 ? localStorage.getItem("uuid") : "",
    groups: [],
    manage_user: [],
    selectedVersion: "",
    user_group: localStorage.getItem("type"),
    //modal fix
    currentMode: null,
    isAudioLoadingRerec: false
  });

  useEffect(() => {
    document.title = "Phrase Audio";
    var tokenLogin = localStorage.getItem("ngStorage-ppToken");
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
    }

    setStates({
      ...states,
      state1: "DATA_LOADED",
      groups: state.roles,
      token: tokenLogin,
      loader: true,
      showTable: false
    });
    if (states.user_group === "10") {
      recorderSelectCampaign(states.user_uuid);
    } else {
      setStates({
        ...states,
        state1: "DATA_LOADED",
        voices: state.users
      });
    }
  }, []);

  const recorderCamp = (uuid: any, token: any) => {
    setStates({ ...states, searchVoice: uuid });

    let campaigns: any = [];

    const global = {
      uuid: "global1111",
      name: "Global (Globally1 Required Phrases)",
      company: "global",
      slug: "global"
    };
    campaigns.push(global);
    let campaigns1: any = [],
      user_data: any = [];
    if (state.campaigns.length !== 0) {
      get(`/identity/user/profile/`, token).then((user: any) => {
        user_data = user.data;
        campaigns1 = state.campaigns.filter((camp: any) => {
          return user_data.campaigns.includes(camp.uuid);
        });
        if (campaigns1.length) {
          setStates({
            ...states,
            campaigns: campaigns1
          });
        } else {
          setStates({
            ...states,
            openToast: true,
            toastType: "caution",
            message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
            vertical: "top",
            horizontal: "right"
          });
        }
      });
      setStates({ ...states, campaigns });
    }
  };

  const recorderSelectCampaign = (uuid: any) => {
    setStates({ ...states, voiceSelected: uuid });

    let campaigns: any = [];

    const global = {
      uuid: "global1111",
      name: "Global (Globally2 Required Phrases)",
      company: "global",
      slug: "global"
    };
    campaigns.push(global);
    let campaigns1: any = [],
      user_data: any = [];
    get(`/identity/user/profile/`).then((user: any) => {
      user_data = user.data;
      campaigns1 = state.campaigns.filter((camp: any) => {
        return user_data.campaigns.includes(camp.uuid);
      });
      campaigns = campaigns.concat(campaigns1);
      if (campaigns1.length) {
        setStates({
          ...states,
          campaigns,
          voiceSelected: uuid
        });
      } else {
        setStates({
          ...states,
          openToast: true,
          toastType: "caution",
          message: `This voice hasn't been assigned to any campaigns, so no recordings are available. Please contact a Perfect Pitch Administrator to request access`,
          vertical: "top",
          horizontal: "right"
        });
      }
    });
    setStates({ ...states, campaigns });
  };
  const toTitleCase = (str: any) => {
    return str.replace(/\w\S*/g, function(txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const tabSelected = (val: any) => {
    setStates({ ...states, tabSelected: val });
  };
  const selectVoice = (val: any) => {
    setStates({ ...states, voiceSelected: val });
    let campaigns: any = [],
      user_data: any = [],
      campaigns1: any = [];
    const global = {
      uuid: "global1111",
      name: "Global (Globally3 required phrases)",
      company: "global",
      slug: "global"
    };
    campaigns.push(global);
    get(`/identity/user/manage/${val}/`).then((user: any) => {
      user_data = user.data;
      campaigns1 = state.campaigns.filter((camp: any) => {
        return user_data.campaigns.includes(camp.uuid);
      });
      campaigns = campaigns.concat(campaigns1);
      setStates({
        ...states,
        campaigns,
        state1: "DATA_LOADED",
        user_data: user.data,
        user_uuid: val
      });
    });
  };

  // selecting campaign function
  const selectCampaign = (value: any, uuid: any) => {
    setStates({
      ...states,
      versions: [],
      selectedVersion: ""
    });
    if (value === "global") {
      get(`/pitch/global/phrases/`).then((global: any) => {
        setStates({ ...states, versions: global.data, checkIfGlobal: true });
      });
    } else {
      const dataCampaigns: any = state.campaigns.filter(
        (camp: any) => camp.slug === value
      );
      const uuids = dataCampaigns[0].company;
      const dataCompanies: any = state.companies.filter(
        (comp: any) => comp.uuid === uuids
      );
      get(`/pitch/company/${dataCompanies[0].slug}/phrases/`).then(
        (camp: any) => {
          setStates({
            ...states,
            selectedCampaign: uuids,
            selectedVersion: "",
            versions: camp.data,
            checkIfGlobal: false,
            companySlug: dataCompanies[0].slug
          });
        }
      );
    }
  };

  const selectVoiceCampaign = (value: any, uuid: any) => {
    setStates({ ...states, campaignSelected: value });
    if (uuid === "global") {
      get(`/pitch/global/phrases/`).then((global: any) => {
        setStates({ ...states, versions: global.data, checkIfGlobal: true });
      });
    } else {
      // campaign

      get(`/identity/company/${uuid}/`).then((res: any) => {
        setStates({ ...states, companySlug: res.data.slug });

        get(`/pitch/company/${res.data.slug}/phrases/`).then((book: any) => {
          setStates({ ...states, versions: book.data, checkIfGlobal: false });
        });
      });
    }
  };

  const selectVersion = (value: any) => {
    setStates({ ...states, selectedVersion: value });
  };

  //selecting phrasebook
  const selectPhraseBook = (value: any) => {
    setStates({ ...states, versionSelected: value });

    if (states.checkIfGlobal === true) {
      setStates({
        ...states,
        unrecordedList: [
          {
            uuid: "785123b8-0523-11ea-8e22-0242ac11000f",
            name: "echo-phrase",
            slug: "echo-phrase",
            phrase: "Jerecho echo echo",
            phrase_book: "61a1e872-dae7-11e7-a483-0242ac110009"
          },
          {
            uuid: "5b7836d2-0523-11ea-acda-0242ac110005",
            name: "test-me",
            slug: "test-me",
            phrase: "hi my name is Echo Jerecho",
            phrase_book: "61a1e872-dae7-11e7-a483-0242ac110009"
          }
        ]
      });

      //UNCOMMENT FOR ACTUAL DATA
      // get(
      // 	`/pitch/global/audio/phrase-book/${value}/voice/${states.user_data.uuid}/unrecorded/`
      // ).then((unrec) => {
      // 	setStates({ ...states,
      // 		unrecordedList: unrec.data
      // 	});
      // });
    } else {
      setStates({
        ...states,
        unrecordedList: [
          {
            uuid: "785123b8-0523-11ea-8e22-0242ac11000f",
            name: "echo-phrase",
            slug: "echo-phrase",
            phrase: "Jerecho echo echo",
            phrase_book: "61a1e872-dae7-11e7-a483-0242ac110009"
          },
          {
            uuid: "5b7836d2-0523-11ea-acda-0242ac110005",
            name: "test-me",
            slug: "test-me",
            phrase: "hi my name is Echo Jerecho",
            phrase_book: "61a1e872-dae7-11e7-a483-0242ac110009"
          }
        ]
      });

      //UNCOMMENT FOR ACTUAL DATA
      // get(
      // 	`/pitch/company/${states.campaignSelected}/audio/phrase-book/${value}/voice/${states.user_data
      // 		.uuid}/unrecorded/`
      // ).then((unrec) => {
      // 	setStates({ ...states,
      // 		unrecordedList: unrec.data
      // 	});
      // });
    }
  };

  const selectUnrecorded = (value: any) => {
    setStates({ ...states, unrecordedSelected: value });
  };

  const filterData = () => {
    var data1, data2, data3;
    setStates({
      ...states,
      loader: true,
      showTable: false,
      display: [],
      displayRerecord: [],
      fetchedRecorded: false,
      fetchedRerecord: false,
      fetchedUnrecorded: false
    });
    if (states.checkIfGlobal === true) {
      data1 = get(
        `/pitch/global/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/unrecorded/`
      );
      data2 = get(
        `/pitch/global/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/rerecord/`
      );
      data3 = get(
        `/pitch/global/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/recorded/`
      );
    } else {
      data1 = get(
        `/pitch/company/${states.companySlug}/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/unrecorded/`
      );
      data2 = get(
        `/pitch/company/${states.companySlug}/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/rerecord/`
      );
      data3 = get(
        `/pitch/company/${states.companySlug}/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/recorded/`
      );
    }
    Promise.all([data1, data2, data3]).then(values => {
      setStates({
        ...states,
        loader: false,
        showTable: true,
        display: values[0].data,
        fetchedUnrecorded: values[0].status === 200 ? true : false,
        displayRerecord: values[1].data,
        fetchedRerecorded: values[1].status === 200 ? true : false,
        displayRecorded: values[2].data,
        fetchedRecorded: values[2].status === 200 ? true : false,
        filtered: true
      });
    });
  };
  const refreshData = () => {
    setStates({
      ...states,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedRecorded: false,
      fetchedUnrecorded: false,
      fetchedRerecord: false
    });
    filterData();
  };

  const resetFilters = (val: any) => {
    setStates({ ...states, display: [], filtered: false, showTable: val });
  };
  const handleChange = (key: any, val: any) => {
    setStates({ ...states, [key]: val });
  };
  const selectedVoice = (val: any) => {
    setStates({
      ...states,
      campaigns: [],
      versions: [],
      selectedCampaign: "",
      selectedVersion: ""
    });
    let campaigns: any = [],
      user_data: any = [],
      campaigns1: any = [];
    const global = {
      uuid: "global1111",
      name: "Global (Globally3 required phrases)",
      company: "global",
      slug: "global"
    };
    campaigns.push(global);
    get(`/identity/user/manage/${val}/`).then((user: any) => {
      user_data = user.data;
      campaigns1 = state.campaigns.filter((camp: any) => {
        return user_data.campaigns.includes(camp.uuid);
      });
      campaigns = campaigns.concat(campaigns1);
      if (campaigns.length !== 0) {
        setStates({
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
        setStates({
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
    setStates({ ...states, audioFile: e.target.value });

    let files = e.target.files;
    var uploadFile = new FormData();
    uploadFile.append("file", files[0]);
    setStates({ ...states, fileName: files[0].name, file: uploadFile });
  };
  const removeAudio = () => {
    setStates({ ...states, audioFile: "", fileName: "" });
  };
  const getRecordedName = (val: any) => {
    setStates({ ...states, recordedName: val });

    states.unrecorded.map((data: any, id: any) => {
      if (val === data.name) {
        states.unrecorded.splice(id, 1);
      }
      return null;
    });
  };
  const uploadAudio = (
    voice: any,
    phrasebook: any,
    slug: any,
    phrase: any,
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
      setStates({ ...states, uploadLoading: true });

      if (states.checkIfGlobal) {
        post(
          `/pitch/global/audio/phrase-book/${phrasebook}/voice/${states.voiceSelected}/phrase/${states.selectedVersion}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
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
              file: null,
              audioFile: "",
              fileName: "",
              uploadLoading: false,
              addNewVoiceModal: false
            });
            filterData();

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
                message: `Error uploading file`,
                vertical: "top",
                horizontal: "right",
                addNewVoiceModal: false,
                uploadLoading: false
              });
            }
          })
          .catch((err: any) => {
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
          });
      } else {
        post(
          `/pitch/company/${states.companySlug}/audio/phrase-book/${phrasebook}/voice/${states.voiceSelected}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
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
              file: null,
              audioFile: "",
              fileName: "",
              uploadLoading: false,
              addNewVoiceModal: false
            });
            filterData();
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
          .catch((err: any) => {
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
          });
      }
    }
  };
  const uploadSession = (session: any) => {
    let requests;
    setStates({ ...states, uploadLoading: true });
    if (states.checkIfGlobal) {
      requests = session.map((audio: any) => {
        return post(
          `/pitch/global/audio/phrase-book/${audio.phrasebook}/voice/${states.voiceSelected}/phrase/${audio.phrase}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
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
            file: null,
            audioFile: "",
            fileName: "",
            uploadLoading: false,
            addNewVoiceModal: false
          });
          filterData();
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
        .catch(err => {
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
        });
    } else {
      requests = session.map((audio: any) => {
        return post(
          `/pitch/company/${states.companySlug}/audio/phrase-book/${audio.phrasebook}/voice/${states.voiceSelected}/phrase/${audio.phrase}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
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
            file: null,
            audioFile: "",
            fileName: "",
            uploadLoading: false,
            addNewVoiceModal: false
          });
          filterData();
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
        .catch(err => {
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
        });
    }
  };
  const openAddNewVoiceModal = (bool: any, currentMode: any) => {
    if (bool === false) {
      setStates({
        ...states,
        addNewVoiceModal: false,
        audioFile: "",
        fileName: "",
        file: ""
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
  const handleCloseToast = () => {
    setStates({ ...states, openToast: false });
  };
  const addToRerecord = (version: any, voice: any, val: any) => {
    setStates({
      ...states,
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });

    if (states.checkIfGlobal === true) {
      patch(
        `/pitch/global/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/phrase/${val.uuid}/file/`,
        { rerecord: true }
      ).then((audio: any) => {
        filterData();
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
      });
    } else {
      patch(
        `/pitch/company/${states.companySlug}/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/phrase/${val.uuid}/file/`,
        { rerecord: true }
      ).then((res: any) => {
        if (res.status === "201" || res.status === "200") {
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
            message: `Error uploading file`,
            vertical: "top",
            horizontal: "right",
            addNewVoiceModal: false,
            uploadLoading: false
          });
        }
        filterData();
      });
    }
  };
  const addToRecorded = (val: any) => {
    setStates({
      ...states,
      loader: true,
      display: [],
      displayRerecord: [],
      displayRecorded: [],
      fetchedUnrecorded: false,
      fetchedRerecord: false,
      fetchedRecorded: false
    });
    if (states.checkIfGlobal === true) {
      patch(
        `/pitch/global/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/phrase/${val.uuid}/file/`,
        { rerecord: false }
      ).then((audio: any) => {
        filterData();
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
      });
    } else {
      patch(
        `/pitch/company/${states.companySlug}/audio/phrase-book/${states.selectedVersion}/voice/${states.voiceSelected}/phrase/${val.uuid}/file/`,
        { rerecord: false }
      ).then((audio: any) => {
        filterData();
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
      });
    }
  };
  const openAddNewDialog = () => {
    setStates({ ...states, openAddNew: true });
  };
  const closeAddNewDialog = () => {
    setStates({
      ...states,
      openAddNew: false,
      voiceSelected: "",
      campaignSelected: "",
      versionSelected: "",
      unrecordedSelected: ""
    });
  };
  const changeAudioToBeUploaded = (e: any) => {
    setStates({ ...states, audioToBeUploaded: e.target.value });

    let files = e.target.files;
    var uploadFile = new FormData();

    uploadFile.append("file", files[0]);
    setStates({ ...states, mainFileName: files[0].name, mainFile: uploadFile });
  };
  const mainUploadAudio = (
    voice: any,
    phrasebook: any,
    slug: any,
    phrase: any,
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
        message: `Please select audio file`,
        vertical: "top",
        horizontal: "right"
      });
    } else if ((phrasebook && slug && phrase) === "") {
      setStates({
        ...states,
        openToast: true,
        toastType: "caution",
        message: `Please complete the form first`,
        vertical: "top",
        horizontal: "right"
      });
    } else {
      setStates({ ...states, mainUploadLoading: true });
      if (slug === "global") {
        post(
          `/pitch/global/audio/phrase-book/${phrasebook}/voice/${states.voiceSelected}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
          file
        )
          .then((res: any) => {
            setStates({
              ...states,
              display: [],
              displayRerecord: [],
              fetchedUnrecorded: false,
              fetchedRerecord: false,
              voiceSelected: "",
              campaignSelected: "",
              versionSelected: "",
              unrecordedSelected: "",
              searchVoice: voice,
              selectedCampaign: slug,
              selectedVersion: phrasebook,
              file: null,
              openAddNew: false,
              mainUploadLoading: false
            });
            filterData();
            if (res.status === 201 || res.status === 200) {
              setStates({
                ...states,
                openToast: true,
                toastType: "check",
                message: `Successfully uploaded`,
                vertical: "top",
                horizontal: "right",
                openAddNew: false,
                mainUploadLoading: false
              });
            } else {
              setStates({
                ...states,
                openToast: true,
                toastType: "caution",
                message: `Error uploading file`,
                vertical: "top",
                horizontal: "right",
                openAddNew: false,
                mainUploadLoading: false
              });
            }
          })
          .catch((err: any) => {
            setStates({
              ...states,
              openToast: true,
              toastType: "caution",
              message: `Error uploading file`,
              vertical: "top",
              horizontal: "right",
              openAddNew: false,
              mainUploadLoading: false
            });
          });
      } else {
        post(
          `/pitch/company/${slug}/audio/phrase-book/${phrasebook}/voice/${states.voiceSelected}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
          file
        )
          .then((res: any) => {
            setStates({
              ...states,
              display: [],
              displayRerecord: [],
              fetchedUnrecorded: false,
              fetchedRerecord: false,
              voiceSelected: "",
              campaignSelected: "",
              versionSelected: "",
              unrecordedSelected: "",
              searchVoice: voice,
              selectedCampaign: slug,
              selectedVersion: phrasebook,
              file: null,
              mainUploadLoading: false,
              openAddNew: false
            });
            filterData();
            if (res.status === 201 || res.status === 200) {
              setStates({
                ...states,
                openToast: true,
                toastType: "check",
                message: `Successfully uploaded`,
                vertical: "top",
                horizontal: "right",
                openAddNew: false,
                mainUploadLoading: false
              });
            } else {
              setStates({
                ...states,
                openToast: true,
                toastType: "caution",
                message: `Failed to upload file`,
                vertical: "top",
                horizontal: "right",
                openAddNew: false,
                mainUploadLoading: false
              });
            }
          })
          .catch((err: any) => {
            setStates({
              ...states,
              openToast: true,
              toastType: "caution",
              message: `Error uploading file`,
              vertical: "top",
              horizontal: "right",
              openAddNew: false,
              mainUploadLoading: false
            });
          });
      }
    }
  };

  // const savedAudio = () => {
  //   setStates(
  //     (prevState:any) => ({
  //       openAddNew: !prevState.openAddNew
  //     }),
  //     // () => showSuccessBar()
  //   );
  // };

  // const showSuccessBar = () => {
  //   setStates({
  //     ...states,
  //     openToast: true,
  //     toastType: "check",
  //     message: `Successfully uploaded`,
  //     vertical: "top",
  //     horizontal: "right",
  //     voiceSelected: "",
  //     campaignSelected: "",
  //     versionSelected: "",
  //     unrecordedSelected: ""
  //   });
  // };

  const getUpdatedRecorded = (val: any) => {
    setStates({ ...states, recorded: val });
  };
  const playAudio = (version: any, voice: any, key: any, uuid: any) => {
    if (states.checkIfGlobal === true) {
      get(
        `/pitch/global/audio/phrase-book/${states.selectedVersion}/voice/${states.user_data.uuid}/phrase/${uuid}/file/`
      ).then((res: any) => {
        setStates({ ...states, audio: res.data, isAudioLoading: false });
      });
    } else {
      get(
        `/pitch/company/${states.companySlug}/audio/phrase-book/${states.selectedVersion}/voice/${states.user_data.uuid}/phrase/${uuid}/file/`
      ).then((res: any) => {
        setStates({
          ...states,
          audio: res.data,
          isAudioLoading: false,
          isAudioLoadingRerec: false
        });
      });
    }
  };
  const stopLoading = () => {
    setStates({ ...states, isAudioLoading: false });
  };
  const showLoader = (type: any) => {
    if (type === "recorded") {
      setStates({ ...states, isAudioLoading: true });
    } else {
      setStates({ ...states, isAudioLoadingRerec: true });
    }
  };
  const removeAudioPlayed = () => {
    setStates({ ...states, audio: [] });
  };

  const handleUnrecordedSelected = (val: any) => {
    setStates({ ...states, unrecordedSelected: val });
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
    patch(
      `/pitch/audio/version/${version}/voice/${states.voiceSelected}/${key}/`,
      {
        rerecord: true
      }
    )
      .then((res: any) => {
        filterData();

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
  const { classes, width }: any = props;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
                    defaultValue={1}
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
                              voices={states.voices}
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
                            typeOfAudio="phrase"
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
                            addToRecorded={addToRecorded}
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
                            rerecordAudio={rerecordAudio}
                            //playing audio
                            preview={states.audio}
                            showLoader={showLoader}
                            playAudio={playAudio}
                            isLoading={states.isAudioLoadingRerec}
                            //debugging
                            typeOfAudio="phrase"
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
                            {toTitleCase("phrase audio recordings")}
                          </Typography>
                        </div>
                        {states.user_uuid ? (
                          <div className={classes.emptyPitch}>
                            <b> No phrase selected </b>
                            <br />
                            Select voice, campaign and pitch version to view
                            phrase audio
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
                  <Paper className={fixedHeightPaper}>
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
                              voices={states.voices}
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
                            checkIfGlobal={states.checkIfGlobal}
                            user_group={states.user_group}
                          />
                        </Grid>
                      </Grid>
                    ) : null}
                  </Paper>

                  <Divider />

                  {/* Phrase Audio Recordings Title*/}
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
                              uploadAudio={uploadAudio}
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
                              addToRecorded={addToRecorded}
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
                              rerecordAudio={rerecordAudio}
                              //playing audio
                              preview={states.audio}
                              showLoader={showLoader}
                              playAudio={playAudio}
                              isLoading={states.isAudioLoading}
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
                            {toTitleCase("phrase audio recordings")}
                          </Typography>
                        </div>
                        {states.user_uuid ? (
                          <div className={classes.emptyPitch}>
                            <b> No phrase selected </b>
                            <br />
                            Select voice, campaign and pitch version to view
                            phrase audio
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

      <MainAddNewAudio
        label1="Select Global or Campaign"
        label2="Select Phrase Book"
        onClose={() => closeAddNewDialog()}
        voices={states.voices}
        campaigns={states.campaigns}
        versions={states.versions}
        audio={states.unrecordedList}
        selectVoice={selectVoice}
        selectCampaign={selectVoiceCampaign}
        selectVersion={selectPhraseBook}
        selectUnrecorded={selectUnrecorded}
        voiceSelected={states.voiceSelected}
        campaignSelected={states.campaignSelected}
        versionSelected={states.versionSelected}
        unrecordedSelected={states.unrecordedSelected}
        mainFile={states.mainFile}
        mainFileName={states.mainFileName}
        audioToBeUploaded={states.audioToBeUploaded}
        changeAudioToBeUploaded={changeAudioToBeUploaded}
        getUpdatedRecorded={getUpdatedRecorded}
        getRecordedName={getRecordedName}
        mainUploadAudio={mainUploadAudio}
        loading={states.mainUploadLoading}
        user_group={states.user_group}
        handleUnrecordedSelected={handleUnrecordedSelected}
        selectedVoice={states.searchVoice}
        token={states.token}
        open={states.openAddNew}
        openAddNew={states.openAddNew}
        typeOfAudio="phrase"
        phrase={"forPhrase"}
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

export default withWidth()(withStyles(useStyles)(Phrase));
