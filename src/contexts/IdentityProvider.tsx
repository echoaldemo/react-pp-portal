import React, { useReducer, useEffect, useState } from "react";
import IdentityReducer from "./Identity/IdentityReducer";
import { get, remove, patch } from "utils/api"; // eslint-disable-line

const initialState = {
  realms: [],
  campaignDetails: {},
  campaignCompany: {},
  loading: false,
  campaignRealms: [],
  companies: [],
  deleteLoading: false,
  openDeleteModal: false,
  panels: [],
  pitch: { name: "Sample Pitch", panel: "Standard", active_version: 1 },
  option_groups: [],
  panel_tab: 0
};

const IdentityContext = React.createContext<any>(initialState);
const IdentityProvider = ({ children }: any) => {
  const [tab, setTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [openCreatePanelModal, setOpenCreatePanelModal] = useState(false);
  const [editPanel, setEditPanel] = useState(false);
  const [newFieldModal, setNewFieldModal] = useState(false);

  const setLoading = (val: boolean) => {
    dispatch({ type: "LOADING", payload: { loading: val } });
  };
  const [state, dispatch] = useReducer(IdentityReducer, initialState);

  const handleSaveCampaignDetails = (campaign: any) => {
    setLoading(true);
    Object.keys(campaign).forEach(key => {
      if (campaign[key] === null) campaign[key] = {};
    });
    patch(`/identity/campaign/${campaign.uuid}/`, campaign).then((res: any) => {
      setCampaignRealms(res.data);
      dispatch({ type: "SAVE_INFO", payload: { campaign_details: res.data } });
      setLoading(false);
    });
  };

  const setCampaignRealms = (campaign: any) => {
    let campaignRealms: any = [];
    state.realms.forEach((realm: any) => {
      if (campaign.realms.indexOf(realm.uuid) > -1) campaignRealms.push(realm);
    });
    dispatch({
      type: "SAVE_CAMPAIGN_REALMS",
      payload: { campaignRealms: campaignRealms }
    });
  };

  const getCampaign = (uuid: string): any => {
    get(`/identity/campaign/${uuid}`).then((res: any) => {
      console.log("campaign: ", res.data);
      setCampaignRealms(res.data);
      getCampaignCompany(res.data.company);
      dispatch({ type: "SAVE_INFO", payload: { campaign_details: res.data } });
      setLoading(false);
    });
  };

  const getCampaignCompany = (uuid: string): any => {
    let company = state.companies.filter(
      (company: any) => company.uuid === uuid
    );
    dispatch({
      type: "SAVE_CAMPAIGN_COMPANY",
      payload: { campaignCompany: company[0] }
    });
  };

  const getCompanies = () => {
    get("/identity/company/list/", {
      editable: false
    }).then((res: any) =>
      dispatch({ type: "SAVE_COMPANIES", payload: { companies: res.data } })
    );
  };

  const getRealms = () => {
    get("/identity/realm/list/", {
      editable: false
    }).then((res: any) =>
      dispatch({ type: "SAVE_REALMS", payload: { realms: res.data } })
    );
  };

  useEffect(() => {
    setLoading(true);
    getCompanies();
    getRealms();
  }, []);

  useEffect(() => {
    if (state.realms.length > 0) {
      let path = window.location.pathname;
      let splitedPath = path.split("/");
      if (splitedPath.length >= 5) {
        let uuid = splitedPath[5];
        setTimeout(() => getCampaign(uuid), 2000);
      }
    }
  }, [state.realms]);

  return (
    <IdentityContext.Provider
      value={{
        state,
        dispatch,
        handleSaveCampaignDetails,
        getCampaign,
        setLoading,
        setTab,
        tab,
        openModal,
        setOpenModal,
        editGroup,
        setEditGroup,
        // filterRealm,
        openCreatePanelModal,
        setOpenCreatePanelModal,
        editPanel,
        setEditPanel,
        newFieldModal,
        setNewFieldModal
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};
export { IdentityProvider, IdentityContext };
