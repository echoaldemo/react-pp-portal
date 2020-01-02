// Reusable component for making tables

import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  MuiThemeProvider
} from '@material-ui/core'

import { useStyles, theme } from './styles'

interface Props {
  headers: any
  tableData: any
  render: Function
  customHeight?: number | string
  withBorder?: boolean
}
interface CheckProps {
  clickFn: Function
  state: boolean
  label: string
}
interface HeaderProps {
  clickFn: Function
  state: boolean
  title: string
  check: boolean
}

const AsyncTable: React.FC<Props> = ({
  headers,
  tableData,
  render,
  customHeight,
  withBorder
}) => {
  const classes: any = useStyles()
  const CheckBoxLabel = ({ clickFn, state, label }: CheckProps) => {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '0fr 1fr'
            }}
          >
            <Checkbox
              onClick={() => clickFn()}
              color="primary"
              checked={state}
              style={{
                padding: '0 20px 0 7px'
              }}
            />
            <p onClick={() => clickFn()} className={classes.overflowClass}>
              {label}
            </p>
          </div>
        </MuiThemeProvider>
      </>
    )
  }

  const renderHeaders: Function = () => {
    return (
      headers && (
        <TableHead>
          <TableRow className={classes.headerRow}>
            {headers.map((header: HeaderProps, idx: number) =>
              header.check ? (
                <TableCell className={classes.header} key={idx}>
                  <CheckBoxLabel
                    key={idx}
                    label={header.title}
                    state={header.state}
                    clickFn={header.clickFn}
                  />
                </TableCell>
              ) : (
                <TableCell className={classes.header} key={idx}>
                  <span className={classes.overflowClass}>{header}</span>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
      )
    )
  }

  const cellAdjust: Function = () => {
    return (
      <colgroup>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(e => (
          <col key={e} style={{ width: '7.69230769231%' }} />
        ))}
      </colgroup>
    )
  }

  const renderTableBody: Function = () => {
    return (
      <TableBody>
        {render(tableData, {
          row: classes.row,
          cell: classes.cell,
          userCell: classes.userCell,
          emailCell: classes.emailCell,
          uuid: classes.uuid,
          icon: classes.icon,
          fixedCell: classes.fixedCell,
          overflow: classes.overflowClass
        })}
      </TableBody>
    )
  }

  return (
    <div className={classes.rootClass} style={{ minHeight: customHeight }}>
      <Table
        className={classes.table}
        style={
          withBorder ? { border: '.5px solid #eeeeee' } : { border: 'none' }
        }
      >
        {cellAdjust()}
        {renderHeaders()}
        {renderTableBody()}
      </Table>
    </div>
  )
}

AsyncTable.defaultProps = {
  headers: [],
  tableData: [],
  render: () => null,
  classes: [],
  customHeight: 500,
  withBorder: false
} as Partial<Props>

export { AsyncTable }
