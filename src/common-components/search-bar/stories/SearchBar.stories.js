import React, { createElement } from "react";
import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import { SearchBar } from "common-components";
const stories = storiesOf("SeachBar", module);
stories.add(
  "SeachBar",
  () =>
    createElement(() => {
      return (
        <>
          <SearchBar />
        </>
      );
    }),
  { notes: { markdown: notes } }
);
