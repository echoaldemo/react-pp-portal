import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import { PublicRoute, GatewayRoute, PrivateRoute } from './'
import Gateway from 'components/gateway'
import DidPool from 'components/manage/manage-did-pool'
import Signin from 'auth/component'
import Sample from 'components/sample-component'
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <GatewayRoute path="/gateway" component={Gateway} />
        <PrivateRoute path="/manage/sample" component={() => <div>xx</div>} />
        <PrivateRoute path="/manage/did-pool" component={DidPool} />
      </Switch>
    </BrowserRouter>
  )
}
