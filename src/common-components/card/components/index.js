import React, { Component } from "react";
import { withStyles, Card, CardHeader, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const styles = {
  cardWrapper: { border: "solid 1px #F1F1F1" }
};
class CustomCardComp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.cardWrapper}>{this.props.children}</div>
      </>
    );
  }
}
const CustomCard = withStyles(styles)(CustomCardComp);
export { CustomCard };
