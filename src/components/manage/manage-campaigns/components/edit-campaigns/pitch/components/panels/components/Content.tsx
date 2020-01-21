import React, { useContext, useState } from 'react'; // eslint-disable-line
import { IdentityContext } from 'contexts/IdentityProvider';
import { CustomButton, Modal } from 'common-components';
import { Add } from '@material-ui/icons';
import { CreateNewPanelForm } from './Forms';
import PanelFieldTabs from './PanelFieldTabs';
const Content = () => {
	const { openCreatePanelModal, setOpenCreatePanelModal } = useContext(IdentityContext);

	return (
		<div className="p-normal">
			<ContentHeader />
			<div className="mt-normal">
				<PanelFieldTabs />
			</div>
			<Modal
				open={openCreatePanelModal}
				title={<b>Create New Panel</b>}
				onClose={() => {
					setOpenCreatePanelModal(false);
				}}
			>
				<CreateNewPanelForm />
			</Modal>
		</div>
	);
};

const ContentHeader = () => {
	const { setOpenCreatePanelModal } = useContext(IdentityContext);

	return (
		<div className="container-2 p-normal">
			<div className="text-normal">
				<span>
					Excepteur irure cillum esse velit magna laborum sit sunt dolor nulla consequat sit sit mollit.
				</span>
			</div>
			<div>
				<CustomButton
					handleClick={() => {
						setOpenCreatePanelModal(true);
					}}
				>
					<Add />
					New Group
				</CustomButton>
			</div>
		</div>
	);
};

export default Content;
