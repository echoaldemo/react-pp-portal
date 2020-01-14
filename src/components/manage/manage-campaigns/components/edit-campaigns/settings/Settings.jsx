import React, { useEffect, useState } from 'react';
import './Settings.css';
import EditHeader from '../EditHeader';
import { get, patch } from 'utils/api';
import { mockDataCampaigns } from '../../../../globalConstsVar';
import { Paper, Typography, Tabs, Tab, Box } from '@material-ui/core';
import { General, AudioResources, List, QA, ChangeLog } from './content';

function filterRealm(data, initialRealms) {
	let newArr = [];
	console.log('initRealms', initialRealms);

	initialRealms.map((item) => {
		const value = data.find((realm) => {
			return realm.uuid == item;
		});

		newArr.push(value);
	});

	return newArr;
}

export default function Settings({ match, history }) {
	const [ value, setValue ] = useState(0);
	const [ campaignRealms, setCampaignRealms ] = useState([]);
	const [ campaignDetails, setCampaignDetails ] = useState([]);
	const [ realms, setRealms ] = useState([]);
	const [ companies, setCompanies ] = useState([]);
	const [ loading, setLoading ] = useState([]);
	const { uuid } = match.params;

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	function a11yProps(index) {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`
		};
	}

	useEffect(() => {
		setLoading(true);
		get(`/identity/campaign/${uuid}`)
			.then((res) => {
				setCampaignDetails(res.data);
				return res.data;
			})
			.then((campaignResult) => {
				get('/identity/realm/list/')
					.then((res) => {
						setRealms(res.data);
						const filteredRealms = filterRealm(res.data, campaignResult.realms);
						setCampaignRealms(filteredRealms);
					})
					.then(() => {
						get('/identity/company/list/').then((res) => {
							setCompanies(res.data);
							setLoading(false);
						});
					});
			});
	}, []);
	function handleSaveData(state) {
		const { uuid } = state;
		setLoading(true);

		const realms = state.realms
			.map((item) => {
				return item.uuid;
			})
			.join(',');

		patch(`/identity/campaign/${campaignDetails.uuid}/`, {
			name: state.name,
			company: state.company,
			realms: state.realms,
			slug: state.slug,
			active: state.active
		})
			.then((res) => {
				console.log(res.data, 'update res');
				setCampaignDetails(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	return (
		<div>
			<EditHeader campaignDetails={campaignDetails} history={history} />
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
						<General
							campaignDetails={campaignDetails}
							realms={realms}
							companies={companies}
							setCampaignDetails={campaignDetails}
							loading={loading}
							campaignRealms={campaignRealms}
							handleSaveData={handleSaveData}
						/>
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
						<ChangeLog match={match} history={history} />
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
