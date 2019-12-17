import React, { createElement } from "react";
// import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import { DNDCards } from "common-components";
const stories = storiesOf("Drag and Drop", module);
const card1DummyData = [
  { name: "data1-1", uuid: "data1-1" },
  { name: "data1-2", uuid: "data1-2" },
  { name: "data1-3", uuid: "data1-3" }
];
const card2DummyData = [
  { name: "data2-1", uuid: "data2-1" },
  { name: "data2-2", uuid: "data2-2" },
  { name: "data2-3", uuid: "data2-3" }
];
const card3DummyData = [
  { name: "data3-1", uuid: "data3-1" },
  { name: "data3-2", uuid: "data3-2" },
  { name: "data3-3", uuid: "data3-3" }
];
stories.add("DNDCards", () =>
  createElement(() => {
    return (
      <>
        <DNDCards
          addButton3={true}
          addFunction3={() => null}
          card1Title="Active segments"
          card2Title="Global segments"
          card3Title="Company segments"
          card1Data={card1DummyData}
          card2Data={card2DummyData}
          card3Data={card3DummyData}
          handleClickOpen={() => null}
          setActiveData={() => null}
          saveActiveSegment={() => null}
          // card3Popover={
          //   <div>
          //     <MenuItem
          //       onClick={() =>
          //         this.handleClickOpen(this.state.activeData)
          //       }
          //       style={{
          //         color: "#777777",
          //         width: 250,
          //         paddingTop: 0,
          //         paddingBottom: 0
          //       }}
          //     >
          //       <CodeIcon />{" "}
          //       <Typography style={{ marginLeft: 40 }}>
          //         XML
          //       </Typography>
          //     </MenuItem>
          //     <MenuItem
          //       // onClick={handleClose}
          //       style={{
          //         color: "#777777",
          //         width: 250,
          //         paddingTop: 0,
          //         paddingBottom: 0
          //       }}
          //     >
          //       <EyeIcon />{" "}
          //       <Typography style={{ marginLeft: 40 }}>
          //         Variables
          //       </Typography>
          //     </MenuItem>
          //     <MenuItem
          //       onClick={() =>
          //         this.setState({ openDelete: true })
          //       }
          //       style={{
          //         color: "#777777",
          //         width: 250,
          //         paddingTop: 0,
          //         paddingBottom: 0
          //       }}
          //     >
          //       <DeleteIcon />{" "}
          //       <Typography style={{ marginLeft: 40 }}>
          //         Delete
          //       </Typography>
          //     </MenuItem>
          //   </div>
          // }
        />
      </>
    );
  })
);
