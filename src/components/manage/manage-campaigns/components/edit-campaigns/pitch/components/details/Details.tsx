import React, { useContext, useState } from 'react';
import './Details.css';
import { InputField, SaveButton } from 'common-components';
import { Grid, MenuItem } from '@material-ui/core';
import { IdentityContext } from 'contexts/IdentityProvider';
import { KeyboardArrowDown } from '@material-ui/icons';
const DropdownIcon = () => {
	return <KeyboardArrowDown style={{ color: '#444851' }} />;
};

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 300,
			width: 250
		}
	}
};

export default function Details() {
	return (
		<div className="p-normal container">
			<DetailsForm />
		</div>
	);
}

const DetailsForm = () => {
	const { state } = useContext(IdentityContext);

	const [ formState, setFormState ] = useState(state.pitch);

	return (
		<form>
			<Grid container direction="column" justify="space-evenly" alignItems="center" className="input-container">
				<InputField
					label="Pitch name"
					fullWidth
					margin="normal"
					value={formState.name}
					required
					className="input"
					onChange={(e: any) => {
						setFormState({ ...formState, name: e.target.value });
					}}
				/>
				<InputField
					label="Panel"
					fullWidth
					select
					value={formState.panel}
					SelectProps={{
						IconComponent: () => <DropdownIcon />,
						...MenuProps
					}}
					onChange={(e: any) => {
						setFormState({ ...formState, panel: e.target.value });
					}}
				>
					{[ 'Generic', 'Standard' ].map((item) => (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					))}
				</InputField>

				<InputField
					label="Panel"
					fullWidth
					select
					value={formState.active_version}
					SelectProps={{
						IconComponent: () => <DropdownIcon />,
						...MenuProps
					}}
					onChange={(e: any) => {
						setFormState({ ...formState, active_version: e.target.value });
					}}
				>
					{[ 1, 2, 3 ].map((item) => (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					))}
				</InputField>
				<SaveButton>COMMIT PITCH</SaveButton>
			</Grid>
		</form>
	);
};
