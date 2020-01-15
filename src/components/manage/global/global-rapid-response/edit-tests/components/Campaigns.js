import React from 'react'
import Divider from '@material-ui/core/Divider'
import { cancel, get, post } from 'utils/api'
import {
  FilterToolBar,
  Pagination,
  SearchBar,
  TableLoader
} from 'common-components'
import { withStyles } from '@material-ui/core/styles'
//Table
import CampaignTable from './CampaignTable'

const style = theme => ({})
class ManageCampaigns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      popper: false,
      open: false,
      load: false,
      success: false,
      nameMsg: '',
      anchorRef: null,
      formOrder: 0,
      userData: [],
      filterlist: [],
      realmsData: [],
      companyData: [],
      paginateList: []
    }
  }
  componentDidMount() {
    this.handleUpdate()
  }

  handleUpdate = () => {
    this.setState({ loading: true })
    get('/identity/campaign/list/').then(res => {
      this.setState({
        userData: res.data,
        filterlist: res.data,
        paginateList: res.data
      })
      this.setState({ loading: false })
    })
    get(`/identity/company/list/`).then(res => {
      this.setState({ companyData: res.data })
    })

    get(`/identity/realm/list/`).then(res => {
      this.setState({ realmsData: res.data })
    })
  }
  handlePopper = event => {
    this.setState({
      popper: true,
      anchorRef: event.target
    })
  }
  handlePopperClose = () => {
    this.setState({
      popper: false
    })
  }
  // change to modal
  // toggleSideNav = () => {
  //   this.setState({ sidenav: !this.state.sidenav });
  // };

  //Needed this method for the filtertoolbar component
  FilterApplyButton = params => {
    var parameter = {
      ...(params.sortby !== ' ' && { order_by: params.sortby }),
      ...(params.active !== ' ' && { active: params.active }),
      ...(params.company !== ' ' && { company: params.company }),
      ...(params.realm !== ' ' && { realms: params.realm }),
      ...(params.campaign !== ' ' && { campaigns: params.campaign }),
      ...(params.roles !== ' ' && { groups: params.roles }),
      ...(params.hasCompany !== ' ' && { no_company: !params.hasCompany })
    }

    get('/identity/campaign/list/', parameter).then(res => {
      this.setState({
        userData: res.data,
        filterlist: res.data,
        paginateList: res.data
      })
    })
  }

  handleClose = () => {
    this.setState({ open: false, success: false })
  }
  handleOpen = () => {
    this.setState({ open: true, success: false })
  }
  handleCancel = () => {
    cancel()
    this.setState({ load: false })
  }

  handleNewCampaing = (data, errMsg, setErrMsg) => {
    const obj = {}
    if (!data.name || data.company.length === 0) {
      if (!data.name) obj.name = 'A campaign name is required'
      if (!data.company) obj.addCompany = 'A company is required'
    } else {
      this.setState({ load: true })
      post(`/identity/campaign/create/`, {
        name: data.name,
        company: data.company,
        realms: data.realms.map(realm => realm.uuid)
      })
        .then(res =>
          this.setState({
            userData: [res.data, ...this.state.userData],
            load: false,
            open: false,
            success: true,
            nameMsg: res.data.name
          })
        )
        .catch(err => {
          if (err.response.data.name) {
            setErrMsg({ ...errMsg, name: err.response.data.name[0] })
            this.setState({ load: false })
          }
        })
    }
    setErrMsg(obj)
  }

  paginate = (from, to) => {
    this.setState({
      userData: this.state.paginateList.slice(from, to)
    })
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'space-between',
            height: 'auto',
            width: '96%',
            padding: '2%',
            boxSizing: 'content-box'
          }}
        >
          <div style={{ width: '100%' }}>
            <SearchBar
              title="Campaign"
              userData={this.state.filterlist}
              headers={['name', 'slug', 'uuid']}
              loading={this.state.loading}
              link={true}
              pathnameData={{
                firstLink: `/manage/campaign/edit/`,
                fetchData: ['slug', 'uuid'],
                lastLink: `/settings`
              }}
            />
            <Divider />

            <FilterToolBar
              FilterApplyButton={this.FilterApplyButton}
              sortBy={true}
              activeStatus={true}
              realm={true}
              company={true}
            />

            {this.state.loading ? (
              <TableLoader />
            ) : (
              <CampaignTable
                userData={this.state.userData}
                handleUpdated={this.handleUpdate}
                innerLoading={this.state.innerLoading}
                filterlist={this.state.filterlist}
                headers={['Name', 'Slug', 'UUID', 'Status', '']}
              />
            )}

            <div style={{ width: '100%' }}>
              <Divider />
              {Boolean(this.state.paginateList.length) && (
                <Pagination
                  paginateFn={this.paginate}
                  totalItems={this.state.paginateList.length}
                  paginateList={this.state.paginateList}
                  itemsPerPage={10}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default withStyles(style)(ManageCampaigns)
