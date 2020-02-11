import React, { useContext } from "react";
import { TableLoader, DeleteModal } from "common-components";
import EditForm from "./EditForm";
import { IdentityContext } from "contexts/IdentityProvider";

export default function Info() {
  const { state, openModal, setOpenModal } = useContext(IdentityContext);

  return (
    <React.Fragment>
      {state.loading ? <TableLoader /> : <EditForm />}
      <DeleteModal
        open={openModal}
        header="Delete Campaign"
        name={state.campaignDetails.name}
        msg="campaign"
        closeFn={() => {
          setOpenModal(false);
        }}
        delFn={() => {
          // deleteCompany();
          return null;
        }}
      />
    </React.Fragment>
  );
}

// {
//   /* <DeleteModal
// 				open={openDeleteModal}
// 				header="Delete Campaign"
// 				name={campaignDetails.name}
// 				msg="campaign"
// 				closeFn={handleCloseDeleteModal}
// 				delFn={() => {
// 					deleteCompany();
// 				}}
// 			/> */
// }
