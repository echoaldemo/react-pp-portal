import React from 'react';
import { TableNoResult, SaveButton } from 'common-components';
import { Add } from '@material-ui/icons';
export default function Segments() {
	return (
		<div className="c-default">
			<TableNoResult
				headerText="Segment Variables"
				mainMessage="No segment variable have been created"
				subMessage="Would you like to creat one? Just hit the “New Segment” button."
				renderButton={
					<SaveButton
						onClick={() => {
							alert('Clicked');
						}}
					>
						<Add />
						New Segment
					</SaveButton>
				}
			/>
		</div>
	);
}
