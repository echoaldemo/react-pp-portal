# ** Async Table **

## Sample Code

```
import React from 'react'
import AsyncTable from './AsyncTable'
import { TableRow, TableCell } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { UnderlineCell, ActiveCell, LiveCell } from '../table-cells/TableCells'
//common-components

const sampleData = [
  { name: 'test', slug: 'test', uuid: 'uuid', live: true, active: true },
  { name: 'test', slug: 'test', uuid: 'uuid1', live: false, active: false }
]

const Table = () => {
  return (
    <AsyncTable
      headers={['Name', 'Slug', 'UUID', 'live', 'active', '']}
      tableData={sampleData}
      render={(samples, { row, cell }) =>
        samples.map(sample => (
          <TableRow className={row} key={sample.uuid}>
            <UnderlineCell className={cell}>{sample.name}</UnderlineCell>
            <TableCell className={cell}>{sample.slug}</TableCell>
            <TableCell className={cell}>{sample.uuid}</TableCell>
            <LiveCell className={cell}>{sample.live}</LiveCell>
            <ActiveCell className={cell}>{sample.active}</ActiveCell>
            <TableCell className={cell}>
              <Settings />
            </TableCell>
          </TableRow>
        ))
      }
    />
  )
}

export default Table
```

### Props

| Name      | Type   |          | Description      |
| --------- | ------ | -------- | ---------------- |
| headers   | array  | required | array of headers |
| tableData | array  | required | array of data    |
| render    | method | required | render the table |
