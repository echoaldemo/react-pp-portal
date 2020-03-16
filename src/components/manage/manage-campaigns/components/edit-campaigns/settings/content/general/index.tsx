import React, { useState } from "react";
import { PanelTabs, Panel } from "common-components";
import Info from "./components/Info";
import DialerParameters from "./components/DialerParameters";

export default function General(props: any) {
  const [tab, setTab] = useState(0);

  return (
    <div className="p-24 c-default">
      <PanelTabs
        labels={["INFO", "DIALER PARAMETERS"]}
        tab={tab}
        setTab={setTab}
      />
      <Panel value={tab} index={0}>
        <Info {...props} />
      </Panel>
      <Panel value={tab} index={1}>
        <DialerParameters />
      </Panel>
    </div>
  );
}
