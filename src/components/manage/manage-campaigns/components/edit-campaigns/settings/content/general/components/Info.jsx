import React, { useState } from 'react';
import { TableLoader } from 'common-components';
import EditForm from './EditForm';

export default function Info(props) {
	const { loading, deleteCompany, campaignDetails } = props;

	const [ openDeleteModal, setOpenDeleteModal ] = useState(false);

	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
	};

	console.log(props);
	return (
		<div style={{ paddingBottom: 16 }}>
			{loading ? <TableLoader /> : <EditForm {...props} />}
			<DeleteModal
				openDeleteModal={openDeleteModal}
				setOpenDeleteModal={setOpenDeleteModal}
				deleteCompany={deleteCompany}
				handleCloseDeleteModal={handleCloseDeleteModal}
				name={campaignDetails.name}
			/>
		</div>
	);
}

const DeleteModal = ({ openDeleteModal, handleCloseDeleteModal, deleteCompany, name }) => {
	return (
		<DeleteModal
			open={openDeleteModal}
			header="Delete Campaign"
			name={name}
			msg="campaign"
			closeFn={handleCloseDeleteModal}
			delFn={() => {
				deleteCompany();
			}}
		/>
	);
};
