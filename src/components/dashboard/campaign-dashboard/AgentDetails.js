import React from "react";
import NavTabs from "../../common-components/nav-tabs/Settings-menu-bar";
import Tabs from "./components/Tabs";
import { Paper } from "@material-ui/core";

export default function AgentDetails(props) {
  return (
    <div>
      <NavTabs
        data={{
          name: "agent-name",
          active: true
        }}
        tabnames={[]}
        history={props.history}
        back={{
          name: "Back to dashboard",
          url: "/dashboard/all/333/agent-dashboard"
        }}
      />
      <Paper square={true} style={{ paddingTop: 15 }}>
        <Tabs />
      </Paper>
    </div>
  );
}
