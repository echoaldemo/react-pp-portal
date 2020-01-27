import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { Manage } from '../views';
import { isAuth } from '../auth/services/authService';

function PrivateRoute(props: any) {
	let { location, history, component: Component, ...rest } = props;

	function protectedComponent(componentProps: any) {
		/*
		'isAuth' function will return true since the function for login auth
	   	 isn't yet finish
	   */
		return isAuth() ? (
			<Manage {...componentProps}>
				<Component {...componentProps} />
			</Manage>
		) : (
				<Redirect push to="/" />
			);
	}

	return (
		// Used 'component' prop on route because 'render' prop doensn't work, and i don't know why LOL :D
		<Route
			{...rest}
			component={(componentProps: any) => {
				return protectedComponent(componentProps);
			}}
		/>
	);
}
export default withRouter(PrivateRoute);
