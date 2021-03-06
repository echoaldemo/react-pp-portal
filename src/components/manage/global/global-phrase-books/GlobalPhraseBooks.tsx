import React, { useState, useEffect } from "react";
import { Paper, Divider } from "@material-ui/core";
import {
  HeaderLink,
  HeaderButton,
  TableLoader,
  SearchBar,
  Pagination
} from "common-components";
import PBTable from "./components/PBTable/PBTable";
import CreatePhraseBook from "./components/CreatePhraseBookModal/CreatePhraseBookModal";
import { get, post } from "utils/api";

const GlobalPhraseBooks = ({ history }: any) => {
  const [pb, setpb] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openNew, setOpenNew] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPhraseBooks();
  }, []);

  const getPhraseBooks = () => {
    get("/pitch/global/phrases").then((res: any) => {
      setpb(res.data);
      setPaginateList(res.data.reverse());
      setLoading(false);
    });
  };

  const addPhraseBook = (data: any, fn: any) => {
    post("/pitch/global/phrases/", {
      name: data.name
    }).then((res: any) => {
      fn();
    });
  };

  const paginate = (from: number, to: number) => {
    setpb(paginateList.slice(from, to));
  };

  const handleEdit = (id: any) => {
    window.location.href = `/manage/phrase-book/global/edit/${id}`;
  };

  return (
    <>
      <div className="header-container">
        <HeaderLink
          menu={[
            {
              title: "Segments",
              path: "/manage/global-pitch-segments"
            },
            {
              title: "Option Group",
              path: "/manage/global-option-group"
            },
            {
              title: "Rapid Response",
              path: "/manage/global-rapid-response/tests"
            }
          ]}
          title="Phrase Books"
          pathSensitive={true}
        />
        <HeaderButton
          buttonText="New Phrase Book"
          openFunction={() => setOpenNew(true)}
        />
      </div>
      <Paper>
        <SearchBar
          title="dids"
          userData={pb}
          headers={["name", "uuid", "slug"]}
          loading={loading}
          modalFunc={handleEdit}
        />
        <Divider />
        {loading ? (
          <TableLoader />
        ) : (
          <>
            <PBTable
              data={pb}
              headers={["Name", "Slug", "UUID", ""]}
              history={history}
            />
            <Divider />
            <Pagination
              totalItems={paginateList.length}
              itemsPerPage={10}
              paginateFn={paginate}
            />
          </>
        )}
      </Paper>
      <CreatePhraseBook
        open={openNew}
        onClose={() => setOpenNew(false)}
        addPhraseBook={addPhraseBook}
        afterAdd={() => {
          setLoading(true);
          getPhraseBooks();
        }}
      />
    </>
  );
};

export default GlobalPhraseBooks;
