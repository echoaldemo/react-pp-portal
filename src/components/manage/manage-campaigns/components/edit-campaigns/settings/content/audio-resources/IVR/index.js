import React, { useState } from 'react';
import { TableNoResult, Modal, SaveButton } from 'common-components';
import { Add } from '@material-ui/icons';
const IVR = () => {
	const [ open, setOpen ] = useState(false);
	return (
		<div>
			<TableNoResult
				noHeader
				mainMessage="There is no IVR resources yet"
				subMessage="To add or edit audio resources just hit the button “Add resources”"
				renderButton={
					<SaveButton onClick={() => setOpen(true)}>
						<Add />
						Add resources
					</SaveButton>
				}
			/>
			<Modal open={open} title="Create IVR" onClose={() => setOpen(false)}>
				Work in progress
			</Modal>
		</div>
	);
};

export default IVR;
