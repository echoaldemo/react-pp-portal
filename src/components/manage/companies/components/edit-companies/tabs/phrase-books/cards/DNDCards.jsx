import React, { PureComponent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import SettingsIcon from "@material-ui/icons/Settings";
import DragIcon from "@material-ui/icons/DragHandle";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import {
  Grid,
  Typography,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Collapse,
  CardContent,
  Button,
  Menu,
  MenuItem,
  withStyles
} from "@material-ui/core";

import {
  CustomCard,
  CardHeader,
  CardBody,
  CardNoResult
} from "common-components";

const style = {
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
};
class DNDCards extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      card1DataOrig: this.props.card1Data,
      card2DataOrig: this.props.card2Data,
      card3DataOrig: this.props.card3Data,
      card1PrevData: this.props.card1Data,
      card2PrevData: this.props.card2Data,
      card3PrevData: this.props.card3Data,
      card1Data: this.props.card1Data,
      card2Data: this.props.card2Data,
      card3Data: this.props.card3Data,
      saveSetting: false,
      anchorEl: null,
      open: false,
      anchorElCard1: null,
      openCard1: false,
      activeData: []
    };
  }

  componentDidMount() {
    this.setState({
      card1DataOrig: this.props.card1Data
    });
  }

  getFirst = n => {
    var x = n.firstChild;
    // while (x.nodeType != 1) {
    //   x = x.nextSibling;
    // }
    return x.parentNode.nodeName;
  };
  getRootNode = data => {
    const parser = new DOMParser();
    const theDom = parser.parseFromString(data, "application/xml");
    const rootNode = this.getFirst(theDom.documentElement);

    return rootNode;
  };
  id2List = {
    droppable: "card1Data",
    droppable2: "card2Data",
    droppable3: "card3Data"
  };
  getList = id => this.state[this.id2List[id]];
  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    // background: isDragging ? `#f8f9fa` : "",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (destination.droppableId !== "droppable") {
      return;
    }

    const results = this.move(
      this.getList(source.droppableId),
      this.getList(destination.droppableId),
      source,
      destination
    );

    if (
      destination.droppableId === "droppable" &&
      source.droppableId === "droppable2"
    ) {
      this.setState({
        card1Data: results.droppable,
        card2Data: results.droppable2,
        saveSetting: true
      });
    } else if (
      destination.droppableId === "droppable" &&
      source.droppableId === "droppable3"
    ) {
      this.setState({
        card1Data: results.droppable,
        card3Data: results.droppable3,
        saveSetting: true
      });
    } else {
      return;
    }
  };

  Cancel = () => {
    this.setState({
      card1Data: this.state.card1PrevData,
      card2Data: this.state.card2PrevData,
      card3Data: this.state.card3PrevData,
      saveSetting: false
    });
  };

  handleClickOpen = (event, data) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    });

    this.props.setActiveData(data);
  };

  handClose = () => {
    this.setState({
      open: false
    });

    // setActiveData(data);
  };

  handleClickOpenCard1 = (event, data) => {
    this.setState({
      anchorElCard1: event.currentTarget,
      openCard1: !this.state.open,
      activeData: data
    });

    this.props.setActiveData(data);
  };

  handCloseCard1 = () => {
    this.setState({
      openCard1: false
    });

    // setActiveData(data);
  };
  saveActiveSegment = () => {
    if (this.props.saveActiveSegment !== undefined) {
      this.props.saveActiveSegment(this.state.card1Data);
      this.setState({
        card1PrevData: this.state.card1Data,
        card2PrevData: this.state.card2Data,
        card3PrevData: this.state.card3Data,
        saveSetting: false
      });
    }
  };

  DeactivateSegment = () => {
    var card1DataArr = [...this.state.card1Data];
    var card2DataArr = [...this.state.card2Data];
    var card3DataArr = [...this.state.card3Data];

    if (this.state.card2DataOrig.includes(this.state.activeData)) {
      card2DataArr.push(this.state.activeData);
    } else if (this.state.card3DataOrig.includes(this.state.activeData)) {
      card3DataArr.push(this.state.activeData);
    }
    var index = card1DataArr.indexOf(this.state.activeData);
    if (index > -1) {
      card1DataArr.splice(index, 1);
    }
    this.setState({
      card1Data: card1DataArr,
      card2Data: card2DataArr,
      card3Data: card3DataArr,
      openCard1: false,
      saveSetting: true
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Droppable droppableId="droppable">
              {provided => (
                <>
                  <CustomCard>
                    <CardHeader
                      title={`${this.props.card1Title}`}
                      searchData={this.state.card1Data}
                      searchHeaders={["name"]}
                      addButton={this.props.addButton1}
                      addFunction={this.props.addFunction1}
                    />

                    <CardBody>
                      <CardContent style={{ backgroundColor: "#FFF" }}>
                        <Typography variant="h6">
                          Work in progress section
                        </Typography>
                        <Typography variant="caption">
                          still needs the api for this section
                        </Typography>
                      </CardContent>
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ height: "100%" }}
                      >
                        <Collapse
                          in={this.state.saveSetting}
                          timeout={1000}
                          unmountOnExit
                        >
                          <CardContent style={{ backgroundColor: "#FFF" }}>
                            <Grid container justify="space-around">
                              <Grid item>
                                <Button
                                  onClick={this.saveActiveSegment}
                                  style={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    paddingLeft: 70,
                                    paddingRight: 70,
                                    fontWeight: "bold"
                                  }}
                                >
                                  Save
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  style={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    paddingLeft: 70,
                                    paddingRight: 70,
                                    fontWeight: "bold"
                                  }}
                                  onClick={this.Cancel}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Collapse>

                        <Table className={classes.table}>
                          <TableBody>
                            {this.state.card1Data.length !== 0 ? (
                              this.state.card1Data.map((data, index) => (
                                <Draggable
                                  isDragDisabled={true}
                                  key={data.uuid}
                                  draggableId={`${index}`}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <TableRow
                                      className={classes.row}

                                      // style={this.getItemStyle(
                                      //   snapshot.isDragging,
                                      //   provided.draggableProps.style
                                      // )}
                                    >
                                      <TableCell
                                        className={classes.cell}
                                        innerRef={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Grid container spacing={3}>
                                          <Grid item>
                                            <Grid container>
                                              <Grid item xs={12}>
                                                <Typography>
                                                  {data.name}
                                                </Typography>
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Typography
                                                  variant="caption"
                                                  style={{
                                                    color: "#a3a3a3",
                                                    textTransform: "capitalize"
                                                  }}
                                                >
                                                  {data.type}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            style={{ marginLeft: "auto" }}
                                          >
                                            <SettingsIcon
                                              style={{ fontSize: 19 }}
                                              onClick={event =>
                                                this.handleClickOpenCard1(
                                                  event,
                                                  data
                                                )
                                              }
                                            />
                                            <Menu
                                              onClose={this.handCloseCard1}
                                              anchorEl={
                                                this.state.anchorElCard1
                                              }
                                              style={{ marginTop: 40 }}
                                              id="simple-menu"
                                              keepMounted
                                              open={this.state.openCard1}
                                            >
                                              {this.state.card2DataOrig.includes(
                                                this.state.activeData
                                              ) ? (
                                                <MenuItem
                                                  style={{
                                                    color: "#777777",
                                                    width: 250,
                                                    paddingTop: 0,
                                                    paddingBottom: 0
                                                  }}
                                                  onClick={
                                                    this.DeactivateSegment
                                                  }
                                                >
                                                  <RemoveIcon />
                                                  <Typography
                                                    style={{ marginLeft: 40 }}
                                                  >
                                                    Deactivate
                                                  </Typography>
                                                </MenuItem>
                                              ) : this.props.card3Popover !==
                                                undefined ? (
                                                <>
                                                  {this.props.card3Popover}
                                                  <MenuItem
                                                    style={{
                                                      color: "#777777",
                                                      width: 250,
                                                      paddingTop: 0,
                                                      paddingBottom: 0
                                                    }}
                                                    onClick={
                                                      this.DeactivateSegment
                                                    }
                                                  >
                                                    <RemoveIcon />
                                                    <Typography
                                                      style={{ marginLeft: 40 }}
                                                    >
                                                      Deactivate
                                                    </Typography>
                                                  </MenuItem>
                                                </>
                                              ) : (
                                                <MenuItem
                                                  style={{
                                                    color: "#777777",
                                                    width: 250,
                                                    paddingTop: 0,
                                                    paddingBottom: 0
                                                  }}
                                                  onClick={
                                                    this.DeactivateSegment
                                                  }
                                                >
                                                  <RemoveIcon />
                                                  <Typography
                                                    style={{ marginLeft: 40 }}
                                                  >
                                                    Deactivate
                                                  </Typography>
                                                </MenuItem>
                                              )}
                                            </Menu>
                                          </Grid>
                                        </Grid>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Draggable>
                              ))
                            ) : (
                              <CardNoResult text="No Result" />
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardBody>
                  </CustomCard>

                  {provided.placeholder}
                </>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={4}>
            <Droppable droppableId="droppable2" isDropDisabled={true}>
              {provided => (
                <>
                  <CustomCard>
                    <CardHeader
                      title={`${this.props.card2Title}`}
                      searchData={this.state.card2Data}
                      searchHeaders={["name"]}
                      addButton={this.props.addButton2}
                      addFunction={this.props.addFunction2}
                    />
                    <CardBody>
                      <Table className={classes.table}>
                        <TableBody
                          innerRef={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {this.state.card2Data.length !== 0 ? (
                            this.state.card2Data.map((data, index) => (
                              <Draggable
                                key={data.uuid}
                                draggableId={`${data.uuid}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <TableRow
                                    className={classes.row}
                                    innerRef={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    // style={this.getItemStyle(
                                    //   snapshot.isDragging,
                                    //   provided.draggableProps.style
                                    // )}
                                  >
                                    <TableCell className={classes.cell}>
                                      <Grid container spacing={3}>
                                        <Grid item>
                                          <DragIcon style={{ fontSize: 19 }} />
                                        </Grid>
                                        <Grid item>
                                          <Grid container>
                                            <Grid item xs={12}>
                                              <Typography>
                                                {data.name}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography
                                                variant="caption"
                                                style={{
                                                  color: "#a3a3a3",
                                                  textTransform: "capitalize"
                                                }}
                                              >
                                                {data.type}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <CardNoResult text="No Result" />
                          )}
                        </TableBody>
                      </Table>
                    </CardBody>
                  </CustomCard>

                  {provided.placeholder}
                </>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={4}>
            <Droppable droppableId="droppable3" isDropDisabled={true}>
              {provided => (
                <>
                  <CustomCard>
                    <CardHeader
                      title={`${this.props.card3Title}`}
                      searchData={this.state.card3Data}
                      searchHeaders={["name"]}
                      addButton={this.props.addButton3}
                      addFunction={this.props.addFunction3}
                    />
                    <CardBody>
                      <Table className={classes.table}>
                        <TableBody
                          innerRef={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {this.state.card3Data.length !== 0 ? (
                            this.state.card3Data.map((data, index) => (
                              <Draggable
                                key={data.uuid}
                                draggableId={`${data.uuid}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <TableRow
                                    className={classes.row}
                                    innerRef={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={this.getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <TableCell className={classes.cell}>
                                      <Grid container spacing={3}>
                                        <Grid
                                          item
                                          style={{ width: 380 }}
                                          {...provided.dragHandleProps}
                                        >
                                          <Grid container spacing={3}>
                                            <Grid item>
                                              <DragIcon
                                                style={{ fontSize: 19 }}
                                              />
                                            </Grid>
                                            <Grid item>
                                              <Grid container>
                                                <Grid item xs={12}>
                                                  <Typography>
                                                    {data.name}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant="caption"
                                                    style={{
                                                      color: "#a3a3a3",
                                                      textTransform:
                                                        "capitalize"
                                                    }}
                                                  >
                                                    {data.type}
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        {this.props.card3Popover !==
                                        undefined ? (
                                          <Grid
                                            item
                                            style={{
                                              width: 10
                                            }}
                                          >
                                            <SettingsIcon
                                              aria-controls="simple-menu"
                                              onClick={event =>
                                                this.handleClickOpen(
                                                  event,
                                                  data
                                                )
                                              }
                                              style={{ fontSize: 19 }}
                                            />

                                            <Menu
                                              onClose={this.handClose}
                                              anchorEl={this.state.anchorEl}
                                              style={{ marginTop: 40 }}
                                              id="simple-menu"
                                              keepMounted
                                              open={this.state.open}
                                            >
                                              {this.props.card3Popover}
                                            </Menu>
                                          </Grid>
                                        ) : null}
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <CardNoResult text="No Result" />
                          )}
                        </TableBody>
                      </Table>
                    </CardBody>
                  </CustomCard>

                  {provided.placeholder}
                </>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}
export default withStyles(style)(DNDCards);
