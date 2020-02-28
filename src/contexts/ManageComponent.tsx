import React, { createContext, useReducer } from "react";

const initialState = {
  users: [],
  companies: [],
  campaigns: [],
  roles: [],
  teams: [],
  realms: [],
  location: []
};

const store = createContext<any>(initialState);
const { Provider } = store;

const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "manage-list":
        return {
          ...state,
          users: action.payload.userList,
          companies: action.payload.companyList,
          campaigns: action.payload.campaignList,
          roles: action.payload.roleList,
          teams: action.payload.teamList,
          realms: action.payload.realmList,
          location: action.payload.locationList
        };
      case "manage-users":
        return {
          ...state,
          users: action.payload.userList
        };
      case "manage-companies":
        return {
          ...state,
          companies: action.payload.companyList
        };
      case "manage-campaigns":
        return {
          ...state,
          campaigns: action.payload.campaignList
        };
      case "manage-roles":
        return {
          ...state,
          roles: action.payload.roleList
        };
      case "manage-teams":
        return {
          ...state,
          teams: action.payload.teamList
        };
      case "manage-realms":
        return {
          ...state,
          realms: action.payload.realmList
        };
      default:
        return null;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };
