import React, {useState} from 'react';
import {AsyncTable, TableNoResult} from 'common-components'
import {TableRow, TableCell} from '@material-ui/core'
import styled from 'styled-components'
import {
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@material-ui/icons'
const classes = {
    linkStyle: {
        color: '#333',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
}
const Span = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`
interface Props {
    tableData : Array<Object>,
    setActiveData: (change: any) => void
    onSortData: (isSorted: boolean, type:string) => void
}
const ChangeLogTable : React.FC < Props > = ({tableData, setActiveData, onSortData}) => {
    const [sortedUser, setSortedUser] = useState(true)
    const [sortedCreated, setSortedCreated] = useState(true)
  
    const onSort = (type:string) => {
      if (type === 'user') {
        setSortedUser(!sortedUser)
        onSortData(!sortedUser, type)
      }
      if (type === 'created') {
        setSortedCreated(!sortedCreated)
        onSortData(!sortedCreated, type)
      }
    }
    const NoResult = () => {
        return (
          <TableNoResult
            headerText="Change log"
            mainMessage="No change log is created yet"
            subMessage=""
            renderButton={ <></>}
          />
        )
    }
    return (
        <React.Fragment>
            {tableData.length > 0
                ? (<AsyncTable
                    headers={[
                    <Span onClick={() => onSort('user')}>
                      User
                      {sortedUser ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                    </Span>, 
                    <Span onClick={() => onSort('created')}>
                      Created
                      {sortedCreated ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                    </Span>, 'Time', 'Changes in', '']}
                    tableData={tableData}
                    render={(changes : any, {row, cell, icon} : any) => {
                    return changes.map((change : any, i : number) => (
                        <TableRow key={i} className={row}>
                            <TableCell className={cell}>{change.user}</TableCell>
                            <TableCell className={cell}>{change.created}</TableCell>
                            <TableCell className={cell}>{change.time}</TableCell>
                            <TableCell className={cell}>
                                {Object
                                    .keys(change.changed_fields)
                                    .join(', ')}
                            </TableCell>
                            <TableCell className={cell}>
                                <span
                                    onClick={() => {
                                    setActiveData(change)
                                }}
                                    style={classes.linkStyle}>
                                    Details
                                </span>
                            </TableCell>
                        </TableRow>
                    ))
                }}/>)
                : (<NoResult/>)}
        </React.Fragment>
    )
}
export default ChangeLogTable