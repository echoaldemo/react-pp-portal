import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import AddCampaignModal from "./AddCampaignModal";

const stories = storiesOf("AddRealmCampaign", module);

stories.add("default", () =>
  createElement(() => {
    const [open, setOpen] = useState(false);
    const openFunc = () => {
      setOpen(!open);
    };
    return (
      <>
        <button onClick={openFunc}>Add</button>
        <AddCampaignModal open={open} openFunc={openFunc} />
      </>
    );
  })
);
