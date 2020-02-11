import React from "react";
import { BackButton } from "common-components";
import Tabs from "./components/Tabs";
import { Paper } from "@material-ui/core";

export default function AgentDetails() {
  return (
    <div>
      <BackButton
        text="Back to dashboard"
        to="/dashboard/all/333/agent-dashboard"
      />
      <span style={{ fontSize: 24, color: "#444851" }}>agent-name</span>
      <Paper square={true} style={{ paddingTop: 15, marginTop: 25 }}>
        <Tabs />
      </Paper>
    </div>
  );
}
