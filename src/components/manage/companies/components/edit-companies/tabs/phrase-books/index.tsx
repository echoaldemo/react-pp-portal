import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import DNDCards from '../cards/DNDCards';
import { company, global } from './Mock';
import { TableLoader } from 'common-components';
import { phrase } from './styles';

/* import {
  getAllPhraseBook,
  getGlobalPhraseBook
} from '../../../../actions/PhraseBook' */

import CreatePhraseBook from './add-company-phrase-book/CreatePhraseBook';

const defaultState = {
	loadingState: false,
	activePhraseBookData: [
		{ uuid: 1, name: 'Programs' },
		{ uuid: 2, name: 'Portal' },
		{ uuid: 3, name: 'First-names-sentence' },
		{ uuid: 4, name: 'First-names-questions' }
	],
	globalPhraseBooksData: [ { uuid: 1, name: 'State' }, { uuid: 2, name: 'Firstname' }, { uuid: 3, name: 'Sample' } ],
	phraseBooksData: [],
	loadingText: 'Loading active phrase books',
	openModal: false,
	activeData: []
};

interface IProps {
	classes: any;
	company: any;
}

interface IState {
	loadingState: boolean;
	activePhraseBookData: Array<Object>;
	globalPhraseBooksData: Array<Object>;
	phraseBooksData: Array<Object>;
	loadingText: string;
	openModal: boolean;
	activeData: Array<Object>;
}

class PhraseBooks extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			...defaultState
		};
	}

	getAllData = () => {
		try {
			this.setState({
				loadingState: true
			});
			/* getGlobalPhraseBook()
        .then(data => {
          this.setState({
            globalPhraseBooksData: data,
            loadingText: 'Loading global phrase books..'
          })
        })
        .then(() => {
          this.setState({ loadingText: 'Loading companies phrase books  ' })
          getAllPhraseBook(this.props.company.slug).then(result => {
            this.setState({ phraseBooksData: result, loadingState: false })
          })
        }) */

			/* start mock */
			if (document.cookie !== '') {
				setTimeout(() => {
					this.setState({
						globalPhraseBooksData: global,
						phraseBooksData: [
							...company,
							{
								company: 'ce92941c-f92c-11e9-8ffa-0242ac110014',
								name: 'new',
								phrases: [],
								slug: 'new',
								uuid: '66d770d8-31ba-11ea-a4c3-0242ac110008'
							}
						],
						loadingState: false
					});
				}, 1000);
			}
			else {
				setTimeout(() => {
					this.setState({
						globalPhraseBooksData: global,
						phraseBooksData: company,
						loadingState: false
					});
				}, 1000);
			}
			/* end mock */
		} catch (err) {}
	};

	componentDidMount() {
		this.getAllData();
	}

	openCreateModal = () => {
		this.setState({ openModal: true });
	};
	closeCreateModal = () => {
		this.setState({ openModal: false });
	};
	setActiveData = (data: any) => {
		this.setState({
			activeData: data
		});
	};
	saveActiveSegment = (data: any) => {
		//API request here for updating activeSegments
		this.setState({ activePhraseBookData: data });
	};

	//TEMPORARY METHOD FOR ADDING PHRASEBOOK
	addNewPhraseBook = () => {
		document.cookie = 'add=true';
	};

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				{this.state.loadingState ? (
					<TableLoader />
				) : (
					<div className={classes.container}>
						<DNDCards
							card1Title="Active phrase books"
							card2Title="Global phrase books"
							card3Title="Company phrase books"
							card1Data={this.state.activePhraseBookData}
							card2Data={this.state.globalPhraseBooksData}
							card3Data={this.state.phraseBooksData}
							setActiveData={this.setActiveData}
							addButton3={true}
							addFunction3={this.openCreateModal}
							saveActiveSegment={this.saveActiveSegment}
						/>

						{this.props.company !== null && (
							<CreatePhraseBook
								open={this.state.openModal}
								refresh={this.getAllData}
								companySlug={this.props.company.slug}
								onClose={this.closeCreateModal}
								openModal={this.openCreateModal}
								addFunction={this.addNewPhraseBook} //temporary for adding new phrase
							/>
						)}
					</div>
				)}
			</React.Fragment>
		);
	}
}
export default withStyles(phrase)(PhraseBooks);
