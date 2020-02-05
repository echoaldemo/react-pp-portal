import React, { createContext, useReducer } from "react";

const initialState = {
  users: [],
  companies: [],
  campaigns: [],
  roles: [],
  teams: []
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
          teams: action.payload.teamList
        };
      default:
        return null;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };
