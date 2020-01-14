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
    fetch("http://5e12f35c6e229f0014678f56.mockapi.io/global-phrase-books")
      .then(res => res.json())
      .then(res => {
        setpb(res);
        setPaginateList(res);
        setLoading(false);
      });
  };

  const addPhraseBook = (data: any) => {
    setPaginateList(paginateList.concat(data));
  };

  const paginate = (from: number, to: number) => {
    setpb(paginateList.slice(from, to));
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
      />
    </>
  );
};

export default GlobalPhraseBooks;
