import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 5
  },
  formContainer: { paddingBottom: 20 },
  formControl: {
    marginLeft: 15,
    width: "80%"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 15
  },
  loadingWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 300,
    flexDirection: "column"
  },
  errorMessageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flexDirection: "column",
    marginTop: 15,
    color: "red"
  },
  errorMessageText: {
    width: "100%",
    padding: 15,
    marginTop: 15,
    backgroundColor: "#dc3e3e",
    color: "#FFF",
    fontWeight: 450,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  successMessageWrapper: {
    padding: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  labelRoot: {
    color: '#777777'
  },
  checkBoxRoot: {
    fontSize: '25px',
    marginTop: '-3px',
    color: '#bbbbbb'
  }
});

export { useStyles };
