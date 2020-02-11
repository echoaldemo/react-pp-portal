import React from "react";
import { Modal, SearchBar, AsyncTable } from "common-components";
import { TableRow, TableCell } from "@material-ui/core";
import { Container } from "../styles";

const data = [
  {
    uuid: "eb37d2a0-eaa8-11e8-a215-5254001397e0",
    time_called: "Jan. 2, 2019 3:55 p.m.",
    status: "No answer",
    disposition: "-",
    revenue: "-",
    duration: "44",
    direction: "Outbound",
    hangup_cause: "Normal_clearing",
    prospect_did: "3903946729",
    rep: "-",
    location: "-"
  }
];

interface IProps {
  state: any;
  setState: any;
}

const History: React.FC<IProps> = ({ state, setState }) => {
  return (
    <Modal
      open={state.history}
      title="History"
      width="85vw"
      onClose={() => setState({ ...state, history: false })}
    >
      <SearchBar
        title="Prospect Call"
        userData={data}
        headers={["uuid", "prospect_did", "hangup_cause", "direction"]}
      />
      <Container>
        <AsyncTable
          headers={[
            "UUID",
            "Called",
            "Status",
            "Disposition",
            "Revenue",
            "Duration",
            "Direction",
            "Hangup cause",
            "Prospect DID",
            "Rep",
            "Location"
          ]}
          tableData={data}
          render={(samples: any, { row, cell, uuid, icon }: any) =>
            samples.map((sample: any) => (
              <TableRow className={row} key={sample.uuid}>
                <TableCell className={uuid}>
                  <p>{sample.uuid}</p>
                </TableCell>
                <TableCell className={cell}>{sample.time_called}</TableCell>
                <TableCell className={cell}>{sample.status}</TableCell>
                <TableCell className={cell}>{sample.disposition}</TableCell>
                <TableCell className={cell}>{sample.revenue}</TableCell>
                <TableCell className={cell}>{sample.duration}</TableCell>
                <TableCell className={cell}>{sample.direction}</TableCell>
                <TableCell className={cell}>{sample.hangup_cause}</TableCell>
                <TableCell className={cell}>{sample.prospect_did}</TableCell>
                <TableCell className={cell}>{sample.rep}</TableCell>
                <TableCell className={cell}>{sample.location}</TableCell>
              </TableRow>
            ))
          }
        />
      </Container>
    </Modal>
  );
};

export default History;
