import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment, Switch, Button, Typography, MenuItem, Checkbox } from '@material-ui/core';
import { InputField, TableLoader } from 'common-components';
import { getEditData } from '../../../../Functions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LightTooltip } from '../../../../../../../globalConstsVar';
import { GroupOutlined, Delete as DeleteIcon, FileCopyOutlined as CopyIcon } from '@material-ui/icons/';

import { AppContext } from 'contexts/CampaignContext';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 300,
			width: 250
		}
	}
};
export default function Info({ match }) {
	const initialState = JSON.parse(localStorage.getItem('campaignData'));

	const [ state, setState ] = useState(initialState);
	const [ errMsg, setErrMsg ] = useState({});
	const [ addRealms, setAddRealms ] = useState([]);
	const [ addCompany, setAddCompany ] = useState('');
	const [ realms, setRealms ] = useState([]);

	const [ loading, setLoading ] = useState(false);
	const SwitchAd = () => {
		return (
			<Switch
				color="default"
				checked={state.active}
				onChange={(e) => setState({ ...state, active: e.target.checked })}
			/>
		);
	};

	function filterRealm(data, initialRealms) {
		let newArr = [];

		initialRealms.map((item) => {
			const value = data.filter((realm) => {
				return realm.uuid === item;
			});

			newArr.push(value[0]);
		});
		console.log(newArr, 'newArr');
		return newArr;
	}

	useEffect(() => {
		setLoading(true);
		fetch('https://dev-api.perfectpitchtech.com/identity/realm/list/', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'token f6620e466b3902fa6f2edf7f8d28332bd875c79d'
			}
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				const initialRealms = filterRealm(data, initialState.realms);
				setAddRealms(initialRealms);
				setRealms(data);
				setLoading(false);
			});
	}, []);

	function EditForm() {
		return (
			<Grid container spacing={5}>
				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<InputField
						label="Campaign name"
						id="campaign-name"
						fullWidth
						margin="normal"
						required
						value={state.name}
						onChange={(e) => {
							setState({
								...state,
								name: e.target.value
							});
						}}
						error={errMsg.name ? true : false}
						helperText={errMsg.name ? errMsg.name : ' '}
						onBlur={() => {
							if (state.name) {
								setErrMsg({
									...errMsg,
									name: ''
								});
							}
							else {
								setErrMsg({
									...errMsg,
									name: 'A campaign name is required'
								});
							}
						}}
						onFocus={() => {
							setErrMsg({ ...errMsg, name: '' });
						}}
					/>
				</Grid>
				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<InputField
						label="UUID"
						id="UUID"
						fullWidth
						required
						margin="normal"
						value={state.uuid}
						disabled
						InputProps={{
							endAdornment: <CopyUUID uuid={state.uuid} />
						}}
					/>
				</Grid>

				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<InputField
						label="Campaign Server"
						id="Campaign Slug"
						fullWidth
						margin="normal"
						style={{ paddingTop: 5 }}
						required
						value={state.company}
						onChange={(e) => {
							setState({
								...state,
								name: e.target.value
							});
						}}
						error={errMsg.name ? true : false}
						helperText={errMsg.name ? errMsg.name : ' '}
						onBlur={() => {
							if (state.name) {
								setErrMsg({
									...errMsg,
									name: ''
								});
							}
							else {
								setErrMsg({
									...errMsg,
									name: 'A campaign name is required'
								});
							}
						}}
						onFocus={() => {
							setErrMsg({ ...errMsg, name: '' });
						}}
					/>
				</Grid>

				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<InputField
						label="Campaign Status"
						id="status"
						fullWidth
						required
						margin="normal"
						value={state.active ? 'Active' : 'Inactive'}
						InputProps={{
							endAdornment: <SwitchAd />
						}}
					/>
				</Grid>

				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<InputField
						label="Realms (optional)"
						fullWidth
						select
						margin="normal"
						style={{ marginTop: 5 }}
						SelectProps={{
							MenuProps,
							multiple: true,
							onChange: (e) => {
								setAddRealms(e.target.value);
							},
							value: addRealms,
							renderValue: (selected) => selected.map((select) => select.name).join(', ')
						}}
					>
						{realms.map((realm) => (
							<MenuItem key={realm.uuid} value={realm}>
								<Checkbox color="primary" checked={addRealms.indexOf(realm) > -1} />
								{realm.name}
							</MenuItem>
						))}
					</InputField>
				</Grid>

				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<Grid container>
						<Grid item lg={6} xs={12} sm={12} md={6}>
							<Typography>Delete Campaign</Typography>
						</Grid>
						<Grid item lg={6} xs={12} sm={12} md={6}>
							<Button
								onClick={() => alert('xx')}
								type="submit"
								variant="contained"
								size="medium"
								style={{
									width: '130px',
									background: '#ff504d',
									color: 'white',
									float: 'right'
								}}
							>
								<DeleteIcon fontSize="small" style={{ marginRight: 5 }} /> DELETE
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<InputField
						label="Campaign Slug"
						fullWidth
						required
						margin="normal"
						value={state.slug}
						onChange={(e) => {
							setState({
								...state,
								name: e.target.value
							});
						}}
						error={errMsg.name ? true : false}
						helperText={errMsg.name ? errMsg.name : ' '}
						onBlur={() => {
							if (state.name) {
								setErrMsg({
									...errMsg,
									name: ''
								});
							}
							else {
								setErrMsg({
									...errMsg,
									name: 'A campaign name is required'
								});
							}
						}}
						onFocus={() => {
							setErrMsg({ ...errMsg, name: '' });
						}}
					/>
				</Grid>
			</Grid>
		);
	}

	return <div>{loading ? <TableLoader /> : <EditForm />}</div>;
}

const CopyUUID = ({ uuid }) => {
	const [ copy, setCopy ] = useState(false);

	return (
		<InputAdornment position="end">
			<CopyToClipboard text={uuid} onCopy={() => setCopy(true)} onPointerLeave={() => setCopy(false)}>
				{copy ? (
					<LightTooltip title="UUID Copied!" placement="top">
						<CopyIcon fontSize="small" style={{ float: 'right', cursor: 'pointer' }} />
					</LightTooltip>
				) : (
					<LightTooltip title="Copy UUID" placement="top">
						<CopyIcon fontSize="small" style={{ float: 'right', cursor: 'pointer' }} />
					</LightTooltip>
				)}
			</CopyToClipboard>
		</InputAdornment>
	);
};
