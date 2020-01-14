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
  const [name, setName] = useState(localStorage.getItem("edit_pb_dataname"));

  useEffect(() => {
    setName(localStorage.getItem("edit_pb_dataname"));
    fetch(
      `http://5e12f35c6e229f0014678f56.mockapi.io/global-phrase-books/${uuid}`
    )
      .then(res => res.json())
      .then(res => {
        setEditData(res);
      });
  }, []);

  const save = (data, fn) =>
    fetch(
      `http://5e12f35c6e229f0014678f56.mockapi.io/global-phrase-books/${editData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(data => {
        fn(data);
        setName(data.name);
      })
      .catch(error => {
        console.error("Error:", error);
      });

  return (
    <>
      <div>
        <BackButton
          to="/manage/global-pitch-phrasebooks"
          text="Back to Phrase Books"
        />
      </div>
      <div className={classes.editContainer}>
        <>
          <span className={classes.phrasebookName}>{name}</span>
          <Paper className={classes.formContainer} square={true}>
            {editData !== null && (
              <EditPhraseBookForm editData={editData} save={save} />
            )}
          </Paper>
        </>
      </div>
    </>
  );
};

export default EditPhraseBook;
