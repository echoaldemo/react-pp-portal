import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { PublicRoute, GatewayRoute, PrivateRoute } from "./";
import Gateway from "components/gateway";
import Sample from "components/sample-component";
import { Realms, Campaigns } from "components";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Sample} />
        <GatewayRoute path="/gateway" component={Gateway} />
        <PrivateRoute path="/manage/sample" component={() => <div>xx</div>} />
        <PrivateRoute path="/manage/realms" component={Realms} />
        <PrivateRoute path="/manage/campaigns" component={Campaigns} />
      </Switch>
    </BrowserRouter>
  );
}
