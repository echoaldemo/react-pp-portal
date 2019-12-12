import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import BackIcon from "@material-ui/icons/ChevronLeft";
// import PropTypes from "prop-types";

const styles = {
  goBack: {
    fontSize: 16,
    marginBottom: 22,
    maxWidth: "20%"
  }
};

interface Props {
  text: string;
  to: string;
  backFn: () => void;
  classes: {
    goBack: string;
  };
}

const BackButton: React.SFC<Props> = ({ classes, backFn, text, to }) => {
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

BackButton.defaultProps = {
  text: "Back",
  to: "/",
  backFn: () => null
} as Partial<Props>;

export default withStyles(styles)(BackButton);
