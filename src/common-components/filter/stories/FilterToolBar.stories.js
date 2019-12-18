import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import { FilterToolBar } from "common-components";
import notes from "../notes.md";
storiesOf("FilterToolBar", module).add(
  "FilterToolBar",
  () =>
    createElement(() => {
      return <FilterToolBar />;
    }),
  { notes: { markdown: notes } }
);
