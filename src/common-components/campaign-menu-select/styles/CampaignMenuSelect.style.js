import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  middle: {
    display: "flex",
    alignItems: "center"
  },
  paper: {
    width: 228,
    minHeight: 0
  },
  title: {
    fontSize: 16,
    color: "#444851"
  },
  titleClicked: {
    fontSize: 16,
    color: "#1194f6"
  },
  subtitle: {
    fontSize: 14,
    color: "#4a4a4a"
  },
  button: {
    background: "transparent",
    outline: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
    color: "#4a4a4a",
    cursor: "pointer",
    margin: "0 auto",
    height: 40,
    width: "85%"
  },
  divider: {
    backgroundColor: "#eeeeee",
    margin: "10px 0"
  },
  link: {
    textDecoration: "none"
  },
  popover: {
    boxShadow: "0 1px 7px 0 rgba(0, 0, 0, 0.12)"
  }
}));
