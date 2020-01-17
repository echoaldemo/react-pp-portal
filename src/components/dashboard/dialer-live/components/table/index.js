import React, { useEffect, useState, useRef } from "react";

import {
  Paper,
  Divider,
  TableRow,
  TableCell,
  Typography,
  Dialog
} from "@material-ui/core";

import { Settings } from "@material-ui/icons";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/styles";

import SearchBar from "../../../../common-components/search-bar/SearchBar";
import AsyncTable from "../../../../common-components/async-table/AsyncTable";
import Pagination from "../../../../common-components/pagination/PaginationV2";
import { DialerFilter } from "../";
import PopupMenu from "./popmenu";

// import { UnderlineCell } from "../../../../common-components/table-cells/TableCells";

import styled from "styled-components";

import { mock } from "./mock";
import DialingParameter from "../dialing-parameter/Dp_v2";
const SearchContainer = styled.div`
  min-height: 77px;
  height: auto;
  width: inherit;
`;

const FilterContainer = styled.div`
  width: inherit;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0px 9px 24px;
`;

const FilterActual = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ApplyText = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

const ApplyButton = styled.button`
  outline: none;
  border: none;
  margin-right: 25px;
  cursor: pointer;
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;

  &:hover {
    opacity: 0.8;
  }
`;

const theme = createMuiTheme({});

const useStyles = makeStyles({
  tableContainer: {
    marginTop: "28px",
    width: "inherit",
    minHeight: "549px",
    height: "auto"
  },
  overflow: {
    lineHeight: "1em",
    maxHeight: "2em",
    display: "box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  underline: {
    textDecoration: "underline"
  }
});

const filter = [
  {
    tag: "Sort by",
    data: [
      {
        name: "Performance"
      },
      {
        name: "Skills"
      }
    ]
  },
  {
    tag: "Active Status",
    data: [
      {
        name: "All"
      },
      {
        name: "Active"
      },
      {
        name: "Inactive"
      }
    ]
  }
];

const headers = [
  "Server",
  "Campaign",
  "Total reps",
  "Stations per Rep / Billable",
  "Total Stations",
  "Available Stations",
  "Waiting Stations",
  "Call Ratio",
  "Requested / Ringing calls",
  "Inqueue / Connected calls",
  "Abandon (5/15/60)",
  "Active / Disable prospects",
  " "
];

function activeData(data) {
  console.log("Active Data: ", data);
}

const Table = props => {
  let classes = useStyles();
  const [filters, setFilters] = useState(filter);
  const [sortBy, setSortBy] = useState("Performance");
  const [activeStatus, setActiveStatus] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialing, setOpenDialing] = useState(false);
  const [liveDialer, setLiveDialer] = useState(mock);
  const [paginateList, setPaginateList] = useState(mock);
  useEffect(() => {
    let withFunction = filters.map(key => {
      return {
        ...key,
        result: selection
      };
    });

    setFilters(withFunction);
  }, []);

  function selection(type, data) {
    if (type.match(/Sort/)) {
      setSortBy(data);
    } else {
      setActiveStatus(data);
    }
  }

  function settingHandler(e) {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function renderSearch() {
    return (
      <div style={{ width: "99%" }}>
        <SearchContainer>
          <SearchBar
            title="dialer status report"
            userData={[]}
            headers={["Campaign"]}
            loading={false}
            setActiveDataMethod={activeData}
          />
        </SearchContainer>
        <Divider />
      </div>
    );
  }

  const paginate = (from, to) => {
    setLiveDialer(paginateList.slice(from, to));
  };

  function renderTable() {
    return (
      <>
        <AsyncTable
          headers={headers}
          tableData={liveDialer}
          render={(data, { row, cell, overflow }) =>
            data.map((key, i) => {
              delete key.uuid;
              return (
                <TableRow className={row} key={i}>
                  {Object.values(key).map((info, a) => {
                    return (
                      <TableCell className={cell} key={a}>
                        {Object.values(key)
                          .map(key2 => key2)
                          .indexOf(info) === 1 ? (
                          <span className={overflow}>
                            <span className={classes.underline}>{info}</span>
                          </span>
                        ) : (
                          <span className={overflow}>{info}</span>
                        )}
                      </TableCell>
                    );
                  })}

                  <TableCell className={cell}>
                    <div
                      style={{
                        width: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Settings
                        onClick={e => settingHandler(e)}
                        style={{
                          color: "#444851",
                          fontSize: "18px",
                          cursor: "pointer"
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          }
        />
        {Boolean(paginateList.length) && (
          <Pagination
            paginateFn={paginate}
            totalItems={paginateList.length}
            paginateList={paginateList}
            itemsPerPage={8}
          />
        )}
      </>
    );
  }

  function renderFilter() {
    return (
      <FilterContainer>
        <PopupMenu
          onClose={closeMenu}
          anchorEl={anchorEl}
          open={open}
          close={closeMenu}
          toggleDial={() => setOpenDialing(!openDialing)}
        />
        <FilterActual>
          {filters.map((key, i) => (
            <DialerFilter
              key={i}
              tag={key.tag}
              filterData={key.data}
              result={key.result}
            />
          ))}
        </FilterActual>

        <ApplyButton>
          <ApplyText>Apply</ApplyText>
        </ApplyButton>
      </FilterContainer>
    );
  }

  function renderDial() {
    return (
      <Dialog open={openDialing}>
        <DialingParameter
          header="Dialing Parameters"
          closeFn={() => setOpenDialing(!openDialing)}
        />
      </Dialog>
    );
  }

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.tableContainer}>
          {renderSearch()}
          {renderFilter()}
          {renderTable()}
        </Paper>
      </MuiThemeProvider>
      {renderDial()}
    </>
  );
};

export default Table;
