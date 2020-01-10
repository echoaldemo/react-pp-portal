import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Gateway from 'components/gateway'
import {
  Realms,
  Campaigns,
  PageNotFound,
  EditCampaigns,
  UserLanding,
  RealmSettingsPage,
  Companies,
  EditCompanies,
  Settings,
  Pitch,
  DataPosting
} from 'components'
import { PublicRoute, GatewayRoute, PrivateRoute } from './'
import DidPool from 'components/manage/manage-did-pool'
import EditDidPool from 'components/manage/manage-did-pool/components/settings/DidPoolsSettings'
import Signin from 'auth/component'
import ManageDIDs from 'components/manage/did/did-landing'
import ManageLocation from 'components/manage/manage-locations/ManageLocation'
import LocationSettings from 'components/manage/manage-locations/settings/LocationSettings'
import GlobalPhraseBooks from '../components/manage/global/global-phrase-books/GlobalPhraseBooks'
import GlobalOptionGroup from 'components/manage/global/global-option-group/OptionGroup'
import TeamSettings from 'components/manage/manage-locations/teams/settings/TeamSettings'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Signin} />
        <GatewayRoute exact path="/gateway" component={Gateway} />
        <PrivateRoute exact path="/manage/realms" component={Realms} />
        <PrivateRoute
          exact
          path="/manage/realms/edit/:uuid"
          component={RealmSettingsPage}
        />
        {/* User routes */}

        <PrivateRoute path="/manage/users" component={UserLanding} />

        {/* manage/campaign routes */}
        <PrivateRoute path="/manage/campaigns" component={Campaigns} />
        <PrivateRoute
          path="/manage/campaign/edit/:slug/:uuid/settings"
          component={Settings}
        />
        <PrivateRoute
          path="/manage/campaign/edit/:slug/:uuid/pitch/details"
          component={Pitch}
        />
        <PrivateRoute
          path="/manage/campaign/edit/:slug/:uuid/dataposting"
          component={DataPosting}
        />

        {/* end of manage/campaign routes */}

        {/* manage/companies */}
        <PrivateRoute exact path="/manage/companies" component={Companies} />
        <PrivateRoute
          exact
          path="/manage/companies/edit/:slug/:uuid"
          component={EditCompanies}
        />
        {/* end manage/companies */}

        <PrivateRoute exact path="/manage/did-pool" component={DidPool} />
        <PrivateRoute
          path="/manage/did-pool/edit/:uuid"
          component={EditDidPool}
        />
        <PrivateRoute path="/manage/dids" component={ManageDIDs} />
        <PrivateRoute
          exact
          path="/manage/locations"
          component={ManageLocation}
        />
        <PrivateRoute
          path="/manage/locations/edit/:uuid/"
          component={LocationSettings}
        />
        {/* Global Pitch routes */}
        <PrivateRoute
          path="/manage/global-pitch-phrasebooks"
          component={GlobalPhraseBooks}
        />
        <PrivateRoute
          path="/manage/global-option-group"
          component={GlobalOptionGroup}
        />
        {/* Global Pitch routes end */}
        <PrivateRoute
          path="/manage/team/edit/:uuid/"
          component={TeamSettings}
        />

        <PublicRoute path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )
}
