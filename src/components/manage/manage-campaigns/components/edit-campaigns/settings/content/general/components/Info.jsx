import React, { useContext, useEffect } from "react";
import { TableLoader, DeleteModal } from "common-components";
import EditForm from "./EditForm";
import { IdentityContext } from "contexts/IdentityProvider";

export default function Info() {
	const { state, dispatch } = useContext(IdentityContext);

	const  setLoading =(val) => {
		dispatch({ type: "LOADING", payload: { loading: val } });
	}

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}, []);



	return state.loading ? (
		<TableLoader />
	) : (
		<div>
			<h1>Asdfsad</h1>
		</div>
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
