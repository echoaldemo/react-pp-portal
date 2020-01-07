import React, { Component } from 'react'

import Styles from './ChangelogStyles'
import { withStyles } from '@material-ui/styles'
import LogsFilter from '../../../../../../common-components/logs-filter/index'
import Modal from '../../../../../../common-components/Modal'

import { post } from '../../../../../../../utils/api'

import ChangeLogTable from './components/change-log-table'
import ModalDetails from './components/modal-details'

const defaultState = {
  loading: false
}
class Changelog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changelogData: [],
      originalChangeLogData: [],
      ...defaultState,
      activeData: null,
      modalOpen: false
    }
  }
  handleOpenModal = () => {
    this.setState({ modalOpen: true })
  }
  handleCloseModal = () => {
    this.setState({ modalOpen: false })
  }
  componentDidMount() {
    this.getChangeLogData()
  }
  getChangeLogData = () => {
    post('/identity/changelog/filter/', {
      campaign: this.props.campaignData.slug
    })
      .then(result => {
        this.setState({
          changelogData: result.data.data,
          originalChangeLogData: result.data.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  setActiveData = data => {
    this.setState({ activeData: data })
    this.handleOpenModal()
  }

  handleFilterUpdate = data => {
    this.setState({
      changelogData: data
    })
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <LogsFilter
          data={this.state.changelogData}
          originalData={this.state.originalChangeLogData}
          handleFilterUpdate={this.handleFilterUpdate}
          modalFunc={this.setActiveData}
        />

        <ChangeLogTable
          tableData={this.state.changelogData}
          setActiveData={this.setActiveData}
        />

        {this.state.activeData ? (
          <Modal
            open={this.state.modalOpen}
            title={<span className={classes.modalTitle}>Change details</span>}
            onClose={this.handleCloseModal}
            width={651}
          >
            <ModalDetails
              data={this.state.activeData}
              onClose={this.handleCloseModal}
            />
          </Modal>
        ) : null}
      </div>
    )
  }
}
export default withStyles(Styles)(Changelog)
