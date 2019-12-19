import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ChevronLeft";

import { backStyles as styles } from "../styles";

interface Props {
  text: string;
  to: string;
  backFn: () => void;
  classes: {
    goBack: string;
    back: string;
  };
}

const BackButtonComp: React.FC<Props> = ({ classes, backFn, text, to }) => {
  return (
    <div className={classes.goBack}>
      <span style={{ minWidth: 300, margin: 0 }}>
        {backFn ? (
          <span
            className={classes.back}
            onClick={() => {
              backFn();
            }}
          >
            <BackIcon /> {text}
          </span>
        ) : (
          <Link to={to} className={classes.back}>
            <BackIcon /> {text}
          </Link>
        )}
      </span>
    </div>
  );
};

BackButtonComp.defaultProps = {
  text: "Back",
  to: "/",
  backFn: () => null
} as Partial<Props>;

export default withStyles(styles)(BackButtonComp);
