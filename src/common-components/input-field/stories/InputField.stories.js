import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import { InputField } from "..";
import notes from "./notes.md";

const stories = storiesOf("Input Field", module);
stories.add(
  "default",
  () =>
    createElement(() => {
      return (
        <InputField label="Label here" helperText="Helper Text" fullWidth />
      );
    }),
  { notes: { markdown: notes } }
);
