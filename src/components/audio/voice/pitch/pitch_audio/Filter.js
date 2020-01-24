import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import FilterModal from "../../../common-components/filter-modal";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 240,
      marginTop: "50px"
    }
  }
};

const useStyles = theme => ({
  formControl: {
    width: "100%",
    margin: theme.spacing(2)
  },
  select: {
    fontSize: 14,
    "&:focus": {
      backgroundColor: "#fff !important"
    }
  },
  applyBtn: {
    width: 120,
    backgroundColor: "#7c8a97",
    color: "#ececec",
    textTransform: "none",
    fontWeight: 700,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#7c8a97"
    },
    "@media (max-width: 425px)": {
      fontSize: 11,
      width: "100%"
    }
  },
  contBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    "@media (max-width: 425px)": {
      display: "block",
      marginLeft: 17
    }
  },
  listItem: {
    "@media (max-width: 425px)": {
      fontSize: 14,
      marginTop: -6
    }
  },
  fontRes: {
    "@media (max-width: 768px)": {
      fontSize: 14
    }
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        margin: "0 20px"
      },
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(187, 187, 187, 1)"
        },
        "&$focused:before": {
          color: "rgba(200, 247, 197, 0.9)",
          borderBottom: "2px solid #2b9ff7"
        },
        "&$focused:after": {
          color: "rgba(200, 247, 197, 0.9)",
          borderBottom: "2px solid #2b9ff7"
        }
      }
    },
    MuiInputLabel: {
      root: {
        margin: "0 20px",
        "&$focused": {
          color: "#2b9ff7"
        }
      }
    }
  }
});

class Filter extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      filterModal: false
    };
  }
  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  disablePitchVersion = () => {
    if (this.props.versions.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  disableCampaign = () => {
    if (this.props.user === 1) {
      if (this.props.campaigns.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  disableButton = res => {
    if (res !== "") {
      return false;
    } else {
      return true;
    }
  };
  handleClickOpen = () => {
    this.setState({ filterModal: true });
  };

  handleClose = () => {
    this.setState({ filterModal: false });
  };
  render() {
    const {
      classes,
      campaigns,
      versions,
      filterData,
      filtered,
      refreshData
    } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple" className={classes.fontRes}>
                Campaign
              </InputLabel>
              <Select
                classes={{ select: classes.select }}
                value={this.props.selectedCampaign}
                onChange={e => {
                  this.props.selectCampaign(
                    e.target.value,
                    e.currentTarget.getAttribute("uuid")
                  );
                }}
                MenuProps={MenuProps}
                disabled={this.disableCampaign()}
              >
                {campaigns.map(campaign => {
                  return (
                    <MenuItem
                      className={classes.listItem}
                      key={campaign.uuid}
                      id={"select"}
                      uuid={campaign.company}
                      value={campaign.slug}
                    >
                      {campaign.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5}>
            <FormControl
              id="pitch-version-select"
              className={classes.formControl}
            >
              <InputLabel htmlFor="age-simple" className={classes.fontRes}>
                Pitch Version
              </InputLabel>
              <Select
                classes={{ select: classes.select }}
                value={this.props.selectedVersion}
                onChange={e => this.props.selectVersion(e.target.value)}
                inputProps={{
                  name: "age"
                }}
                MenuProps={MenuProps}
                disabled={this.disablePitchVersion()}
              >
                {versions.map(version => {
                  return (
                    <MenuItem
                      className={classes.listItem}
                      key={version.uuid}
                      value={version.uuid}
                    >
                      {version.version}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2} className={classes.contBtn}>
            <Button
              id="apply-btn"
              variant="contained"
              className={classes.applyBtn}
              onClick={() => {
                refreshData(this.props.selectedVersion);
                filterData(this.props.selectedVersion);
                filtered(true);
              }}
              disabled={this.disableButton(this.props.selectedVersion)}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
        <FilterModal
          filterModal={this.state.filterModal}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Filter);
