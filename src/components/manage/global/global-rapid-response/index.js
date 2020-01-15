import React from 'react'
import Tabs from './components/Tabs'
import { Paper, Divider } from '@material-ui/core'
// import NoTests from '../global-rr-test/components/NoResult'
import { get } from 'utils/api'
import RRTTable from './components/Table'
import CreateNewTestsModal from './components/NewUser/Dialog'
import SEO from 'utils/seo'

import {
  HeaderLink,
  HeaderButton,
  TableLoader,
  SearchBar,
  Pagination
} from 'common-components'

export default function GlobalRapidResponse(props) {
  const [loading, setLoading] = React.useState(true)
  const [tests, setTests] = React.useState([])
  const [filterList, setFilterList] = React.useState([])
  const [paginateList, setPaginateList] = React.useState([])
  const [modal, setModal] = React.useState({
    create: false
  })

  React.useEffect(() => {
    get('/pitch/global/rapid-response/tests/').then(res => {
      setTests(res.data)
      setFilterList(res.data)
      setPaginateList(res.data)
      setLoading(false)
    })
  }, [])

  const handleUpdate = () => {
    setLoading(true)
    get('/pitch/global/rapid-response/tests/').then(res => {
      setTests(res.data)
      setFilterList(res.data)
      setPaginateList(res.data)
      setLoading(false)
    })
  }
  const paginate = (from, to) => {
    setTests(paginateList.slice(from, to))
  }

  return (
    <div style={{ minHeight: '100%' }}>
      <SEO title="Manage Rapid Response" />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 30
        }}
      >
        <HeaderLink
          menu={[
            {
              title: 'Phrase Books',
              path: '/manage/global-pitch-phrasebooks/'
            },
            {
              title: 'Segments',
              path: '/manage/global-pitch-segments/'
            },
            {
              title: 'Option Group',
              path: '/manage/global-option-group'
            }
          ]}
          title="Rapid Response"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {Boolean(tests.length) && (
            <HeaderButton
              buttonText="New test"
              openFunction={() => setModal({ create: true })}
            />
          )}
          <Tabs
            tabs={[
              {
                name: 'RESPONSE TEST',
                active: true,
                path: '#'
              },
              {
                name: 'RESPONSE SEGMENTS',
                active: false,
                path: '/manage/global-rapid-response/segments'
              }
            ]}
          />
        </div>
      </div>

      <Paper style={{ height: 'auto', minHeight: 100 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'space-between',
            height: 'auto'
          }}
        >
          <div style={{ width: '100%' }}>
            <SearchBar
              title="tests"
              userData={tests}
              headers={['name', 'slug', 'uuid']}
              loading={loading}
              link={true}
              active={true}
              live={true}
              pathnameData={{
                firstLink: `/manage/rapid-response-tests/global/edit/`,
                fetchData: ['uuid'],
                lastLink: `/menu/`
              }}
            />
            <Divider />
            {loading ? (
              <TableLoader />
            ) : tests.length ? (
              <RRTTable
                DataNotFound={filterList}
                testsData={tests}
                handleUpdated={handleUpdate}
                innerLoading={false}
                headers={[
                  'Name',
                  'Slug',
                  'Final Revenue',
                  'Test Type',
                  'UUID',
                  'Live/Off',
                  'Active',
                  ' '
                ]}
              />
            ) : (
              // <NoTests
              //   open={true}
              //   newTestOpen={() => setModal({ create: true })}
              // />
              <></>
            )}
          </div>
          <div style={{ width: '100%' }}>
            <Divider />
            {!loading && Boolean(paginateList.length) && (
              <Pagination
                paginateFn={paginate}
                totalItems={paginateList.length}
                paginateList={paginateList}
                itemsPerPage={6}
              />
            )}
          </div>
        </div>
      </Paper>

      <CreateNewTestsModal
        open={modal.create}
        closeFn={() => setModal({ create: false })}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}
