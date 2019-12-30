import React, { useState } from 'react'
import {
  AsyncTable,
  ActiveCell,
  UnderlineCell,
  EditButton
} from 'common-components'
import { LightTooltip } from '../utils/style'
import { headers } from '../utils/const-var'
import { DidPoolTableProps } from '../utils/types'
import { TableCell, TableRow } from '@material-ui/core'
import { FileCopyOutlined as Icon } from '@material-ui/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const DIDPoolTable: React.FC<DidPoolTableProps> = ({ state, history }) => {
  const [copy, setCopy] = useState(false)

  return (
    <>
      <AsyncTable
        headers={headers}
        tableData={state.didPools}
        render={(pools: any, { row, cell, uuid, icon }: any) =>
          pools.map((pool: any) => (
            <TableRow className={row} key={pool.uuid}>
              <UnderlineCell
                className={cell}
                onClick={() =>
                  history.push(`/manage/did-pool/edit/${pool.uuid}`)
                }
              >
                {pool.name}
              </UnderlineCell>
              <TableCell className={uuid}>
                <p>{pool.uuid}</p>
                <CopyToClipboard
                  text={pool.uuid}
                  onCopy={() => setCopy(true)}
                  onPointerLeave={() => setCopy(false)}
                >
                  {copy ? (
                    <LightTooltip title="UUID Copied!" placement="top">
                      <Icon className={icon} rotate={360} />
                    </LightTooltip>
                  ) : (
                    <LightTooltip title="Copy UUID" placement="top">
                      <Icon className={icon} rotate={360} />
                    </LightTooltip>
                  )}
                </CopyToClipboard>
              </TableCell>
              <ActiveCell className={cell}>{pool.active}</ActiveCell>
              <ActiveCell className={cell}>
                {pool.allow_inbound ? 'yes' : 'no'}
              </ActiveCell>
              <TableCell
                className={cell}
                style={{ textDecoration: 'underline' }}
              >
                {pool.did_count}
              </TableCell>
              <TableCell className={cell} align="right">
                <EditButton
                  text="Edit"
                  onClickFunc={() =>
                    history.push(`/manage/did-pool/edit/${pool.uuid}`)
                  }
                />
              </TableCell>
            </TableRow>
          ))
        }
      />
    </>
  )
}

export default DIDPoolTable
