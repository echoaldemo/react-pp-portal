import React, { useState } from 'react'
import { TableRow, TableCell, Menu } from '@material-ui/core'
import { Settings, KeyboardArrowDown } from '@material-ui/icons'
import AsyncTable from '../../../../../../../common-components/async-table/AsyncTable'
import { MenuItem } from '../constVar'
import SendPost from '../send-post/SendPost'
import EditProspect from '../edit-prospect/EditProspect'
import History from '../history/History'
import styled from 'styled-components'

const Span = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const QATable = ({ qa, sortFirstName }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [state, setState] = useState({
    post: false,
    postUUID: '1',
    edit: false,
    history: false
  })
  const [current, setCurrent] = useState({})

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            setState({ ...state, edit: true })
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            setState({ ...state, post: true })
          }}
        >
          Send post
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            setState({ ...state, history: true })
          }}
        >
          History
        </MenuItem>
      </Menu>
      <SendPost state={state} setState={setState} />
      <EditProspect state={state} setState={setState} current={current} />
      <History state={state} setState={setState} />
      <AsyncTable
        headers={[
          <Span onClick={sortFirstName}>
            First name
            <KeyboardArrowDown />
          </Span>,
          <Span>
            Last name
            <KeyboardArrowDown />
          </Span>,
          'Disposition',
          'Quality',
          'NCS',
          'Location',
          <Span>
            Prospect list
            <KeyboardArrowDown />
          </Span>,
          'Submits',
          ''
        ]}
        tableData={qa}
        render={(qaDatas, { row, cell }) =>
          qaDatas.map((qaData, i) => (
            <TableRow key={i} className={row}>
              <TableCell className={cell}>{qaData.first_name}</TableCell>
              <TableCell className={cell}>{qaData.last_name}</TableCell>
              <TableCell className={cell}>{qaData.disposition}</TableCell>
              <TableCell className={cell}>
                {qaData.quality ? qaData.quality : '-'}
              </TableCell>
              <TableCell className={cell}>
                {qaData.ncs ? qaData.ncs : '-'}
              </TableCell>
              <TableCell className={cell}>{qaData.location}</TableCell>
              <TableCell className={cell}>
                <p>{qaData.prospect}</p>
              </TableCell>
              <TableCell className={cell}>
                {qaData.submits ? qaData.submits : '-'}
              </TableCell>
              <TableCell className={cell} align="right">
                <Settings
                  style={{ cursor: 'pointer' }}
                  onClick={e => {
                    setAnchorEl(e.currentTarget)
                    setCurrent(qaData)
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        }
      />
    </>
  )
}
export default QATable
