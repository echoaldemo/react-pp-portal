import React from 'react';
import { CustomButton } from 'common-components';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 600,
				flexDirection: 'column'
			}}
		>
			<h1 style={{ color: '#333' }}>
				<span style={{ color: 'red' }}>404</span> Page Not Found{' '}
			</h1>
			<br />
			<br />
			<Link to="/">
				<CustomButton style={{ background: '#7c8a97' }}>Redirect to Login</CustomButton>
			</Link>
		</div>
	);
};

export { PageNotFound };
