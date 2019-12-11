import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import BackIcon from "@material-ui/icons/ChevronLeft";
import Proptypes from "prop-types";

const styles = {
  goBack: {
    fontSize: 16,
    marginBottom: 22,
    maxWidth: "20%"
  }
};

type BackButtonProps = {
  text: string,
  to: string,
  backFn: () => void,
  classes: any
};

const BackButton = ({ classes, backFn, text, to }: BackButtonProps) => {
  return (
    <div className={classes.goBack}>
      <span style={{ minWidth: 300, margin: 0 }}>
        {backFn ? (
          <a
            style={{
              display: "flex",
              alignItems: "center",
              color: "#1194f6",
              textDecoration: "none",
              minWidth: 300,
              marginLeft: -6
            }}
            onClick={() => {
              backFn();
            }}
          >
            <BackIcon /> {text}
          </a>
        ) : (
          <Link
            to={to}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#1194f6",
              textDecoration: "none",
              minWidth: 300,
              marginLeft: -6
            }}
          >
            <BackIcon /> {text}
          </Link>
        )}
      </span>
    </div>
  );
};

// BackButton.propTypes = {
//   text: Proptypes.string.isRequired,
//   to: Proptypes.string
// };

// BackButton.defaultProps = {
//   text: "",
//   to: ""
// };

export default withStyles(styles)(BackButton);
