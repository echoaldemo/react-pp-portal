import React from 'react';
import { TableNoResult, SaveButton } from 'common-components';
import { Add } from '@material-ui/icons';
export default function Panels() {
	return (
		<div className="c-default">
			<TableNoResult
				headerText="Pitch panels"
				mainMessage="No pitch panels have been created"
				subMessage="Would you like to creat one? Just hit the “New Panel button."
				containerStyle={{
					height: 350,
					padding: 0
				}}
				renderButton={
					<SaveButton
						onClick={() => {
							alert('Clicked');
						}}
					>
						<Add />
						New Panel
					</SaveButton>
				}
			/>
		</div>
	);
}
