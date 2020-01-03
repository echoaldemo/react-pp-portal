import React, { useEffect, useState } from 'react'
import HeaderButton from '../../common-components/HeaderButton/HeaderButton'
import HeaderContainer from '../../common-components/HeaderContainer/HeaderContainer'
import HeaderLink from '../../common-components/HeaderLink/HeaderLink'
import SearchBar from '../../common-components/search-bar/SearchBar'
import TableLoader from '../../common-components/table-loader/TableLoader'
import FilterToolBar from '../../common-components/filter/FilterToolBar'
import Pagination from '../../common-components/pagination/PaginationV2'
import InputField from '../../common-components/input-field/InputField'
import Modal from '../../common-components/Modal/'
import LoadingModal from '../../common-components/loading-modal/LoadingModal'
import SuccessModal from '../../common-components/success-modal/SuccessModal'
import TableNoResult from '../../common-components/table-no-result/'
import { Divider, Paper, InputAdornment, Dialog } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import {
  Container,
  menus,
  BtnCont,
  Switch,
  SaveButton,
  CancelBtn,
  constCreate
} from './contsVar'
import { get, cancel, post } from '../../../utils/api'
import SEO from '../../../utils/seo'
import ReamlTable from './RealmTable'
import slugify from 'slugify'

const ManageRealms = ({ history }) => {
  const [realms, setRealms] = useState([])
  const [paginateList, setPaginateList] = useState([])
  const [loading, setLoading] = useState(true)
  const [create, setCreate] = useState(constCreate)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setLoading(true)
    setCreate(constCreate)
    get('/identity/realm/list/', { order_by: '-datetime_modified' })
      .then(res => {
        setRealms(res.data)
        setPaginateList(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  const paginate = (from, to) => {
    setRealms(paginateList.slice(from, to))
  }

  const FilterApplyButton = params => {
    setLoading(true)
    var parameter = {
      ...(params.sortby !== ' ' && { order_by: params.sortby }),
      ...(params.active !== ' ' && { is_active: params.active }),
      ...(params.company !== ' ' && { company: params.company }),
      ...(params.campaign !== ' ' && { campaigns: params.campaign }),
      ...(params.roles !== ' ' && { groups: params.roles }),
      ...(params.hasCompany !== ' ' && { no_company: !params.hasCompany })
    }

    get('/identity/realm/list/', parameter).then(res => {
      setRealms(res.data)
      setPaginateList(res.data)
      setLoading(false)
    })
  }

  const handleClose = () => {
    setCreate(constCreate)
  }

  const handleChange = e => {
    if (e.target.value) {
      setCreate({ ...create, name: e.target.value, nameErr: '' })
    } else {
      setCreate({
        ...create,
        name: e.target.value,
        nameErr: 'A realm name is required'
      })
    }
  }
  const handleCreate = () => {
    setCreate({ ...create, load: true })
    post('/identity/realm/create/', {
      name: create.name,
      active: create.active,
      slug: slugify(create.name)
    })
      .then(() => {
        setCreate({ ...create, load: false, done: true })
      })
      .catch(err => {
        try {
          if (err.response.data) {
            setCreate({
              ...create,
              load: false,
              nameErr: 'realm with this name/slug already exists.'
            })
          }
        } catch {
          console.log(err)
        }
      })
  }

  return (
    <>
      <Dialog open={create.load}>
        <LoadingModal
          text={'One moment. We’re adding the realm…'}
          cancelFn={() => {
            cancel()
            setCreate({ ...create, load: false })
          }}
        />
      </Dialog>
      <Dialog open={create.done}>
        <SuccessModal
          text={`You have created the “${create.name}” Realm`}
          btnText={'CREATE ANOTHER'}
          closeFn={getData}
          btnFn={() => {
            const { open, ...rest } = constCreate
            setCreate({ ...rest, open: true })
          }}
        />
      </Dialog>
      <Modal open={create.open} title="Create new realm" onClose={handleClose}>
        <InputField
          label="Realm name"
          required
          fullWidth
          value={create.name}
          onChange={handleChange}
          onBlur={handleChange}
          error={create.nameErr ? true : false}
          helperText={create.nameErr ? create.nameErr : ' '}
        />
        <InputField
          label="Active"
          disabled
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Switch
                  color="primary"
                  checked={create.active}
                  onChange={() =>
                    setCreate({ ...create, active: !create.active })
                  }
                />
              </InputAdornment>
            )
          }}
        />
        <BtnCont>
          <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
          <SaveButton
            disabled={!create.name || create.nameErr}
            onClick={handleCreate}
          >
            Create
          </SaveButton>
        </BtnCont>
      </Modal>
      <SEO title="Manage Realms" />
      <HeaderContainer style={{ paddingBottom: 30 }}>
        <HeaderLink menu={menus} title="Realms" />
        {realms.length !== 0 && (
          <HeaderButton
            openFunction={() => setCreate({ ...create, open: true })}
            buttonText="New realm"
          />
        )}
      </HeaderContainer>
      <Paper>
        {!loading && realms.length === 0 ? (
          <TableNoResult
            headerText="Realms"
            mainMessage="No realm have been created"
            subMessage="Would you like to creat one? Just hit the “New Realm” button."
            renderButton={
              <SaveButton onClick={() => setCreate({ ...create, open: true })}>
                <Add />
                New Realm
              </SaveButton>
            }
          />
        ) : (
          <Container>
            <div style={{ width: '100%' }}>
              <SearchBar
                title="realm"
                userData={realms}
                headers={['name', 'uuid']}
                active={true}
                link={true}
                loading={loading}
                pathnameData={{
                  firstLink: `/manage/realms/edit/`,
                  fetchData: ['uuid'],
                  lastLink: ``
                }}
              />
              <Divider />
              <FilterToolBar
                FilterApplyButton={FilterApplyButton}
                sortBy={true}
                activeStatus={true}
              />
              {loading ? (
                <TableLoader />
              ) : (
                <>
                  <ReamlTable realms={realms} history={history} />
                  {Boolean(paginateList.length) && (
                    <Pagination
                      paginateFn={paginate}
                      totalItems={paginateList.length}
                      paginateList={paginateList}
                      itemsPerPage={6}
                    />
                  )}
                </>
              )}
            </div>
          </Container>
        )}
      </Paper>
    </>
  )
}
export default ManageRealms
