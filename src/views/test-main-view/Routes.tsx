import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Sample from "components/sample-component/index";
import PrivateRoute from "auth/services/authService";
import ManageDID from "components/manage/did/did-landing";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Sample} />
          <PrivateRoute exact path="/manage/users" component={Sample} />
          <PrivateRoute exact path="/manage/dids" component={ManageDID} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
