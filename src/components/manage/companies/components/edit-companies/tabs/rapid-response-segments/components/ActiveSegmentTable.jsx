import React, { PureComponent } from "react";
import {
  CustomCard,
  CardHeader,
  CardBody,
  CardNoResult,
  AsyncTable
} from "common-components/card";
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
import { get } from "utils/api";
class ActiveSegmentTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      globalSegments: this.props.globalSegments
    };
  }

  getFirst = n => {
    var x = n.firstChild;
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

  onDragEnd = (result, reorder, move) => {
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

      if (source.droppableId === "droppable2") {
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
