import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
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
  }
}));
