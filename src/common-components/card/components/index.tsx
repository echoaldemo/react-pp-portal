import React, { Component } from "react";
import { withStyles, Card, CardHeader, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface Props {
  classes: any;
  children: React.ReactNode;
}

const styles = {
  cardWrapper: { border: "solid 1px #F1F1F1" }
};

const CustomCardComp: React.FC<Props> = ({ classes, children }) => {
  return (
    <>
      <div className={classes.cardWrapper}>{children}</div>
    </>
  );
};

// class CustomCardComp extends Component {
//   render() {
//     const { classes } = this.props;
//     return (
//       <>
//         <div className={classes.cardWrapper}>{this.props.children}</div>
//       </>
//     );
//   }
// }
const CustomCard = withStyles(styles)(CustomCardComp);
export { CustomCard };
