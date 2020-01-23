import React, { useState, useEffect } from 'react'

import {
  AsyncTable,
  SearchBar,
  TableLoader,
  ActiveCell,
  TruthCell,
  EditButton,
  Pagination,
  SuccessModal,
  LoadingModal
} from 'common-components'

import { TableCell, TableRow, Paper, Divider } from '@material-ui/core'
import { RotateRight as Rotate } from '@material-ui/icons'
import styled from 'styled-components'
import { cancel } from 'utils/api'
import EditDIDModal from './edit-did/EditDIDModal'
import SuccessRotate from './SuccessRotateModal'
// import SuccessRotate from '../../settings/components/SuccessRotateModal'
import Modal from '@material-ui/core/Dialog'
//mock data
import { data } from './did-mock-data'
const headers = [
  'Number',
  '',
  'Time Zone',
  'Status',
  'Owned',
  'Actual CNam',
  'Cnam valid',
  ''
]

const SearchContainer = styled.div`
  width: 98%;
  margin-bottom: 10px;
`

const DIDTable = ({
  openEdit,
  handleOpenEdit,
  handleCloseEdit,
  editData,
  history,
  didList,
  fetchDIDList,
  campaignSlug,
  companySlug
}) => {
  const [didData, setDidData] = useState([])
  const [paginateData, setPaginateData] = useState([])
  const [loading, setLoading] = useState(true)
  const [rotateValidation, setRotateValidation] = useState(false)
  const [didRotateData, setDidRotateData] = useState([])
  const [rotatingDid, setRotatingDid] = useState(false)
  const [rotatedDid, setRotatedDid] = useState(false)

  useEffect(() => {
    fetchDid()
  }, [didList])

  function fetchDid() {
    setLoading(true)
    // if (didList.length > 0) {
    //   setDidData(didList)
    //   setPaginateData(didList)
    //   setLoading(false)
    // }
    setDidData(data)
    setPaginateData(data)
    setLoading(false)
  }

  async function afterUpdateFetchDid(data) {
    setLoading(true)
    fetchDIDList()
  }

  function renderSearch() {
    let parseData = paginateData.map(key => {
      let uuid = key.uuid
      delete key.uuid
      key.uuid = uuid
      return key
    })
    return (
      <>
        <SearchContainer>
          <SearchBar
            active={true}
            title="DID"
            userData={parseData}
            headers={['number', 'timezone']}
          />
        </SearchContainer>
        <Divider
          style={{
            margin: '-11px 0 16px 0'
          }}
        />
      </>
    )
  }

  function paginate(from, to) {
    setDidData(paginateData.slice(from, to))
  }

  function renderTable() {
    return (
      <Paper>
        {renderSearch()}
        <AsyncTable
          headers={headers}
          tableData={didData}
          render={(pools, { row, cell, userCell, uuid, icon }) =>
            pools.map(pool => (
              <TableRow className={row} key={pool.uuid}>
                <TableCell
                  style={{ textDecoration: 'underline', color: '#444851' }}
                  className={userCell}
                >
                  {pool.number || 'Field not set'}
                </TableCell>
                <TableCell className={userCell}>
                  <p
                    style={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      display: 'flex',
                      color: '#444851'
                    }}
                    onClick={() => {
                      setRotateValidation(true)
                      setDidRotateData(pool)
                    }}
                  >
                    <Rotate
                      style={{
                        width: '20px',
                        height: '18px',
                        backgroundColor: '#444851,'
                      }}
                    />
                    {'Rotate'}
                  </p>
                </TableCell>
                <TableCell className={userCell}>
                  <p>{pool.timezone || 'Field not set'}</p>
                </TableCell>

                <ActiveCell className={userCell}>{pool.active}</ActiveCell>
                <TruthCell className={userCell}>{pool.owned}</TruthCell>
                <TableCell className={userCell}>
                  {pool.cname_string.length > 0
                    ? pool.cname_string
                    : 'Field not set'}
                </TableCell>
                <TruthCell className={userCell}>{pool.cname_valid}</TruthCell>
                <TableCell className={userCell} align="right">
                  {/* <Link to={`/manage/did-pool/edit/${pool.uuid}`}> */}
                  <EditButton
                    text="Edit"
                    onClickFunc={() => {
                      handleOpenEdit(pool)
                      console.log(`${companySlug}--- ${campaignSlug}`)
                      console.log(pool)
                    }}
                  />
                  {/* </Link> */}
                </TableCell>
              </TableRow>
            ))
          }
        />
        <Pagination
          paginateFn={paginate}
          totalItems={paginateData.length}
          paginateList={paginateData}
          itemsPerPage={6}
        />
      </Paper>
    )
  }
  return (
    <>
      {!loading ? renderTable() : <TableLoader />}
      <EditDIDModal
        open={openEdit}
        editData={editData}
        handleCloseEdit={handleCloseEdit}
        history={history}
        handleAfterDelete={fetchDid}
        handleAfterUpdate={afterUpdateFetchDid}
      />
      <SuccessModal
        open={rotateValidation}
        text={`Are you sure you want to rotate DID ${didRotateData.number}`}
        closeFn={() => {
          setRotateValidation(false)
        }}
        btnText={'Yes, Rotate'}
        btnFn={() => {
          setRotateValidation(false)
          setRotatingDid(true)
          setTimeout(() => {
            setRotatingDid(false)
            setRotatedDid(true)
          }, 2000)
        }}
        warning
      />
      <LoadingModal
        open={rotatingDid}
        text={`Rotating DID ${didRotateData.number}...`}
        cancelFn={() => {
          setRotatingDid(false)
          cancel()
        }}
      />
      <SuccessModal
        open={rotatedDid}
        text={`You Rotated to a new DID successfully`}
        closeFn={() => {
          setRotatedDid(false)
        }}
      />
      <Modal open={rotatedDid}>
        <SuccessRotate
          text={'You Rotated to a new DID successfully'}
          dids={[]}
          subtitle={
            'The old DID will still be working the next 30 days, then it will be erase.'
          }
          btnText={'BUY ANOTHER'}
          error={true}
          closeFn={() => {
            setRotatedDid(false)
          }}
          btnFn={() => {
            setRotatedDid(false)
          }}
        />
      </Modal>
    </>
  )
}

export default DIDTable
