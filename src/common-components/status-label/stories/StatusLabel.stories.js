import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import { StatusLabel } from "common-components";
import notes from "./notes.md";

storiesOf("Status Label", module).add(
  "default",
  () =>
    createElement(() => {
      return (
        <>
          <StatusLabel status={true} />
        </>
      );
    }),
  { notes: { markdown: notes } }
);
