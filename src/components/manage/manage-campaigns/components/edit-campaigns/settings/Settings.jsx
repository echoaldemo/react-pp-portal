import React, { useEffect, useState } from 'react';
import './Settings.css';
import EditHeader from '../EditHeader';
import { get } from '../../../../../../utils/api';
import { mockDataCampaigns } from '../../../../globalConstsVar';
import { Paper, Typography, Tabs, Tab, Box } from '@material-ui/core';
import { General, AudioResources, List, QA, ChangeLog } from './content';
export default function Settings({ match, history }) {
	const { uuid } = match.params;
	const [ data, setData ] = useState([]);
	const [ value, setValue ] = useState(0);
	useEffect(() => {
		get(`/identity/campaign/${uuid}`)
			.then((result) => {
				console.log('data');
				setData(result.data);
			})
			.catch((err) => {
				setData(mockDataCampaigns[0]);
			});
	}, []);
	function handleChange(event, newValue) {
		setValue(newValue);
	}

	function a11yProps(index) {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`
		};
	}
	return (
		<div>
			<EditHeader data={data} history={history} />
			<Paper square={true} className="mh-normal">
				<div>
					<Typography className="settings-title">Campaign Settings</Typography>
					<Tabs value={value} fullwidth="true" onChange={handleChange} className="tabs-container">
						<Tab label="General" {...a11yProps(0)} className="tab-text" />
						<Tab label="Audio Resources" {...a11yProps(1)} className="tab-text" />
						<Tab label="List" {...a11yProps(2)} className="tab-text" />
						<Tab label="QA" {...a11yProps(3)} className="tab-text" />
						<Tab label="Change Log" {...a11yProps(4)} className="tab-text" />
					</Tabs>
					<TabPanel value={value} index={0}>
						<General />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<AudioResources />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<List />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<QA />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<ChangeLog />
					</TabPanel>
				</div>
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
