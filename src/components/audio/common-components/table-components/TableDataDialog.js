import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";

const useStyles = theme => ({
  enpopover: {
    display: "none",
    "@media (max-width: 425px)": {
      display: "block"
    }
  },
  typography: {
    padding: theme.spacing(2),
    fontSize: 14
  },
  resFont: {
    "@media (max-width: 425px)": {
      textOverflow: "ellipsis",
      fontSize: 14,
      whiteSpace: "nowrap",
      width: "100px",
      overflow: "hidden"
    }
  }
});

class TableDataCell extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {/* <p aria-describedby={id} variant="contained" onClick={this.handleClick}>
          Open Popover
        </p> */}
        <TableCell align="center">
          {" "}
          <p
            aria-describedby={id}
            onClick={this.handleClick}
            className={classes.resFont}
          >
            {this.props.dialog}
          </p>
        </TableCell>

        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          className={classes.enpopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Typography className={classes.typography}>
            {this.props.dialog}
          </Typography>
        </Popover>
      </React.Fragment>
      // <TableCell align="center">  {this.props.dialog}  </TableCell>
    );
  }
}

export default withStyles(useStyles)(TableDataCell);
