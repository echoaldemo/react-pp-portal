<<<<<<< HEAD
import React, { useContext } from "react";
import { TableLoader, DeleteModal } from "common-components";
import EditForm from "./EditForm";
import { IdentityContext } from "contexts/IdentityProvider";

export default function Info() {
  const { state, openModal, setOpenModal } = useContext(IdentityContext);
=======
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TableLoader, DeleteModal, AlertModal } from "common-components"
import { IdentityContext } from "contexts/IdentityProvider"
import { remove } from "utils/api"
import EditForm from "./EditForm"

export default function Info() {
  const history = useHistory()
  const { state, openModal, setOpenModal } = useContext(IdentityContext)
  const [alert, setAlert] = useState({
    open: false,
    severity: "loading",
    message: "Deleting campaign, please wait...",
    showBtn: false
  })

  const handlerDelete = uuid => {
    setOpenModal(false)
    setAlert({ ...alert, open: true })
    remove(`/identity/campaign/${uuid}`)
      .then(() =>
        setAlert({
          open: true,
          severity: "success",
          message: "Campaign was deleted!",
          handlerClickBtn: () => history.push("/manage/campaigns")
        })
      )
      .catch(() => {
        setAlert({
          open: true,
          severity: "error",
          message: "Oops!, Something went wrong!",
          handlerClickBtn: () => setAlert({ ...alert, open: false })
        })
      })
  }
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38

  return (
    <React.Fragment>
      {state.loading ? <TableLoader /> : <EditForm />}
      <DeleteModal
        open={openModal}
        header="Delete Campaign"
        name={state.campaignDetails.name}
        msg="campaign"
<<<<<<< HEAD
        closeFn={() => {
          setOpenModal(false);
        }}
        delFn={() => {
          // deleteCompany();
          return null;
        }}
=======
        closeFn={() => setOpenModal(false)}
        delFn={() => handlerDelete(state.campaignDetails.uuid)}
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
      />

      <AlertModal {...alert} />
    </React.Fragment>
  );
}
