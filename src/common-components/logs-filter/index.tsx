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
import { CustomButton } from "common-components";
import { SearchBar } from "./components/SearchBar";
import Styles from "./indexStyle";

/**
 * ==============================================================================
 * <FilterLog />
 * ------------------------------------------------------------------------------
 * @param {Array}         originalData        Data to be used as a search data
 * @param {Function}      handleFilterUpdate  Function that will received the result
 * @param {Object}        classes             styles classes
 * @param {Function}      modalFunc           Function that controls modal
 * @return {ReactElement}
 * ==============================================================================
 */

interface State {
  userValue: any;
  createValue: any;
}

interface Props {
  originalData: any;
  handleFilterUpdate: any;
  classes: any;
  modalFunc: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const defaultProps = {
  originalData: [
    // {
    //   user: "Edward Nayve",
    //   username: "edward-dev",
    //   created: "Nov 22, 2019",
    //   time: "09:00:31",
    //   timestamp: 1574413231,
    //   campaign: "45",
    //   changed_fields: { created: { S: "45 has been created" } },
    //   original_fields: {}
    // }
  ],
  modalFunc: () => console.log("Modal Function ..."),
  handleFilterUpdate: (data: any) => console.log("Result: ", data)
};

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

const selectProps = {
  selectprops: { IconComponent: () => <KeyboardArrowDown /> }
};

class LogsFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userValue: 0,
      createValue: 0
    } as any;
  }
  removeDuplicates: Function = (originalArray: any, prop: any) => {
    var newArray = [];
    var lookupObject = {} as any;

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i] as any;
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }

    return newArray;
  };

  filterData: Function = () => {
    let { userValue, createValue } = this.state;
    const { originalData, handleFilterUpdate } = this.props;
    var newArray = originalData.filter((el: any) => {
      return createValue === 0 && userValue !== 0
        ? el.username === userValue
        : createValue !== 0 && userValue === 0
        ? el.created === createValue
        : el.username === userValue && el.created === createValue;
    });

    if (userValue === 0 && createValue === 0) {
      handleFilterUpdate(originalData);
    } else {
      handleFilterUpdate(newArray);
    }
  };

  renderSearchBar: Function = (originalData: any, modalFunc: any) => (
    <SearchBar
      title="Changes"
      userData={originalData}
      headers={["original_fields", "changed_fields"]}
      // loading={true}
      modalFunc={modalFunc}
    />
  );

  renderForm: Function = (classes: any, originalData: any, modalFunc: any) => (
    <>
      <Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
        <FormControl className={classes.formControl}>
          <InputLabel>
            <span style={{ fontSize: 18, color: "#bbbbbb" }}>User</span>
          </InputLabel>
          <Select
            className={classes.root}
            id="demo-simple-select"
            value={this.state.userValue}
            onChange={(e) => {
              this.setState({ userValue: e.target.value });
            }}
            {...selectProps}
          >
            <MenuItem value={0}>All</MenuItem>
            {this.removeDuplicates(originalData, "username").map(
              (item: any, i: number) => (
                <MenuItem value={item.username} key={i}>
                  {item.user}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} md={3} lg={3} className={classes.gridItem}>
        <FormControl className={classes.formControl}>
          <InputLabel>
            <span style={{ fontSize: 18, color: "#bbbbbb" }}>Created</span>
          </InputLabel>
          <Select
            id="demo-simple-select"
            value={this.state.createValue}
            onChange={(e) => {
              this.setState({ createValue: e.target.value });
            }}
            {...selectProps}
          >
            <MenuItem value={0}>All</MenuItem>
            {this.removeDuplicates(originalData, "created").map(
              (item: any, i: number) => (
                <MenuItem value={item.created} key={i}>
                  {item.created}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  renderButton: Function = (classes: any) => (
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
      <CustomButton
        style={{ backgroundColor: "#7C8A97", color: "#eeeeee" }}
        handleClick={() => {
          console.log("Filter Data Initiated.");
          this.filterData();
        }}
      >
        Apply
      </CustomButton>
    </Grid>
  );

  render() {
    const { classes, originalData, modalFunc } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.itemContainer}>
          {this.renderSearchBar(originalData, modalFunc)}
          <Grid container className={classes.gridContainer}>
            {this.renderForm(classes, originalData, modalFunc)}
            {this.renderButton(classes)}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

let FilterLog = withStyles(Styles)(LogsFilter);
FilterLog.defaultProps = defaultProps;
export { FilterLog };
