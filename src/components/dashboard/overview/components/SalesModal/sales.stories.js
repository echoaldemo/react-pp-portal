import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "./";
import { BrowserRouter } from "react-router-dom";

storiesOf("Sales Modal", module).add("default", () => {
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
});
