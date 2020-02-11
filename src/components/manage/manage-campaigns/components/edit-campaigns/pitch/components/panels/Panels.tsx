import React, { useContext } from "react";
import { TableNoResult, SaveButton, TableLoader } from "common-components";
import { Add } from "@material-ui/icons";
import { IdentityContext } from "contexts/IdentityProvider";
import Content from "./components/Content";
import { Modal } from "common-components";
import { CreateNewPanelForm } from "./components/Forms";
export default function Panels() {
  const { state } = useContext(IdentityContext);

  return (
    <div className="c-default">
      {state.panels.length > 0 ? (
        <React.Fragment>
          {state.loading ? <TableLoader /> : <Content />}
        </React.Fragment>
      ) : (
        <NoResult />
      )}
      <CreateNewPanelModal />
    </div>
  );
}

const CreateNewPanelModal = () => {
  const { openCreatePanelModal, setOpenCreatePanelModal } = useContext(
    IdentityContext
  );
  return (
    <Modal
      title={<b>Create New Group</b>}
      open={openCreatePanelModal}
      onClose={() => {
        setOpenCreatePanelModal(false);
      }}
    >
      <CreateNewPanelForm />
    </Modal>
  );
};

const NoResult = () => {
  const { setOpenCreatePanelModal } = useContext(IdentityContext);

  return (
    <TableNoResult
      headerText="Pitch panels"
      mainMessage="No pitch panels have been created"
      subMessage="Would you like to create one? Just hit the “New Panel button."
      renderButton={
        <SaveButton
          onClick={(e: any) => {
            e.preventDefault();
            setOpenCreatePanelModal(true);
          }}
        >
          <Add />
          New Panel
        </SaveButton>
      }
    />
  );
};
