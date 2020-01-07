import React, { useState, useEffect } from 'react'
import { data } from './mockData'
import SearchBar from '../../../../../../common-components/search-bar/SearchBar'
import Pagination from '../../../../../../common-components/pagination/PaginationV2'
import QATable from './qa-table/QATable'

const QA = () => {
  const [qa, setQA] = useState([])
  const [paginateList, setPaginateList] = useState([])

  useEffect(() => {
    setQA(data)
    setPaginateList(data)
  }, [])

  const paginate = (from, to) => {
    setQA(paginateList.slice(from, to))
  }

  const sortFirstName = () => {
    const sorted = qa.sort((a, b) => a.first_name.localeCompare(b.first_name))
    setQA(sorted)
    setPaginateList(sorted)
  }

  return (
    <div>
      <SearchBar
        title="Prospect"
        userData={qa}
        headers={['first_name', 'last_name']}
      />
      <QATable qa={qa} sortFirstName={sortFirstName} />
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

export default QA
