import React, { useEffect, useState } from 'react';
import { Collapse, Grid, InputAdornment, Switch, Button, Typography, MenuItem, Checkbox } from '@material-ui/core';
import { InputField, CustomButton, SaveButton } from 'common-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LightTooltip } from '../../../../../../../globalConstsVar';
import { Delete as DeleteIcon, FileCopyOutlined as CopyIcon, KeyboardArrowDown } from '@material-ui/icons/';
import { DeleteModal } from 'common-components';
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 300,
			width: 250
		}
	}
};

const DropdownIcon = () => {
	return <KeyboardArrowDown style={{ color: '#444851' }} />;
};

const EditForm = ({ campaignRealms, campaignDetails, realms, companies, handleSaveData, setOpenDeleteModal }) => {
	const [ state, setState ] = useState(campaignDetails);
	const [ errMsg, setErrMsg ] = useState({});
	const [ addRealms, setAddRealms ] = useState(campaignRealms);


	const SwitchAd = () => {
		return (
			<Switch
				color="default"
				checked={state.active}
				onChange={(e) => setState({ ...state, active: e.target.checked })}
			/>
		);
	};

	const realmChanged = () => {
		return campaignDetails.realms.length !== addRealms.length;
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				handleSaveData({ ...state, realms: addRealms });
			}}
		>
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
						onBlur={(e) => {
							if (e.target.value) {
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
						label="Company"
						data-cy="company"
						id="company"
						fullWidth
						required
						style={{ paddingTop: 22 }}
						select
						SelectProps={{
							IconComponent: () => <DropdownIcon />,
							...MenuProps
						}}
						value={state.company}
						error={errMsg.addCompany ? true : false}
						helperText={errMsg.addCompany ? errMsg.addCompany : ' '}
						onChange={(e) => {
							setState({ ...state, company: e.target.value });
							setErrMsg({ ...errMsg, addCompany: '' });
						}}
						onBlur={() => {
							if (state.company) {
								setErrMsg({ ...errMsg, addCompany: '' });
							}
							else {
								setErrMsg({
									...errMsg,
									addCompany: 'A company is required'
								});
							}
						}}
						onFocus={() => {
							setErrMsg({ ...errMsg, addCompany: '' });
						}}
					>
						{companies.map((company) => (
							<MenuItem key={company.uuid} value={company.uuid}>
								{company.name}
							</MenuItem>
						))}
					</InputField>
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
						SelectProps={{
							IconComponent: () => <DropdownIcon />,
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
							<CustomButton
								handleClick={() => {
									setOpenDeleteModal(true);
								}}
								style={{
									width: '130px',
									background: '#ff504d',
									color: 'white',
									float: 'right'
								}}
							>
								<DeleteIcon fontSize="small" style={{ marginRight: 5 }} /> DELETE
							</CustomButton>
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
								slug: e.target.value
							});
						}}
					/>
				</Grid>
			</Grid>
			<Grid container style={{marginTop:32}} >
				<Grid item lg={6} xs={12} sm={12} xl={6}>
					<span className="form-required-label">
						*Required Fields
					</span>
				</Grid>
			</Grid>
			<Collapse
				in={
					(state.name !== campaignDetails.name && state.name.length !== 0) ||
					state.active !== campaignDetails.active ||
					realmChanged() ||
					state.company !== campaignDetails.company ||
					state.slug !== campaignDetails.slug
				}
			>
				<div className="display-normal pt-normal">
					<SaveButton type="submit" disabled={state.name.length == 0}>
						SAVE
					</SaveButton>
					&emsp;
					<CustomButton
						handleClick={() => {
							setState({ ...campaignDetails });
							setAddRealms(campaignRealms);
						}}
						style={{
							backgroundColor: '#eeeeee'
						}}
						textStyle={{
							color: '#444851'
						}}
					>
						CANCEL
					</CustomButton>
				</div>
			</Collapse>

		</form>
	);
};

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

export default EditForm;
