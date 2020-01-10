import { FormControl, Grid, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { KeyboardArrowDown } from '@material-ui/icons';
import React, { Component } from 'react';
import { CustomButton } from 'common-components';
import SearchBar from './components/SearchBar';
import Styles from './indexStyle';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#1194f6' }
	},
	overrides: {
		MuiInput: {
			underline: {
				'&:before': {
					borderBottom: `1px solid rgba(238, 238, 238, 0.99)`
				},
				'&:hover:not($disabled):before': {
					borderBottom: '1px solid #1194f6'
				},
				'&:after': {
					borderBottom: '1px solid #1194f6'
				}
			}
		},
		MuiSelect: {
			select: {
				'&:focus': {
					backgroundColor: '#ffffff'
				}
			}
		},
		MuiListItem: {
			button: {
				'&:hover': {
					backgroundColor: '#ffffff'
				}
			},
			root: {
				'&$selected': {
					backgroundColor: '#ffffff',
					'&&:hover': {
						backgroundColor: '#ffffff'
					},
					'&&:active:after': {
						backgroundColor: '#ffffff'
					}
				}
			}
		}
	}
});

class LogsFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userValue: 0,
			createValue: 0
		};
	}
	removeDuplicates = (originalArray, prop) => {
		var newArray = [];
		var lookupObject = {};

		for (var i in originalArray) {
			lookupObject[originalArray[i][prop]] = originalArray[i];
		}

		for (i in lookupObject) {
			newArray.push(lookupObject[i]);
		}

		return newArray;
	};

	filterData = () => {
		let { userValue, createValue } = this.state;
		var newArray = this.props.originalData.filter((el) => {
			return createValue === 0 && userValue !== 0
				? el.username === userValue
				: createValue !== 0 && userValue === 0
					? el.created === createValue
					: el.username === userValue && el.created === createValue;
		});

		if (userValue === 0 && createValue === 0) {
			this.props.handleFilterUpdate(this.props.originalData);
		}
		else {
			this.props.handleFilterUpdate(newArray);
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.itemContainer}>
					<SearchBar
						title="Changes"
						userData={this.props.originalData}
						headers={[ 'original_fields', 'changed_fields' ]}
						// loading={this.state.loading}
						modalFunc={this.props.modalFunc}
					/>

					<Grid container className={classes.gridContainer}>
						<Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
							<FormControl className={classes.formControl}>
								<InputLabel>
									<span style={{ fontSize: 18, color: '#bbbbbb' }}>User</span>
								</InputLabel>
								<Select
									className={classes.root}
									id="demo-simple-select"
									value={this.state.userValue}
									onChange={(e) => {
										this.setState({ userValue: e.target.value });
									}}
									selectprops={{
										IconComponent: () => <KeyboardArrowDown />
									}}
								>
									<MenuItem value={0}>All</MenuItem>
									{this.removeDuplicates(this.props.originalData, 'username').map((item, i) => (
										<MenuItem value={item.username} key={i}>
											{item.user}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
							<FormControl className={classes.formControl}>
								<InputLabel>
									<span style={{ fontSize: 18, color: '#bbbbbb' }}>Created</span>
								</InputLabel>
								<Select
									id="demo-simple-select"
									value={this.state.createValue}
									onChange={(e) => {
										this.setState({ createValue: e.target.value });
									}}
									selectprops={{
										IconComponent: () => <KeyboardArrowDown />
									}}
								>
									<MenuItem value={0}>All</MenuItem>
									{this.removeDuplicates(this.props.originalData, 'created').map((item, i) => (
										<MenuItem value={item.created} key={i}>
											{item.created}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid
							item
							xs={6}
							md={6}
							lg={6}
							className={classes.gridItem}
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center'
							}}
						>
							<CustomButton
								style={{ backgroundColor: '#7C8A97', color: '#eeeeee' }}
								onClick={() => {
									this.filterData();
								}}
							>
								Apply
							</CustomButton>
						</Grid>
					</Grid>
				</div>
			</MuiThemeProvider>
		);
	}
}
export default withStyles(Styles)(LogsFilter);
