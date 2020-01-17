import React from "react";
import { storiesOf } from "@storybook/react";
import AgentTable from "./AgentTable";
const stories = storiesOf("Agent Table", module);

stories.add("default", () => <AgentTable />);
