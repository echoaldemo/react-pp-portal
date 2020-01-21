import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: '3px',
    border: '1px solid #eeeeee',
    margin: '15px'
  },
  table: {
    minWidth: 750,
    backgroundColor: '#fbfbfb'
  },
  header: {
    fontFamily: 'Roboto',
    fontSize: '12.5px',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#444851',
    paddingTop: '20px',
    paddingBottom: '20px',
    width: '25%'
  },
  data: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#777777',
    paddingTop: '25px',
    paddingBottom: '25px'
  }
}))

const ListSummary = () => {
  const classes = useStyles()

  function CustomTable({ header, data }) {
    return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>{header[0]}</TableCell>
            <TableCell className={classes.header}>{header[1]}</TableCell>
            <TableCell className={classes.header}>{header[2]}</TableCell>
            <TableCell className={classes.header}>{header[3]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ background: 'white' }}>
          <TableRow key="name">
            <TableCell className={classes.data}>{data[0]}</TableCell>
            <TableCell className={classes.data}>{data[1]}</TableCell>
            <TableCell className={classes.data}>{data[2]}</TableCell>
            <TableCell className={classes.data}>{data[3]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <>
      <div className={classes.container}>
        <CustomTable
          header={[
            'Number of prospects',
            'Resolved prospects',
            'Qualified prospects',
            'Active prospects'
          ]}
          data={['5781', '1966', '0', '0']}
        />
        <CustomTable
          header={[
            'Callable prospects',
            'Outbound attempted calls',
            'Conversion',
            'Schedule prospects'
          ]}
          data={['0', '7796', '0.21%', '0']}
        />
        <CustomTable
          header={['Talk time', 'Penetrations', 'ASR', 'ICR']}
          data={['10.68', '1.35', '38.3402 %', '5.9476 %']}
        />
        <CustomTable
          header={[
            'Active penetration',
            'Completion',
            'Prospect contacted rate',
            'Call contacted rate'
          ]}
          data={['1.46', '34.01%', '12.71%', '9.49%']}
        />
      </div>
    </>
  )
}

export default ListSummary
