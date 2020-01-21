import React, { useState, useContext } from 'react';
import { PanelTabs, Panel, Modal, InputField, SaveButton, LoadingModal } from 'common-components';
import { IdentityContext } from 'contexts/IdentityProvider';
import { Settings, Add } from '@material-ui/icons/';
import OptionTable from './OptionTable';
interface IGroup {
	tab: any;
	setTab: any;
}

const CreatOptionForm = () => {
	const { dispatch, state, tab, setOpenModal } = useContext(IdentityContext);

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
		<React.Fragment>
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
		</React.Fragment>
	);
};

const GroupTabs: React.FC<IGroup> = ({ tab, setTab }) => {
	const { state } = useContext(IdentityContext);

	return (
		<div>
			<PanelTabs
				labels={state.option_groups.map((label: any) => {
					return label.name;
				})}
				tab={tab}
				setTab={(e: any) => {
					setTab(e);
				}}
			/>
			<PanelContents tab={tab} />
			<CreateNewOptionModal />
		</div>
	);
};

const CreateNewOptionModal = () => {
	const { openModal, setOpenModal } = useContext(IdentityContext);
	return (
		<Modal
			open={openModal}
			onClose={() => {
				setOpenModal(false);
			}}
			title={<b>Create New Option</b>}
		>
			<CreatOptionForm />
		</Modal>
	);
};

const PanelContents = ({ tab }: any) => {
	const { state } = useContext(IdentityContext);

	return state.option_groups.map((item: any, i: number) => {
		return (
			<Panel value={tab} index={i} key={i}>
				<div className="panel-container">
					<PanelHeader item={item} />
					<div className="panel-table-container">
						<OptionTable data={item.options} />
					</div>
				</div>
			</Panel>
		);
	});
};

const PanelHeader = ({ item }: any) => {
	const { setOpenModal } = useContext(IdentityContext);

	return (
		<React.Fragment>
			<div className="panel-header">
				<div>
					<span className="panel-title">{item.name}</span>
				</div>
				<div>
					<span className="panel-edit-text">
						<Settings style={{ fontSize: 14, marginRight: 5 }} />

						<u>Edit {item.name}</u>
					</span>
				</div>
			</div>
			<div className="panel-header">
				<div>
					<span className="panel-title-2">Options</span>
				</div>
				<div>
					<span
						className="panel-edit-text-2"
						onClick={() => {
							setOpenModal(true);
						}}
					>
						{renderAddButton(item.options)}
					</span>
				</div>
			</div>
		</React.Fragment>
	);
};

const renderAddButton = (data: any) => {
	return data ? (
		<React.Fragment>
			<Add style={{ fontSize: 16, marginRight: 5 }} />
			<span>Add new option</span>
		</React.Fragment>
	) : null;
};

export default GroupTabs;
