import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LandingRoute, ManageRoute } from './'
import Gateway from 'components/gateway'
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <LandingRoute
          exact
          path="/"
          component={() => <div>Landing Route</div>}
        />
        <ManageRoute path="/manage" component={() => <div>Manage Route</div>} />
        <Route exact path="/gateway" component={Gateway} />
      </Switch>
    </BrowserRouter>
  )
}
