import React, { createElement } from "react";
// import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import { SearchBar } from "..";
const stories = storiesOf("SeachBar", module);
stories.add("SeachBar", () =>
  createElement(() => {
    return (
      <>
        <SearchBar />
      </>
    );
  })
);
