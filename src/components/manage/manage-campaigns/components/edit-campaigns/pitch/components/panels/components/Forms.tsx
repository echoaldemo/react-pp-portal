import React, { useState, useContext } from 'react';
import { InputField, SaveButton, LoadingModal } from 'common-components';
import { IdentityContext } from 'contexts/IdentityProvider';

const CreateNewPanelForm = () => {
	const { dispatch, state, setOpenCreatePanelModal } = useContext(IdentityContext);

	const initialState = {
		name: '',
		description: ''
	};
	const [ formState, setFormState ] = useState(initialState);
	const [ createLoading, setCreateLoading ] = useState(false);
	const addNewPanel = () => {
		setCreateLoading(true);
		setOpenCreatePanelModal(false);
		setTimeout(() => {
			setCreateLoading(false);

			dispatch({
				type: 'CREATE_PANEL',
				payload: { panel: [ state.panel, { ...formState } ] }
			});
		}, 1000);
	};

	return (
		<React.Fragment>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addNewPanel();
				}}
				className="option-group-form-container"
			>
				<div className="field">
					<InputField
						label="Panel Name"
						fullWidth
						margin="normal"
						value={formState.name}
						onChange={(e: any) => {
							setFormState({ ...formState, name: e.target.value });
						}}
						required
						autoFocus
					/>
					<br />
					<InputField
						label="Description"
						fullWidth
						margin="normal"
						value={formState.description}
						onChange={(e: any) => {
							setFormState({ ...formState, description: e.target.value });
						}}
					/>
				</div>

				<div>
					<SaveButton type="submit">Save Panel</SaveButton>
				</div>
			</form>

			<LoadingModal
				open={createLoading}
				text={'One moment. We’re Create a new panel'}
				cancelFn={() => {
					return null;
				}}
			/>
		</React.Fragment>
	);
};

const CreateNewFieldForm = () => {
	return (
		<div>
			<h1>Create New Field</h1>
		</div>
	);
};

export { CreateNewPanelForm, CreateNewFieldForm };
