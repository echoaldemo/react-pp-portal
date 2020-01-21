import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles(() => ({
  textField: {},

  formStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: 15
  },
  formControl: {
    width: "100%",
    paddingBottom: 35
  }
}));
