import React, { Component } from "react";
import {
  Button,
  Card,
  Collapse,
  Dialog,
  Divider,
  Grid,
  Paper,
  Popover,
  TableCell,
  TableRow,
  Tooltip,
  withStyles
} from "@material-ui/core";
import {
  Delete,
  Edit,
  FileCopyOutlined as Icon,
  GroupOutlined,
  Settings
} from "@material-ui/icons";
import { mdiContentCopy } from "@mdi/js";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import from actions
/* import {
  createAudioResource,
  deleteAudioResource,
  getAudioResources,
  updateAudioResource
} from '../../../../actions/AudioResource' */
/* import { cancel } from '../../../../utils/api' */
import {
  AsyncTable,
  CustomButton,
  DeleteModal,
  InputField,
  HeaderButton,
  Modal,
  Pagination,
  UnderlineCell,
  SearchBar,
  SuccessModal,
  LoadingModal,
  TableLoader,
  TableNoResult
} from "common-components";

import AudioPlayer from "./player";
import Upload from "./upload";

//mock
import { mock } from "./mock";

// local styles
// #endregion
//#region styles
const styles = {
  headerBtn: { width: "fit-content" },
  headerLink: { width: "fit-content", marginTop: "1rem", marginBottom: "2rem" },
  tableBody: { width: "100%", height: "fit-content", minHeight: "447px" },
  searchContainer: { height: "77px" },
  uploadBtn: {
    width: "fit-content",
    backgroundColor: "slategray",
    margin: 0,
    padding: 5,
    border: "none",
    borderRadius: 0,
    color: "white",
    fontWeight: "bold"
  },
  editBtn: {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#777777",
    backgroundColor: "transparent"
  },
  editText: {
    margin: 0,
    padding: 0,
    padding: 0,
    textTransform: "capitalize !important"
  },
  popMenu: {
    width: "200px",
    height: "fit-content"
  },
  popBtn: {
    color: "#777777",
    fontSize: "15px",
    width: "100%",
    padding: "10px"
  },
  pop: {
    fontSize: 20,
    color: "#777777"
  },
  popper: {
    marginTop: "-5rem",
    marginLeft: "20rem"
  },
  spaced: {
    margin: "1rem",
    width: "inherit"
  },
  modalBtn: {
    width: "90%",
    backgroundColor: "#b6d36b",
    color: "white",
    fontWeight: "bolder",
    marginTop: "1rem"
  },
  error: {
    color: "red"
  },
  deleteBtn: {
    backgroundColor: "crimson",
    color: "white",
    width: "90%"
  },
  popStyle: {
    display: "flex",
    flexDirection: "column",
    width: 200
  },
  // Css
  btnPop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    border: 0,
    padding: 15,
    paddingLeft: 15
  },
  btnText: {
    fontSize: 15,
    color: "#777"
  }
};

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);
//#endregion
class AudioResources extends Component {
  // #region constructor
  constructor(props) {
    super(props);
    this.originalState = {
      popup: false,
      anchorRef: null,
      openEdit: false,
      openDelete: false,
      original_resource: [],
      resource: [],
      activeCell: [],
      status: "delete",
      save: "edit",
      create: "create",
      createModal: false,
      error: { status: false, message: "" },
      loading: false,
      uploadModal: false,
      company: this.props.company,

      // edit audio

      name: "",
      nameType: "",
      nameError: false,
      searching: false,
      copy: false,
      updated: false,

      ancholEl: null,
      popoverOpen: false
    };
    this.state = this.originalState;
  }

