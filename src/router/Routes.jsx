import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { LandingRoute, ManageRoute } from './';
export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<LandingRoute exact path="/" component={() => <div>Landing Route</div>} />
				<ManageRoute path="/manage" component={() => <div>Manage Route</div>} />
			</Switch>
		</BrowserRouter>
	);
}
