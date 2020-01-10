import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import {
  SearchBar,
  Pagination,
  AsyncTable,
  ActiveCell
} from "common-components";

const mock = [
  {
    date: "Nov. 24, 2018",
    processed: "Yes",
    storage: "S3",
    attempt: 28295,
    valid: 27805,
    dupe: 242,
    dnc: 233,
    invalid: 15
  }
];

const headers = [
  "Date",
  "Processed",
  "Storage engine",
  "Attempted",
  "Valid",
  "Dupes",
  "DNC",
  "Invalid"
];

const History: React.FC = () => {
  const [list, setList] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);

  useEffect(() => {
    setList(mock);
    setPaginateList(mock);
  }, []);

  const paginate = (from: number, to: number) => {
    setList(paginateList.slice(from, to));
  };

  return (
    <div>
      <SearchBar
        title="Search lists"
        customTitle="Search lists"
        userData={list}
        headers={["date", "storage"]}
      />
      <AsyncTable
        headers={headers}
        customHeight={335}
        tableData={list}
        render={(list: any, { row, cell }: any) =>
          list.map((item: any, i: number) => (
            <TableRow key={i} className={row}>
              <TableCell className={cell}>{item.date}</TableCell>
              <ActiveCell className={cell}>{item.processed}</ActiveCell>
              <TableCell className={cell}>{item.storage}</TableCell>
              <TableCell className={cell}>{item.attempt}</TableCell>
              <TableCell className={cell}>{item.valid}</TableCell>
              <TableCell className={cell}>{item.dupe}</TableCell>
              <TableCell className={cell}>{item.dnc}</TableCell>
              <TableCell className={cell}>{item.invalid}</TableCell>
            </TableRow>
          ))
        }
      />
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

export default History;
