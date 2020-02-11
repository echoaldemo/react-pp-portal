import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SettingsIcon from '@material-ui/icons/Settings';
import DragIcon from '@material-ui/icons/DragHandle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
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
} from '@material-ui/core';

import { CustomCard, CardHeader, CardBody, CardNoResult } from 'common-components';

import { style } from './styles';

interface IProps {
  classes: any;
  card1Data: any;
  card2Data: any;
  card3Data: any;
  setActiveData: Function;
  saveActiveSegment: Function;
  card1Title: string;
  card2Title: string;
  card3Title: string;
  card3Popover?: any;
  addButton1?: boolean;
  addFunction1?: Function;
  addButton2?: boolean;
  addFunction2?: Function;
  addButton3?: boolean;
  addFunction3?: Function;
}

interface IState {
  card1DataOrig: Array<Object>;
  card2DataOrig: Array<Object>;
  card3DataOrig: Array<Object>;
  card1PrevData: Array<Object>;
  card2PrevData: Array<Object>;
  card3PrevData: Array<Object>;
  card1Data: Array<Object>;
  card2Data: Array<Object>;
  card3Data: Array<Object>;
  saveSetting: boolean;
  anchorEl: any;
  open: boolean;
  anchorElCard1: any;
  openCard1: boolean;
  activeData: Array<Object>;
}

