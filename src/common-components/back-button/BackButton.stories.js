import React, { useState, createElement } from "react";
// import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import BackButton from "./index.js";
const stories = storiesOf("Back Button", module);

stories.add("BackButton", () =>
  createElement(() => {
    return (
      <>
        <BackButton
          to="/settings"
          text="Back to Settings"
          backFn={() => history.goBack()}
        />
      </>
    );
  })
);
