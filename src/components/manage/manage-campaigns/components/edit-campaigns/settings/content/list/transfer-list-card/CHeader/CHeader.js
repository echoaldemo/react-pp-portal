/* eslint-disable */
import React, { Component } from 'react'
import {
  withStyles,
  IconButton,
  Collapse,
  Grid,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import { SearchBar } from 'common-components'

import styled from 'styled-components'

const AddCamp = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  color: #1194f6;
  font-size: 16px;
  background: inherit;
  display: flex;
  align-items: center;
`

const styles = {
  cardHeader: {
    borderBottom: 'solid 1px #eee',
    padding: 15,
    background: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#666'
  },
  searchWrapper: {
    display: 'flex',
    border: 'solid 1px #eee',
    height: 50
  },
  searchContainer: {
    width: '88%'
  },
  cancelContainer: {
    marginTop: 30
  },
  cancelText: {
    fontWeight: 600,
    textDecoration: 'underline',
    color: '#888',
    fontSize: 15,
    cursor: 'pointer'
  }
}
class CHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchData: [],
      showSearch: false
    }
  }

  componentDidMount() {
    this.setState({
      searchData: this.props.searchData
    })
  }
  handleShowSearch = () => {
    this.setState({ showSearch: true })
  }
  handleCloseSearch = () => {
    this.setState({ showSearch: false })
  }
  render() {
    const { classes } = this.props
    return (
      <>
        <div
          className={classes.cardHeader}
          style={{ padding: !this.props.selectAllFunc && 18 }}
        >
          <div>
            <Grid container>
              <Grid item>
                <span className={classes.cardTitle}>{this.props.title} </span>
              </Grid>
              <Grid item style={{ marginLeft: 50 }}>
                {this.props.selectAllFunc ? (
                  <AddCamp
                    onClick={() => {
                      this.props.selectAllFunc()
                    }}
                  >
                    <Grid container>
                      <Grid item>
                        <AddIcon />
                      </Grid>
                      <Grid item>
                        <Typography>Select All</Typography>
                      </Grid>
                    </Grid>
                  </AddCamp>
                ) : null}
              </Grid>
            </Grid>
          </div>
          <div style={{ margin: 0 }}>
            {this.state.searchData === undefined ? null : !this.state.searchData
                .length > 0 ? null : (
              <IconButton
                style={{ padding: 0, margin: 0 }}
                onClick={() => {
                  this.handleShowSearch()
                }}
              >
                <SearchIcon style={{ color: '#666' }} />
              </IconButton>
            )}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <Collapse
            in={this.state.showSearch}
            timeout={1000}
            unmountOnExit
            style={{ width: '100%' }}
          >
            <div style={{ width: '100%' }}>
              <Grid container>
                <Grid item xs={10} style={{ paddingRight: 30 }}>
                  <SearchBar
                    title={this.props.searchFor}
                    userData={this.state.searchData}
                    headers={this.props.searchHeaders}
                    classicSearch={this.props.classicSearch}
                  />
                </Grid>
                <Grid item xs={2}>
                  <div style={{ marginTop: 30 }}>
                    <a
                      onClick={() => {
                        this.handleCloseSearch()
                      }}
                    >
                      <span className={classes.cancelText}>Cancel</span>
                    </a>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Collapse>
        </div>
      </>
    )
  }
}
export default withStyles(styles)(CHeader)
