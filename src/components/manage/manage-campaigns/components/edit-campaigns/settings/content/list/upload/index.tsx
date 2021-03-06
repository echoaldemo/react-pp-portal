import React, { useState } from "react";
import { PanelTabs, Panel } from "common-components";
import Upload from "./components/upload";
import Instructions from "./components/instructions";
import History from "./components/history";
const List: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div
        style={{
          margin: " 21px 25px",
          borderRadius: 3
        }}
      >
        <PanelTabs
          labels={["upload", "instructions", "history"]}
          tab={tab}
          setTab={setTab}
        />
      </div>

      <Panel value={tab} index={0}>
        <Upload />
      </Panel>
      <Panel value={tab} index={1}>
        <Instructions />
      </Panel>
      <Panel value={tab} index={2}>
        <History />
      </Panel>
    </>
  );
};

export default List;
