import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/GroupAdd";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
//Tables
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import styles from "./CardStyle.js";

class UserCard extends Component {
  render() {
    const {
      classes,
      members,
      addToRemove,
      removeQueue,
      removeMembers
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          classes={{
            avatar: classes.avatar,
            title: classes.cardTitle,
            action: classes.action
          }}
          avatar={`Team members`}
          action={
            <div style={{ marginTop: '-6px' }}>
              <Button
                disabled={removeQueue.length === 0 ? true : false}
                onClick={removeMembers}
              >
                Remove
              </Button>
            </div>
          }
        />
        <CardContent style={{ padding: 0 }}>
          {members.length > 0
            ? <div className={classes.scroll}>
              <Table stickyHeader={true}>
                <TableBody>
                  {members.map((user, i) => (
                    <TableRow
                      onClick={() => addToRemove(user.uuid)}
                      key={i}
                      style={
                        i % 2
                          ? { background: "#f1f1f1", cursor: 'pointer' }
                          : { background: "white", cursor: 'pointer' }
                      }
                    >
                      <TableCell align="left" className={classes.name}>
                        {`${user.username} | ${user.first_name} ${user.last_name}`}
                      </TableCell>
                      {removeQueue.indexOf(user.uuid) !== -1
                        ? <TableCell align="right" className={classes.removeIcon}>
                          <RemoveCircle style={{ color: 'red' }} />
                        </TableCell>
                        : <TableCell align="right" className={classes.removeIcon}>
                          <RemoveCircle style={{ display: 'none' }} />
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            : <Grid container>
              <Grid item sm={12} xs={12} className={classes.noAudioCon}>
                <Typography className={classes.noAudioText} gutterBottom>
                  No team members
              </Typography>
              </Grid>
            </Grid>
          }
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(UserCard);
