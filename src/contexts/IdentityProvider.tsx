import React, { useReducer, useEffect, useState } from "react";
import { get, remove, patch } from "utils/api";
import mockData from "./mockData.json";
import { setTimeout } from "timers";

const initialState = {
  realms: mockData.realms,
  campaignDetails: mockData.campaignDetails,
  loading: false,
  campaignRealms: mockData.campaignRealms,
  companies: mockData.companies,
  deleteLoading: false,
  openDeleteModal: false,
  panels: []
};

const filterRealm = (data: Array<object>, initialRealms: any) => {
  let newArr: any = [];

  initialRealms.map((item: any) => {
    const value = data.find((realm: any) => {
      return realm.uuid == item;
    });

    newArr.push(value);
  });

  return newArr;
};

const IdentityContext = React.createContext<any>(initialState);

const IdentityProvider = ({ children, match, history }: any) => {
  const { uuid } = match.params;

  const setLoading = (val: boolean) => {
    dispatch({ type: "LOADING", payload: { loading: val } });
  };

  const handleSaveCampaignDetails = (val: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: action.payload.loading };

      case "SAVE_INFO":
        return {
          ...state,
          campaignDetails: action.payload.campaign_details
        };
      case "NEW_PITCH":
        return {
          ...state,
          pitch: action.payload.new_pitch
        };

      case "CREATE_PANEL":
        return { ...state, panels: action.payload.panel };
      default:
        return null;
    }
  }, initialState);

  return (
    <IdentityContext.Provider
      value={{
        state,
        dispatch,
        handleSaveCampaignDetails
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityProvider, IdentityContext };
