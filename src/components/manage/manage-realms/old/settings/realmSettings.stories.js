import React from "react";
import { storiesOf } from "@storybook/react";
import RealmSettings from "./realmSettings";

const data = [];
storiesOf("Realm Settings", module).add("General", () => (
  <RealmSettings
    title="Company"
    userData={data}
    headers={["name", "slug", "uuid"]}
  />
));
