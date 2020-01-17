import React from "react";
import { storiesOf } from "@storybook/react";
import LineChart from "./index";

storiesOf("Line Chart", module).add("default", () => {
  return <LineChart />;
});
