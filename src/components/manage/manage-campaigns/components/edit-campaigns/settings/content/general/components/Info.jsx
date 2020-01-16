import React, { useState } from 'react';
import { TableLoader, DeleteModal } from 'common-components';
import EditForm from './EditForm';

export default function Info(props) {
	const { loading, deleteCompany, campaignDetails , openDeleteModal, setOpenDeleteModal} = props;
	
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
	};
	
	return (
		<div>
			{loading ? <TableLoader /> : <EditForm {...props}  />}
			
			<DeleteModal
				open={openDeleteModal}
				header="Delete Campaign"
				name={campaignDetails.name}
				msg="campaign"
				closeFn={handleCloseDeleteModal}
				delFn={() => {
					deleteCompany();
				}}
			/>
		</div>
	);



}
