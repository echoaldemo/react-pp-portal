import React, { useState } from 'react';
import { PanelTabs, Panel } from 'common-components';
import styled from 'styled-components';
import Calls from './Calls';
import IVR from './IVR';
import Warm from './Warm';
const Container = styled.div`padding: 24px;`;

const AudioResources = () => {
	const [ tab, setTab ] = useState(0);
	return (
		<Container>
			<PanelTabs labels={[ 'CALLS', 'IVR', 'WARM' ]} tab={tab} setTab={setTab} />
			<Panel value={tab} index={0}>
				<Calls />
			</Panel>
			<Panel value={tab} index={1}>
				<IVR />
			</Panel>
			<Panel value={tab} index={2}>
				<Warm />
			</Panel>
		</Container>
	);
};

export default AudioResources;
