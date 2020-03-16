import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Tabs,
  Tab,
  Box,
  Tooltip,
  Switch,
  CircularProgress
} from "@material-ui/core";
import { TableLoader } from "common-components";
import { FileCopyOutlined as CopyIcon } from "@material-ui/icons/";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Campaigns from "./campaigns";

const useStyles: any = makeStyles(theme => ({
  //appBarSpacer: theme.mixins.toolbar,
  MuiSwitch: {
    MuiSwitchTrack: {
      backgroundColor: "transparent"
    }
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "white",
    color: "#444851"
  },
  text: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    fontWeight: 900,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#7b8a96"
  },
  paperCont: {
    height: "auto",
    minHeight: "530px",
    padding: "26px 30px",
    color: "#444851"
  },
  title: {
    fontWeight: 900,
    fontSize: "18px"
  },
  indicator: {
    backgroundColor: "#F89523",
    height: "4px",
    borderBottom: "solid 1px #F1F1F1",
    paddingTop: 10
  }
}));

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const SelectField = styled(TextField)`
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 17px !important;
    color: #999999 !important;
  }
  .MuiFormLabel-root.Mui-focused {
    color: #1194f6 !important;
    font-size: 17px !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 35px;
  width: 510px;
  margin: 0 auto;
`;

const DisBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  outline: none;
  border: none;
  margin: 0 auto;
`;

const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewUserBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
  margin: 0 auto;
`;
const NewUserText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveLoader = styled(CircularProgress)`
  font-size: 20;
  opacity: 0.9;
  margin-top: 2px;
  color: #959a95;
`;

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function RealmSettings(props: any) {
  const {
    realm,
    active,
    handleActive,
    handleName,
    edit,
    updateRealm,
    saveLoader,
    campaigns,
    removeCampaign,
    paginateList,
    addCampaign,
    paginateFn,
    campaignsOrig
  } = props;

  const [loading, setLoading] = useState(false); // eslint-disable-line
  const [tab, setTab] = useState(0);
  const [copy, setCopy] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleChange: any = (event: any, newValue: any) => {
    setTab(newValue);
  };

  const portalTheme: any = createMuiTheme({
    palette: {
      primary: {
        main: "#1194f6"
      },
      secondary: {
        main: "#1194f6"
      }
    }
  });
  return (
    <React.Fragment>
      <ThemeProvider theme={portalTheme}>
        <Paper className={classes.paperCont}>
          {loading ? (
            <TableLoader />
          ) : (
            <React.Fragment>
              <div>
                <Typography className={classes.title}>
                  Realm Settings
                </Typography>

                <Tabs
                  value={tab}
                  classes={{ indicator: classes.indicator }}
                  variant="fullWidth"
                  onChange={handleChange}
                >
                  <Tab
                    label="General"
                    className={classes.text}
                    {...a11yProps(0)}
                    style={{ color: "#444851" }}
                  />
                  <Tab
                    label="Associated Campaigns"
                    className={classes.text}
                    {...a11yProps(1)}
                    style={{ color: "#444851" }}
                  />
                </Tabs>
              </div>
              <TabPanel
                value={tab}
                index={0}
                style={{ padding: "35px 30px", minHeight: 626 }}
              >
                <Grid>
                  <SelectField
                    onChange={e => handleName(e.target.value)}
                    className={classes.margin}
                    id="custom-css-standard-input"
                    defaultValue={realm.name}
                    label="Realm name"
                    required
                    InputProps={{
                      classes: {
                        underline: classes.inputField,
                        root: classes.inputField
                      }
                    }}
                  />

                  <SelectField
                    value={active ? "Active" : "Inactive"}
                    label="Campaign Status"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Switch
                            color="primary"
                            checked={active}
                            onChange={handleActive}
                            inputProps={{
                              "aria-label": "secondary checkbox"
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />

                  <SelectField
                    disabled
                    value={realm.uuid}
                    label="UUID"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CopyToClipboard
                            text={realm.uuid}
                            onCopy={() => setCopy(true)}
                            onPointerLeave={() => setCopy(false)}
                          >
                            {copy ? (
                              <LightTooltip
                                title="UUID Copied!"
                                placement="top"
                              >
                                <CopyIcon
                                  fontSize="small"
                                  style={{
                                    float: "right",
                                    cursor: "pointer"
                                  }}
                                />
                              </LightTooltip>
                            ) : (
                              <LightTooltip title="Copy UUID" placement="top">
                                <CopyIcon
                                  fontSize="small"
                                  style={{
                                    float: "right",
                                    cursor: "pointer"
                                  }}
                                />
                              </LightTooltip>
                            )}
                          </CopyToClipboard>
                        </InputAdornment>
                      )
                    }}
                  />

                  {!edit ? (
                    <DisBtn>
                      <DisText>save changes</DisText>
                    </DisBtn>
                  ) : (
                    <NewUserBtn onClick={updateRealm}>
                      <NewUserText>
                        {saveLoader ? <SaveLoader size={20} /> : "save changes"}
                      </NewUserText>
                    </NewUserBtn>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={tab} index={1} dir={theme.direction}>
                <Campaigns
                  data={campaigns}
                  removeCampaign={removeCampaign}
                  realm={realm}
                  paginateList={paginateList}
                  paginateFn={paginateFn}
                  addCampaign={addCampaign}
                  campaignsOrig={campaignsOrig}
                />
              </TabPanel>
            </React.Fragment>
          )}
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
}
