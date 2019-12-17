import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import { AsyncTable } from "..";
import { TableRow, TableCell } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import {
  UnderlineCell,
  ActiveCell,
  LiveCell,
  TruthCell,
  PausedCell
} from "common-components/table-cells";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { mdiContentCopy } from "@mdi/js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import notes from "./notes.md";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const stories = storiesOf("Async Table", module);

const sampleData = [
  {
    name: "test",
    slug: "test",
    uuid: "3d83a30c-0431-11ea-b33e-0242ac110011",
    live: true,
    active: true
  },
  {
    name: "test",
    slug: "test",
    uuid: "3d83a30c-0431-11ea-b33e-0242ac110014",
    live: false,
    active: false
  }
];

stories.add(
  "default",
  () =>
    createElement(() => {
      const [copy, setCopy] = useState(false);
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID"]}
          tableData={sampleData}
          render={(samples, { row, cell, uuid, icon }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <TableCell className={cell}>{sample.name}</TableCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={uuid}>
                  <p>{sample.uuid}</p>
                  <CopyToClipboard
                    text={sample.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        <Icon
                          className={icon}
                          path={mdiContentCopy}
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        <Icon
                          className={icon}
                          path={mdiContentCopy}
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);

stories.add(
  "with underline cell",
  () =>
    createElement(() => {
      const [copy, setCopy] = useState(false);
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID"]}
          tableData={sampleData}
          render={(samples, { row, cell }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={cell}>{sample.uuid}</TableCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);

stories.add(
  "with live cell",
  () =>
    createElement(() => {
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID", "live"]}
          tableData={sampleData}
          render={(samples, { row, cell }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={cell}>{sample.uuid}</TableCell>
                <LiveCell className={cell}>{sample.live}</LiveCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);

stories.add(
  "with active cell",
  () =>
    createElement(() => {
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID", "live", "active"]}
          tableData={sampleData}
          render={(samples, { row, cell }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={cell}>{sample.uuid}</TableCell>
                <LiveCell className={cell}>{sample.live}</LiveCell>
                <ActiveCell className={cell}>{sample.active}</ActiveCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);

stories.add(
  "with button",
  () =>
    createElement(() => {
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID", "live", "active", ""]}
          tableData={sampleData}
          render={(samples, { row, cell, uuid, icon }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={cell}>{sample.uuid}</TableCell>
                <LiveCell className={cell}>{sample.live}</LiveCell>
                <ActiveCell className={cell}>{sample.active}</ActiveCell>
                <TableCell className={cell}>
                  <Settings className={icon} />
                </TableCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);
stories.add(
  "with truth cell",
  () =>
    createElement(() => {
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID", "live", "truth"]}
          tableData={sampleData}
          render={(samples, { row, cell, uuid, icon }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={cell}>{sample.uuid}</TableCell>
                <LiveCell className={cell}>{sample.live}</LiveCell>
                <TruthCell className={cell}>{sample.active}</TruthCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);

stories.add(
  "with paused cell",
  () =>
    createElement(() => {
      return (
        <AsyncTable
          headers={["Name", "Slug", "UUID", "live", "paused"]}
          tableData={sampleData}
          render={(samples, { row, cell, uuid, icon }) =>
            samples.map(sample => (
              <TableRow className={row} key={sample.uuid}>
                <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
                <TableCell className={cell}>{sample.slug}</TableCell>
                <TableCell className={cell}>{sample.uuid}</TableCell>
                <LiveCell className={cell}>{sample.live}</LiveCell>
                <PausedCell className={cell}>{sample.active}</PausedCell>
              </TableRow>
            ))
          }
        />
      );
    }),
  { notes: { markdown: notes } }
);
