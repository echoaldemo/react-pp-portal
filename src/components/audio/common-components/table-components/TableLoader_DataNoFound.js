import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Image from "../img/no-data-found.png";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
  resLoader: {
    color: "#a6c556"
  },
  loader: {
    width: "100%",
    marginTop: "40%",
    marginBottom: "33%",
    marginLeft: "103%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 425px)": {
      marginLeft: "100%"
    }
  },
  loadingFont: {
    fontSize: 15,
    color: "#5d5a5a",
    marginTop: 5,
    "@media (max-width: 425px)": {
      fontSize: 13
    }
  },
  noResults: {
    marginLeft: "118%",
    marginTop: "13%",
    marginBottom: "13%",
    "@media (max-width: 425px)": {
      marginLeft: "75%",
      marginTop: "10%"
    },
    "@media (max-width: 768px) and (min-width: 600px)": {
      marginLeft: "95%"
    }
  },

  resImage: {
    width: 255,
    height: 250,
    "@media (max-width: 425px)": {
      width: 166,
      height: 160
    }
  }
});

class TableDataCell extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        {!this.props.fetched ? (
          <Grid item className={classes.loader}>
            {/* Loader for filter  */}
            <CircularProgress
              size={50}
              thickness={5}
              className={classes.resLoader}
            />
            <Typography className={classes.loadingFont}>
              {" "}
              Loading Data...{" "}
            </Typography>
          </Grid>
        ) : (
          <Grid item className={classes.noResults}>
            <img src={Image} className={classes.resImage} alt="No data found" />
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(TableDataCell);
