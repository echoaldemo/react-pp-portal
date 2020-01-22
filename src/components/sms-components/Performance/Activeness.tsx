import React from "react";
import { withStyles } from "@material-ui/styles";
import { styles } from "./Styles/Activeness";
import TimeAgo from "react-simple-timeago";
import Typography from "@material-ui/core/Typography";

function Activeness(props: any) {
  const { classes, date }: any = props;
  return (
    <Typography className={classes.performanceMargin}>
      Performance{" "}
      <span className={classes.performanceHeader}>
        (<TimeAgo element="span" date={date.timestamp} />)
      </span>
    </Typography>
  );
}

Activeness.defaultProps = {
  date: new Date()
};

export default withStyles(styles)(Activeness);
