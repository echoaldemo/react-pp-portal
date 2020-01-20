import React, { useContext, useState } from 'react';
import { TableNoResult, SaveButton, TableLoader, Modal, InputField, LoadingModal } from 'common-components';
import { Add } from '@material-ui/icons';
import { IdentityContext } from 'contexts/IdentityProvider';
import Content from './Content';
export default function OptionGroups() {
	const { state, dispatch } = useContext(IdentityContext);

	return (
		<div className="c-default">
			{state.option_groups.length > 0 ? state.loading ? <TableLoader /> : <Content /> : <NoResult />}
		</div>
	);
}

const NoResult = () => {
	const { dispatch } = useContext(IdentityContext);
	const [ createModal, setCreateModal ] = useState(false);
	return (
		<React.Fragment>
			<TableNoResult
				headerText="Option Groups"
				mainMessage="No Option Groups have been created"
				subMessage={`Would you like to create one? Just hit the “New Option" button`}
				containerStyle={{
					height: 350,
					padding: 0
				}}
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
			<CreateOptionForm />
		</Modal>
	);
};

const CreateOptionForm = () => {
	const [ name, setName ] = useState('');
	const [ errName, setErrName ] = useState(false);
	const [ createLoading, setCreateLoading ] = useState(false);
	const { dispatch, setLoading } = useContext(IdentityContext);

	const addNewOptionGroup = () => {
		setCreateLoading(true);
		setTimeout(() => {
			dispatch({
				type: 'CREATE_OPTION_GROUPS',
				payload: {
					option_group: [ { name: name } ]
				}
			});
			setCreateLoading(false);
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
