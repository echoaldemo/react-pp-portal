import React, { Component } from 'react'
// import { get, patch, remove, post } from "../../../../utils/api";
import {
  Paper,
  Divider,
  Snackbar,
  IconButton,
  MenuItem,
  Typography,
  Dialog
} from '@material-ui/core'
import XMLDialog from './components/Forms'
import DNDCards from '../cards/DNDCards'
import {
  GroupOutlined,
  Clear,
  Code,
  PanoramaFishEye,
  Delete
} from '@material-ui/icons'
import {
  DeleteModal,
  LoadingModal,
  SuccessModal,
  TableLoader
} from 'common-components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = {
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)'
      }
    }
  }
}

export default class RRSegments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      company: this.props.company,
      segments: [],
      filterList: [],
      innerLoading: true,
      open: false,
      data: [],
      dataXML: '',
      error: null,
      openSnackBar: false,
      segmentData: [],
      globalSegments: [],
      activeData: [],
      openDelete: false,
      openLoading: false,
      openSuccess: false,
      activeSegments: []
    }
  }

  handlClose = () => {
    this.setState({
      open: false
    })
  }

  handleClickOpen = data => {
    this.setState({
      open: !this.state.open,
      data,
      dataXML: data.xml
    })
  }

  handleChangeXML = data => {
    this.setState({
      dataXML: data
    })
  }

  showErrorMessage = error => {
    this.setState({
      error
    })
  }

  getFirst = n => {
    var x = n.firstChild
    if (x !== null) {
      while (x.nodeType !== 1) {
        x = x.nextSibling
      }
      return x.parentNode.nodeName
    } else {
      return n.nodeName
    }
  }

  UpdateSegment = (data, label) => {
    const parser = new DOMParser()
    const theDom = parser.parseFromString(data.xml, 'application/xml')
    const rootNode = this.getFirst(theDom.documentElement)
    if (
      rootNode === 'defaults' ||
      rootNode === 'options' ||
      rootNode === 'response-tests' ||
      rootNode === 'failures' ||
      rootNode === 'intros' ||
      rootNode === 'no-responses' ||
      rootNode === 'endings' ||
      rootNode === 'nodes'
    ) {
      if (theDom.getElementsByTagName('parsererror').length > 0) {
        this.showErrorMessage(
          theDom
            .getElementsByTagName('parsererror')[0]
            .getElementsByTagName('div')[0].innerHTML
        )
      } else {
        this.setState({
          error: null
        })
        // var submitdata = {
        //   name: data.name,
        //   active: data.active,
        //   type: data.type,
        //   xml: data.xml,
        //   variables: data.variables
        // };
        if (label === 'edit') {
          // patch(
          //   `/pitch/company/${this.props.company.slug}/rapid-response/segments/${data.uuid}/`,
          //   submitdata
          // )
          //   .then(res => {
          //     if (res.status !== 400) {
          //       this.setState({
          //         openSnackBar: "Segment Updated!",
          //         loading: true,
          //         open: false
          //       });
          //       this.fetchData();
          //     }
          //   })
          //   .catch(err => {
          //     if (err) console.log(err);
          //     return this.showErrorMessage("Error Updating! Please Try Again");
          //   });
        } else if (label === 'create') {
          // post(
          //   `/pitch/company/${this.props.company.slug}/rapid-response/segments/`,
          //   submitdata
          // )
          //   .then(res => {
          //     if (res.status !== 400) {
          //       this.setState({
          //         openSnackBar: "Segment Created!",
          //         loading: true,
          //         open: false
          //       });
          //       this.fetchData();
          //     }
          //   })
          //   .catch(err => {
          //     if (err) console.log(err);
          //     return this.showErrorMessage("Error Creating! Please Try Again");
          //   });
        }
      }
    } else {
      return this.showErrorMessage(
        `The xml provided contains an invalid root node "${rootNode}", allowed root nodes are: defaults, options, nodes, response-tests, failures, intros, no-responses, endings`
      )
    }
  }

  updateSegmentData = () => {
    this.componentDidMount()
  }

  componentDidMount() {
    // this.setState({});
    if (!this.state.company) {
      // get(`/identity/company/${this.props.company.uuid}/`).then(res => {
      //   this.setState({
      //     company: res.data
      //   });
      // });
    }

    Promise.all([
      // get(`/pitch/company/${this.props.company.slug}/rapid-response/segments/`),
      // get(`/pitch/global/rapid-response/segments/`)
    ]).then(segments => {
      this.setState({
        segments: [
          {
            active: false,
            company: '133f0be0-f92d-11e9-bd51-0242ac110014',
            name: 'a',
            slug: 'a',
            type: 'failures',
            uuid: '878ab358-0a73-11ea-82eb-0242ac110005',
            variable: {},
            xml: '<nodes/>'
          }
        ],
        segmentData: [
          {
            active: false,
            company: '133f0be0-f92d-11e9-bd51-0242ac110014',
            name: 'a',
            slug: 'a',
            type: 'failures',
            uuid: '878ab358-0a73-11ea-82eb-0242ac110005',
            variable: {},
            xml: '<nodes/>'
          }
        ],
        filterList: [
          {
            active: false,
            company: '133f0be0-f92d-11e9-bd51-0242ac110014',
            name: 'a',
            slug: 'a',
            type: 'failures',
            uuid: '878ab358-0a73-11ea-82eb-0242ac110005',
            variable: {},
            xml: '<nodes/>'
          }
        ],
        globalSegments: [
          {
            active: true,
            company: null,
            name: 'Generic Failures',
            slug: 'generic-failures',
            type: 'failures',
            uuid: 'a279ae2c-7866-11e7-83d7-02420a000608',
            variable: {
              3: '0',
              fff: 'asd',
              xml:
                '<failures>\n  <prospect-audio namespace="prospect" key="failure-1">I don\'t have time for this!</prospect-audio>\n  <prospect-audio namespace="prospect" key="failure-2">\n        Sorry, getting on the elevator. I will call back, I promise.\n    </prospect-audio>\n  <prospect-audio namespace="prospect" key="failure-3">You guys suck, stop calling me!</prospect-audio>\n</failures>'
            }
          }
        ],
        innerLoading: false,
        loading: false
      })
    })
    // get(
    //   `/pitch/company/${this.props.match.params.campaign_slug}/rapid-response/segments/`
    // ).then(res => {
    //   this.setState({
    //     segments: res.data,
    //     segmentData: res.data,

    //     filterList: res.data
    //   });
    // });
    // get(`/pitch/global/rapid-response/segments/`).then(res => {
    //   this.setState({
    // globalSegments: res.data,
    // innerLoading: false,
    // loading: false
    //   });
    // });
  }

  closeError = () => {
    this.setState({
      error: null
    })
  }

  closeSnackBar = () => {
    this.setState({
      openSnackBar: false
    })
  }

  setActiveData = data => {
    this.setState({
      activeData: data
    })
  }
  handleClose = () => {
    this.setState({
      openDelete: false
    })
  }
  handleCancel = () => {
    this.setState({
      openLoading: false
    })
  }
  handleCloseSucess = () => {
    this.setState({
      openSuccess: false,
      loading: true
    })
    this.componentDidMount()
  }
  handleDelete = () => {
    //code here
    this.setState({
      openDelete: false,
      openLoading: true
    })
    // remove(
    //   `/pitch/company/${this.props.company.slug}/rapid-response/segments/${this.state.activeData.uuid}`
    // )
    //   .then(() => {
    //     this.setState({
    //       openSuccess: true,
    //       openLoading: false
    //     });
    //   })
    //   .catch(err => console.log(err));
  }

  saveActiveSegment = data => {
    //API request here for updating activeSegments
    this.setState({ activeSegments: data })
  }

  openNewSegment = () => {
    this.setState({
      data: '',
      open: !this.state.open,
      dataXML: ' '
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <div
          style={{
            margin: '0 auto',
            height: 600
          }}
        >
          {this.state.company && (
            <>
              <Paper style={{ height: 660 }}>
                {this.state.loading ? (
                  <div style={{ height: 600, overflow: 'hidden' }}>
                    <TableLoader
                      headerText="Rapid Response Segments"
                      message="Loading segments..."
                      Icon={GroupOutlined}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignContent: 'space-between',
                      height: 660
                    }}
                  >
                    {this.state.globalSegments.length !== 0 ? (
                      <div style={{ width: '100%', height: '100%' }}>
                        <div style={{ padding: 30 }}>
                          {this.state.globalSegments.length !== 0 ? (
                            <DNDCards
                              addButton3={true}
                              addFunction3={this.openNewSegment}
                              card1Title="Active segments"
                              card2Title="Global segments"
                              card3Title="Company segments"
                              card1Data={this.state.activeSegments}
                              card2Data={this.state.globalSegments}
                              card3Data={this.state.segmentData}
                              handleClickOpen={this.handleClickOpen}
                              setActiveData={this.setActiveData}
                              saveActiveSegment={this.saveActiveSegment}
                              card3Popover={
                                <div>
                                  <MenuItem
                                    onClick={() =>
                                      this.handleClickOpen(
                                        this.state.activeData
                                      )
                                    }
                                    style={{
                                      color: '#777777',
                                      width: 250,
                                      paddingTop: 0,
                                      paddingBottom: 0
                                    }}
                                  >
                                    <Code />{' '}
                                    <Typography style={{ marginLeft: 40 }}>
                                      XML
                                    </Typography>
                                  </MenuItem>
                                  <MenuItem
                                    // onClick={handleClose}
                                    style={{
                                      color: '#777777',
                                      width: 250,
                                      paddingTop: 0,
                                      paddingBottom: 0
                                    }}
                                  >
                                    <PanoramaFishEye />
                                    <Typography style={{ marginLeft: 40 }}>
                                      Variables
                                    </Typography>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      this.setState({ openDelete: true })
                                    }
                                    style={{
                                      color: '#777777',
                                      width: 250,
                                      paddingTop: 0,
                                      paddingBottom: 0
                                    }}
                                  >
                                    <Delete />
                                    <Typography style={{ marginLeft: 40 }}>
                                      Delete
                                    </Typography>
                                  </MenuItem>
                                </div>
                              }
                            />
                          ) : null}
                          <Dialog open={this.state.openDelete}>
                            <DeleteModal
                              open={this.state.openDelete}
                              header="Delete Company Segment"
                              msg="Segment"
                              name={`${this.state.activeData.name}`}
                              closeFn={this.handleClose}
                              delFn={this.handleDelete}
                            />
                          </Dialog>
                          <Dialog open={this.state.openLoading}>
                            <LoadingModal
                              text={`${this.state.activeData.name}`}
                              cancelFn={this.handleCancel}
                            />
                          </Dialog>

                          <Dialog open={this.state.openSuccess}>
                            <SuccessModal
                              text={`You have removed “${this.state.activeData.name}” from Company Segments`}
                              closeFn={this.handleCloseSucess}
                            />
                          </Dialog>
                        </div>
                        {this.state.dataXML !== '' ? (
                          <XMLDialog
                            error={this.state.error}
                            UpdateSegment={this.UpdateSegment}
                            handleChangeXML={this.handleChangeXML}
                            dataXML={this.state.dataXML}
                            data={this.state.data}
                            open={this.state.open}
                            handlClose={this.handlClose}
                            closeError={this.closeError}
                          />
                        ) : null}

                        <div style={{ width: '100%' }}></div>
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '100%' }}>
                        <div style={{ height: 70 }}></div>
                        <Divider />
                        <div
                          style={{
                            height: '100%',
                            padding: 100,
                            marginTop: 70
                          }}
                        >
                          <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: '#7c8a97', fontSize: '18px' }}>
                              No Rapid Response Segments have been created
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={this.state.openSnackBar}
                  autoHideDuration={3000}
                  onClose={this.closeSnackBar}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                  }}
                  message={
                    <span id="message-id">{this.state.openSnackBar}</span>
                  }
                  action={[
                    // <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                    //   UNDO
                    // </Button>,
                    <IconButton
                      key="close"
                      aria-label="close"
                      color="inherit"
                      onClick={this.closeSnackBar}
                    >
                      <Clear />
                    </IconButton>
                  ]}
                />
              </Paper>
            </>
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}
