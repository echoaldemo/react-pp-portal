import React from "react";
import { storiesOf } from "@storybook/react";
import ButtonTabs from "./";
storiesOf("Button tabs", module).add("default", function() {
  return (
    <ButtonTabs
      tabData={[
        {
          label: "DID POOLS",
          value: 1
        },
        { label: "SEARCH DIDS", value: 0 }
      ]}
    />
  );
});
