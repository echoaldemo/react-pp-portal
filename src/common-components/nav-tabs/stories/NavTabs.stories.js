import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { NavTabs } from "common-components";

storiesOf("Nav Tabs", module).add("default", () =>
  createElement(() => {
    const history = createMemoryHistory();
    history.location.pathname = "/nav-tab/one/1/1";

    return (
      <>
        <BrowserRouter>
          <p></p>
          <NavTabs
            data={{
              name: "<data name>",
              active: true,
              slug: "one",
              uuid: "1"
            }}
            history={history}
            tabnames={[
              {
                name: "<Tab name>",
                path: "/nav-tab",
                url: "/1"
              },
              {
                name: "<Tab name>",
                path: "/nav-tab",
                url: "/2"
              }
            ]}
            back={{
              name: "Back to dashboard",
              url: "#"
            }}
          />
        </BrowserRouter>
      </>
    );
  })
);
