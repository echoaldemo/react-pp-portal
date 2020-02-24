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

// fixed height for selects
const ITEM_HEIGHT: any = 48;
const ITEM_PADDING_TOP: any = 8;
const MenuProps: any = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 240,
      marginTop: "50px"
    }
  }
};

const useStyles: any = (theme: any) => ({
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
    },
    "@media (max-width: 640px) and (min-width: 600px)": {
      width: "66px"
    },
    "@media (max-width: 768px) and (min-width: 641px)": {
      width: "105px"
    },
    "@media (max-width: 768px) and (min-width: 600px)": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
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

interface IProps {
  versions: any;
  user: any;
  campaigns: any;
  user_group?: any;
  selectedCampaign: any;
  selectCampaign: any;
  selectedVersion: any;
  selectVersion: any;
  tab: any;
  unrecorded: any;
  rerecord: any;
  recorded: any;
  filterData: any;
  filtered: any;
  searched: any;
  refreshData?: any;
  checkIfGlobal?: any;
}
class Filter extends Component<IProps, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: false
    };
  }
  toTitleCase = (str: any) => {
    return str.replace(/\w\S*/g, function(txt: any) {
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
  disableButton = (res: any) => {
    if (res !== "") {
      return false;
    } else {
      return true;
    }
  };
  render() {
    const {
      classes,
      campaigns,
      versions,
      tab,
      filterData,
      filtered
    }: any = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Grid container>
          {this.props.user_group === 10 ? (
            <React.Fragment>
              <Grid item xs={12} sm={5}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="phrase-campaign-label"
                    className={classes.fontRes}
                  >
                    Phrases (Global or Choose Campaign)
                  </InputLabel>
                  <Select
                    id="phrase-select-campaign"
                    classes={{ select: classes.select }}
                    value={this.props.selectedCampaign}
                    onChange={e => {
                      this.props.selectCampaign(
                        e.target.value
                        // e.currentTarget.getAttribute("uuid"),
                        // e.currentTarget.getAttribute("slug")
                      );
                    }}
                    MenuProps={MenuProps}
                    disabled={this.disableCampaign()}
                  >
                    {campaigns.map((campaign: any) => {
                      return (
                        <MenuItem
                          className={classes.listItem}
                          key={campaign.uuid}
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
                  id="phrase-select-book"
                  className={classes.formControl}
                >
                  <InputLabel
                    id="phrase-campaign-label"
                    className={classes.fontRes}
                  >
                    Phrase Book
                  </InputLabel>
                  <Select
                    classes={{ select: classes.select }}
                    value={this.props.selectedVersion}
                    onChange={e => this.props.selectVersion(e.target.value)}
                    inputProps={{
                      name: "age",
                      id: "age-simple"
                    }}
                    MenuProps={MenuProps}
                    disabled={this.disablePitchVersion()}
                  >
                    {versions.map((version: any) => (
                      <MenuItem
                        className={classes.listItem}
                        key={version.uuid}
                        value={version.uuid}
                      >
                        {version.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2} className={classes.contBtn}>
                <Button
                  variant="contained"
                  className={classes.applyBtn}
                  onClick={() => {
                    filterData(
                      tab,
                      this.props.selectedCampaign,
                      this.props.selectedVersion
                    );
                    filtered(true);
                  }}
                  disabled={this.disableButton(this.props.selectedVersion)}
                >
                  Apply
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid item xs={12} sm={5}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="phrase-campaign-label"
                    className={classes.fontRes}
                  >
                    Phrases (Global or Choose Campaign)
                  </InputLabel>
                  <Select
                    id="phrase-select-campaign"
                    classes={{ select: classes.select }}
                    value={this.props.selectedCampaign}
                    onChange={e => {
                      this.props.selectCampaign(
                        e.target.value
                        // e.currentTarget.getAttribute("uuid"),
                        // e.currentTarget.getAttribute("slug")
                      );
                    }}
                    MenuProps={MenuProps}
                    disabled={this.disableCampaign()}
                  >
                    {campaigns.map((campaign: any) => {
                      return (
                        <MenuItem
                          className={classes.listItem}
                          key={campaign.uuid}
                          id={"select"}
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
                  id="phrase-select-book"
                  className={classes.formControl}
                >
                  <InputLabel
                    id="phrase-campaign-label"
                    className={classes.fontRes}
                  >
                    Phrase Book
                  </InputLabel>
                  <Select
                    classes={{ select: classes.select }}
                    value={this.props.selectedVersion}
                    onChange={e => this.props.selectVersion(e.target.value)}
                    inputProps={{
                      name: "age",
                      id: "age-simple"
                    }}
                    MenuProps={MenuProps}
                    disabled={this.disablePitchVersion()}
                  >
                    {versions.map((version: any) => (
                      <MenuItem
                        className={classes.listItem}
                        key={version.uuid}
                        value={version.uuid}
                      >
                        {version.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2} className={classes.contBtn}>
                <Button
                  id="apply-btn"
                  variant="contained"
                  className={classes.applyBtn}
                  onClick={() => {
                    filterData(
                      tab,
                      this.props.selectedCampaign,
                      this.props.selectedVersion
                    );
                    filtered(true);
                  }}
                  disabled={this.disableButton(this.props.selectedVersion)}
                >
                  Apply
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Filter);
