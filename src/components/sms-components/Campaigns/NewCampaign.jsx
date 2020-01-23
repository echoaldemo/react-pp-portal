import React, { Fragment } from 'react'
import OptionalFields from './optionalFields'
import ToastDialog from './ToastDialog'
import Autoselect from './Autoselect'

import Loader from '@material-ui/core/CircularProgress'

import {
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery
} from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import styles from './Styles/NewCampaign.styles'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(styles)
export default function NewCampaign(props) {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [camp, setCamp] = React.useState('')
  const [field, setField] = React.useState(false) // eslint-disable-line
  const [uuid, setUUID] = React.useState('')
  const [autoSuggest, setAutoSuggest] = React.useState(true)

  const [realms, setRealms] = React.useState([])
  const [company, setCompany] = React.useState('')
  let [error, setError] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    props.saveCamp(camp)
    setCamp('')
    props.loader(uuid)
    setError('')
  }

  function handleClose() {
    props.handleClose()
    setField(false)
    setCamp('')
    setError('')
  }

  function handle(e, uuid, realms, company) {
    setCamp(e)
    setUUID(uuid)
    setRealms(realms)
    setCompany(company)

    const test = props.suggestion.filter(i => i.name === e)

    if (test.length) {
      setField(false)
      props.setter(false)
    } else {
      setField(true)
      props.setter(true)
    }

    props.saveCamp(e)
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        disableEscapeKeyDown={false}
        disableBackdropClick={true}
        width={420}
        data-cy-add-new-campaign-dialog
        fullScreen={fullScreen}
      >
        <div style={{ width: fullScreen ? '100%' : 420 }}>
          <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">
            <p className={classes.dialogText}>
              Add new campaign
              <Icon
                data-cy-cancel-create-btn
                className={classes.dialogCloseIcon}
                onClick={handleClose}
              >
                <Close />
              </Icon>
            </p>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className={classes.textContent}>
                <p style={{ fontSize: 16 }}>
                  {props.campaignLoader ||
                  props.realmLoader ||
                  props.companyLoader ? (
                    <Fragment>
                      <span style={{ color: '#7c8a97' }}>
                        Preparing existing campaigns.
                      </span>
                      <br />
                      <span style={{ color: '#7c8a97' }}>Please wait...</span>
                    </Fragment>
                  ) : (
                    'Search and select the campaign you want to add'
                  )}
                </p>
              </div>
              {props.campaignLoader ||
              props.realmLoader ||
              props.companyLoader ? (
                <div className={classes.loaderWrapper}>
                  <Loader
                    style={{
                      color: '#1194f6',
                      width: 45,
                      height: 45
                    }}
                  />
                </div>
              ) : (
                <Fragment>
                  <Autoselect
                    suggestion={props.suggestion}
                    value={camp}
                    handleC={handle}
                    setAutoSuggest={setAutoSuggest}
                    data={props.data}
                    setError={setError}
                    error={error}
                  />
                  <OptionalFields
                    open={camp && !error ? true : false}
                    newRealms={props.newRealms}
                    realmList={props.realmList}
                    companyList={props.companyList}
                    newCompany={props.newCompany}
                    realms={realms}
                    company={company}
                    error={error}
                  />
                </Fragment>
              )}
            </form>
            <div className={classes.buttonDiv}>
              {!(
                props.campaignLoader ||
                props.realmLoader ||
                props.companyLoader
              ) && (
                <Fragment>
                  <button onClick={handleClose} className={classes.cancelBtn}>
                    CANCEL
                  </button>
                  <button
                    disabled={!camp || !autoSuggest ? true : false}
                    className={!camp ? classes.disabledBtn : classes.saveBtn}
                    onClick={handleSubmit}
                    style={
                      !camp || !autoSuggest ? { cursor: 'not-allowed' } : null
                    }
                  >
                    SAVE
                  </button>
                </Fragment>
              )}
            </div>
          </DialogContent>
        </div>
      </Dialog>
      <ToastDialog
        open={props.snack}
        msg="Campaign added successfully"
        handleClose={props.closeSnack}
      />
    </React.Fragment>
  )
}
