import React, { useState, useEffect } from "react";
import {
  CustomCard,
  CardHeader,
  CardBody,
  CardNoResult
} from "common-components";
import TableRow from "@material-ui/core/TableRow";
import SettingsIcon from "@material-ui/icons/Settings";
import DragIcon from "@material-ui/icons/DragHandle";
import RemoveIcon from "@material-ui/icons/RemoveCircle";

import TableCell from "@material-ui/core/TableCell";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  Collapse,
  CardContent,
  Button,
  Menu,
  MenuItem,
  TableFooter
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
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

interface Props {
  addButton1?: boolean;
  addButton2?: boolean;
  addButton3?: boolean;
  addFunction1?: () => void;
  addFunction2?: () => void;
  addFunction3?: () => void;
  card1Title: string;
  card2Title: string;
  card3Title: string;
  card1Data: object[];
  card2Data: object[];
  card3Data: object[];
  handleClickOpen: () => void;
  setActiveData: (data: any) => any;
  saveActiveSegment: Function;
  card1Popover?: Element;
  card2Popover?: Element;
  card3Popover?: Element;
  classes: any;
}

const DNDCardsComp: React.SFC<Props> = ({
  card1Data,
  card2Data,
  card3Data,
  setActiveData,
  saveActiveSegment,
  classes,
  addButton1,
  addButton2,
  addButton3,
  addFunction1,
  addFunction2,
  addFunction3,
  card1Popover,
  card2Popover,
  card3Popover,
  card1Title,
  card2Title,
  card3Title
}) => {
  const [card1DataOrig, Setcard1DataOrig] = useState(card1Data);
  const [card2DataOrig, Setcard2DataOrig] = useState(card2Data);
  const [card3DataOrig, Setcard3DataOrig] = useState(card3Data);
  const [card1PrevData, Setcard1PrevData] = useState(card1Data);
  const [card2PrevData, Setcard2PrevData] = useState(card2Data);
  const [card3PrevData, Setcard3PrevData] = useState(card3Data);
  const [cardDataState, SetcardData] = useState<any>({
    card1DataState: card1Data,
    card2DataState: card2Data,
    card3DataState: card3Data
  });
  const [saveSetting, SetsaveSetting] = useState(false);
  const [anchorEl, SetanchorEl] = useState(null);
  const [open, Setopen] = useState(false);
  const [anchorElCard1, SetanchorElCard1] = useState(null);
  const [openCard1, SetopenCard1] = useState(false);
  const [activeData, SetactiveData] = useState([]);

  useEffect(() => {
    Setcard1DataOrig(card1Data);
  });

  const getFirst = (n: any) => {
    var x = n.firstChild;
    // while (x.nodeType != 1) {
    //   x = x.nextSibling;
    // }
    return x.parentNode.nodeName;
  };
  const getRootNode = (data: any) => {
    const parser = new DOMParser();
    const theDom = parser.parseFromString(data, "application/xml");
    const rootNode = getFirst(theDom.documentElement);

    return rootNode;
  };

  const id2List: any = {
    droppable: "card1DataState",
    droppable2: "card2DataState",
    droppable3: "card3DataState"
  };

  const getList = (id: any) => cardDataState[id2List[id]];
  const move = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // change background colour if dragging
    // background: isDragging ? `#f8f9fa` : "",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (destination.droppableId !== "droppable") {
      return;
    }

    const results: any = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination
    );
    if (
      destination.droppableId === "droppable" &&
      source.droppableId === "droppable2"
    ) {
      SetcardData({
        ...cardDataState,
        card1DataState: results.droppable,
        card2DataState: results.droppable2
      });
      SetsaveSetting(true);
      // this.setState({
      //   card1Data: results.droppable,
      //   card2Data: results.droppable2,
      //   saveSetting: true
      // });
    } else if (
      destination.droppableId === "droppable" &&
      source.droppableId === "droppable3"
    ) {
      SetcardData({
        ...cardDataState,
        card1DataState: results.droppable,
        card3DataState: results.droppable3
      });
      SetsaveSetting(true);
      // this.setState({
      //   card1Data: results.droppable,
      //   card3Data: results.droppable3,
      //   saveSetting: true
      // });
    } else {
      return;
    }
  };

  const Cancel = () => {
    SetcardData({
      ...cardDataState,
      card1DataState: card1PrevData,
      card2DataState: card2PrevData,
      card3DataState: card3PrevData
    });
    SetsaveSetting(false);
    // this.setState({
    //   card1Data: this.state.card1PrevData,
    //   card2Data: this.state.card2PrevData,
    //   card3Data: this.state.card3PrevData,
    //   saveSetting: false
    // });
  };

  const handleClickOpen = (event: any, data: any) => {
    SetanchorEl(event.currentTarget);
    Setopen(!open);
    // this.setState({
    //   anchorEl : event.currentTarget,
    //   open: !this.state.open
    // });

    setActiveData(data);
  };

  const handClose = () => {
    Setopen(false);
    // this.setState({
    //   open: false
    // });

    // setActiveData(data);
  };

  const handleClickOpenCard1 = (event: any, data: any) => {
    SetanchorElCard1(event.currentTarge);
    SetopenCard1(!open);
    SetactiveData(data);
    // this.setState({
    //   anchorElCard1: event.currentTarget,
    //   openCard1: !this.state.open,
    //   activeData: data
    // });

    setActiveData(data);
  };

  const handCloseCard1 = () => {
    SetopenCard1(false);
    // this.setState({
    //   openCard1: false
    // });

    // setActiveData(data);
  };
  const saveActiveSegments = () => {
    if (saveActiveSegment !== undefined) {
      saveActiveSegment(cardDataState.card1DataState);
      Setcard1PrevData(cardDataState.card1DataState);
      Setcard2PrevData(cardDataState.card2DataState);
      Setcard3PrevData(cardDataState.card3DataState);
      SetsaveSetting(false);
      // this.setState({
      //   card1PrevData: this.state.card1Data,
      //   card2PrevData: this.state.card2Data,
      //   card3PrevData: this.state.card3Data,
      //   saveSetting: false
      // });
    }
  };

  const DeactivateSegment = () => {
    var card1DataArr = [...cardDataState.card1DataState];
    var card2DataArr = [...cardDataState.card2DataState];
    var card3DataArr = [...cardDataState.card3DataState];

    if (card2DataOrig.includes(activeData)) {
      card2DataArr.push(activeData);
    } else if (card3DataOrig.includes(activeData)) {
      card3DataArr.push(activeData);
    }
    var index = card1DataArr.indexOf(activeData);
    if (index > -1) {
      card1DataArr.splice(index, 1);
    }

    SetcardData({
      ...cardDataState,
      card1DataState: card1DataArr,
      card2DataState: card2DataArr,
      card3DataState: card3DataArr
    });
    SetopenCard1(false);
    SetsaveSetting(true);
    // this.setState({
    //   card1Data: card1DataArr,
    //   card2Data: card2DataArr,
    //   card3Data: card3DataArr,
    //   openCard1: false,
    //   saveSetting: true
    // });
  };

  // const { classes } = this.props;
  //props : card1Title , addButton1,addButton2,addButton3, addFunction1,addFunction2,addFunction3, card3Popover , card2Title , card3Title
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Droppable droppableId="droppable">
            {(provided: any) => (
              <>
                <CustomCard>
                  <CardHeader
                    title={`${card1Title}`}
                    searchData={cardDataState.card1DataState}
                    searchHeaders={["name"]}
                    addButton={addButton1}
                    addFunction={addFunction1}
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
                      <Collapse in={saveSetting} timeout={1000} unmountOnExit>
                        <CardContent style={{ backgroundColor: "#FFF" }}>
                          <Grid container justify="space-around">
                            <Grid item>
                              <Button
                                onClick={saveActiveSegments}
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
                                onClick={Cancel}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Collapse>

                      <Table className={classes.table}>
                        <TableBody>
                          {cardDataState.card1DataState.length !== 0 ? (
                            cardDataState.card1DataState.map(
                              (data: any, index: number) => (
                                <Draggable
                                  isDragDisabled={true}
                                  key={data.uuid}
                                  draggableId={`${index}`}
                                  index={index}
                                >
                                  {(provided: any) => (
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
                                                handleClickOpenCard1(
                                                  event,
                                                  data
                                                )
                                              }
                                            />
                                            <Menu
                                              onClose={handCloseCard1}
                                              anchorEl={anchorElCard1}
                                              style={{ marginTop: 40 }}
                                              id="simple-menu"
                                              keepMounted
                                              open={openCard1}
                                            >
                                              {card2DataOrig.includes(
                                                activeData
                                              ) ? (
                                                <MenuItem
                                                  style={{
                                                    color: "#777777",
                                                    width: 250,
                                                    paddingTop: 0,
                                                    paddingBottom: 0
                                                  }}
                                                  onClick={DeactivateSegment}
                                                >
                                                  <RemoveIcon />
                                                  <Typography
                                                    style={{ marginLeft: 40 }}
                                                  >
                                                    Deactivate
                                                  </Typography>
                                                </MenuItem>
                                              ) : card3Popover !== undefined ? (
                                                <>
                                                  {card3Popover}
                                                  <MenuItem
                                                    style={{
                                                      color: "#777777",
                                                      width: 250,
                                                      paddingTop: 0,
                                                      paddingBottom: 0
                                                    }}
                                                    onClick={DeactivateSegment}
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
                                                  onClick={DeactivateSegment}
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
                              )
                            )
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
            {(provided: any) => (
              <>
                <CustomCard>
                  <CardHeader
                    title={`${card2Title}`}
                    searchData={cardDataState.card2DataState}
                    searchHeaders={["name"]}
                    addButton={addButton2}
                    addFunction={addFunction2}
                  />
                  <CardBody>
                    <Table className={classes.table}>
                      <TableBody
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {cardDataState.card2DataState.length !== 0 ? (
                          cardDataState.card2DataState.map(
                            (data: any, index: number) => (
                              <Draggable
                                key={data.uuid}
                                draggableId={`${data.uuid}`}
                                index={index}
                              >
                                {(provided: any) => (
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
                            )
                          )
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
            {(provided: any) => (
              <>
                <CustomCard>
                  <CardHeader
                    title={`${card3Title}`}
                    searchData={cardDataState.card3DataState}
                    searchHeaders={["name"]}
                    addButton={addButton3}
                    addFunction={addFunction3}
                  />
                  <CardBody>
                    <Table className={classes.table}>
                      <TableBody
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {cardDataState.card3DataState.length !== 0 ? (
                          cardDataState.card3DataState.map(
                            (data: any, index: number) => (
                              <Draggable
                                key={data.uuid}
                                draggableId={`${data.uuid}`}
                                index={index}
                              >
                                {(provided: any, snapshot: any) => (
                                  <TableRow
                                    className={classes.row}
                                    innerRef={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={getItemStyle(
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
                                        {card3Popover !== undefined ? (
                                          <Grid
                                            item
                                            style={{
                                              width: 10
                                            }}
                                          >
                                            <SettingsIcon
                                              aria-controls="simple-menu"
                                              onClick={event =>
                                                handleClickOpen(event, data)
                                              }
                                              style={{ fontSize: 19 }}
                                            />

                                            <Menu
                                              onClose={handClose}
                                              anchorEl={anchorEl}
                                              style={{ marginTop: 40 }}
                                              id="simple-menu"
                                              keepMounted
                                              open={open}
                                            >
                                              {card3Popover}
                                            </Menu>
                                          </Grid>
                                        ) : null}
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </Draggable>
                            )
                          )
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
};
const DNDCards = withStyles(style)(DNDCardsComp);

export { DNDCards };
