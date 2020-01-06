import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { get, post, cancel } from 'utils/api'
import { Paper, Divider, Dialog } from '@material-ui/core'
// import DidPoolsUpdate from './DidPoolsUpdate'
import { menus } from '../../utils/const-var'
// import { Create, Validation } from '../components/'
import {} from 'common-components'
import {
  ShoppingCartOutlined as Shopping,
  PlaylistAddCheckOutlined as Playlist,
  Add
} from '@material-ui/icons'

/*COMPONENTS*/
import {
  TableLoader,
  LoadingModal,
  SuccessModal,
  SaveButton,
  SearchBar,
  HeaderButton,
  HeaderLink
} from 'common-components'
// import DidTable from '../components/table/index'
import styles from './DidPoolsSettings.styles'
// import BuyDid from './buy-did-number/BuyDid'
import styled from 'styled-components'
// import DidPurchase from './did-purchase/DidPurchase'
// import Successful from './did-purchase/successful'

const CustomDialog = styled(Dialog)`
  .MuiDialog-paperScrollPaper {
    display: flex;
    max-height: none;
    flex-direction: column;
  }
`

const dids = [
  {
    number: '(406) 262-8717',
    purchased: true
  },
  {
    number: '(406) 262-8718',
    purchased: true
  },
  {
    number: '(406) 262-8719',
    purchased: true
  },
  {
    number: '(406) 262-8720',
    purchased: false
  },
  {
    number: '(406) 262-8721',
    purchased: true
  },
  {
    number: '(406) 262-8722',
    purchased: true
  },
  {
    number: '(406) 262-8723',
    purchased: false
  },
  {
    number: '(406) 262-8724',
    purchased: false
  }
]

class DidPoolsSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalA: false,
      modalB: false,
      modalC: false,
      loadingDid: true,
      didData: [],
      company: [],
      campaign: [],
      companySlug: '',
      campaignSlug: '',
      poolId: '',
      openNew: false,
      openValidate: false,
      openBuy: false,
      loading: false,
      showResults: false,
      successOder: false,
      successError: false,
      companySlug: '',
      campaignSlug: '',
      openEdit: false,
      editData: null,
      didList: []
    }
    this.initialBuy = {
      loading: false,
      showResults: false,
      successOder: false,
      successError: false
    }
  }
  async componentDidMount() {
    this.fetchDID()
    this.setState({
      poolId: this.props.match.params.uuid
    })
  }

  handleOpenEdit = data => {
    this.setState({
      openEdit: true,
      editData: data
    })
  }

  fetchDID = () => {
    get(
      `/did/company/all/campaign/all/pool/${this.props.match.params.uuid}/`
    ).then(res => {
      this.setState({
        didData: res.data,
        loadingDid: false
      })
      Promise.all([
        get(`/identity/company/${res.data.company}`),
        get(`/identity/campaign/${res.data.campaign}`)
      ]).then(data => {
        if (data.length > 1) {
          this.setState({
            companySlug: data[0].data.slug,
            campaignSlug: data[1].data.slug
          })
          this.fetchDIDlist(
            data[0].data.slug,
            data[1].data.slug,
            this.props.match.params.uuid
          )
        }
      })
    })
  }

  renderCreate = () => {
    return (
      // <Create
      //   poolId={this.state.poolId}
      //   companySlug={this.state.companySlug}
      //   campaignSlug={this.state.campaignSlug}
      //   open={this.state.openNew}
      //   onClose={e => this.setState({ openNew: false })}
      // />
      <></>
    )
  }

  renderValidate = () => {
    return (
      <>
        {/* <Validation
          poolId={this.state.poolId}
          companySlug={this.state.companySlug}
          campaignSlug={this.state.campaignSlug}
          open={this.state.openValidate}
          onClose={e => this.setState({ openValidate: false })}
        /> */}
      </>
    )
  }
  toggleBuy = () => {
    this.setState({
      openBuy: !this.state.openBuy
    })
    setTimeout(() => {
      this.setState(this.initialBuy)
    }, 500)
  }

  buyAgain = () => {
    this.setState(this.initialBuy)
  }

  placeOrder = length => {
    if (length === 1) {
      this.setState({
        loading: true,
        showResults: false
      })
      setTimeout(() => {
        this.setState({
          loading: false,
          successOder: true
        })
      }, 500)
    } else {
      this.setState({
        loading: true,
        showResults: false
      })
      setTimeout(() => {
        this.setState({
          loading: false,
          successError: true
        })
      }, 500)
    }
  }

  fetchDIDlist = (company, campaign, uuid) => {
    get(`/did/company/${company}/campaign/${campaign}/pool/${uuid}/did/`).then(
      result => {
        this.setState({
          didList: result.data
        })
      }
    )
  }

  fetchDIDlistNoParams = () => {
    get(
      `/did/company/${this.state.companySlug}/campaign/${this.state.campaignSlug}/pool/${this.props.match.params.uuid}/did/`
    ).then(result => {
      this.setState({
        didList: result.data
      })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <>
        {this.renderCreate()}
        {this.renderValidate()}
        <div style={{ marginBottom: '50px' }}>
          {/* <DidPoolsUpdate
            DIDs={this.state.didData}
            uuid={this.props.match.params.uuid}
            history={this.props.history}
          /> */}
        </div>
        <div className="header-container">
          <HeaderLink menu={menus} title="DID's" />
          <div style={{ display: 'flex' }}>
            <SaveButton
              style={{
                marginRight: 24,
                backgroundColor: 'transparent',
                width: '200px'
              }}
              onClick={() => {
                this.setState({
                  openNew: true
                })
              }}
            >
              <div
                style={{
                  color: '#1194f6',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Add /> Add existing DID
              </div>
            </SaveButton>
            <SaveButton
              style={{
                marginRight: 24,
                backgroundColor: '#7c8a97',
                width: '160px'
              }}
              onClick={() => {
                this.setState({
                  openValidate: true
                })
              }}
            >
              <Playlist style={{ width: '25px', height: '20px' }} />
              Validate ID's
            </SaveButton>
            <SaveButton
              style={{ width: '160px' }}
              onClick={() => {
                this.setState({ openBuy: true })
              }}
            >
              <Shopping
                style={{ width: '20px', height: '20px', marginRight: '2px' }}
              />{' '}
              Buy DID
            </SaveButton>
          </div>
        </div>
        <Paper style={{ height: 'auto' }}>
          {this.state.loadingDid ? (
            <TableLoader />
          ) : (
            <>
              {/* <DidTable
								openEdit={this.state.openEdit}
								
                handleOpenEdit={this.handleOpenEdit}
                handleCloseEdit={() => this.setState({ openEdit: false })}
                editData={this.state.editData}
                history={this.props.history}
                fetchDID={this.fetchDID}
                didList={this.state.didList}
                fetchDIDList={this.fetchDIDlistNoParams}
                campaignSlug={this.state.campaignSlug}
                companySlug={this.state.companySlug}
              /> */}
            </>
          )}
        </Paper>
        <CustomDialog
          open={this.state.openBuy}
          maxWidth={this.state.showResults ? 'lg' : false}
          fullWidth={this.state.showResults ? true : false}
        >
          {this.state.loading ? (
            <LoadingModal
              text={`One moment. We're loading the results...`}
              cancelFn={this.toggleBuy}
            />
          ) : this.state.successOder ? (
            <SuccessModal
              text={'Your order has been placed succesfully'}
              qty={200}
              subtitle={
                'We are processing your order. This could take up to one hour. You will receive a confirmation email when the process is done.'
              }
              btnText={'BUY ANOTHER'}
              closeFn={this.toggleBuy}
              btnFn={this.buyAgain}
            />
          ) : this.state.successError ? //   } //     'Some dids were not bought because they are already taken.' //   subtitle={ //   dids={dids} //   text={'Your order has been placed succesfully'} // <Successful
          //   btnText={'BUY ANOTHER'}
          //   error={true}
          //   closeFn={this.toggleBuy}
          //   btnFn={this.buyAgain}
          // />
          null : this.state.showResults ? null : //       loading: true // /> //   placeOrder={this.placeOrder} //   closeFn={this.toggleBuy} //   header="Buy DID number" // <DidPurchase //     this.setState({ //   searchFn={() => { //   closeFn={this.toggleBuy} //   header="Buy DID number" // <BuyDid
          //     })
          //     setTimeout(() => {
          //       this.setState({ showResults: true, loading: false })
          //     }, 1000)
          //   }}
          // />
          null}
        </CustomDialog>
      </>
    )
  }
}

export default withStyles(styles)(DidPoolsSettings)
