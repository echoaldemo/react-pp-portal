import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './Styles/Activeness';
import TimeAgo from 'react-simple-timeago';
import Typography from '@material-ui/core/Typography';


function Activeness(props) {
  const { classes, date } = props;
  return (
    <Typography className={classes.performanceMargin}>
      Performance <span className={classes.performanceHeader}>
        (<TimeAgo element="span" date={date.timestamp} />)
        </span>
    </Typography>
  );
}

Activeness.defaultProps = {
  date: new Date(),
}

Activeness.propTypes = {
  date: PropTypes.any.isRequired,
};

export default withStyles(styles)(Activeness)