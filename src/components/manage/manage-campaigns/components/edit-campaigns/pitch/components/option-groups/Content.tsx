import React, { useContext } from 'react';
import { CustomButton, TableNoResult } from 'common-components';
import { Add } from '@material-ui/icons';
import { IdentityContext } from 'contexts/IdentityProvider';
const Content = () => {
	const { state } = useContext(IdentityContext);
	return (
		<div className="p-normal">
			<ContentHeader />
			<h1>Content</h1>
		</div>
	);
};

const ContentHeader = () => {
	return (
		<div className="container-2 p-normal">
			<div className="text-normal">
				<span>
					Excepteur irure cillum esse velit magna laborum sit sunt dolor nulla consequat sit sit mollit.
				</span>
			</div>
			<div>
				<CustomButton
					handleClick={() => {
						return null;
					}}
				>
					<Add />
					New Group
				</CustomButton>
			</div>
		</div>
	);
};

export default Content;
