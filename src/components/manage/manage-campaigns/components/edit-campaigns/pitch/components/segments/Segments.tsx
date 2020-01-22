import React, { useState } from 'react';
import { TableNoResult, SaveButton, TableLoader } from 'common-components';
import DNDCards from '../cards/DNDCards';
import { Add } from '@material-ui/icons';
import { global, company } from './Mock';
import { styles } from './styles';

const defaultState = {
	loadingState: false,
	activeTestData: [
		{ uuid: 1, name: 'Programs' },
		{ uuid: 2, name: 'Portal' },
		{ uuid: 3, name: 'First-names-sentence' },
		{ uuid: 4, name: 'First-names-questions' }
	],
	globalTestData: global,
	companyTestData: company,
	activeData: []
};

const Segments = () => {
	const [ state, setState ] = useState(defaultState);
	const classes = styles();
	const setActiveData = (data: any) => {
		setState({ ...state, activeData: data });
	};
	const saveActiveSegment = (data: any) => {
		//API request here for updating activeSegments
		setState({ ...state, activeTestData: data });
	};
	return (
		<div className="p-normal c-default">
			{state.loadingState ? (
				<React.Fragment>
					<div style={{ height: 600 }}>
						<TableLoader />
					</div>
				</React.Fragment>
			) : (
				<div className={classes.container}>
					<DNDCards
						card1Title="Active segments"
						card2Title="Global segments"
						card3Title="Company segments"
						card1Data={state.activeTestData}
						card2Data={state.globalTestData}
						card3Data={state.companyTestData}
						saveActiveSegment={saveActiveSegment}
						setActiveData={setActiveData}
					/>
				</div>
			)}
		</div>
	);
};
const NoResult = () => {
	return (
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
	);
};

export default Segments;
