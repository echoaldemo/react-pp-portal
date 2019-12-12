import React, { createElement } from "react";
// import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import { BackButton } from "common-components";
const stories = storiesOf("Back Button", module);

stories.add("BackButton", () =>
  createElement(() => {
    return (
      <>
        <BackButton />
      </>
    );
  })
);
