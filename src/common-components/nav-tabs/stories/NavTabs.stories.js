import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import { NavTabs } from "common-components";
import notes from "./notes.md";

storiesOf("Nav Tabs", module).add(
  "default",
  () =>
    createElement(() => {
      return (
        <>
          <NavTabs
            tabnames={[
              {
                name: "SETTINGS",
                active: true,
                onClickFn: () => console.log("settings")
              },
              {
                name: "PITCH",
                active: false,
                onClickFn: () => console.log("pitch")
              }
            ]}
          />
        </>
      );
    }),
  { notes: { markdown: notes } }
);
