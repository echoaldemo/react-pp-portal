import React from 'react';

import { Snackbar, SnackbarContent
  } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Styles/ToastDialog.styles'

const useStyles = makeStyles(styles);

export default function ToastDialog(props) {
  
  const vertical = 'top';
  const horizontal = 'right';
  
  const classes = useStyles()

  return (<React.Fragment>
    <Snackbar
      data-cy-toast
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={props.open}
      autoHideDuration={2000}
      onClose={props.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}>
      <SnackbarContent className={classes.toast}  
        message={
          <span id="message-id">
           {props.msg}
          </span>
        }
        style={props.msg === "Ask permission from admin to grant access"? {background:"#ff3f3f"} : {background:"#5f7d98"}}
      />
    </Snackbar>
  </React.Fragment>)
}