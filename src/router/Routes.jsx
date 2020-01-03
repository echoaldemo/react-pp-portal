import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Gateway from 'components/gateway';
import { Realms, Campaigns, PageNotFound } from 'components';
import { PublicRoute, GatewayRoute, PrivateRoute } from './';
import DidPool from 'components/manage/manage-did-pool';
import Signin from 'auth/component';
export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/" component={Signin} />
				<GatewayRoute path="/gateway" component={Gateway} />
				<PrivateRoute path="/manage/realms" component={Realms} />
				<PrivateRoute path="/manage/campaigns" component={Campaigns} />
				<PrivateRoute path="/manage/did-pool" component={DidPool} />

				<PublicRoute path="/404" component={PageNotFound} />
				<Redirect to="/404" />
			</Switch>
		</BrowserRouter>
	);
}
