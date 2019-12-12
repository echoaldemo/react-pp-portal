import React from "react";
import { storiesOf } from "@storybook/react";
import MetricsCard from "./";
import notes from "./notes.md";
storiesOf("Metrics Card", module).add(
  "Metrics card",
  () => (
    <MetricsCard />
  ),
  { notes: { markdown: notes } }
);
storiesOf("Metrics Card", module).add(
  "Metrics card on sales",
  () => <MetricsCard title="Sales" percentage={3.77} mode="sales" />,
  { notes: { markdown: notes } }
);

storiesOf("Metrics Card", module).add(
  "Metrics card on bills with error",
  () => (
    <MetricsCard
      title="Sales / Billable hours"
      percentage={12.22}
      mode="bills"
      status="decrease"
    />
  ),
  { notes: { markdown: notes } }
);

storiesOf("Metrics Card", module).add(
  "Metrics card on bills with no change",
  () => (
    <MetricsCard
      title="Sales / Billable hours"
      percentage={0.0}
      mode="bills"
      status="none"
    />
  ),
  { notes: { markdown: notes } }
);
