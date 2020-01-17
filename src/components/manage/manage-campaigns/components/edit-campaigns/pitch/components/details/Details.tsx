import React from 'react';
import './Details.css';
import { InputField, SaveButton } from 'common-components';
import { Grid } from '@material-ui/core';
export default function Details({ x }: any) {
	return (
		<div className="p-normal container">
			<DetailsForm />
		</div>
	);
}

const DetailsForm = () => {
	return (
		<form>
			<Grid container direction="column" justify="space-evenly" alignItems="center" className="input-container">
				<InputField
					label="Pitch name"
					fullWidth
					margin="normal"
					value="Academic Advisor"
					required
					className="input"
				/>
				<InputField label="Panel" fullWidth margin="normal" value="Generic" className="input" />
				<InputField label="Active Version" fullWidth margin="normal" value="37 Version" className="input" />
				<SaveButton>COMMIT PITCH</SaveButton>
			</Grid>
		</form>
	);
};
