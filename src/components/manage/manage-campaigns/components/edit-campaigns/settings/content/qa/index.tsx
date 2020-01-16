import React, { useState, useEffect } from "react";
import { data } from "./mock";
import { SearchBar, Pagination } from "common-components";
import QATable from "./components/QATable";

const QA: React.FC = () => {
  const [qa, setQA] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);

  useEffect(() => {
    setQA(data);
    setPaginateList(data);
  }, []);

  const paginate = (from: number, to: number) => {
    setQA(paginateList.slice(from, to));
  };

  const sortFirstName = () => {
    const sorted = qa.sort((a: any, b: any) =>
      a.first_name.localeCompare(b.first_name)
    );
    setQA(sorted);
    setPaginateList(sorted);
  };

  return (
    <div>
      <SearchBar
        title="Prospect"
        userData={qa}
        headers={["first_name", "last_name"]}
      />
      <QATable qa={qa} sortFirstName={sortFirstName} />
      {Boolean(paginateList.length) && (
        <Pagination
          paginateFn={paginate}
          totalItems={paginateList.length}
          itemsPerPage={6}
        />
      )}
    </div>
  );
};

export default QA;
