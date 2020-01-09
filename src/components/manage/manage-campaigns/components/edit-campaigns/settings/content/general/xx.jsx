import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Paper,
  Divider,
  TextField,
  InputAdornment,
  Typography,
  Select,
  Tabs,
  Tab,
  Box,
  Grid,
  MenuItem,
  Checkbox,
  InputLabel,
  ListItemText,
  Input,
  Button,
  Tooltip,
  Switch,
  Dialog
} from '@material-ui/core'
import TableLoader from '../../../../../common-components/table-loader/TableLoader'
import {
  GroupOutlined,
  Delete as DeleteIcon,
  FileCopyOutlined as CopyIcon
} from '@material-ui/icons/'
import Changelog from './changelog/Changelog'
import AudioResources from './audio-resources/'
import List from './list/'
import QA from './qa/QA'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'
import InputField from '../../../../../common-components/input-field/InputField'
import DeleteModal from '../../../../../common-components/delete-modal/DeleteModal'
import LoadingModal from '../../../../../common-components/loading-modal/LoadingModal'
import SuccessModal from '../../../../../common-components/success-modal/SuccessModal'
import { get, remove, patch, cancel } from '../../../../../../utils/api'

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  MuiSwitch: {
    MuiSwitchTrack: {
      backgroundColor: 'transparent'
    }
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: 'white',
    color: '#444851'
  },
  container: {},
  text: {
    fontFamily: 'Roboto, Helvetica, sans-serif',
    fontSize: '14px',
    fontWeight: 900,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#7b8a96'
  },
  paperCont: {
    height: 'auto',
    minHeight: 700,
    color: '#444851'
  },
  title: {
    fontWeight: '900',
    fontSize: '18px',
    marginBottom: 5,
    padding: 15
  },
  infoBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    height: '40px',
    borderRadius: '3px',
    background: '#1194f6',
    width: '110px',
    fontSize: '14px'
  },
  rec: {
    height: '40px',
    borderRadius: '3px',
    background: '#eeeeee',
    width: '100%'
  },
  indicator: {
    backgroundColor: '#F89523',
    height: '4px'
  },
  disabledText: {
    color: 'black'
  },
  button: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center'
  },
  saveBtn: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    borderRadius: 3,
    backgroundColor: '#b6d36b',
    outline: 'none',
    border: 'none',
    color: '#ffffff',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#a6c556'
    }
  },
  cancelBtn: {
    fontSize: 14,
    width: 165,
    minHeight: 40,
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    borderRadius: 3,
    backgroundColor: '#eeeeee',
    outline: 'none',
    border: 'none',
    color: '#444851',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#bbbbbb'
    }
  },
  inputField: {
    fontSize: '1rem',
    '&:focussed': {
      color: 'red'
    },
    '&:before': {
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    '&:after': {
      borderBottom: '2px solid #1394f6'
    },
    '&:focus': {
      backgroundColor: 'none'
    }
  }
}))

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip)

const CssTextField = withStyles({
  root: {
    '&label.Mui-focused': {
      color: '#1194f6'
    },
    '&.MuiInput-underline:after': {
      borderBottomColor: '#1194f6'
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red'
      },
      '&:hover fieldset': {
        borderColor: 'yellow'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1194f6'
      }
    }
  }
})(TextField, Select)

