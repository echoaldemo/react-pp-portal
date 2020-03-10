import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 5
  },
  formContainer: { paddingBottom: 20 },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 15
  },
  labelRoot: {
    color: "#777777"
  },
  checkBoxRoot: {
    fontSize: "25px",
    marginTop: "-3px",
    color: "#bbbbbb"
  }
});

export { useStyles };
