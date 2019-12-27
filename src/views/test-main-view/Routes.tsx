import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Sample from "../../components/sample-component/index";
import PrivateRoute from "../../auth/services/authService";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Sample} />
          <PrivateRoute exact path="/manage/users" component={Sample} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
