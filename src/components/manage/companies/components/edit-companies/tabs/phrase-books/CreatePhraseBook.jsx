import React, { Component } from 'react';

// import { createPhraseBook } from "../../../../actions/PhraseBook";
// import { cancel } from "../../../../utils/api";

// import HeaderButton from "common-components/HeaderButton/HeaderButton";
import { InputField, Modal, LoadingModal, SuccessModal } from 'common-components';
import { Dialog, Button } from '@material-ui/core';
const classes = {
	textField: {
		paddingBottom: 35
	},
	btnStyle: {
		backgroundColor: '#b6d36b',
		color: '#FFF',
		fontSize: '14px',
		fontWeight: '700',
		height: '40px',
		borderRadius: '3px',
		textTransform: 'none',
		paddingLeft: 15,
		paddingRight: 15
	}
};

const defaultState = {
	phrase_name: '',
	phrase: ''
};
export default class CreatePhraseBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...defaultState,
			createSuccess: false,
			loading: false
		};
	}

	handleFieldChanges = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	submitPhraseBook = async (e) => {
		this.setState({ loading: true });
		this.props.onClose();

		// ACTUAL FUNCTION
		// await createPhraseBook({
		//   slug: this.props.companySlug,
		//   name: this.state.phrase_name
		// })
		//   .then(result => {
		//     this.setState({
		//       loading: false
		//     });
		//   })
		//   .then(() => {
		//     this.setState({ createSuccess: true });
		//   });

		// REMOVE THIS WHEN ACTUAL DATA IS WORKING
		setTimeout(() => {
			this.setState({
				loading: false,
				createSuccess: true
			});
		}, 500);
	};

	render() {
		return (
			<React.Fragment>
				<Dialog open={this.state.createSuccess}>
					<SuccessModal
            open={this.state.createSuccess}
						text={`You have created ${this.state.phrase_name}`}
						btnText={'Create Another'}
						closeFn={() => {
							this.setState({
								createSuccess: false
							});
							this.props.refresh();
						}}
						btnFn={() => {
							this.setState({ ...defaultState });
							this.props.openModal();
							this.props.refresh();
						}}
					/>
				</Dialog>
				<Dialog open={this.state.loading}>
					<LoadingModal
						open={this.state.loading}
						text="One moment. We're creating the new phrase..."
						cancelFn={() => {
							this.setState({ loading: false, ...defaultState });
						}}
					/>
				</Dialog>
				<Modal
					open={this.props.open}
					title="Create phrase book"
					onClose={() => {
						this.props.onClose();
						this.setState({
							createSuccess: false,
							loading: false,
							...defaultState
						});
					}}
				>
					<form
						onSubmit={() => {
							this.submitPhraseBook();
						}}
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<div style={{ width: '100%' }}>
							<InputField
								label="Phrase name"
								required
								fullWidth
								value={this.state.phrase_name}
								style={classes.textField}
								name="phrase_name"
								onChange={(e) => {
									this.handleFieldChanges(e);
								}}
								autoComplete="off"
							/>
						</div>
						{/* <div style={{ width: "100%" }}>
              <InputField
                label="Phrase"
                value={this.state.phrase}
                name="phrase"
                required
                fullWidth
                style={classes.textField}
                onChange={e => {
                  this.handleFieldChanges(e);
                }}
                autoComplete="off"
              />
            </div> */}
						<div style={{ paddingBottom: 15 }}>
							<Button
								htmlType="submit"
								style={classes.btnStyle}
								onClick={() => {
									this.submitPhraseBook();
								}}
							>
								Create Phrase
							</Button>
						</div>
					</form>
				</Modal>
			</React.Fragment>
		);
	}
}
