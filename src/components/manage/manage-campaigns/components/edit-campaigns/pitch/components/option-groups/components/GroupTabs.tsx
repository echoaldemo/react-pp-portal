import React, { useContext } from 'react';
import { PanelTabs, Panel, Modal, EditText } from 'common-components';
import { IdentityContext } from 'contexts/IdentityProvider';
import { Add } from '@material-ui/icons/';
import OptionTable from './OptionTable';
import { Collapse } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { EditGroupForm, CreatOptionForm } from './Forms';
interface IGroup {
	tab: any;
	setTab: any;
}

const GroupTabs: React.FC<IGroup> = ({ tab, setTab }) => {
	const { state } = useContext(IdentityContext);
	const theme = useTheme(); // eslint-disable-line

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

const GroupPanelHeader = ({ item }: any) => {
	const { editGroup, setEditGroup } = useContext(IdentityContext);
	return (
		<div className="panel-header">
			<div>
				<span className="panel-title">{item.name}</span>
			</div>
			<div>
				<EditText
					text={item.name}
					onClick={() => {
						setEditGroup(!editGroup);
					}}
					open={editGroup}
				/>
			</div>
		</div>
	);
};

const OptionsHeader = ({ item }: any) => {
	const { setOpenModal } = useContext(IdentityContext);

	return (
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
	);
};
const EditGroup = () => {
	const { editGroup } = useContext(IdentityContext);
	return (
		<Collapse in={editGroup}>
			<EditGroupForm />
		</Collapse>
	);
};

const PanelHeader = (props: any) => {
	return (
		<React.Fragment>
			<GroupPanelHeader {...props} />
			<EditGroup />
			<OptionsHeader {...props} />
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
