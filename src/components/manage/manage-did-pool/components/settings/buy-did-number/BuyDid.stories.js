import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import BuyDid from "./BuyDid";
import { Dialog } from "@material-ui/core";
import styled from "styled-components";

const CustomDialog = styled(Dialog)`
  .MuiDialog-paperScrollPaper {
    display: flex;
    max-height: none;
    flex-direction: column;
  }
`;
const stories = storiesOf("Buy DID Number", module);

stories.add("default", () =>
  createElement(() => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <CustomDialog open={open} maxWidth={false}>
        <BuyDid header="Buy DID number" closeFn={handleClose} />
      </CustomDialog>
    );
  })
);
