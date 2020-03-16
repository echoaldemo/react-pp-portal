import React, { useState } from "react";
import { PanelTabs, Panel } from "common-components";
import Info from "./components/Info";
import DialerParameters from "./components/DialerParameters";

export default function General(props: any) {
  const [tab, setTab] = useState(0);

<<<<<<< HEAD
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
=======
	return (
		<div className="p-24 c-default">
				<PanelTabs labels={[ 'INFO', 'DIALER PARAMETERS' ]} tab={tab} setTab={setTab} />
				<Panel value={tab} index={0}>
					<Info {...props} />
				</Panel>
				<Panel value={tab} index={1}>
					<DialerParameters />
				</Panel>
		</div>
	);
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
}
