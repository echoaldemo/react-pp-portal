import React, { useEffect, useState } from "react";
import { Paper, Divider } from "@material-ui/core";
import {
  BackButton,
  TableLoader,
  TableNoResult,
  SearchBar,
  HeaderButton,
  Pagination
} from "common-components";
import { IoIosGlobe } from "react-icons/io";
import { useStyles } from "../styles/EditPhraseBook.style";
import EditPhraseBookForm from "../components/EditPhraseBookForm/EditPhraseBookForm";
import PhrasesTable from "../components/PhrasesTable/PhrasesTable";
import CreatePhraseModal from "../components/CreatePhraseModal/CreatePhraseModal";
import { get } from "utils/api";

const EditPhraseBook = ({
  match: {
    params: { uuid }
  }
}) => {
  const classes = useStyles();
  const [editData, setEditData] = useState(null);
  const [paginateList, setPaginateList] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(localStorage.getItem("edit_pb_dataname"));

  useEffect(() => {
    setName(localStorage.getItem("edit_pb_dataname"));
    getPhraseBook();
  }, []);

  const getPhraseBook = () => {
    fetch(
      `http://5e12f35c6e229f0014678f56.mockapi.io/global-phrase-books/${uuid}`
    )
      .then((res) => res.json())
      .then((res) => {
        setEditData(res);
        setPaginateList(res);
      });
  };

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
      .then((response) => response.json())
      .then((data) => {
        fn(data);
        setName(data.name);
        setEditData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  const paginate = (from, to) => {
    setEditData({
      ...editData,
      phrases: paginateList.phrases.slice(from, to)
    });
  };

  const handleAdd = (data, fn) => {
    console.log(paginateList.phrases.concat(data));
    fetch(
      `http://5e12f35c6e229f0014678f56.mockapi.io/global-phrase-books/${editData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phrases: paginateList.phrases.concat(data) })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fn();
        getPhraseBook();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
            {editData !== null ? (
              <EditPhraseBookForm editData={editData} save={save} />
            ) : (
              <TableLoader />
            )}
          </Paper>
        </>
      </div>
      <div className={classes.tableContainer}>
        <div className={classes.tableTitle}>
          <span>Phrases</span>
          {editData && editData.phrases.length > 0 && (
            <HeaderButton
              buttonText="New Phrase"
              openFunction={() => {
                setOpen(true);
              }}
            />
          )}
        </div>

        <Paper square={true} className={classes.container}>
          {editData === null ? (
            <TableLoader />
          ) : (
            <>
              {editData.phrases.length > 0 ? (
                <>
                  <div className={classes.searchContainer}>
                    <SearchBar
                      title="Phrase book"
                      userData={[]}
                      headers={["name", "slug"]}
                    />
                  </div>
                  <PhrasesTable
                    headers={["Name", "Phrase", "Slug"]}
                    tableData={editData.phrases}
                    editable={false}
                  />
                  <Divider />
                  {paginateList !== null && (
                    <Pagination
                      paginateFn={paginate}
                      totalItems={paginateList.phrases.length}
                      itemsPerPage={10}
                    />
                  )}
                </>
              ) : (
                <div>
                  <TableNoResult
                    icon={<IoIosGlobe style={{ fontSize: 64 }} />}
                    headerText="Global phrases"
                    mainMessage="This Phrase book doesn't have phrases yet."
                    subMessage={`Would you like to create one? Just hit the "New Phrase" button`}
                    renderButton={
                      <HeaderButton
                        buttonText="New Phrase"
                        openFunction={() => {
                          // this.handleOpenAddModal()
                          console.log("");
                        }}
                      />
                    }
                  />
                </div>
              )}
            </>
          )}
        </Paper>
        <CreatePhraseModal
          open={open}
          onClose={() => setOpen(false)}
          openFn={() => setOpen(true)}
          handleAdd={handleAdd}
        />
      </div>
    </>
  );
};

export default EditPhraseBook;
