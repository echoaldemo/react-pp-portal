import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Typography, Grid } from "@material-ui/core";

//Tables
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Group from "@material-ui/icons/Group"
import styles from "./CardStyle.js";

class UserCard extends Component {
  constructor() {
    super();

    this.state = {
      search: "",
      showSearch: false
    };
  }
  render() {
    const {
      classes,
      userList,
      addToQueue,
      members
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          classes={{ title: classes.cardTitle }}
          title={`Search for a user`}
          action={
            <IconButton
              aria-label="settings"
              onClick={() =>
                this.setState({ showSearch: !this.state.showSearch })
              }
            >
              <SearchIcon />
            </IconButton>
          }
        />
        <CardContent style={{ padding: 0 }}>
          {/* WITH DATA START */}
          <div
            style={{ display: "flex", paddingLeft: "3%" }}
            className={classes.showSearchDiv}
          >
            <TextField
              margin="normal"
              placeholder="Search by first name, last name and username"
              className={classes.textField}
              InputProps={{ classes: { underline: classes.inputUnderline } }}
              onChange={e => this.setState({ search: e.target.value })}
              value={this.state.search}
            />
            <div style={{ marginTop: "21px" }}>
              <Link
                className={classes.cancel}
                onClick={() => this.setState({ search: "" })}
              >
                Cancel
              </Link>
            </div>
          </div>
          {this.state.search !== ""
            ? <div className={classes.scroll}>
              <Table stickyHeader={true}>
                <TableBody>
                  {userList.map((user, i) => {
                    if (this.state.search !== "") {
                      if (
                        user.username
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase()) ||
                        user.first_name
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase()) ||
                        user.last_name
                          .toLowerCase()
                          .includes(this.state.search.toLowerCase())
                      ) {
                        return (
                          <TableRow
                            onClick={() => addToQueue(user)}
                            key={i}
                            style={
                              members.some(u => u.uuid === user.uuid) ? { cursor: 'default' } : { cursor: 'pointer' }
                            }
                          >
                            <TableCell
                              align="left"
                              className={classes.name}
                            >
                              {`${user.username} | ${user.first_name} ${user.last_name}`}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.name}
                              style={{ padding: '0px 21px' }}
                            >
                              <Group style={members.some(u => u.uuid === user.uuid) ? { display: 'inline-block' } : { display: 'none' }} />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    }
                  })}
                </TableBody>
              </Table>
            </div>
            :
            /* NO AUDIO START */
            <Grid container>
              <Grid item sm={12} xs={12} className={classes.noAudioCon}>
                <Typography className={classes.noAudioText} gutterBottom>
                  Search for a user to add
              </Typography>
              </Grid>
            </Grid>
          }
          {/* NO AUDIO END */}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(UserCard);
