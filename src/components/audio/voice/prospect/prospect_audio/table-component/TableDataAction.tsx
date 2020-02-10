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

const useStyles = {
  resIcon: {
    "@media (max-width: 425px)": {
      fontSize: 18
    }
  }
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props: any) => (
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
interface IProps {
  uuid?: any;
  selecteInddex?: any;
  dialog?: any;
  detectMic?: any;
  version?: any;
  voice?: any;
  audio_key?: any;
  rerecordAudioOpen?: any;
  handleClose?: any;
  anchorEl?: any;
  row?: any;
  handleClickRecord?: any;
  handleCloseDialog?: any;
  handleClickOpenDialog?: any;
  open?: any;
  undoPitchAudio?: any;
  openAddNewVoiceModal?: any;
  hasMic?: any;
  handleBackButton?: any;
  setAudioDetails?: any;
  handleClickWithName?: any;
  index?: any;
  selectedIndex?: any;
  name?: any;
  tblName?: any;
  recordAudioDialog?: any;
  handleClick?: any;
  undoAudioOpen?: any;
  deleteAudioOpen?: any;
  setRecordedName?: any;
  uploadLoading?: any;
  rerecordAudio?: any;
}
class TableDataCell extends React.Component<IProps, {}> {
  render() {
    const { classes }: any = this.props;
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
                    this.props.uuid,
                    this.props.selecteInddex
                  );
                  this.props.setAudioDetails(
                    this.props.name,
                    this.props.dialog,
                    this.props.uuid
                  );

                  this.props.handleBackButton(this.props.selectedIndex);
                  this.props.detectMic();
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
                  this.props.openAddNewVoiceModal(null, "UnrecTable");
                  this.props.handleClose();
                }}
              >
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText primary="Upload / Record Audio" />
              </StyledMenuItem>
              {/* <StyledMenuItem onClick={this.props.recordAudioDialog}>
                <ListItemIcon>
                  <MicIcon />
                </ListItemIcon>
                <ListItemText primary="Record Audio" />
              </StyledMenuItem> */}
            </StyledMenu>
          </React.Fragment>
        ) : this.props.tblName === "Rerecord" ? (
          <div>
            <Tooltip title="More actions" placement="right">
              <IconButton
                onClick={e => {
                  this.props.handleClickRecord(
                    e,
                    this.props.name,
                    this.props.row
                  );
                  this.props.handleClickWithName(
                    e,
                    this.props.name,
                    this.props.uuid,
                    this.props.selectedIndex
                  );
                  this.props.setAudioDetails(
                    this.props.name,
                    this.props.dialog,
                    this.props.uuid
                  );

                  this.props.handleBackButton(this.props.selectedIndex);
                  this.props.detectMic();
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
                  this.props.openAddNewVoiceModal(null, "RerecTable");
                  this.props.handleClose();
                }}
              >
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText primary="Reupload Audio" />
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  this.props.undoAudioOpen();
                  this.props.handleClose();
                }}
                data-testid={"undo"}
              >
                <ListItemIcon>
                  <UndoIcon className={classes.resIcon} />
                </ListItemIcon>
                <ListItemText primary="Undo" />
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
                    this.props.name,
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
                onClick={() => this.props.rerecordAudioOpen()}
                data-testid={"rerecord"}
              >
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText primary="Rerecord Audio" />
              </StyledMenuItem>
              {/* <StyledMenuItem onClick={this.props.deleteAudioOpen}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Audio" data-testid={"delete"} />
              </StyledMenuItem> */}
            </StyledMenu>
          </React.Fragment>
        )}
      </TableCell>
    );
  }
}

export default withStyles(useStyles)(TableDataCell);
