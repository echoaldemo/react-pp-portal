import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import Gateway from "components/gateway";
import {
  Realms,
  Campaigns,
  PageNotFound,
  UserLanding,
  RealmSettingsPage,
  EditCompanies,
  Companies,
  Settings,
  Pitch,
  DataPosting,
  SMSLandingPage,
  Dashboard,
  SMSEdit
} from "components";
import { PublicRoute, GatewayRoute, PrivateRoute } from "./";
import DidPool from "components/manage/manage-did-pool";
import EditDidPool from "components/manage/manage-did-pool/components/settings/DidPoolsSettings";
import Signin from "auth/component";
import ManageDIDs from "components/manage/did/did-landing";
import ManageLocation from "components/manage/manage-locations/ManageLocation";
import LocationSettings from "components/manage/manage-locations/settings/LocationSettings";
import GlobalPhraseBooks from "../components/manage/global/global-phrase-books/GlobalPhraseBooks";
import EditGlobalPhraseBook from "components/manage/global/global-phrase-books/EditPhraseBook/EditPhraseBook";
import {
  GlobalOptionGroup,
  EditOptionGroup
} from "components/manage/global/global-option-group/";
import TeamSettings from "components/manage/manage-locations/teams/settings/TeamSettings";
import GlobalSegments from "components/manage/global/global-segments/GlobalSegments";
import GlobalRapidResponse from "components/manage/global/global-rapid-response";
import RRSegments from "components/manage/global/global-segments/rr-segment-variable";
import GlobalRRSettingsDashboard from "components/manage/global/global-rapid-response/edit-tests";
import GlobalRRSegments from "components/manage/global/global-rapid-response-segments";
import GlobalRRSegmentsVarialble from "components/manage/global/global-rapid-response-segments/rr-segment-variable";
import RouterSettings from "components/manage/manage-campaigns/components/edit-campaigns/data-posting/components/EditRoute/EditRoute";

//audio
import AudioResources from "components/audio/audio-resources";
import PitchVoice from "components/audio/voice/pitch";
import PhraseVoice from "components/audio/voice/phrase";
import ProspectVoice from "components/audio/voice/prospect";

import Overview from "components/dashboard/overview/Overview";
import AgentDashboard from "components/dashboard/agent-dashboard";
import AgentDetails from "components/dashboard/campaign-dashboard/AgentDetails";
import DialerQueue from "components/dashboard/dialer-queue";
import ChangePassword from "auth/change-password/ChangePassword";
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
          path="/manage/campaign/edit/:slug/:uuid/home"
          component={Dashboard}
        />
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
        <PrivateRoute
          path={`/manage/edit/router/:campaign_uuid/:router_uuid`}
          component={RouterSettings}
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
          exact
          path="/manage/global-option-group"
          component={GlobalOptionGroup}
        />
        <PrivateRoute
          path="/manage/global-option-group/edit/:uuid"
          component={EditOptionGroup}
        />
        <PrivateRoute
          exact
          path="/manage/global-rapid-response/tests"
          component={GlobalRapidResponse}
        />
        <PrivateRoute
          path={`/manage/rapid-response-tests/global/edit/:test_uuid/menu`}
          component={GlobalRRSettingsDashboard}
        />
        <PrivateRoute
          exact
          path={`/manage/global-rapid-response/segments`}
          component={GlobalRRSegments}
        />
        <PrivateRoute
          path={`/manage/edit-segment-variables/company/global-rapid-response/segment/:uuid`}
          component={GlobalRRSegmentsVarialble}
        />
        <PrivateRoute
          path="/manage/global-pitch-segments"
          component={GlobalSegments}
        />
        <PrivateRoute
          path="/manage/phrase-book/global/edit/:uuid"
          component={EditGlobalPhraseBook}
        />
        <PrivateRoute
          path="/manage/edit-segment-variables/company/global/segment/:id"
          component={RRSegments}
        />
        {/* Global Pitch routes end */}
        <PrivateRoute
          path="/manage/team/edit/:uuid/"
          component={TeamSettings}
        />
        <PrivateRoute
          exact
          path="/manage/sms-dashboard"
          component={SMSLandingPage}
        />
        <PrivateRoute
          exact
          path="/manage/sms/edit/:cid/:type"
          component={SMSEdit}
        />
        <PrivateRoute
          exact
          path="/manage/audio/audio-resources"
          component={AudioResources}
        />
        <PrivateRoute exact path="/manage/audio/pitch" component={PitchVoice} />
        <PrivateRoute exact path="/manage/audio/phrase" component={PhraseVoice} />
        <PrivateRoute exact path="/manage/audio/prospect" component={ProspectVoice} />
        <PrivateRoute
          path={`/dashboard/all/:slug/overview`}
          component={Overview}
        />
        <PrivateRoute
          path={`/dashboard/all/:slug/agent-dashboard`}
          component={AgentDashboard}
        />
        <PrivateRoute
          path={`/dashboard/agent-dashboard/rep`}
          component={AgentDetails}
        />
        <PrivateRoute
          path={`/dashboard/all/:slug/dialer-queue`}
          component={DialerQueue}
        />
        <PrivateRoute
          exact
          path={`/change-password`}
          component={ChangePassword}
        />
        <PublicRoute path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}
