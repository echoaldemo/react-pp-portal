import React, { useEffect, useState } from 'react'
import Modal from '../../../../../../../common-components/Modal'
import SearchBar from '../../../../../../../common-components/search-bar/SearchBar'
import AsyncTable from '../../../../../../../common-components/async-table/AsyncTable'
import { TableRow, TableCell } from '@material-ui/core'
import styled from 'styled-components'

const Container = styled.div`
  background: #fafafa;
`
const data = [
  {
    uuid: 'eb37d2a0-eaa8-11e8-a215-5254001397e0',
    time_called: 'Jan. 2, 2019 3:55 p.m.',
    status: 'No answer',
    disposition: '-',
    revenue: '-',
    duration: '44',
    direction: 'Outbound',
    hangup_cause: 'Normal_clearing',
    prospect_did: '3903946729',
    rep: '-',
    location: '-'
  }
]

const History = ({ state, setState }) => {
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
        headers={['uuid', 'prospect_did', 'hangup_cause', 'direction']}
      />
      <Container>
        <AsyncTable
          headers={[
            'UUID',
            'Called',
            'Status',
            'Disposition',
            'Revenue',
            'Duration',
            'Direction',
            'Hangup cause',
            'Prospect DID',
            'Rep',
            'Location'
          ]}
          tableData={data}
          render={(samples, { row, cell, uuid, icon }) =>
            samples.map(sample => (
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
  )
}

export default History
