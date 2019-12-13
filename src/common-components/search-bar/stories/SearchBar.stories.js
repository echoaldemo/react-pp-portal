import React, { createElement } from "react";
// import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import SearchBar from "../index";
const stories = storiesOf("SeachBar", module);
const data = [];
stories.add("SeachBar", () =>
  createElement(() => {
    return (
      <>
        <SearchBar />
      </>
    );
  })
);
