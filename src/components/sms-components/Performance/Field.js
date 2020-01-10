import React from 'react';

import Icon from '@material-ui/core/Icon'

import { withStyles } from '@material-ui/styles';
import styles from './Styles/PerformanceFields';

function Field(props){
  const { classes, borderLeft, label, icon, value } = props;
  const wrapper = borderLeft 
                  ? classes.withBorderLeft 
                  : classes.noBorderLeft
                    
  return (
    <div className={wrapper}>
      <h4 className={classes.header}>{label}</h4>
      <span className={classes.value}>
        <Icon className={classes.icon} >
          { icon }
        </Icon> { value }
      </span>
    </div>
  );
}

export default withStyles(styles)(Field)