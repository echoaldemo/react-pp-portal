import React from "react";
import { withStyles } from "@material-ui/core";
import { customCard as styles } from "../styles";
interface Props {
  classes: any;
  children: React.ReactNode;
}

const CustomCardComp: React.FC<Props> = ({ classes, children }) => {
  return <div className={classes.cardWrapper}>{children}</div>;
};

const CustomCard = withStyles(styles)(CustomCardComp);
export { CustomCard };
