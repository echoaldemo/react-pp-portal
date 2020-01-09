import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Button from "@material-ui/core/Button";
//Tables
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import useStyles from "./CardStyle.js";
interface Props {
  queue: any;
  remove: any;
  cancelQueue: any;
  addToTeam: any;
}
const UserCard: React.FC<Props> = ({
  queue,
  remove,
  cancelQueue,
  addToTeam
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        classes={{ title: classes.cardTitle }}
        title={`User queue`}
        action={
          <div style={{ marginTop: 7 }}>
            <Button
              disabled={queue.length === 0 ? true : false}
              onClick={cancelQueue}
            >
              Cancel
            </Button>
            <Button
              disabled={queue.length === 0 ? true : false}
              onClick={addToTeam}
            >
              Add
            </Button>
          </div>
        }
      />
      <CardContent style={{ padding: 0 }}>
        {queue.length > 0 ? (
          <div className={classes.scroll}>
            <Table stickyHeader={true}>
              <TableBody>
                {queue.map((user: any, i: number) => (
                  <TableRow
                    onClick={() => remove(i)}
                    key={i}
                    style={
                      i % 2
                        ? { background: "#f1f1f1" }
                        : { background: "white" }
                    }
                  >
                    <TableCell
                      style={{ cursor: "pointer" }}
                      align="left"
                      className={classes.name}
                    >
                      {`${user.username} | ${user.first_name} ${user.last_name}`}
                    </TableCell>
                    <TableCell align="right" className={classes.removeIcon}>
                      <RemoveCircle style={{ color: "red" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Grid container>
            <Grid item sm={12} xs={12} className={classes.noAudioCon}>
              <Typography className={classes.noAudioText} gutterBottom>
                Search and select users to add
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
