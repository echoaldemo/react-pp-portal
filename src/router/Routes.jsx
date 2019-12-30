import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { PublicRoute, GatewayRoute, PrivateRoute } from "./";
import Gateway from "components/gateway";
import Sample from "components/sample-component";
import { Realms } from "components";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Sample} />
        <GatewayRoute path="/gateway" component={Gateway} />
        <PrivateRoute path="/manage/sample" component={() => <div>xx</div>} />
        <PrivateRoute path="/manage/realms" component={Realms} />
      </Switch>
    </BrowserRouter>
  );
}
