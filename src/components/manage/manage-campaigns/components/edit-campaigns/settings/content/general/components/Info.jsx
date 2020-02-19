import React, { useContext, useState } from "react"
import { TableLoader, DeleteModal, LoadingModal } from "common-components"
import EditForm from "./EditForm"
import { IdentityContext } from "contexts/IdentityProvider"

export default function Info() {
  const { state, openModal, setOpenModal, deleteCampaign } = useContext(
    IdentityContext
  )

  const [loading, setLoading] = useState(false)

  const handlerDelete = campaign => {
    setLoading(true)
    setOpenModal(false)
    deleteCampaign(state.campaignDetails.slug)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <React.Fragment>
      {state.loading ? <TableLoader /> : <EditForm />}
      <DeleteModal
        open={openModal}
        header="Delete Campaign"
        name={state.campaignDetails.name}
        msg="campaign"
        closeFn={() => {
          setOpenModal(false)
        }}
        delFn={() => handlerDelete()}
      />
      <LoadingModal open={loading} text="Deleting campaign, please wait..." />
    </React.Fragment>
  )
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
