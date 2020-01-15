import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";
import { Minimize, DragHandle } from "@material-ui/icons";

const Column = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  &:nth-child(odd) {
    background: #ffffff;
  }
`;

const ColumnData = styled.div`
  flex: 1;
`;

const NameText = styled(Typography)`
  color: #444851;
  margin: 0;
  padding: 0;
  font-weight: 500 !important;
  font-size: 14px !important;
`;

const SubText = styled(Typography)`
  color: #777777;
  margin: 0;
  padding: 0;
  margin-top: -2px !important;
  font-size: 14px !important;
`;

const Title = styled.div`
  margin-left: 20px;
`;

const Option = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Link = styled.a`
  color: #444851;
  text-decoration: underline;
  font-size: 14px !important;
  cursor: pointer !important;
  font-weight: 500 !important;
  margin-top: 0.6rem !important;
`;

export default (props) => {
  function removeVoiceBtn() {
    return (
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "1.2rem"
        }}
        onClick={(e) => props.removeItem(props.data)}
      >
        <Minimize
          style={{
            width: "14px",
            height: "2px",
            backgroundColor: "#444851",
            marginRight: "8.5px"
          }}
        />
        <Typography style={{ fontSize: "14px", fontWeight: "500" }}>
          Remove
        </Typography>
      </Link>
    );
  }

  return (
    <Draggable
      isDragDisabled={props.type === "active"}
      draggableId={props.draggableId}
      index={props.index}
    >
      {(provided) => (
        <Column
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div style={{ height: "45px" }}>
            {props.type !== "active" && (
              <DragHandle
                style={{
                  marginLeft: "20px",
                  marginRight: "21px"
                }}
              />
            )}
          </div>
          <ColumnData
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: props.type === "active" ? "20px" : "0px"
            }}
          >
            <NameText>{props.data.name}</NameText>
            <SubText>{props.data.type}</SubText>
          </ColumnData>
          {props.type === "active" && removeVoiceBtn()}
        </Column>
      )}
    </Draggable>
  );
};
