import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FileCopyOutlined as Icon } from '@material-ui/icons'
import { mdiContentCopy } from '@mdi/js'

import { AsyncTable, ActiveCell, LiveCell, EditButton } from 'common-components'
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip)

export default function Table(props) {
  const { testsData, headers } = props
  const [copy, setCopy] = React.useState(false)

  return (
    <div>
      {Boolean(testsData.length) && (
        <AsyncTable
          headers={headers}
          tableData={testsData}
          render={(rrtests, { row, cell, uuid, icon }) => {
            return rrtests.map(rrtest => (
              <TableRow className={row} key={rrtest.uuid} id="demo-body">
                <TableCell className={cell} style={{ maxWidth: 250 }}>
                  <Link
                    to={{
                      pathname: `/manage/rapid-response-tests/global/edit/${rrtest.uuid}/menu/`,
                      state: { rrtest }
                    }}
                    style={{ color: '#444851' }}
                    title={rrtest.name}
                  >
                    {rrtest.name}
                  </Link>
                </TableCell>
                <TableCell
                  className={cell}
                  style={{ color: '#777777', maxWidth: 250 }}
                >
                  {rrtest.slug}
                </TableCell>
                <TableCell
                  className={cell}
                  style={{ color: '#777777', maxWidth: 250 }}
                >
                  {rrtest.final_revenue === null
                    ? 'Field Not Set'
                    : rrtest.final_revenue}
                </TableCell>
                <TableCell
                  className={cell}
                  style={{ color: '#777777', maxWidth: 250 }}
                >
                  {rrtest.test_type === 1 ? 'Long' : 'Short'}
                </TableCell>
                <TableCell className={uuid} text={rrtest.uuid}>
                  <p>{rrtest.uuid}</p>
                  <CopyToClipboard
                    text={rrtest.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        <Icon
                          path={mdiContentCopy}
                          className={icon}
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        <Icon
                          path={mdiContentCopy}
                          className={icon}
                          size={1}
                          rotate={360}
                        />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>
                <LiveCell
                  className={cell}
                  style={{ color: '#777777', maxWidth: 150 }}
                >
                  {rrtest.live}
                </LiveCell>
                <ActiveCell
                  className={cell}
                  style={{ color: '#777777', maxWidth: 150 }}
                >
                  {rrtest.active}
                </ActiveCell>
                <TableCell
                  className={cell}
                  style={{
                    maxWidth: 150
                  }}
                  align="right"
                >
                  <Link
                    to={{
                      pathname: `/manage/rapid-response-tests/global/edit/${rrtest.uuid}/menu/`,
                      state: { rrtest }
                    }}
                  >
                    <EditButton
                      text="Edit"
                      onClickFunc={() => {
                        return null
                      }}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }}
        />
      )}
    </div>
  )
}
