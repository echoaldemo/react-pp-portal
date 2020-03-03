import React, { useContext } from "react";
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
import Group from "@material-ui/icons/Group";
import useStyles from "./CardStyle.js";
import { store } from "contexts/ManageComponent";

interface Props {
  userList: any;
  addToQueue: any;
  members: any;
}
interface State {
  search: string;
  showSearch: boolean;
}

const UserCard: React.FC<Props> = ({ userList, addToQueue, members }) => {
  const [states, setState] = React.useState({ search: "", showSearch: false });
  const { state } = useContext(store);
  const classes = useStyles();
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
              setState({ ...states, showSearch: !states.showSearch })
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
            onChange={e => setState({ ...states, search: e.target.value })}
            value={states.search}
          />
          <div style={{ marginTop: "21px" }}>
            <Link
              className={classes.cancel}
              onClick={() => setState({ ...states, search: "" })}
            >
              Cancel
            </Link>
          </div>
        </div>
        {states.search !== "" ? (
          <div className={classes.scroll}>
            <Table stickyHeader={true}>
              <TableBody>
                {state.users.map((user: any, i: number) => {
                  if (
                    user.username
                      .toLowerCase()
                      .includes(states.search.toLowerCase()) ||
                    user.first_name
                      .toLowerCase()
                      .includes(states.search.toLowerCase()) ||
                    user.last_name
                      .toLowerCase()
                      .includes(states.search.toLowerCase())
                  ) {
                    return (
                      <>
                        <span>{user.name}</span>
                        <TableRow
                          onClick={() => addToQueue(user)}
                          key={i}
                          style={
                            members.some((u: any) => u.uuid === user.uuid)
                              ? { cursor: "default" }
                              : { cursor: "pointer" }
                          }
                        >
                          <TableCell align="left" className={classes.name}>
                            {`${user.username} | ${user.first_name} ${user.last_name}`}
                          </TableCell>

                          <TableCell
                            align="right"
                            className={classes.name}
                            style={{ padding: "0px 21px" }}
                          >
                            <Group
                              style={
                                members.some((u: any) => u.uuid === user.uuid)
                                  ? { display: "inline-block" }
                                  : { display: "none" }
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          /* NO AUDIO START */
          <Grid container>
            <Grid item sm={12} xs={12} className={classes.noAudioCon}>
              <Typography className={classes.noAudioText} gutterBottom>
                Search for a user to add
              </Typography>
            </Grid>
          </Grid>
        )}
        {/* NO AUDIO END */}
      </CardContent>
    </Card>
  );
};

export default UserCard;
