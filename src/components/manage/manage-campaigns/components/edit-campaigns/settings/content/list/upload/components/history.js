import React, { useState, useEffect } from 'react'
import SearchBar from '../../../../../../../../common-components/search-bar/SearchBar'
import Pagination from '../../../../../../../../common-components/pagination/PaginationV2'
import { TableRow, TableCell } from '@material-ui/core'
import AsyncTable from '../../../../../../../../common-components/async-table/AsyncTable'
import { ActiveCell } from '../../../../../../../../common-components/table-cells/TableCells'

const mock = [
  {
    date: 'Nov. 24, 2018',
    processed: 'Yes',
    storage: 'S3',
    attempt: 28295,
    valid: 27805,
    dupe: 242,
    dnc: 233,
    invalid: 15
  }
]

const headers = [
  'Date',
  'Processed',
  'Storage engine',
  'Attempted',
  'Valid',
  'Dupes',
  'DNC',
  'Invalid'
]

const History = () => {
  const [list, setList] = useState([])
  const [paginateList, setPaginateList] = useState([])

  useEffect(() => {
    setList(mock)
    setPaginateList(mock)
  }, [])

  const paginate = (from, to) => {
    setList(paginateList.slice(from, to))
  }

  return (
    <div>
      <SearchBar
        customTitle="Search lists"
        userData={list}
        headers={['date', 'storage']}
      />
      <AsyncTable
        headers={headers}
        customHeight={335}
        tableData={list}
        render={(list, { row, cell }) =>
          list.map((item, i) => (
            <TableRow key={i} className={row}>
              <TableCell className={cell}>{item.date}</TableCell>
              <ActiveCell className={cell}>{item.processed}</ActiveCell>
              <TableCell className={cell}>{item.storage}</TableCell>
              <TableCell className={cell}>{item.attempt}</TableCell>
              <TableCell className={cell}>{item.valid}</TableCell>
              <TableCell className={cell}>{item.dupe}</TableCell>
              <TableCell className={cell}>{item.dnc}</TableCell>
              <TableCell className={cell}>{item.invalid}</TableCell>
            </TableRow>
          ))
        }
      />
      {Boolean(paginateList.length) && (
        <Pagination
          paginateFn={paginate}
          totalItems={paginateList.length}
          paginateList={paginateList}
          itemsPerPage={6}
        />
      )}
    </div>
  )
}

export default History
