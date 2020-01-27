import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Settings from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Tooltip from "@material-ui/core/Tooltip";
import UndoIcon from "@material-ui/icons/Undo";
import EditDialog from "../dialog/edit";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: "#f4a429",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const useStyles = theme => ({
  resIcon: {
    "@media (max-width: 425px)": {
      fontSize: 18
    }
  },
  resTextMenu: {
    "@media (max-width: 425px)": {
      fontSize: 13
    }
  }
});

class TableDataCell extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <TableCell align="center">
        {this.props.tblName === "Unrecorded" ? (
          <React.Fragment>
            <Tooltip title="More actions" placement="right">
              <IconButton
                onClick={event => {
                  this.props.handleClickWithName(
                    event,
                    this.props.name,
                    this.props.row.key,
                    this.props.selectedIndex
                  );
                  this.props.setAudioDetails(
                    this.props.row.name,
                    this.props.row.text
                  );
                  this.props.handleBackButton(this.props.selectedIndex);
                  this.props.hasMic();
                }}
              >
                <Settings className={classes.resIcon} />
              </IconButton>
            </Tooltip>
            <StyledMenu
              id="customized-menu"
              anchorEl={this.props.anchorEl}
              keepMounted
              open={Boolean(this.props.anchorEl)}
              onClose={this.props.handleClose}
            >
              <StyledMenuItem
                onClick={() => {
                  this.props.hasMic();
                  this.props.openAddNewVoiceModal();
                  this.props.handleClose();
                }}
              >
                <ListItemIcon>
                  <CloudUpload className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.resTextMenu}
                  primary="Upload / Record Audio"
                />
              </StyledMenuItem>
              {/* <StyledMenuItem onClick={this.props.recordAudioDialog}>
                <ListItemIcon>
                  <MicIcon className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.resTextMenu}
                  primary="Record Audio"
                />
              </StyledMenuItem> */}
            </StyledMenu>
          </React.Fragment>
        ) : this.props.tblName === "Rerecord" ? (
          <div>
            <Tooltip title="More actions" placement="right">
              <IconButton
                onClick={event => {
                  this.props.handleClickWithName(
                    event,
                    this.props.name,
                    this.props.row.key,
                    this.props.selectedIndex
                  );
                  this.props.setAudioDetails(
                    this.props.row.name,
                    this.props.row.text
                  );
                  this.props.handleBackButton(this.props.index);
                  this.props.hasMic();
                }}
              >
                <Settings className={classes.resIcon} />
              </IconButton>
            </Tooltip>
            <StyledMenu
              id="customized-menu"
              anchorEl={this.props.anchorEl}
              keepMounted
              open={Boolean(this.props.anchorEl)}
              onClose={this.props.handleClose}
            >
              <StyledMenuItem
                onClick={() => {
                  this.props.openAddNewVoiceModal();
                  this.props.handleClose();
                }}
              >
                <ListItemIcon>
                  <CloudUpload className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.resTextMenu}
                  primary="Reupload Audio"
                />
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  this.props.undoPitchAudio(
                    this.props.version,
                    this.props.voice,
                    this.props.audio_key
                  );
                  this.props.handleClose();
                }}
                data-testid={"undo"}
              >
                <ListItemIcon>
                  <UndoIcon className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText className={classes.resTextMenu} primary="Undo" />
              </StyledMenuItem>
            </StyledMenu>
            <EditDialog
              open={this.props.open}
              handleClickOpenDialog={this.props.handleClickOpenDialog}
              handleCloseDialog={this.props.handleCloseDialog}
            />
          </div>
        ) : (
          <React.Fragment>
            <Tooltip title="More actions" placement="right">
              <IconButton
                onClick={e =>
                  this.props.handleClickRecord(
                    e,
                    this.props.row.name,
                    this.props.row
                  )
                }
              >
                <Settings className={classes.resIcon} />
              </IconButton>
            </Tooltip>
            <StyledMenu
              id="customized-menu"
              anchorEl={this.props.anchorEl}
              keepMounted
              open={Boolean(this.props.anchorEl)}
              onClose={this.props.handleClose}
            >
              <StyledMenuItem
                onClick={this.props.rerecordAudioOpen}
                data-testid={"rerecord"}
              >
                <ListItemIcon>
                  <CloudUpload className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.resTextMenu}
                  primary="Rerecord Audio"
                />
              </StyledMenuItem>
              {/* <StyledMenuItem onClick={this.props.deleteAudioOpen}>
                <ListItemIcon>
                  <DeleteIcon className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.resTextMenu}
                  primary="Delete Audio"
                  data-testid={"delete"}
                />
              </StyledMenuItem> */}
            </StyledMenu>
          </React.Fragment>
        )}
      </TableCell>
    );
  }
}

export default withStyles(useStyles)(TableDataCell);
