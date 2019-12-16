import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { CampaignMenuSelect } from "common-components";
import notes from "./notes.md";

const options = [
  {
    name: "Agent Performance",
    id: "ap",
    sublinks: [
      {
        name: "Rankings",
        url: "#"
      },
      {
        name: "Trend",
        url: "#"
      },
      {
        name: "Live Agent Report",
        url: "#"
      }
    ]
  },
  {
    name: "Live Performance",
    id: "lp",
    sublinks: [
      {
        name: "Lists",
        url: "#"
      }
    ]
  },
  {
    name: "Campaigns Options",
    id: "co",
    sublinks: [
      {
        name: "Goals",
        url: "#"
      }
    ]
  },
  {
    name: "Dialer",
    id: "dialer",
    sublinks: null,
    url: "#"
  },
  {},
  {
    name: "Edit Campaign",
    id: "edit_campaign",
    sublinks: null,
    url: "#"
  }
];

storiesOf("Campaign Menu Select", module).add(
  "default",
  () =>
    createElement(() => {
      return (
        <>
          <BrowserRouter>
            <CampaignMenuSelect title="Campaign menu" options={options} />
          </BrowserRouter>
        </>
      );
    }),
  { notes: { markdown: notes } }
);
