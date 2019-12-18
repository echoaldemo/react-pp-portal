import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  tabsContainer: {
    display: "flex",
    borderRadius: 3,
    overflow: "hidden",
    width: "min-content"
  },
  activeMenu: {
    padding: "0 20px",
    height: "40px",
    background: "#f89523",
    color: "white",
    textAlign: "center",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    minWidth: 80
  },
  inactiveMenu: {
    padding: "0 20px",
    height: "40px",
    background: "#EEEEEE",
    color: "#7C8A97",
    textAlign: "center",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: "0 0.5px",
    minWidth: 80
  },
  text: {
    whiteSpace: "nowrap"
  }
}));
