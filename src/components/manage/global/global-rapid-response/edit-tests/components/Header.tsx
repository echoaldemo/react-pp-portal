import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "white",
    color: "#444851"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: "#444851"
  },
  active: {
    width: "60px",
    background: "#6698c7",
    height: "20px",
    borderRadius: "3px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px"
  },
  inactive: {
    width: "60px",
    background: "#ff504d",
    height: "20px",
    borderRadius: "3px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px"
  },
  activeMenu: {
    padding: "0 30px",
    height: "40px",
    background: "#f89523",
    borderRadius: "3px 3px 3px 3px",
    color: "white",
    textAlign: "center",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  inactiveMenu: {
    borderRadius: "3px 3px 3px 3px",
    padding: "0 30px",
    height: "40px",
    background: "#EEEEEE",
    color: "#7C8A97",
    textAlign: "center",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 0.5px"
  },
  goBack: {
    fontSize: 16,
    marginBottom: 22,
    maxWidth: "20%"
  }
}));

interface Props {
  test: any;
  loading: boolean;
}

export default function Header(props: Props) {
  const { test, loading } = props;
  const classes = useStyles();

  return (
    <>
      <div className={classes.goBack}>
        <span style={{ minWidth: 300, margin: 0 }}>
          <Link
            to={"/manage/global-rapid-response/tests"}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#1194f6",
              textDecoration: "none",
              minWidth: 300,
              marginLeft: -6
            }}
          >
            <BackIcon /> {"Back to Tests"}
          </Link>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "25px 0",
          fontFamily: "Arial",
          minWidth: "1000px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "30%",
            padding: "0 3px 0 0"
          }}
        >
          {loading ? (
            <React.Fragment>
              <Typography
                style={{ color: "#444851", fontSize: "24px", marginRight: 25 }}
              >
                Loading...
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography
                style={{ color: "#444851", fontSize: "24px", marginRight: 25 }}
              >
                {test.name}
              </Typography>
              <span className={test.active ? classes.active : classes.inactive}>
                {test.active ? "Active" : "Inactive"}
              </span>
            </React.Fragment>
          )}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "70%",
            justifyContent: "flex-end"
          }}
        ></div>
      </div>
    </>
  );
}
