import React from 'react';

import {AsyncTable} from 'common-components'
import {TableRow, TableCell} from '@material-ui/core'

const classes = {
    linkStyle: {
        color: '#333',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
}

interface Props {
    tableData : Array<Object>,
    setActiveData: (change: any) => void
}

const ChangeLogTable : React.FC < Props > = ({tableData, setActiveData}) => {
    const NoResult = () => {
        return (
            <div
                style={{
                borderTop: 'solid 1px #eee',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 500
            }}>
                <div>
                    <h3 style={{ color: '#777' }}>No change log is created yet</h3>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {tableData.length > 0
                ? (<AsyncTable
                    headers={['Users', 'Created', 'Time', 'Changes in', '']}
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
