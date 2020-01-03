import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Gateway from "components/gateway";
import { Realms, Campaigns } from "components";
import { PublicRoute, GatewayRoute, PrivateRoute } from "./";
import DidPool from "components/manage/manage-did-pool";
import Signin from "auth/component";
import ManageDIDs from "components/manage/did/did-landing";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <GatewayRoute path="/gateway" component={Gateway} />
        <PrivateRoute path="/manage/realms" component={Realms} />
        <PrivateRoute path="/manage/campaigns" component={Campaigns} />
        <PrivateRoute path="/manage/did-pool" component={DidPool} />
        <PrivateRoute path="/manage/dids" component={ManageDIDs} />
      </Switch>
    </BrowserRouter>
  );
}
