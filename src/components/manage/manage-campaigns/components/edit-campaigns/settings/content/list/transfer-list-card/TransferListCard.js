/* eslint-disable */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Slide
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { CustomCard } from "common-components";
import CHeader from "./CHeader/CHeader";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1rem",
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  },
  table: {
    backgroundColor: "#FFF"
  },
  row: {
    height: 50,
    "&:nth-of-type(even)": {
      backgroundColor: "#f8f9fa"
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFF"
    }
  },
  cell: {
    borderBottom: "none"
  }
}));
function TransferListCard(props) {
  const [selectedData, setSelectedData] = useState([]);
  const [choices, setChoices] = useState([]);
  const [choicesData, setChoicesData] = useState([]);

  const { list, mockData, SelectedDataFunc } = props;
  const classes = useStyles();

  useEffect(() => {
    setChoices(mockData);
    setChoicesData(mockData);
  }, []);

  const selectAllFunc = () => {
    setSelectedData(choicesData);
    SelectedDataFunc(choicesData, list);
  };

  const SelectData = data => {
    let arrCamp = [...selectedData];
    if (selectedData.length === 0) {
      arrCamp.push(data);
    } else {
      if (
        selectedData.filter(select => select.name === data.name).length === 0
      ) {
        arrCamp.push(data);
      }
    }

    setSelectedData(arrCamp);
    SelectedDataFunc(arrCamp, list);
  };

  const RemoveSelected = data => {
    let arrCamp = [];
    arrCamp = selectedData.filter(arr => arr !== data);

    setSelectedData(arrCamp);
  };

  const classicSearch = result => {
    if (result) {
      if (result.length !== 0) {
        setChoices(result);
      } else {
        setChoices(choicesData);
      }
    } else {
      setChoices(choicesData);
    }
  };

  return (
    <div>
      {choices.length !== 0 ? (
        <div>
          <Typography style={{ marginBottom: 20, marginTop: 20 }}>
            {list.title}
          </Typography>
          <Grid container>
            <Grid item xs={6} style={{ marginBottom: 20 }}>
              <CustomCard>
                <div style={{ height: 350, overflow: "hidden" }}>
                  <CHeader title={`${selectedData.length} items selected`} />
                  <div
                    style={{
                      height: 300,
                      backgroundColor: "#fafafa",

                      borderTop: 0,
                      maxHeight: 300,
                      overflow: "auto"
                    }}
                  >
                    <Table className={classes.table}>
                      <TableBody>
                        {selectedData.length !== 0 &&
                          selectedData.map((campaign, i) => (
                            <Slide
                              key={i}
                              direction="left"
                              in={true}
                              mountOnEnter
                              unmountOnExit
                            >
                              <TableRow key={i} className={classes.row}>
                                <TableCell className={classes.cell}>
                                  {campaign.name}
                                </TableCell>
                                <TableCell
                                  className={classes.cell}
                                  align="right"
                                >
                                  <div
                                    style={{
                                      cursor: "pointer",
                                      display: "flex",
                                      justifyContent: "flex-end"
                                    }}
                                    onClick={() => RemoveSelected(campaign)}
                                  >
                                    <CloseIcon
                                      style={{
                                        width: 20,
                                        height: 20
                                      }}
                                    />
                                    Remove
                                  </div>
                                </TableCell>
                              </TableRow>
                            </Slide>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CustomCard>
            </Grid>
            <Grid item xs={6}>
              <CustomCard>
                <div style={{ height: 350, overflow: "hidden" }}>
                  <CHeader
                    title={`${list.title} list`}
                    searchData={choices}
                    searchFor={`${list.title}`}
                    selectAllFunc={selectAllFunc}
                    searchHeaders={["name"]}
                    classicSearch={classicSearch}
                  />
                  <div
                    style={{
                      height: 300,
                      backgroundColor: "#fafafa",

                      borderTop: 0,
                      maxHeight: 300,
                      overflow: "auto"
                    }}
                  >
                    <Table className={classes.table}>
                      <TableBody>
                        {choices.map((data, i) => (
                          <TableRow className={classes.row} key={i}>
                            <TableCell className={classes.cell}>
                              {data.name}
                            </TableCell>
                            <TableCell className={classes.cell}>
                              <div
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                                onClick={() => SelectData(data)}
                              >
                                <AddIcon style={{ width: 20, height: 20 }} />
                                Add
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CustomCard>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

export default TransferListCard;
