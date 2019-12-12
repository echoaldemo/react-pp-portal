import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import {Pagination} from 'common-components';
import notes from "./notes.md";

const data = [
  { cell1: "1", cell2: "x" },
  { cell1: "2", cell2: "x" },
  { cell1: "3", cell2: "x" },
  { cell1: "4", cell2: "x" },
  { cell1: "5", cell2: "x" },
  { cell1: "6", cell2: "x" },
  { cell1: "7", cell2: "x" },
  { cell1: "8", cell2: "x" },
  { cell1: "9", cell2: "x" },
  { cell1: "10", cell2: "x" },
  { cell1: "11", cell2: "x" },
  { cell1: "12", cell2: "x" },
  { cell1: "13", cell2: "x" },
  { cell1: "14", cell2: "x" },
  { cell1: "15", cell2: "x" },
  { cell1: "16", cell2: "x" },
  { cell1: "17", cell2: "x" },
  { cell1: "18", cell2: "x" },
  { cell1: "19", cell2: "x" },
  { cell1: "20", cell2: "x" },
  { cell1: "21", cell2: "x" },
  { cell1: "22", cell2: "x" },
  { cell1: "23", cell2: "x" },
  { cell1: "24", cell2: "x" },
  { cell1: "25", cell2: "x" },
  { cell1: "26", cell2: "x" },
  { cell1: "27", cell2: "x" },
  { cell1: "28", cell2: "x" },
  { cell1: "29", cell2: "x" },
  { cell1: "30", cell2: "x" }
];

storiesOf("Pagination", module).add(
  "default",
  () =>
    createElement(() => {
      const [tbdata, settbData] = React.useState(data);
      const [paginateList, setPaginateList] = React.useState(data);
      const paginate = (from, to, page) => {
        settbData(paginateList.slice(from, to));
      };
      return (
        <>
          <table id="demo" style={{ margin: "0 auto" }}>
            <thead>
              <tr>
                <th>Col 1 </th>
                <th>Col 2 </th>
              </tr>
            </thead>
            <tbody id="demo-body">
              {tbdata.map((row, i) => {
                return (
                  <tr key={i}>
                    <td>{row.cell1}</td>
                    <td>{row.cell2}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            paginateFn={paginate}
            totalItems={paginateList.length}
            itemsPerPage={5}
          />
        </>
      );
    }),
  { notes: { markdown: notes } }
);
