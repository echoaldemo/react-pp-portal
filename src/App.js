import React from "react";
import { Routes } from "./router";
import { CampaignsContextProvider } from "contexts/CampaignContext";
function App() {
  return (
    <div>
      <CampaignsContextProvider>
        <Routes />
      </CampaignsContextProvider>
    </div>
  );
}

export default App;
