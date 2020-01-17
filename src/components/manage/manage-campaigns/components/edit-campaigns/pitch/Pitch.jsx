import React, { useState, useContext } from 'react';
import EditHeader from '../EditHeader';
import { TableLoader } from 'common-components';
import { Paper, Typography, Tabs, Tab, Box } from '@material-ui/core';
import AddNewPitch from './AddNewPitch';
import { IdentityContext } from 'contexts/IdentityProvider';
import {
	Details,
	OptionGroups,
	Panels,
	PhraseBooks,
	RapidResponseTests,
	Segments,
	Variables,
	XML,
	Voices
} from './components';
const tabnames = [
	'DETAILS',
	'SEGMENTS',
	'VARIABLES',
	'VOICES',
	'XML',
	'PANELS',
	'OPTION GROUPS',
	'PHRASE BOOK',
	'RAPID RESPONSE TESTS'
];

export default function PitchSection({ history }) {
	const { state } = useContext(IdentityContext);
	const [ tabValue, setValue ] = useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	function a11yProps(index) {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`
		};
	}

	const tabPanels = [
		Details({ x: 1 }),
		Segments,
		Variables,
		Voices,
		XML,
		Panels,
		OptionGroups,
		PhraseBooks,
		RapidResponseTests
	];

	const renderPitchContent = () => {
		return (
			<div>
				<Typography className="section-title">Pitch Settings</Typography>
				<Tabs value={tabValue} fullwidth="true" onChange={handleChange} className="tabs-container">
					{tabnames.map((name, i) => {
						return <Tab label={name} key={i} {...a11yProps(i)} className="tab-text" />;
					})}
				</Tabs>

				{tabPanels.map((item, i) => {
					return (
						<TabPanel key={i} value={tabValue} index={i}>
							{item}
						</TabPanel>
					);
				})}
			</div>
		);
	};

	return (
		<div>
			<EditHeader campaignDetails={state.campaignDetails} history={history} />
			<Paper square={true} className="mh-normal">
				{state.pitch.length > 0 ? (
					<React.Fragment>{state.loading ? <TableLoader /> : renderPitchContent()}</React.Fragment>
				) : (
					<AddNewPitch />
				)}
			</Paper>
		</div>
	);
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			<Box>{children}</Box>
		</Typography>
	);
}