function TabPanel(props) {
  const { children, value, index, ...other } = props

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
  )
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export default function CampaignSettings(props) {
  const [companyname, setCompanyName] = useState('')
  const [companynameOrig, setCompanyNameOrig] = useState('')
  const [realmList, setRealmList] = useState([])
  const [realmData, setRealmData] = useState([])
  const [realmDataOrig, setRealmDataOrig] = useState([])
  const [companylist, setCompanyList] = useState([])
  const [campaignData, setCampaignData] = useState([])
  const [campaignNameOrig, setCampaignNameOrig] = useState([])
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const [btnsave, setBtnSave] = useState(false)
  const [campaignName, setCampaignName] = useState([])
  const [openDelete, setOpenDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [copy, setCopy] = useState(false)
  const [campaignStatus, setCampaignStatus] = useState('')
  const [campaignStatusOrig, setCampaignStatusOrig] = useState('')
  const [archived, setArchived] = useState('')
  const [uuid, setuuid] = useState('')

  useEffect(() => {
    setLoading(true)
    const campaignuuid = props.uuid
    get(`/identity/campaign/${campaignuuid}/`).then(res => {
      setCampaignData(res.data)
      setCampaignStatus(res.data.active)
      setCampaignStatusOrig(res.data.active)
      setCampaignName(res.data.name)
      setCampaignNameOrig(res.data.name)
      setArchived(res.data.archived)
      setuuid(res.data.uuid)
      // console.log(res.data)
      setLoading(false)
      //condition for company
      if (res.data.company) {
        setCompanyName(res.data.company)
        setCompanyNameOrig(res.data.company)
      } else {
        setCompanyName('NoCompany')
        setCompanyNameOrig('NoCompany')
      }
      //condition for role
      if (res.data.realms.length !== 0) {
        get(`/identity/realm/list/`).then(response => {
          setRealmList(response.data)
          const arr = JSON.stringify(response.data, function(key, value) {
            return value || ''
          })
          let myArray = [...JSON.parse(arr)]

          var filtered = myArray.filter(data => {
            return res.data.realms.indexOf(data.uuid) !== -1
          })

          setRealmData([])
          filtered.forEach(data => {
            setRealmData(prevState => [...prevState, data.name])
            setRealmDataOrig(prevState => [...prevState, data.name])
          })
          // console.log(filtered)
        })
      } else {
        get(`/identity/realm/list/`).then(response => {
          setRealmList(response.data)
        })
      }
    })
  }, [])

  const handleClose = () => {
    setOpenDelete(false)
    setDeleted(false)
    if (deleted) {
      props.handleDelete()
    }
  }

  const discardChanges = () => {
    setCampaignName(campaignNameOrig)
    setCompanyName(companynameOrig)
    setRealmData(realmDataOrig)
    setCampaignStatus(campaignStatusOrig)
  }

  const handleDelete = () => {
    setDeleting(true)
    remove(`/identity/campaign/${campaignData.uuid}`).then(() => {
      setDeleting(false)
      setOpenDelete(false)
      setDeleted(true)
    })
  }

  const handleCancel = () => {
    cancel()
    setDeleting(false)
  }

  const [value, setValue] = useState(0)
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  useEffect(() => {
    get(`/identity/company/list/`).then(res => {
      setCompanyList(res.data)
    })
  }, [])

  //No Company
  let nocompany
  if (companyname === 'NoCompany') {
    nocompany = (
      <MenuItem key="null" value="NoCompany">
        No Company
      </MenuItem>
    )
  }

  //Active
  let status
  if (campaignStatus === true) {
    status = 'Active'
  } else {
    status = 'Inactive'
  }

  function handleCampaignName(event) {
    setCampaignName(event)
    setBtnSave(true)
  }

  function handleCompany(event) {
    setBtnSave(true)
    setCompanyName(event)
  }

  function handleActive() {
    setBtnSave(true)
    setCampaignStatus(!campaignStatus)
  }

  function handleRealms(event) {
    setBtnSave(true)
    setRealmData(event.target.value)
  }

  function handleSave() {
    // let campaignNameData;
    let companyData
    let realmUuidData = []

    if (companyname === 'NoCompany' || companyname.length === 0) {
      companyData = null
    } else {
      companyData = companyname
    }

    if (campaignName.length !== 0) {
      get(`/identity/realm/list/`)
        .then(response => {
          const arr = JSON.stringify(response.data, function(key, value) {
            return value || ''
          })
          let myArray = [...JSON.parse(arr)]

          var filtered = myArray.filter(data => {
            return realmData.indexOf(data.name) !== -1
          })
          filtered.forEach(data => {
            realmUuidData.push(data.uuid)
          })
        })
        .then(() => {
          setLoading(true)
          patch(`/identity/campaign/${uuid}/`, {
            realms: realmUuidData,
            company: companyData,
            name: campaignName,
            active: campaignStatus,
            archived: archived
          }).then(res => {
            setLoading(false)
            setCampaignData(res.data)
            props.handleUpdate(uuid)
          })
        })
    }
  }

  const portalTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#1194f6'
      },
      secondary: {
        main: '#1194f6'
      }
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
  })

  return (
    <React.Fragment>
      <ThemeProvider theme={portalTheme}>
        <Paper className={classes.paperCont}>
          {loading ? (
            <TableLoader
              headerText="Management"
              message="Loading campaigns..."
              Icon={GroupOutlined}
            />
          ) : (
            <React.Fragment>
              <div>
                <Typography className={classes.title}>
                  Campaign Settings
                </Typography>
                <Tabs
                  value={value}
                  classes={{
                    indicator: classes.indicator
                  }}
                  fullwidth="true"
                  onChange={handleChange}
                  style={{
                    borderBottom: 'solid 1px #F1F1F1',
                    marginLeft: 15,
                    marginRight: 15,
                    paddingTop: 15
                  }}
                >
                  <Tab
                    label="General"
                    className={classes.text}
                    {...a11yProps(0)}
                    style={{ color: '#444851' }}
                  />
                  <Tab
                    label="Audio Resources"
                    className={classes.text}
                    {...a11yProps(1)}
                    style={{ color: '#444851' }}
                  />
                  <Tab
                    label="List"
                    className={classes.text}
                    {...a11yProps(2)}
                    style={{ color: '#444851' }}
                  />
                  <Tab
                    label="QA"
                    className={classes.text}
                    {...a11yProps(3)}
                    style={{ color: '#444851' }}
                  />
                  <Tab
                    label="Change Log"
                    className={classes.text}
                    {...a11yProps(4)}
                    style={{ color: '#444851' }}
                  />
                </Tabs>
              </div>
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                style={{ paddingTop: 15, padding: '35px 30px' }}
              >
                <Grid container spacing={5}>
                  <Grid item lg={12} style={{ display: 'flex' }}>
                    <div className={classes.infoBtn}>INFO</div>
                    <div className={classes.rec} />
                  </Grid>
                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <CssTextField
                      className={classes.margin}
                      id="custom-css-standard-input"
                      value={campaignName}
                      fullWidth
                      label="Campaign Name"
                      onChange={e => handleCampaignName(e.target.value)}
                      required
                      InputProps={{
                        classes: {
                          underline: classes.inputField,
                          root: classes.inputField
                        }
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <InputLabel
                      style={{
                        fontSize: '13px',
                        letterSpacing: '0.15008px',
                        marginBottom: 3
                      }}
                      htmlFor="adornment-password"
                    >
                      UUID
                    </InputLabel>
                    <Input
                      disabled
                      id="adornment-password"
                      type="texts"
                      value={campaignData.uuid}
                      // classes={{ disabled: classes.disabledText }}
                      label="UUID"
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <CopyToClipboard
                            text={campaignData.uuid}
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
                                  style={{ float: 'right', cursor: 'pointer' }}
                                />
                              </LightTooltip>
                            ) : (
                              <LightTooltip title="Copy UUID" placement="top">
                                <CopyIcon
                                  fontSize="small"
                                  style={{ float: 'right', cursor: 'pointer' }}
                                />
                              </LightTooltip>
                            )}
                          </CopyToClipboard>
                        </InputAdornment>
                      }
                    />

                    {/* </CssTextField> */}
                  </Grid>

                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <CssTextField
                      required
                      id="outlined-select-currency"
                      select
                      label="Campaign Company"
                      className={classes.textField}
                      value={companyname}
                      onChange={e => handleCompany(e.target.value)}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      InputProps={{
                        classes: {
                          underline: classes.inputField,
                          root: classes.inputField
                        }
                      }}
                      fullWidth
                      margin="normal"
                    >
                      {nocompany}
                      {companylist.map((option, index) => (
                        <MenuItem key={index} value={option.uuid}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </CssTextField>
                  </Grid>

                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <InputField
                      disabled
                      id="adornment-password"
                      type="texts"
                      value={status}
                      // classes={{ disabled: classes.disabledText }}
                      label="Campaign Status"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Switch
                              color="primary"
                              checked={Boolean(campaignStatus)}
                              onChange={() => handleActive()}
                              inputProps={{
                                'aria-label': 'secondary checkbox'
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <InputLabel
                      style={{ fontSize: 12 }}
                      htmlFor="select-multiple-checkbox"
                    >
                      Campaign Servers
                    </InputLabel>
                    <Select
                      multiple
                      value={realmData}
                      onChange={handleRealms}
                      input={
                        <Input
                          id="select-multiple-checkbox"
                          classes={{
                            underline: classes.inputField
                          }}
                          fullWidth
                        />
                      }
                      renderValue={selected => selected.join(', ')}
                      MenuProps={{
                        classes: {
                          select: classes.inputField,
                          root: classes.inputField
                        }
                      }}
                      autoWidth={false}
                    >
                      {realmList.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                          <Checkbox
                            checked={realmData.indexOf(option.name) > -1}
                          />
                          <ListItemText primary={option.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <Grid container>
                      <Grid item lg={6} xs={12} sm={12} md={6}>
                        <Typography>Delete Campaign</Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} sm={12} md={6}>
                        <Button
                          onClick={() => setOpenDelete(true)}
                          type="submit"
                          variant="contained"
                          size="medium"
                          style={{
                            width: '130px',
                            background: '#ff504d',
                            color: 'white',
                            float: 'right'
                          }}
                        >
                          <DeleteIcon
                            fontSize="small"
                            style={{ marginRight: 5 }}
                          />{' '}
                          DELETE
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={6} xs={12} sm={12} xl={6}>
                    <TextField
                      required
                      id="standard-required"
                      label="Slug"
                      defaultValue={campaignData.slug}
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      style={{ color: '#bbb' }}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  {btnsave ? (
                    <React.Fragment>
                      <Grid
                        item
                        lg={6}
                        xs={12}
                        sm={12}
                        xl={6}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <button
                          className={classes.saveBtn}
                          onClick={() => handleSave()}
                        >
                          Save
                        </button>
                      </Grid>
                      <Grid item lg={6} xs={12} sm={12} xl={6}>
                        <button
                          className={classes.cancelBtn}
                          onClick={() => {
                            setBtnSave(false)
                            discardChanges()
                          }}
                        >
                          Cancel
                        </button>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <span></span>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <AudioResources />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <List />
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <QA />
              </TabPanel>
              <TabPanel value={value} index={4} dir={theme.direction}>
                <Changelog campaignData={campaignData} />
              </TabPanel>
            </React.Fragment>
          )}
        </Paper>
        <Dialog open={openDelete}>
          <DeleteModal
            header="Delete Campaign"
            msg="campaign"
            name={campaignData.name}
            closeFn={handleClose}
            delFn={handleDelete}
          />
        </Dialog>
        <Dialog open={deleting}>
          <LoadingModal
            text={'One moment. We’re removing the campaign…'}
            cancelFn={handleCancel}
          />
        </Dialog>
        <Dialog open={deleted}>
          <SuccessModal
            text={`You have removed ${campaignData.name}`}
            closeFn={handleClose}
          />
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  )
}
