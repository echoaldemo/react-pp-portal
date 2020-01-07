import React, { useContext } from 'react'
import Top from './components/Top'
import Table from './components/ListTable'
import SearchBar from '../../../../../../common-components/search-bar/SearchBar'
import { Divider } from '@material-ui/core'
import Upload from './upload/'
import { store } from './store'
const List = () => {
  const { state } = useContext(store)

  return (
    <>
      {state.list ? (
        <>
          <Top />
          <Divider />
          <SearchBar
            title="list"
            userData={[]}
            headers={['id', 'name']}
            loading={false}
          />
          <Table />
        </>
      ) : (
        <Upload />
      )}
    </>
  )
}

export default List
