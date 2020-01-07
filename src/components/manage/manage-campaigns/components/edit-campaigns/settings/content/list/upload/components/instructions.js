import React, { useState, useEffect } from 'react'
import SearchBar from '../../../../../../../../common-components/search-bar/SearchBar'
import Pagination from '../../../../../../../../common-components/pagination/PaginationV2'
import { TableRow, TableCell } from '@material-ui/core'
import AsyncTable from '../../../../../../../../common-components/async-table/AsyncTable'

const mock = [
  {
    field: 'first_name',
    constraint: {
      label: 'Max Length',
      value: '50 characters',
      type: 'String'
    },
    description: 'No description',
    id: 1
  },
  {
    field: 'last_name',
    constraint: {
      label: 'Max Length',
      value: '75 characters',
      type: 'String'
    },
    description: 'No description',
    id: 2
  },
  {
    field: 'gender',
    constraint: {
      label: 'Choices',
      value: 'F - Female, M - Male',
      type: 'String'
    },
    description: 'No description',
    id: 3
  }
]

const headers = ['ID', 'Field', 'Constraints', 'Description']

const Instructions = () => {
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
        headers={['field']}
      />
      <AsyncTable
        headers={headers}
        customHeight={335}
        tableData={list}
        render={(list, { row, cell }) =>
          list.map((item, i) => (
            <TableRow key={i} className={row}>
              <TableCell className={cell}>{item.id}</TableCell>
              <TableCell className={cell}>{item.field}</TableCell>
              <TableCell className={cell}>
                <span>
                  {item.constraint.label}: {item.constraint.value}
                </span>
                <br />
                <span>Type: {item.constraint.type}</span>
              </TableCell>
              <TableCell className={cell}>{item.description}</TableCell>
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

export default Instructions
