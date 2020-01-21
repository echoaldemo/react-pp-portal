import React, { useContext, useState } from 'react';
import { IdentityContext } from 'contexts/IdentityProvider';
import { InputField, SaveButton, CustomButton } from 'common-components';
import { Grid } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
const EditGroupForm = () => {
	const { state, tab } = useContext(IdentityContext);

	const initialState = state.option_groups[tab].name;

	const [ groupName, setGroupName ] = useState(initialState);
	const [ err, setErr ] = useState(false);
	return (
		<div className="panel-header">
			<Grid container>
				<Grid item xs={5}>
					<InputField
						label="Group name"
						fullWidth
						margin="normal"
						value={groupName}
						onChange={(e: any) => {
							if (e.target.value.length > 0) {
								setErr(false);
							}
							else {
								setErr(true);
							}
							setGroupName(e.target.value);
						}}
						error={err}
						helperText={err ? 'Group name is required' : ' '}
						required
						autoFocus
						onBlur={(e: any) => {
							if (e.target.value.length > 0) {
								setErr(false);
							}
							else {
								setErr(true);
							}
						}}
					/>
				</Grid>
				<Grid item xs={4} className="grid-normal">
					<SaveButton disabled={groupName == initialState || err}>SAVE</SaveButton>
					<CustomButton
						handleClick={() => {
							return null;
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
				<Grid item xs={3} className="grid-display-left">
					<CustomButton
						handleClick={() => {
							return null;
						}}
						style={{
							width: '130px',
							background: '#eee',

							float: 'right'
						}}
						textStyle={{
							color: '#333'
						}}
					>
						CANCEL
					</CustomButton>
				</Grid>
			</Grid>
		</div>
	);
};

const CreatOptionForm = () => {
	const { state, tab, setOpenModal } = useContext(IdentityContext);

	const initialState = {
		description: '',
		value: ''
	};
	const [ formState, setFormState ] = useState(initialState);

	const addNewOption = () => {
		const { option_groups } = state;
		const oldOptions = option_groups[tab].options;

		setOpenModal(false);
		if (oldOptions) {
			option_groups[tab].options = [ { ...formState }, ...oldOptions ];
		}
		else {
			option_groups[tab].options = [ { ...formState } ];
		}

		console.log(state);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				addNewOption();
			}}
			className="option-group-form-container"
		>
			<div className="field">
				<InputField
					label="Description"
					fullWidth
					margin="normal"
					value={formState.description}
					onChange={(e: any) => {
						setFormState({ ...formState, description: e.target.value });
					}}
					required
					autoFocus
				/>
				<br />
				<InputField
					label="Value"
					fullWidth
					margin="normal"
					value={formState.value}
					onChange={(e: any) => {
						setFormState({ ...formState, value: e.target.value });
					}}
				/>
			</div>

			<div>
				<SaveButton type="submit">Create Option</SaveButton>
			</div>
		</form>
	);
};

export { EditGroupForm, CreatOptionForm };
