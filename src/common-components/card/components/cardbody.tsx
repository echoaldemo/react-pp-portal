import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

interface Props {
  classes: any;
  children: React.ReactNode;
}

const styles = {
  cardBody: {
    height: 500,
    backgroundColor: "#fafafa",

    borderTop: 0,
    maxHeight: 500,
    overflow: "auto"
  }
};
class CardBodyComp extends Component<Props> {
  render() {
    const { classes, children } = this.props;
    return <div className={classes.cardBody}>{children}</div>;
  }
}
const CardBody = withStyles(styles)(CardBodyComp);

export { CardBody };
