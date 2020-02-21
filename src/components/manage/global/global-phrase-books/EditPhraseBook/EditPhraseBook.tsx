import React, { useEffect, useState } from "react";
import { Paper, Divider } from "@material-ui/core";
import { IoIosGlobe } from "react-icons/io";
import {
  BackButton,
  TableLoader,
  TableNoResult,
  SearchBar,
  HeaderButton,
  Pagination
} from "common-components";
import { useStyles } from "../styles/EditPhraseBook.style";
import EditPhraseBookForm from "../components/EditPhraseBookForm/EditPhraseBookForm";
import PhrasesTable from "../components/PhrasesTable/PhrasesTable";
import CreatePhraseModal from "../components/CreatePhraseModal/CreatePhraseModal";
import { get, post, patch } from "utils/api";

interface Obj {
  [index: string]: any;
}

const EditPhraseBook = ({
  match: {
    params: { uuid }
  }
}: any) => {
  const classes = useStyles();
  const [editData, setEditData] = useState<Obj | null>(null);
  const [allPhrases, setAllPhrases] = useState<any>(null);
  const [paginateList, setPaginateList] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(
    localStorage.getItem("edit_pb_dataname") || ""
  );

  useEffect(() => {
    setName(localStorage.getItem("edit_pb_dataname") || "");
    getPhraseBook();
  }, []); // eslint-disable-line

  const getPhraseBook = () => {
    get(`/pitch/global/phrases/${uuid}`).then((res: any) => {
      setAllPhrases(res.data);
      setEditData(res.data);
      setPaginateList(res.data);
    });
  };

  const save = (data: Obj, fn: (data: any) => void) =>
    editData &&
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
      .then((response: any) => response.json())
      .then((data: any) => {
        fn(data);
        setName(data.name);
        setEditData(data);
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  const paginate = (from: number, to: number) => {
    setEditData({
      ...editData,
      phrases: paginateList.phrases.slice(from, to)
    });
  };

  const handleAdd = (data: Obj, fn: any) => {
    editData &&
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
        .then(response => response.json())
        .then(() => {
          fn();
          getPhraseBook();
        })
        .catch(error => {
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
          <Paper className={classes.container} square={true}>
            {editData !== null ? (
              <div className={classes.formContainer}>
                <EditPhraseBookForm editData={editData} save={save} />
              </div>
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
                  <div>
                    <SearchBar
                      title="Phrase book"
                      userData={allPhrases || []}
                      headers={["name", "slug"]}
                    />
                  </div>
                  <PhrasesTable tableData={editData.phrases} />
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
                          setOpen(true);
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
