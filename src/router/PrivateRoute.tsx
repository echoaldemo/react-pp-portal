import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Manage } from '../views';
function PrivateRoute(props: any) {
	let { location, history, component: Component, ...rest } = props;

	console.log('rest', rest);

	return (
		<Route
			{...rest}
			component={(componentProps: any) => {
				return (
					<Manage>
						<Component {...componentProps} />
					</Manage>
				);
			}}
		/>
	);
}
export default withRouter(PrivateRoute);
