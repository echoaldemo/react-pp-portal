import TableRow from '@material-ui/core/TableRow'
import CopyIcon from '@material-ui/icons/FilterNone'
import Icon from '@mdi/react'
import { mdiContentCopy } from '@mdi/js'
import CodeIcon from '@material-ui/icons/Code'
import EyeIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/Visibility'

import TableCell from '@material-ui/core/TableCell'
import {
  AsyncTable,
  ActiveCell,
  UnderlineCell
} from 'common-components/table-cells/TableCells'
import CircularProgress from '@material-ui/core/CircularProgress'

import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Typography, Button, Menu, MenuItem, Dialog } from '@material-ui/core'
import EditButton from 'common-components/EditButton/EditButton'
// import DeleteSegment from "./DeleteSegment";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip)

function SegmentTable({
  userData,
  headers,
  innerLoading,
  handleClickOpen,
  closeF,
  openDelete
}) {
  //
  const [copy, setCopy] = useState(false)
  const [delForm, setDelForm] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [activeData, setActiveData] = React.useState(null)

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget)
    setActiveData(data)
  }

  const openDelete1 = () => {
    openDelete(activeData)
    setAnchorEl(null)
  }

  const closeDelete = () => {
    setDelForm(false)
    closeF()
  }

  const handClose = () => {
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
    handleClickOpen(activeData)
  }
  return (
    <React.Fragment>
      {innerLoading === true ? (
        <div style={{ height: '100%' }}>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <CircularProgress />
          </div>
        </div>
      ) : null}
      {
        <>
          <AsyncTable
            headers={headers}
            tableData={userData}
            render={(companies, { row, cell, icon }) => {
              return companies.map(company => (
                <TableRow className={row} key={company.uuid} id="demo-body">
                  <UnderlineCell className={cell}>{company.name}</UnderlineCell>
                  <TableCell className={cell} style={{ color: '#777777' }}>
                    {company.slug}
                  </TableCell>

                  <TableCell
                    className={cell}
                    style={{
                      color: '#777777',
                      height: '100%'
                    }}
                    text={company.type}
                  >
                    {company.type}
                  </TableCell>
                  <TableCell
                    className={cell}
                    style={{
                      color: '#777777',
                      width: 'fit-content',
                      height: '100%',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                    text={company.uuid}
                  >
                    <p
                      style={{
                        overflow: 'hidden',
                        width: '130px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        margin: 0,
                        marginRight: '10px',
                        padding: 0
                      }}
                    >
                      {company.uuid}
                    </p>

                    <CopyToClipboard
                      text={company.uuid}
                      onCopy={() => setCopy(true)}
                      onPointerLeave={() => setCopy(false)}
                    >
                      {copy ? (
                        <LightTooltip title="UUID Copied!" placement="top">
                          <Icon path={mdiContentCopy} size={1} rotate={360} />
                        </LightTooltip>
                      ) : (
                        <LightTooltip title="Copy UUID" placement="top">
                          <Icon path={mdiContentCopy} size={1} rotate={360} />
                        </LightTooltip>
                      )}
                    </CopyToClipboard>
                  </TableCell>
                  <ActiveCell className={cell} style={{ color: '#777777' }}>
                    {company.active}
                  </ActiveCell>
                  <TableCell className={cell}>
                    <Button
                      // onClick={this.props.onClickFunc}
                      style={{
                        textTransform: 'none',
                        color: '#444851',
                        display: 'flex',
                        margin: 5,
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <ViewIcon
                        style={{
                          fontSize: 14
                        }}
                      />
                      &nbsp;
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          textDecoration: 'underline',
                          color: '#444851'
                        }}
                      >
                        View
                      </span>
                    </Button>
                  </TableCell>
                  <TableCell className={cell}>
                    <EditButton
                      text="Edit"
                      onClickFunc={e => handleClick(e, company)}
                      style={{
                        color: '#444851',
                        display: 'flex',
                        margin: 5,
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            }}
          />
          <Menu
            onClose={handClose}
            style={{ marginTop: 40 }}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
          >
            <MenuItem
              onClick={handleClose}
              style={{
                color: '#777777',
                width: 250,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <CodeIcon />{' '}
              <Typography style={{ marginLeft: 40 }}>XML</Typography>
            </MenuItem>
            <MenuItem
              onClick={openDelete1}
              style={{
                color: '#777777',
                width: 250,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <DeleteIcon />{' '}
              <Typography style={{ marginLeft: 40 }}>Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      }
    </React.Fragment>
  )
}
export default withRouter(SegmentTable)
