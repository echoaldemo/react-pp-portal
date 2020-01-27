import React, { useContext, useState } from 'react';
import { TableNoResult, SaveButton, TableLoader, Modal, InputField, LoadingModal } from 'common-components';
import { Add } from '@material-ui/icons';
import { IdentityContext } from 'contexts/IdentityProvider';
import Content from './components/Content';
export default function OptionGroups() {
	const { state } = useContext(IdentityContext);

	return (
		<div className="c-default">
			{state.option_groups.length > 0 ? state.loading ? <TableLoader /> : <Content /> : <NoResult />}
		</div>
	);
}

const NoResult = () => {
	const [createModal, setCreateModal] = useState(false);
	return (
		<React.Fragment>
			<TableNoResult
				headerText="Option Groups"
				mainMessage="No Option Groups have been created"
				subMessage={`Would you like to create one? Just hit the “New Option" button`}
				renderButton={
					<SaveButton
						type="button"
						onClick={(e: any) => {
							e.preventDefault();
							setCreateModal(true);
						}}
					>
						<Add />
						New Option
					</SaveButton>
				}
			/>
			<CreateModal createModal={createModal} setCreateModal={setCreateModal} />
		</React.Fragment>
	);
};

const CreateModal = ({ createModal, setCreateModal }: any) => {
	return (
		<Modal
			open={createModal}
			onClose={() => {
				setCreateModal(false);
			}}
			title={<b>Create New Group</b>}
		>
			<CreateGroupForm handleModalClose={setCreateModal} />
		</Modal>
	);
};

const CreateGroupForm = ({ handleModalClose }: any) => {
	const [name, setName] = useState('');
	const [errName] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const { dispatch, state, setTab } = useContext(IdentityContext);

	const addNewOptionGroup = () => {
		setCreateLoading(true);
		setTimeout(() => {
			const { option_groups } = state;

			let newArr = [...option_groups, { name: name }];
			let newTab = newArr.length - 1;

			dispatch({
				type: 'CREATE_OPTION_GROUPS',
				payload: {
					option_group: newArr
				}
			});

			setCreateLoading(false);
			handleModalClose(false);
			setTab(newTab);
		}, 500);
	};

	return (
		<React.Fragment>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addNewOptionGroup();
				}}
				className="option-group-form-container"
			>
				<div className="field">
					<InputField
						label="Group name"
						fullWidth
						margin="normal"
						value={name}
						onChange={(e: any) => {
							setName(e.target.value);
						}}
						required
						autoFocus
						helperText={errName}
					/>
				</div>

				<div>
					<SaveButton type="submit">Save Group</SaveButton>
				</div>
			</form>
			<LoadingModal
				open={createLoading}
				text={'One moment. We’re Create a new option group'}
				cancelFn={() => {
					return null;
				}}
			/>
		</React.Fragment>
	);
};

export { CreateGroupForm };
