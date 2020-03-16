import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TableLoader, DeleteModal, AlertModal } from "common-components";
import { IdentityContext } from "contexts/IdentityProvider";
import { remove } from "utils/api";
import EditForm from "./EditForm";

export default function Info() {
  const history = useHistory();
  const { state, openModal, setOpenModal } = useContext(IdentityContext);
  const [alert, setAlert] = useState({
    open: false,
    severity: "loading",
    message: "Deleting campaign, please wait...",
    showBtn: false
  });

  const handlerDelete = uuid => {
    setOpenModal(false);
    setAlert({ ...alert, open: true });
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
        });
      });
  };

  return (
    <React.Fragment>
      {state.loading ? <TableLoader /> : <EditForm />}
      <DeleteModal
        open={openModal}
        header="Delete Campaign"
        name={state.campaignDetails.name}
        msg="campaign"
        closeFn={() => setOpenModal(false)}
        delFn={() => handlerDelete(state.campaignDetails.uuid)}
      />

      <AlertModal {...alert} />
    </React.Fragment>
  );
}