class DNDCards extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
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

  getFirst = (n: any) => {
    var x = n.firstChild;
    // while (x.nodeType != 1) {
    //   x = x.nextSibling;
    // }
    return x.parentNode.nodeName;
  };

  getRootNode = (data: any) => {
    const parser = new DOMParser();
    const theDom = parser.parseFromString(data, 'application/xml');
    const rootNode = this.getFirst(theDom.documentElement);

    return rootNode;
  };

  id2List: any = {
    droppable: 'card1Data',
    droppable2: 'card2Data',
    droppable3: 'card3Data'
  };

  getList = (id: any) => {
    let curState = this.state;
    let curId = this.id2List;
    return (curState as any)[(curId as any)[id]];
  };

  move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // change background colour if dragging
    // background: isDragging ? `#f8f9fa` : "",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (destination.droppableId !== 'droppable') {
      return;
    }

    const results: any = this.move(
      this.getList(source.droppableId),
      this.getList(destination.droppableId),
      source,
      destination
    );

    if (destination.droppableId === 'droppable' && source.droppableId === 'droppable2') {
      this.setState({
        card1Data: results.droppable,
        card2Data: results.droppable2,
        saveSetting: true
      });
    }
    else if (destination.droppableId === 'droppable' && source.droppableId === 'droppable3') {
      this.setState({
        card1Data: results.droppable,
        card3Data: results.droppable3,
        saveSetting: true
      });
    }
    else {
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

  handleClickOpen = (event: any, data: any) => {
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

  handleClickOpenCard1 = (event: any, data: any) => {
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
    }
    else if (this.state.card3DataOrig.includes(this.state.activeData)) {
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
              {(provided) => (
                <React.Fragment>
                  <CustomCard>
                    <CardHeader
                      title={`${this.props.card1Title}`}
                      searchData={this.state.card1Data}
                      searchHeaders={['name']}
                      addButton={this.props.addButton1}
                      addFunction={this.props.addFunction1}
                    />

                    <CardBody>
                      <CardContent style={{ backgroundColor: '#FFF' }}>
                        <Typography variant="h6">Work in progress section</Typography>
                        <Typography variant="caption">
                          still needs the api for this section
                        </Typography>
                      </CardContent>
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ height: '100%' }}
                      >
                        <Collapse in={this.state.saveSetting} timeout={1000} unmountOnExit>
                          <CardContent style={{ backgroundColor: '#FFF' }}>
                            <Grid container justify="space-around">
                              <Grid item>
                                <Button
                                  onClick={this.saveActiveSegment}
                                  style={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    paddingLeft: 70,
                                    paddingRight: 70,
                                    fontWeight: 'bold'
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
                                    fontWeight: 'bold'
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
                              this.state.card1Data.map((data: any, index: any) => (
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
                                                    color:
                                                      '#a3a3a3',
                                                    textTransform:
                                                      'capitalize'
                                                  }}
                                                >
                                                  {data.type}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            style={{ marginLeft: 'auto' }}
                                          >
                                            <SettingsIcon
                                              style={{ fontSize: 19 }}
                                              onClick={(event) =>
                                                this.handleClickOpenCard1(
                                                  event,
                                                  data
                                                )}
                                            />
                                            <Menu
                                              onClose={
                                                this.handCloseCard1
                                              }
                                              anchorEl={
                                                this.state.anchorElCard1
                                              }
                                              style={{ marginTop: 40 }}
                                              id="simple-menu"
                                              keepMounted
                                              open={this.state.openCard1}
                                              PopoverClasses={{
                                                paper: classes.paper
                                              }}
                                            >
                                              {this.state.card2DataOrig.includes(
                                                this.state.activeData
                                              ) ? (
                                                  <MenuItem
                                                    style={{
                                                      color:
                                                        '#777777',
                                                      width: 250,
                                                      paddingTop: 0,
                                                      paddingBottom: 0
                                                    }}
                                                    onClick={
                                                      this
                                                        .DeactivateSegment
                                                    }
                                                  >
                                                    <RemoveIcon />
                                                    <Typography
                                                      style={{
                                                        marginLeft: 40
                                                      }}
                                                    >
                                                      Deactivate
                                                  </Typography>
                                                  </MenuItem>
                                                ) : this.props
                                                  .card3Popover !==
                                                  undefined ? (
                                                    <React.Fragment>
                                                      {
                                                        this.props
                                                          .card3Popover
                                                      }
                                                      <MenuItem
                                                        style={{
                                                          color:
                                                            '#777777',
                                                          width: 250,
                                                          paddingTop: 0,
                                                          paddingBottom: 0
                                                        }}
                                                        onClick={
                                                          this
                                                            .DeactivateSegment
                                                        }
                                                      >
                                                        <RemoveIcon />
                                                        <Typography
                                                          style={{
                                                            marginLeft: 40
                                                          }}
                                                        >
                                                          Deactivate
                                                    </Typography>
                                                      </MenuItem>
                                                    </React.Fragment>
                                                  ) : (
                                                    <MenuItem
                                                      style={{
                                                        color:
                                                          '#777777',
                                                        width: 250,
                                                        paddingTop: 0,
                                                        paddingBottom: 0
                                                      }}
                                                      onClick={
                                                        this
                                                          .DeactivateSegment
                                                      }
                                                    >
                                                      <RemoveIcon />
                                                      <Typography
                                                        style={{
                                                          marginLeft: 40
                                                        }}
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
                </React.Fragment>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={4}>
            <Droppable droppableId="droppable2" isDropDisabled={true}>
              {(provided) => (
                <React.Fragment>
                  <CustomCard>
                    <CardHeader
                      title={`${this.props.card2Title}`}
                      searchData={this.state.card2Data}
                      searchHeaders={['name']}
                      addButton={this.props.addButton2}
                      addFunction={this.props.addFunction2}
                    />
                    <CardBody>
                      <Table className={classes.table}>
                        <TableBody innerRef={provided.innerRef} {...provided.droppableProps}>
                          {this.state.card2Data.length !== 0 ? (
                            this.state.card2Data.map((data: any, index: any) => (
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
                                                  color: '#a3a3a3',
                                                  textTransform:
                                                    'capitalize'
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
                </React.Fragment>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={4}>
            <Droppable droppableId="droppable3" isDropDisabled={true}>
              {(provided) => (
                <React.Fragment>
                  <CustomCard>
                    <CardHeader
                      title={`${this.props.card3Title}`}
                      searchData={this.state.card3Data}
                      searchHeaders={['name']}
                      addButton={this.props.addButton3}
                      addFunction={this.props.addFunction3}
                    />
                    <CardBody>
                      <Table className={classes.table}>
                        <TableBody innerRef={provided.innerRef} {...provided.droppableProps}>
                          {this.state.card3Data.length !== 0 ? (
                            this.state.card3Data.map((data: any, index: any) => (
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
                                                      color:
                                                        '#a3a3a3',
                                                      textTransform:
                                                        'capitalize'
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
                                                onClick={(event) =>
                                                  this.handleClickOpen(
                                                    event,
                                                    data
                                                  )}
                                                style={{ fontSize: 19 }}
                                              />

                                              <Menu
                                                onClose={this.handClose}
                                                anchorEl={
                                                  this.state.anchorEl
                                                }
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
                </React.Fragment>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}
export default withStyles(style)(DNDCards);
