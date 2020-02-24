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
import SnackNotif from "auth/component/snackbar/snackbar";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("edit_pb_dataname") || "");
    getPhraseBook();
  }, []); // eslint-disable-line

  const getPhraseBook = () => {
    get(`/pitch/global/phrases/${uuid}`).then((res: any) => {
      if (res.data.phrases.length !== 0) {
        get(`/pitch/global/phrases/${uuid}/phrases`).then((res: any) => {
          setAllPhrases(res.data);
        });
      } else {
        setAllPhrases([]);
      }
      setEditData(res.data);
      setPaginateList(res.data);
    });
  };

  const save = (data: Obj, fn: (data: any) => void) =>
    patch(`/pitch/global/phrases/${uuid}/`, {
      name: data.name
    })
      .then((result: any) => {
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

  const handleAdd = (data: Obj, error: Function, success: Function) => {
    post(`/pitch/global/phrases/${uuid}/phrases/`, {
      name: data.name,
      phrase: data.phrase
    }).then((result: any) => {
      getPhraseBook();
      if (!result.status) {
        error();
        setErrorMessage(
          `Phrase with name ${data.name} already exists in phrase-book`
        );
        setOpenErrorMessage(true);
      } else {
        success();
      }
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
      <SnackNotif
        snackbar={openErrorMessage}
        handleClose={() => setOpenErrorMessage(false)}
        message={errorMessage}
      />
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
          {allPhrases === null ? (
            <TableLoader />
          ) : (
            <>
              {allPhrases.length !== 0 ? (
                <>
                  <div>
                    <SearchBar
                      title="Phrase book"
                      userData={allPhrases || []}
                      headers={["name", "slug"]}
                    />
                  </div>
                  <PhrasesTable tableData={allPhrases} />
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
          uuid={editData ? editData.uuid : null}
        />
      </div>
    </>
  );
};

export default EditPhraseBook;
