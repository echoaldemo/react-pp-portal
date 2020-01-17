import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import DialingParameter from "./DialingParameter";
import { Dialog } from "@material-ui/core";

const stories = storiesOf("Dialing Parameter", module);

stories.add("default", () =>
  createElement(() => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };
    const handleDelete = () => {
      console.log("deleting");
    };

    return (
      <Dialog open={open}>
        <DialingParameter
          header="Dialing Parameters"
          msg="group"
          name="Test group 101"
          closeFn={handleClose}
          delFn={handleDelete}
        />
      </Dialog>
    );
  })
);
