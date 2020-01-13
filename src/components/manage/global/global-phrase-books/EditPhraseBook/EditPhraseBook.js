import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Divider } from "@material-ui/core";
import { BackButton } from "common-components";
import EditPhraseBookForm from "../components/EditPhraseBookForm/EditPhraseBookForm";

const useStyles = makeStyles(() => ({
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

const EditPhraseBook = ({
  match: {
    params: { uuid }
  }
}) => {
  const classes = useStyles();
  const [editData, setEditData] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("edit_pb_data"));
    setEditData(data);
  }, []);

  return (
    <>
      <div>
        <BackButton
          to="/manage/global-pitch-phrasebooks"
          text="Back to Phrase Books"
        />
      </div>
      <div className={classes.editContainer}>
        {/* {this.state.loading ? (
            <Paper square={true}>
              <TableLoader />
            </Paper>
          ) : ( */}
        <>
          <span className={classes.phrasebookName}>
            {editData ? editData.name : "<name>"}
          </span>
          <Paper className={classes.formContainer} square={true}>
            {editData !== null && <EditPhraseBookForm editData={editData} />}
          </Paper>
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default EditPhraseBook;
