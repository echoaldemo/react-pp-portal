import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Gateway from 'components/gateway'
import {
  Realms,
  Campaigns,
  PageNotFound,
  EditCampaigns,
  UserLanding
} from 'components'
import { PublicRoute, GatewayRoute, PrivateRoute } from './'
import DidPool from 'components/manage/manage-did-pool'
import Signin from 'auth/component'
import ManageDIDs from 'components/manage/did/did-landing'
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <GatewayRoute exact path="/gateway" component={Gateway} />
        <PrivateRoute path="/manage/realms" component={Realms} />

        {/* User routes */}

        <PrivateRoute path="/manage/users" component={UserLanding} />

        {/* manage/campaign routes */}
        <PrivateRoute path="/manage/campaigns" component={Campaigns} />
        <PrivateRoute
          path="/manage/campaign/edit/:uuid"
          component={EditCampaigns}
        />
        {/* end of manage/campaign routes */}

        <PrivateRoute exact path="/manage/did-pool" component={DidPool} />
        <PrivateRoute path="/manage/dids" component={ManageDIDs} />

        <PublicRoute path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )
}
