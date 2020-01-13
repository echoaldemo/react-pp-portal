import React, { useEffect, useState } from 'react';
import { Collapse, Grid, InputAdornment, Switch, Button, Typography, MenuItem, Checkbox } from '@material-ui/core';
import { InputField, TableLoader, CustomButton } from 'common-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LightTooltip } from '../../../../../../../globalConstsVar';
import { Delete as DeleteIcon, FileCopyOutlined as CopyIcon } from '@material-ui/icons/';
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 300,
			width: 250
		}
	}
};

const EditForm = ({
	initialState,
	state,
	setState,
	errMsg,
	setErrMsg,
	addRealms,
	setAddRealms,
	addCompany,
	setAddCompany,
	realms,
	setRealms,
	filterRealm
}) => {
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
		return initialState.realms.length !== addRealms.length;
	};

	return (
		<form
			onSubmit={() => {
				alert('Submit');
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
			{console.log(state.name !== initialState.name && state.name.length !== 0, 'stateee')}
			<Collapse
				in={
					(state.name !== initialState.name && state.name.length !== 0) ||
					state.active !== initialState.active ||
					realmChanged()
				}
			>
				<div className="display-normal pt-normal">
					<CustomButton type="submit">SAVE</CustomButton>
					&emsp;
					<CustomButton
						handleClick={() => {
							setState(initialState);
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
