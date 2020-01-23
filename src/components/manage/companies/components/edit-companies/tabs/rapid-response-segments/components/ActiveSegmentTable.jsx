import React, { PureComponent } from "react";
import CustomCard from "../../../../common-components/card";
import CardHeader from "../../../../common-components/card/cardheader";
import CardBody from "../../../../common-components/card/cardbody";
import CardNoResult from "../../../../common-components/card/noresult";
import AsyncTable from "../../../../common-components/async-table/AsyncTable";
import TableRow from "@material-ui/core/TableRow";
import SettingsIcon from "@material-ui/icons/Settings";
import TableCell from "@material-ui/core/TableCell";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IconButton,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
// import { get } from "../../../../../utils/api";
class ActiveSegmentTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      globalSegments: this.props.globalSegments
    };
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

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
          this.getList(source.droppableId),
          source.index,
          destination.index
      );

      let state = { items };

      if (source.droppableId === 'droppable2') {
          state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
          this.getList(source.droppableId),
          this.getList(destination.droppableId),
          source,
          destination
      );

      this.setState({
          items: result.droppable,
          selected: result.droppable2
      });
    }

    // const column = this.state. 
  };

  render() {
    return (
      <CustomCard>
        <CardHeader title="Active segments" />
        <CardBody>
          {this.state.globalSegments.length !== 0 ? (
            // <AsyncTable
            //   tableData={this.props.globalSegments}
            //   render={(list, { row, cell }) => {
            //     return list.map(item => (
            //       <>
            //         {item.active ? (
            //           <TableRow className={row} key={item.id}>
            //             <TableCell className={cell}>
            //               <Grid container spacing={3}>
            //                 <Grid item>
            //                   <Grid container>
            //                     <Grid item xs={12}>
            //                       <Typography>{item.name}</Typography>
            //                     </Grid>
            //                     <Grid item xs={12}>
            //                       <Typography
            //                         variant="caption"
            //                         style={{
            //                           color: "#a3a3a3",
            //                           textTransform: "capitalize"
            //                         }}
            //                       >
            //                         {this.getRootNode(item.xml)}
            //                       </Typography>
            //                     </Grid>
            //                   </Grid>
            //                 </Grid>
            //               </Grid>
            //             </TableCell>
            //             <TableCell
            //               className={cell}
            //               style={{ textAlign: "right" }}
            //             >
            //               <IconButton style={{ padding: 0 }}>
            //                 <SettingsIcon style={{ fontSize: 19 }} />
            //               </IconButton>
            //             </TableCell>
            //           </TableRow>
            //         ) : null}
            //       </>
            //     ));
            //   }}
            // />
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {provided => (
                  <List
                    innerRef={provided.innerRef}
                    component="nav"
                    aria-label="main mailbox folders"
                  >
                    {this.state.globalSegments.map((segments, index) => (
                      <Draggable
                        key={segments.id}
                        draggableId={`${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ListItem
                            button
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {segments.name}
                          </ListItem>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <CardNoResult />
          )}
        </CardBody>
      </CustomCard>
    );
  }
}

export default ActiveSegmentTable;
