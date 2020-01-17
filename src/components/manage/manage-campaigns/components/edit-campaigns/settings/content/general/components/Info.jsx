import React, { useContext } from 'react';
import { TableLoader, DeleteModal } from 'common-components';
import EditForm from './EditForm';
import { IdentityContext } from 'contexts/IdentityProvider';

export default function Info() {
	const { state, dispatch, infoLoading } = useContext(IdentityContext);

	return infoLoading ? <TableLoader /> : <div>asds</div>;
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
