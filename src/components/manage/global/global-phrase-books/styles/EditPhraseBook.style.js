import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  container: { marginBottom: 40 },
  editContainer: {},
  phrasebookName: {
    fontSize: 24,
    color: "#444"
  },
  formContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  tableContainer: {},
  tableTitle: {
    paddingTop: 30,
    fontSize: 24,
    color: "#444",
    paddingBottom: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
}));
