import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import styles from './Styles/Activeness';

import TimeAgo from 'react-simple-timeago';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, sans-serif',
    fontSize: 18,
    color: '#bbbbbb',
  },
});

function Activeness(props) {
  const { classes, date } = props;
  return (
    <ThemeProvider theme={theme}>
      <Typography className={classes.performanceMargin}>
        Performance <span className={classes.performanceHeader}>
          (<TimeAgo element="span" date={date.timestamp}/>)
        </span>
      </Typography>
    </ThemeProvider>
  );
}

Activeness.defaultProps = {
  date: new Date(),
}

Activeness.propTypes = {
  date: PropTypes.any.isRequired,
};

export default withStyles(styles)(Activeness)