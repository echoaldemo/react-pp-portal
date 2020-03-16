<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/index.js
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  withStyles
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { KeyboardArrowDown } from "@material-ui/icons";
import React, { Component } from "react";
import { SaveButton } from "common-components";
import SearchBar from "./components/SearchBar";
import Styles from "./indexStyle";
=======
import { KeyboardArrowDown } from '@material-ui/icons';
import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { SaveButton, SearchBar } from 'common-components';
import Styles from './indexStyle';
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/index.tsx

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid rgba(238, 238, 238, 0.99)`
        },
        "&:hover:not($disabled):before": {
          borderBottom: "1px solid #1194f6"
        },
        "&:after": {
          borderBottom: "1px solid #1194f6"
        }
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "#ffffff"
        }
      }
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    }
  }
});

<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/index.js
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
=======
interface Props {
	data: Array<Object>,
	originalData: Array<Object>,
	handleFilterUpdate: (data: any) => void;
	modalFunc: any;
	classes: any;
  }


const LogsFilter: React.FC<Props> = ({data, originalData, handleFilterUpdate, modalFunc, classes }) => {
	const [userValue, setUserValue] = useState(0)
	const [createValue, setCreateValue] = useState(0)

	const selectProps = {
		selectprops: { IconComponent: () => <KeyboardArrowDown /> }
	  };

	const removeDuplicates = (originalArray: any, prop:any) => {
		var newArray = [];
		var lookupObject = [];
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/index.tsx

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }

    return newArray;
  };

<<<<<<< HEAD:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/index.js
  filterData = () => {
    let { userValue, createValue } = this.state;
    var newArray = this.props.originalData.filter(el => {
      return createValue === 0 && userValue !== 0
        ? el.username === userValue
        : createValue !== 0 && userValue === 0
        ? el.created === createValue
        : el.username === userValue && el.created === createValue;
    });

    if (userValue === 0 && createValue === 0) {
      this.props.handleFilterUpdate(this.props.originalData);
    } else {
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
            headers={["original_fields", "changed_fields"]}
            // loading={this.state.loading}
            modalFunc={this.props.modalFunc}
          />

          <Grid container className={classes.gridContainer}>
            <Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
              <FormControl className={classes.formControl}>
                <InputLabel>
                  <span style={{ fontSize: 18, color: "#bbbbbb" }}>User</span>
                </InputLabel>
                <Select
                  className={classes.root}
                  id="demo-simple-select"
                  value={this.state.userValue}
                  onChange={e => {
                    this.setState({ userValue: e.target.value });
                  }}
                  selectprops={{
                    IconComponent: () => <KeyboardArrowDown />
                  }}
                >
                  <MenuItem value={0}>All</MenuItem>
                  {this.removeDuplicates(
                    this.props.originalData,
                    "username"
                  ).map((item, i) => (
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
                  <span style={{ fontSize: 18, color: "#bbbbbb" }}>
                    Created
                  </span>
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={this.state.createValue}
                  onChange={e => {
                    this.setState({ createValue: e.target.value });
                  }}
                  selectprops={{
                    IconComponent: () => <KeyboardArrowDown />
                  }}
                >
                  <MenuItem value={0}>All</MenuItem>
                  {this.removeDuplicates(
                    this.props.originalData,
                    "created"
                  ).map((item, i) => (
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
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <SaveButton
                style={{ backgroundColor: "#7C8A97", color: "#eeeeee" }}
                onClick={() => {
                  this.filterData();
                }}
              >
                Apply
              </SaveButton>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
=======
	const filterData = () => {
		let userVal = userValue
		let createVal = createValue

		var newArray = originalData.filter((el:any) => {
			return createVal === 0 && userVal !== 0
				? el.username === userVal
				: createVal !== 0 && userVal === 0
					? el.created === createVal
					: el.username === userVal && el.created === createVal;
		});

		if (userVal === 0 && createVal === 0) {
			handleFilterUpdate(originalData);
		}
		else {
			handleFilterUpdate(newArray);
		}
	};

		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.itemContainer}>
					<SearchBar
						title="Changes"
						userData={originalData}
						headers={[ 'original_fields', 'changed_fields' ]}
						modalFunc={modalFunc}
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
									value={userValue}
									onChange={(e:any) => setUserValue(e.target.value) }
									{...selectProps} >
										
									<MenuItem value={0}>All</MenuItem>
									{removeDuplicates(originalData, 'username').map((item:any, i: number) => (
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
									value={createValue}
									onChange={(e:any) => setCreateValue(e.target.value )}
									{...selectProps}
								>
									<MenuItem value={0}>All</MenuItem>
									{ removeDuplicates(originalData, 'created').map((item:any, i:number) => (
										<MenuItem value={item.created} key={i}>
											{item.created}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={6} lg={6} className={classes.gridItem}
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center'
							}}
						>
							<SaveButton
								style={{ backgroundColor: '#7C8A97', color: '#eeeeee' }}
								onClick={() => { filterData() }}
							>
								Apply
							</SaveButton>
						</Grid>
					</Grid>
				</div>
			</MuiThemeProvider>
		);
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38:src/components/manage/manage-campaigns/components/edit-campaigns/settings/content/changelog/logs-filter/index.tsx
}

export default withStyles(Styles)(LogsFilter);
