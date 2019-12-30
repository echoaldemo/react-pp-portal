import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../auth/services/authService';
export default function GatewayRoute(props: any) {

	let { component: Component, ...rest } = props;

	return <Route 
				{...rest} 
				component={(componentProps: any) => {
					return isAuth() ? <Component {...componentProps}/> : <Redirect to="/" />
				}}
		   />;
}
