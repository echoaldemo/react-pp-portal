import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  cardBody: {
    height: 500,
    backgroundColor: "#fafafa",

    borderTop: 0,
    maxHeight: 500,
    overflow: "auto"
  }
};
class CardBodyComp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.cardBody}>{this.props.children}</div>;
  }
}
const CardBody = withStyles(styles)(CardBodyComp);

export { CardBody };
