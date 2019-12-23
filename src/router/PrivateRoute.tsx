import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { Manage } from '../views';
import { isAuth } from '../auth/services/authService';

function PrivateRoute(props: any) {
	let { location, history, component: Component, ...rest } = props;

	function protectedComponent(componentProps: any) {
		return isAuth() ? (
			<Manage {...componentProps}>
				<Component {...componentProps} />
			</Manage>
		) : (
			<Redirect push to="/" />
		);
	}

	return (
		<Route
			{...rest}
			component={(componentProps: any) => {
				return protectedComponent(componentProps);
			}}
		/>
	);
}
export default withRouter(PrivateRoute);
