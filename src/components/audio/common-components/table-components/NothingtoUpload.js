import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Image from "../img/nothing-to-upload.png";

const styles = {
  resImage: {
    width: 255,
    height: 250,
    "@media (max-width: 425px)": {
      width: 255,
      height: 250,
      marginTop: 50
    }
  },
  resInfo: {
    marginTop: 76,
    justifyContent: "center",
    display: "flex",
    position: "absolute",
    width: "100%"
  }
};

class NothingtoUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.resInfo}>
        <img src={Image} className={classes.resImage} alt="Nothing to upload" />
      </Grid>
    );
  }
}

export default withStyles(styles)(NothingtoUpload);
