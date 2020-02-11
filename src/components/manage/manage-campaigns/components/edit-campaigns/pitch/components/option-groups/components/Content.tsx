import React, { useContext, useState } from "react";
import { CustomButton, Modal } from "common-components";
import { Add } from "@material-ui/icons";
import GroupTabs from "./GroupTabs";
import { IdentityContext } from "contexts/IdentityProvider";
import { CreateGroupForm } from "../OptionGroups";

const Content = () => {
  const { tab, setTab } = useContext(IdentityContext);
  const [newGroupModal, setNewGroupModal] = useState(false);

  return (
    <div className="p-normal">
      <ContentHeader setNewGroupModal={setNewGroupModal} />
      <div className="mt-normal">
        <GroupTabs tab={tab} setTab={setTab} />
      </div>

      <Modal
        open={newGroupModal}
        title={<b>Create New Group</b>}
        onClose={() => {
          setNewGroupModal(false);
        }}
      >
        <CreateGroupForm handleModalClose={setNewGroupModal} />
      </Modal>
    </div>
  );
};

const ContentHeader = ({ setNewGroupModal }: any) => {
  return (
    <div className="container-2 p-normal">
      <div className="text-normal">
        <span>
          Excepteur irure cillum esse velit magna laborum sit sunt dolor nulla
          consequat sit sit mollit.
        </span>
      </div>
      <div>
        <CustomButton
          handleClick={() => {
            setNewGroupModal(true);
          }}
        >
          <Add />
          New Group
        </CustomButton>
      </div>
    </div>
  );
};

export default Content;
