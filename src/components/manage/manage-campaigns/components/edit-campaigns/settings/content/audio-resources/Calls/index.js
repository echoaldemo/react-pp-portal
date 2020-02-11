import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import { Modal, SaveButton, TableNoResult } from "common-components";

const Calls = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <TableNoResult
        noHeader
        mainMessage="There is no calls resources yet"
        subMessage="To add or edit audio resources just hit the button “Add resources”"
        renderButton={
          <SaveButton onClick={() => setOpen(true)}>
            <Add />
            Add resources
          </SaveButton>
        }
      />
      <Modal open={open} title="Create Calls" onClose={() => setOpen(false)}>
        Work in progress
      </Modal>
    </div>
  );
};

export default Calls;
