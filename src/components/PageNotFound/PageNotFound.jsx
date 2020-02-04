import React from 'react';
import './index.css';
import text404 from 'assets/images/404_image.svg';
const PageNotFound = () => {
	return (
		<div className="container" style={{ height: '100vh' }}>
			<div className="text-container">
				<img src={text404} className="text-image" alt="text-404" />
				<h1>PAGE NOT FOUND</h1>
				<span />
			</div>
		</div>
	);
};

export { PageNotFound };
