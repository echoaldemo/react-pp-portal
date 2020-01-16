import React, { useState } from 'react';
import { TableLoader, DeleteModal } from 'common-components';
import EditForm from './EditForm';

export default function Info({ state, setState, deleteCompany, handleSaveData }) {
	const { loading, campaignDetails, openDeleteModal } = state;

	const handleCloseDeleteModal = () => {
		setState({ ...state, openDeleteModal: false });
	};

	return (
		<div>
			{loading ? <TableLoader /> : <EditForm state={state} setState={setState} handleSaveData={handleSaveData} />}

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
