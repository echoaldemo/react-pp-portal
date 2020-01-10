import React, { useState } from 'react';
import { PanelTabs, Panel } from 'common-components';
import Info from './Info';
export default function General({ match }) {
	const [ tab, setTab ] = useState(0);

	return (
		<div className="p-24 c-default">
			<PanelTabs labels={[ 'INFO', 'DIALER PARAMETERS' ]} tab={tab} setTab={setTab} />
			<Panel value={tab} index={0}>
				<Info match={match} />
			</Panel>
			<Panel value={tab} index={1}>
				asdas
			</Panel>
		</div>
	);
}
