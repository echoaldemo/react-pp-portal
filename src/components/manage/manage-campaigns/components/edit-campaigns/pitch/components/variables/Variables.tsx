import React from 'react';
import { TableNoResult, SaveButton } from 'common-components';
import { Add } from '@material-ui/icons';
export default function Variables() {
	return (
		<div className="c-default">
			<TableNoResult
				headerText="Pitch Variables"
				mainMessage="No pitch variables have been created"
				subMessage="Would you like to creat one? Just hit the “New Variable” button."
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
						New Variable
					</SaveButton>
				}
			/>
		</div>
	);
}
