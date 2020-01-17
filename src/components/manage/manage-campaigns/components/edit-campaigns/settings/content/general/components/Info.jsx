import React, { useContext, useEffect } from 'react';
import { TableLoader, DeleteModal } from 'common-components';
import EditForm from './EditForm';
import { IdentityContext } from 'contexts/IdentityProvider';

export default function Info() {
	const { state, dispatch, handleSaveCampaignDetails } = useContext(IdentityContext);

	return state.loading ? (
		<TableLoader />
	) : (
		<EditForm state={state} dispatch={dispatch} handleSaveCampaignDetails={handleSaveCampaignDetails} />
	);
}

{
	/* <DeleteModal
				open={openDeleteModal}
				header="Delete Campaign"
				name={campaignDetails.name}
				msg="campaign"
				closeFn={handleCloseDeleteModal}
				delFn={() => {
					deleteCompany();
				}}
			/> */
}
