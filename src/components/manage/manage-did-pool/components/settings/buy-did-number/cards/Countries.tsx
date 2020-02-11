/* eslint-disable */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";

//Tables
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import styles from "./CardStyle";
import { Add } from "@material-ui/icons";
import styled from "styled-components";

const AddAll = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  color: #1194f6;
  font-size: 16px;
  background: white;
`;

interface Props {
  classes: any;
  countries: Array<string>;
  handleSelect: any;
  handleSelectAll: any;
}

interface State {
  search: string;
  showSearch: boolean;
}

class Countries extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      search: "",
      showSearch: false
    };
  }
  render() {
    const { classes, countries, handleSelect, handleSelectAll } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          classes={{ title: classes.cardTitle }}
          title={`Add items`}
          action={
            <div>
              <AddAll onClick={handleSelectAll}>Add All</AddAll>
              <IconButton
                aria-label="settings"
                onClick={() =>
                  this.setState({ showSearch: !this.state.showSearch })
                }
              >
                <SearchIcon
                  style={
                    this.state.showSearch
                      ? { color: "#1194f6" }
                      : { color: "#444851" }
                  }
                />
              </IconButton>
            </div>
          }
        />
        <CardContent style={{ padding: 0, maxHeight: 300 }}>
          {/* WITH DATA START */}
          <div
            style={{
              display: "flex",
              paddingLeft: "6%",
              background: "#fafafa"
            }}
            className={
              this.state.showSearch
                ? classes.showSearchDiv
                : classes.showSearchDivHidden
            }
          >
            <TextField
              margin="normal"
              placeholder="Search"
              className={classes.textField}
              InputProps={{ classes: { underline: classes.inputUnderline } }}
              onChange={e => this.setState({ search: e.target.value })}
              value={this.state.search}
            />
            <div style={{ marginTop: 23, paddingRight: 12 }}>
              <Link
                className={classes.cancel}
                onClick={() => this.setState({ search: "" })}
              >
                Cancel
              </Link>
            </div>
          </div>
          <Divider />
          <div className={classes.scroll}>
            <Table stickyHeader={true}>
              <TableBody>
                {countries.map((country: any, i: number) => {
                  if (this.state.search !== "") {
                    if (
                      country
                        .toLowerCase()
                        .includes(this.state.search.toLowerCase())
                    ) {
                      return (
                        <TableRow
                          key={i}
                          style={
                            (i + 1) % 2 === 0
                              ? {
                                  backgroundColor: "#fafafa"
                                }
                              : {
                                  backgroundColor: "#ffffff"
                                }
                          }
                        >
                          <TableCell align="left" className={classes.name}>
                            {country}
                          </TableCell>

                          <TableCell
                            align="right"
                            className={classes.name}
                            style={{ padding: "0px 21px" }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 30px",
                                alignItems: "center",
                                justifyItems: "flex-end"
                              }}
                            >
                              <Add
                                style={{ fontSize: 18, cursor: "pointer" }}
                              />{" "}
                              <span
                                onClick={() => handleSelect(country)}
                                style={{ cursor: "pointer" }}
                              >
                                Add
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  } else {
                    return (
                      <TableRow
                        key={i}
                        style={
                          (i + 1) % 2 === 0
                            ? {
                                backgroundColor: "#fafafa"
                              }
                            : {
                                backgroundColor: "#ffffff"
                              }
                        }
                      >
                        <TableCell align="left" className={classes.name}>
                          {country}
                        </TableCell>

                        <TableCell
                          align="right"
                          className={classes.name}
                          style={{ padding: "0px 21px" }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 30px",
                              alignItems: "center",
                              justifyItems: "flex-end"
                            }}
                          >
                            <Add style={{ fontSize: 18, cursor: "pointer" }} />{" "}
                            <span
                              onClick={() => handleSelect(country)}
                              style={{ cursor: "pointer" }}
                            >
                              Add
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Countries);
