import React, { useState, useEffect } from 'react'
import {
  HeaderButton,
  HeaderContainer,
  HeaderLink,
  SearchBar,
  TableLoader,
  FilterToolBar,
  Pagination,
  InputField,
  Modal,
  LoadingModal,
  SuccessModal,
  TableNoResult
} from 'common-components'
import { Divider, Paper, InputAdornment, Dialog } from '@material-ui/core'
import {
  Container,
  menus,
  BtnCont,
  Switch,
  SaveButton,
  CancelBtn,
  constCreate,
  MockRealm
} from './contsVar'
import { Add } from '@material-ui/icons'
import ReamlTable from './RealmTable'
import SEO from 'utils/seo'


const Realms = ({ history }) => {
  const [realms, setRealms] = useState([])
  const [paginateList, setPaginateList] = useState([])
  const [loading, setLoading] = useState(true)
  const [create, setCreate] = useState(constCreate)


  useEffect(() => {
    getData()
  }, [])

  const cancel = () => {
    // api cancel
    console.log("cancel api")
  }
  const getData = () => {
    setLoading(true)
    setCreate(constCreate)
    setTimeout(() => {
      setRealms(MockRealm)
      setPaginateList(MockRealm)
      setLoading(false)
    }, 2000)

    // get('/identity/realm/list/', { order_by: '-datetime_modified' })
    //   .then(res => {
    //     setRealms(res.data)
    //     setPaginateList(res.data)
    //     setLoading(false)
    //   })
    //   .catch(err => console.log(err))
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

    setTimeout(() => {
      const tempData = [{
        "uuid": "994dceb8-5062-11e7-a132-02420a000304",
        "leader": null,
        "slug": "external_rec",
        "datetime_created": "2017-06-13T18:03:26.715623Z",
        "datetime_modified": "2019-11-05T09:18:19.641105Z",
        "name": "arman locas",
        "active": false
      }]
      setRealms(tempData)
      setPaginateList(tempData)
      setLoading(false)
    }, 2000)

    // get('/identity/realm/list/', parameter).then(res => {
    //   setRealms(res.data)
    //   setPaginateList(res.data)
    //   setLoading(false)
    // })
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
    setTimeout(() => {
      setCreate({ ...create, load: false, done: true })
    }, 1500)

    // post('/identity/realm/create/', {
    //   name: create.name,
    //   active: create.active,
    //   slug: slugify(create.name)
    // })
    //   .then(() => {
    //     setCreate({ ...create, load: false, done: true })
    //   })
    //   .catch(err => {
    //     try {
    //       if (err.response.data) {
    //         setCreate({
    //           ...create,
    //           load: false,
    //           nameErr: 'realm with this name/slug already exists.'
    //         })
    //       }
    //     } catch {
    //       console.log(err)
    //     }
    //   })
  }

  return (
    <>
      <SEO title="Manage Realms" />

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30
      }}>
        <HeaderLink menu={menus} title="Realms" />
        {realms.length !== 0 && (
          <HeaderButton
            openFunction={() => setCreate({ ...create, open: true })}
            buttonText="New realm"
          />
        )}
      </div>
      <Paper  >
        {!loading && realms.length === 0 ?
          <TableNoResult
            headerText="Realms"
            mainMessage="No realm have been created"
            subMessage="Would you like to creat one? Just hit the “New Realm” button."
            renderButton={
              // <SaveButton onClick={() => setCreate({ ...create, open: true })}>
              <SaveButton >

                <Add />
                New Realm
              </SaveButton>
            }
          />
          :
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
        }
      </Paper>

      <LoadingModal
        open={create.load}
        text={'One moment. We’re adding the realm…'}
        cancelFn={() => {
          // cancel()
          setCreate({ ...create, load: false })
        }}
      />
      <SuccessModal
        open={create.done}
        text={`You have created the “${create.name}” Realm`}
        btnText={'CREATE ANOTHER'}
        closeFn={getData}
        btnFn={() => {
          const { open, ...rest } = constCreate
          setCreate({ ...rest, open: true })
        }}
      />
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
    </>
  );
};

export { Realms };