  // #endregion
  //#region component mount
  async componentDidMount() {
    await this.getData();
  }
  // #endregion
  //#region getData
  getData = async () => {
    this.setState({ loading: true });
    let { company_slug } = this.getSlugs();
    /* let data = await getAudioResources({ company_slug })
    this.setState({
      resource: data,
      original_resource: data,
      loading: false
    }) */
    /*start mock */
    setTimeout(() => {
      this.setState({
        resource: mock,
        original_resource: mock,
        loading: false
      });
    }, 1000);
    /* end mock */
  };
  // #endregion
  // #region getSlugs
  getSlugs = () => {
    let company_slug = localStorage.getItem("companyslug");
    return { company_slug };
  };
  // #endregion
  //#region delete
  delete = async () => {
    this.setState({
      status: "deleting"
    });
    let { company_slug } = this.getSlugs();
    let {
      activeCell: { uuid }
    } = this.state;
    /* let status = await deleteAudioResource({ slug: company_slug, uuid })
    if (status < 300) {
      this.setState({ status: 'deleted', updated: true })
    } else {
      this.setState({
        status: 'delete',
        error: { status: true, message: 'Audio resource deletion failed!' }
      })
    } */
  };
  // #endregion
  //#region save
  save = async () => {
    this.setState({
      save: "editting"
    });
    let {
      name,
      activeCell: { uuid }
    } = this.state;
    let { company_slug } = this.getSlugs();
    /* let status = await updateAudioResource({ name, slug: company_slug, uuid })
    if (status.status < 300) {
      await this.getData()
      this.setState({ save: 'edited', activeCell: status.data, updated: true })
    } else {
      this.setState({
        create: 'create',
        error: { status: true, message: 'Audio resource update failed!' }
      })
    } */
  };
  //#endregion
  //#region create
  create = async () => {
    this.setState({
      create: "creating"
    });
    let { company_slug } = this.getSlugs();
    let { name } = this.state;
    /* let status = await createAudioResource({ name, slug: company_slug })
    if (status.status < 300) {
      this.setState({
        create: 'created',
        activeCell: status.data,
        updated: true
      })

      await this.getData()
    } else {
      this.setState({
        create: 'create',
        error: { status: true, message: 'Audio resource creation failed!' }
      })
    } */
  };
  // #endregion
  //#region filtered data
  filteredData = data => {
    console.log(data);
    this.setState({
      resource: data
    });
  };
  //#endregion
  // #region openUpload
  upload = () => {
    this.setState({ uploadModal: true });
  };
  //#endregion
  // #region typed ? probably not used
  typed = val => {
    this.setState({
      searching: val.length > 0 ? true : false
    });
  };
  // #endregion
  resetError = () => this.setState({ error: this.originalState.error });
  closeEditModal = async () => {
    /* this.setState(this.originalState); */
    this.setState({
      uploadModal: false,
      createModal: false,
      create: "create",
      openEdit: false,
      save: "edit",
      openDelete: false
    });
    await this.getData();
    if (this.state.updated) {
    }
  };
  // closeDeleteModal = async () => {
  //   this.setState(this.originalState);
  //   await this.getData();
  // };
  // closeCreateModal = async () => {
  //   this.setState(this.originalState);
  //   await this.getData();
  // };
  // closeUploadModal = async () => {
  //   this.setState(this.originalState);
  //   await this.getData();
  // };
  openPopOver = (e, audi) => {
    this.setState({
      popoverOpen: true,
      ancholEl: e.currentTarget,
      activeCell: audi,
      name: audi.name
    });
  };
  closePopOver = () => {
    this.setState({ popoverOpen: false });
  };
  // #region table data
  tableData = (data, classes) => (
    <>
      {/* PopComponent */}
      <Popover
        open={this.state.popoverOpen}
        anchorEl={this.state.ancholEl}
        transition
        onClose={() => {
          this.closePopOver();
        }}
        PaperProps={{
          square: true
        }}
      >
        <Paper className={classes.popStyle}>
          <div>
            <button
              onClick={() =>
                this.setState({
                  openEdit: true,
                  popoverOpen: false
                })
              }
              className={classes.btnPop}
            >
              <Settings className={classes.pop} />
              &emsp;
              <span className={classes.btnText}>Modify</span>
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                this.setState({
                  openDelete: true,
                  popoverOpen: false
                })
              }
              className={classes.btnPop}
            >
              <Delete className={classes.pop} />
              &emsp;
              <span className={classes.btnText}>Delete</span>
            </button>
          </div>
        </Paper>
      </Popover>
      <AsyncTable
        headers={["Name", "Slug", "UUID", "File", ""]}
        tableData={this.state.resource}
        render={(audio, { row, cell, uuid, icon }) => {
          return audio.map(audi => {
            return (
              <>
                <TableRow className={row} key={audi.uuid}>
                  <UnderlineCell className={cell}>{audi.name}</UnderlineCell>

                  <TableCell className={cell}>{audi.slug}</TableCell>

                  <TableCell className={uuid}>
                    <p>{audi.uuid}</p>

                    <CopyToClipboard
                      text={audi.uuid}
                      onCopy={() => this.setState({ copy: true })}
                      onPointerLeave={() => this.setState({ copy: true })}
                    >
                      {this.state.copy ? (
                        <LightTooltip title="UUID Copied!" placement="top">
                          <Icon
                            path={mdiContentCopy}
                            className={icon}
                            size={1}
                            rotate={360}
                          />
                        </LightTooltip>
                      ) : (
                        <LightTooltip title="Copy UUID" placement="top">
                          <Icon
                            path={mdiContentCopy}
                            className={icon}
                            size={1}
                            rotate={360}
                          />
                        </LightTooltip>
                      )}
                    </CopyToClipboard>
                  </TableCell>

                  <TableCell className={cell}>
                    {/* <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start"
                      }}
                    >
                      <audio controls style={{ marginRight: "5px" }}>
                        <source
                          src={audi.file ? audi.file.original_url : ""}
                          type="audio/ogg"
                        />
                      </audio>
                      <Button
                        disableRipple
                        style={{ backgroundColor: "transparent" }}
                        onClick={() =>
                          this.setState({
                            activeCell: audi,
                            name: audi.name,
                            uploadModal: true
                          })
                        }
                      >
                        <CloudUpload />
                      </Button>
                    </div> */}

                    <div
                      style={{
                        color: "#777777",
                        width: "fit-content",
                        height: "100%",
                        whiteSpace: "nowrap",
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "-20px"
                      }}
                    >
                      <AudioPlayer
                        uploadModal={this.uploadModalSet}
                        data={audi}
                        name={audi.name}
                        src={audi.file ? audi.file.original_url : ""}
                      />
                    </div>
                  </TableCell>
                  {/* New edit-popup */}
                  <TableCell className={cell}>
                    <Button
                      disableRipple
                      onClick={e => {
                        this.openPopOver(e, audi);
                      }}
                      className={classes.editBtn}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Edit
                        style={{
                          fontSize: "12px",
                          marginRight: "10px"
                        }}
                      />
                      <p className={classes.editText}>Edit</p>
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            );
          });
        }}
      />
    </>
  );
  // #endregion
  editCancelled = () => {
    this.setState({ save: "edit" });
  };

  deleteCancelled = () => {
    this.setState({ status: "delete" });
    /* cancel() */
  };

  createCancelled = () => {
    this.setState({
      create: "create"
    });
  };

  cancelUpload = () => {
    /* cancel() */
  };

  createAfterDelete = () => {
    this.setState({
      openDelete: false,
      status: "delete",
      createModal: true
    });
  };

  uploadModal = () => {
    this.setState({ uploadModal: true });
  };

  uploadModalSet = (data, name) => {
    this.setState(
      () => {
        return {
          activeCell: data,
          name
        };
      },
      () => {
        this.setState({
          uploadModal: true
        });
      }
    );
  };

  paginate = (from, to) => {
    this.setState({
      resource: this.state.original_resource.slice(from, to)
    });
  };

  render() {
    console.log(this.state);
    const { classes } = this.props;
    const { company_slug } = this.getSlugs();
    let {
      activeCell: { uuid }
    } = this.state;
    return (
      <Grid direction="column">
        <Upload
          payload={{ slug: company_slug, uuid }}
          title={this.state.name}
          open={this.state.uploadModal}
          cancelUpload={this.cancelUpload}
          onClose={this.closeEditModal}
        />

        <Modal
          title="New Audio Resource"
          open={this.state.createModal}
          onClose={this.closeEditModal}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ width: "inherit" }}
          >
            <SuccessModal
              open={this.state.create === "created"}
              text={`You have added ${this.state.name} under audio resource.`}
              btnText={"UPLOAD AUDIO"}
              closeFn={this.closeEditModal}
              btnFn={this.uploadModal}
            />

            {(this.state.create === "create" ||
              this.state.create === "creating") && (
              <>
                <Grid
                  item
                  style={{
                    width: "90%",
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "2rem 0"
                  }}
                >
                  <InputField
                    label="Audio name"
                    onInput={e => this.setState({ name: e.target.value })}
                    onBlur={e =>
                      this.setState({
                        nameError: e.target.value.length > 0 ? false : true
                      })
                    }
                    value={this.state.name}
                    error={this.state.nameError}
                    helperText={
                      this.state.nameError ? "Audio name is required." : " "
                    }
                    fullWidth
                    required
                  />
                </Grid>

                {this.state.create === "creating" && (
                  <Dialog open={true}>
                    <LoadingModal
                      text={"One moment. We're creating the audio resource."}
                      cancelFn={this.createCancelled}
                    />
                  </Dialog>
                )}

                <Grid
                  item
                  style={{
                    width: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <CustomButton
                    onClick={() => this.create()}
                    disabled={
                      !this.state.name.length > 0 ||
                      this.state.create === "creating"
                    }
                  >
                    CREATE
                  </CustomButton>
                </Grid>
              </>
            )}
          </Grid>
        </Modal>

        {/* EDIT */}

        <Modal
          open={this.state.openEdit}
          title="Edit Audio Resource"
          onClose={this.closeEditModal}
        >
          <Grid direction="column" container className={classes.spaced}>
            <Grid item style={{ width: "inherit" }}>
              {this.state.save === "edited" && (
                <>
                  <Dialog open={true}>
                    <SuccessModal
                      text={`You have updated ${this.state.name} under audio resource.`}
                      btnText={"UPLOAD AUDIO"}
                      closeFn={this.closeEditModal}
                      btnFn={this.uploadModal}
                    />
                  </Dialog>
                </>
              )}

              {this.state.save !== "edited" && (
                <>
                  <InputField
                    label="Audio name"
                    onInput={e => this.setState({ name: e.target.value })}
                    onBlur={e =>
                      this.setState({
                        nameError: e.target.value.length > 0 ? false : true
                      })
                    }
                    value={this.state.name}
                    error={this.state.nameError}
                    helperText={
                      this.state.nameError ? "Audio name is required." : " "
                    }
                    fullWidth
                    required
                  />

                  <Grid
                    item
                    style={{
                      marginTop: "33px",
                      width: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CustomButton
                      onClick={() => this.save()}
                      disabled={
                        !this.state.name.length > 0 ||
                        this.state.save !== "edit"
                      }
                    >
                      Save Changes
                    </CustomButton>
                  </Grid>

                  {this.state.save === "editting" && (
                    <Dialog open={true}>
                      <LoadingModal
                        text={"One moment. We're updating the audio resource."}
                        cancelFn={this.editCancelled}
                      />
                    </Dialog>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Modal>

        {/* Delete Modal */}

        <SuccessModal
          open={this.state.status === "deleted"}
          text={`You have deleted ${this.state.name} under audio resource.`}
          closeFn={this.closeEditModal}
        />

        <LoadingModal
          open={this.state.status === "deleting"}
          text={"One moment. We're deleting the audio resource."}
          cancelFn={this.deleteCancelled}
        />

        <DeleteModal
          open={this.state.openDelete && this.state.status === "delete"}
          header={`Delete ${this.state.name}`}
          msg="audio resources"
          name={this.state.name}
          closeFn={this.closeEditModal}
          delFn={this.delete}
        />

        {/* END MODALS */}

        {/* HEADER */}

        {/* END HEADER */}

        {/* AUDIO RESOURCES TABLE BODY */}
        {this.state.loading ? null : (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{
              width: "inherit",
              backgroundColor: "#F1F1F1",
              padding: 10,
              margin: 15
            }}
          >
            <div style={{ fontSize: 16, color: "#777", padding: 5 }}>
              <p>
                You can create a new audio resource for this specific company
                from this page.
              </p>
            </div>

            <div>
              <HeaderButton
                className={classes.headerBtn}
                openFunction={() =>
                  this.setState({ createModal: true, name: "", nameError: "" })
                }
                buttonText="New Audio Resource"
              />
            </div>
          </Grid>
        )}
        <Grid item>
          {this.state.original_resource.length > 0 ? (
            <>
              <Card className={classes.tableBody}>
                {!this.state.loading && (
                  <>
                    <div className={classes.searchContainer}>
                      <SearchBar
                        typed={this.typed}
                        title="Audio Resource"
                        filterlist={this.state.original_resource}
                        FilteredData={this.filteredData}
                        userData={this.state.original_resource}
                        headers={"Audio"}
                      />
                    </div>
                    <Divider />
                  </>
                )}
                {/* ASYNC TABLE */}

                <div>
                  <Collapse in={this.state.searching} timeout={1000}>
                    {this.state.resource.length > 0 ? (
                      this.tableData(this.state.resource, classes)
                    ) : (
                      <div
                        style={{
                          width: "inherit",
                          padding: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <h2 style={{ color: "#777777" }}>
                          No Audio resource have been found with your keyword.
                        </h2>
                      </div>
                    )}
                  </Collapse>

                  {this.state.original_resource.length > 0 &&
                    !this.state.loading &&
                    this.tableData(this.state.original_resource, classes)}

                  {!this.state.original_resource.length > 0 &&
                    !this.state.loading && (
                      <div
                        style={{
                          width: "inherit",
                          height: "447px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <h2 style={{ color: "#777777" }}>
                          No Audio resource have been created
                        </h2>
                      </div>
                    )}
                </div>
              </Card>
              <Card>
                <div style={{ width: "100%" }}>
                  <Divider />

                  {this.state.original_resource.length > 0 &&
                    !this.state.loading && (
                      <Pagination
                        totalItems={this.state.original_resource.length}
                        itemsPerPage={6}
                        paginateFn={this.paginate}
                      />
                    )}
                </div>
              </Card>{" "}
            </>
          ) : this.state.loading ? (
            <div style={{ height: 600 }}>
              <TableLoader
                headerText="Audio Resources "
                message="Loading audio resources . . . "
                Icon={GroupOutlined}
              />
            </div>
          ) : (
            <TableNoResult
              headerText="Audio Resources"
              mainMessage="There is no audio resources yet."
              subMessage={
                <span>
                  Would you like to create one? Just hit the "New Audio
                  Resource" button
                </span>
              }
              renderButton={
                <HeaderButton
                  buttonText="New Audio Resource"
                  openFunction={() =>
                    this.setState({
                      createModal: true,
                      name: "",
                      nameError: ""
                    })
                  }
                />
              }
            />
          )}
        </Grid>

        {/* END OF AUDIO RESOURCES */}
      </Grid>
    );
  }
}

export default withStyles(styles)(AudioResources);
