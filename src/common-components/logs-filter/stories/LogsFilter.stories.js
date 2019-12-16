/* eslint-disable import/first */
import React from "react";
import { storiesOf } from "@storybook/react";
import { FilterLog } from "../";
import notes from "./logNotes.md";
storiesOf("Logs Filter", module).add("default", () => <FilterLog />, {
  notes: { markdown: notes }
});
