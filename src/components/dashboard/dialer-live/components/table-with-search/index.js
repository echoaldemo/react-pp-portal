import React from "react";
import { Paper, Divider, TableRow, TableCell } from "@material-ui/core";

import GearIcon from "@material-ui/icons/Settings";
import {
  Pagination,
  ActiveCell,
  AsyncTable,
  SearchBar
} from "common-components";

function TableWithSearch({
  data,
  keys,
  headers,
  SearchFor,
  paginateList,
  paginateSet,
  setFunc,
  searchData
}) {
  const paginate = (from, to) => {
    paginateSet(paginateList.slice(from, to), setFunc);
  };

  return (
    <div>
      <Paper style={{ height: "auto" }}>
        <div style={{ height: 490, overflow: "hidden", width: "100%" }}>
          <div style={{ width: "100%" }}>
            <SearchBar title={SearchFor} userData={searchData} headers={keys} />
          </div>
          <Divider />

          <AsyncTable
            headers={headers}
            tableData={data}
            render={(samples, { row, cell }) =>
              samples.map((sample, i) => (
                <TableRow className={row} key={i}>
                  {Object.keys(sample).map((Key, a) =>
                    typeof sample[Key] === "boolean" ? (
                      <ActiveCell key={a} className={cell}>
                        {sample[Key]}
                      </ActiveCell>
                    ) : sample[Key].toLowerCase().includes("no") ||
                      sample[Key].toLowerCase().includes("yes") ? (
                      <ActiveCell key={a} className={cell}>
                        {sample[Key]}
                      </ActiveCell>
                    ) : (
                      <TableCell key={a} className={cell}>
                        {sample[Key]}
                      </TableCell>
                    )
                  )}
                  {/* should have a condition if the component needs a settings */}
                  <TableCell align="right" className={cell}>
                    <GearIcon
                      style={{
                        color: "#444851",
                        fontSize: "18px",
                        cursor: "pointer"
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            }
          />
        </div>
        {Boolean(paginateList) && (
          <Pagination
            paginateFn={paginate}
            totalItems={paginateList.length}
            paginateList={paginateList}
            itemsPerPage={7}
          />
        )}
      </Paper>
    </div>
  );
}

export default TableWithSearch;
