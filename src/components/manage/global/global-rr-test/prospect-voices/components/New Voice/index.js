import React, { useState, useEffect } from 'react'

import { Grid, Dialog, TextField } from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'

import Modal from '../../../../../../common-components/Modal'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { makeStyles } from '@material-ui/styles'

import LoadingModal from '../../../../../../common-components/loading-modal/LoadingModal'
import SuccessModal from '../../../../../../common-components/success-modal/SuccessModal'

import styled from 'styled-components'

import { SaveButton } from '../../../../../../common-components/buttons'

import { CustomButton } from '../../../../../../common-components/custom-components'

import InputField from '../../../../../../common-components/input-field/InputField'

import { Link } from 'react-router-dom'

import {
  getVoices,
  createProspectVoices
} from '../../../../../../../actions/Globals/ProspectVoices'
import { cancel } from '../../../../../../../utils/api'

const CancelButton = styled(SaveButton)`
  background-color: #eeeeee !important;
`

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: { main: '#1194f6' }
  },
  overrides: {
    MuiFormLabel: {
      shrink: {
        color: '#1194f6'
      }
    },

    MuiInputLabel: {
      shrink: {
        color: '#1194f6'
      }
    },
    MuiAutocomplete: {
      popup: {
        zIndex: 9999
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
        },
        '&:hover:not($disabled):before': {
          borderBottom: '2px solid #1194f6'
        },
        '&:after': {
          borderBottom: '2px solid #1194f6'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
        },
        '&:hover:not($disabled):before': {
          borderBottom: '2px solid #1194f6'
        },
        '&:after': {
          borderBottom: '2px solid #1194f6'
        }
      }
    }
  }
})

const useStyles = makeStyles({})

const NewVoice = props => {
  let classes = useStyles()

  const [name, setName] = useState('')
  const [username, setUsername] = useState([])
  const [nameError, setNameError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [voices, setVoices] = useState([])
  const [original_voices, setOriginalVoices] = useState([])
  const [userTyped, setUserTyped] = useState('')
  const [is_auto, setIsAuto] = useState(false)
  const [responseUser, setResponseUser] = useState([])

  useEffect(() => {
    fetchVoices()
  }, [])

  async function fetchVoices() {
    let voices = await getVoices()
    let voiceData = voices.data || []
    let parseVoices = voiceData.map(key => {
      return {
        uuid: key.uuid,
        fname: key.first_name,
        lname: key.last_name,
        username: key.username
      }
    })
    setOriginalVoices(parseVoices)
    setVoices(parseVoices)
  }

  function handleInput(e) {
    if (e.target.name === 'name') {
      verifyName(e.target.value)
      setName(e.target.value)
    } else {
      e.target.value.length > 0 ? setIsAuto(true) : setIsAuto(false)
      setUserTyped(e.target.value)
      searchVoices(e.target.value)
    }
  }

  function searchVoices(searchText) {
    let searchRegex = RegExp(searchText, 'gi')
    let count = 0
    let searchVoiced = original_voices.filter(key => {
      if (
        key.fname.match(searchRegex) ||
        key.lname.match(searchRegex) ||
        key.username.match(searchRegex)
      ) {
        if (count < 5) {
          count++
          return true
        }
        return false
      }
      return false
    })

    setVoices(searchVoiced)
  }

  function verifyName(value) {
    if (value.length <= 0) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }

  async function createVoice() {
    if (!nameError) {
      let { uuid } = username
      let user = uuid
      setLoading(true)
      let response = await createProspectVoices({ user, name })
      if (response.status < 300) {
        setLoading(false)
        setSuccess(true)
        setResponseUser(response.data)
        props.fetchVoices()
        props.parseVoices()
      } else {
        setLoading(false)
      }
    }
  }

  function modalClose() {
    setName('')
    setUsername('')
    setNameError(false)
    setLoading(false)
    setSuccess(false)
    props.onClose()
  }

  function cancelSave() {
    setLoading(false)
    cancel()
  }

  function renderLoading() {
    return (
      <Dialog open={loading}>
        <LoadingModal
          text="One moment. We're creating the new voice..."
          cancelFn={cancelSave}
        />
      </Dialog>
    )
  }

  function renderSuccess() {
    return (
      <>
        <Dialog open={success}>
          <SuccessModal
            text={`You have created the ${name} prospect voice`}
            btnText={'RECORD AUDIO'}
            closeFn={closeSuccess}
            btnFn={recordAudio}
          />
        </Dialog>
      </>
    )
  }

  function closeSuccess() {
    modalClose()
  }

  function recordAudio() {
    props.routeToProspect(responseUser)
  }

  function renderUI() {
    return (
      <>
        <Modal
          open={props.open}
          title="Create new prospect voice"
          onClose={modalClose}
        >
          <Grid>
            <Grid
              item
              style={{
                marginTop: '20px',
                marginBottom: '16px'
              }}
            >
              <InputField
                autoComplete="off"
                onBlur={handleInput}
                onInput={handleInput}
                inputProps={{ name: 'name' }}
                label="Name"
                value={name}
                fullWidth
                error={nameError}
                helperText={nameError ? 'A name is required' : ' '}
                required
              />
            </Grid>
            <Grid item style={{ marginBottom: '47px' }}>
              <Autocomplete
                open={is_auto}
                value={username}
                onChange={(e, value) => {
                  setIsAuto(false)
                  setUsername(value)
                }}
                options={voices}
                getOptionLabel={option =>
                  option.uuid
                    ? `${option.fname} ${option.lname} | ${option.username}`
                    : ''
                }
                renderOption={opt => {
                  return (
                    <>
                      {opt.fname} {opt.lname} | {opt.username}
                    </>
                  )
                }}
                renderInput={params => (
                  <>
                    <TextField
                      onInput={handleInput}
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        autocomplete: 'off'
                      }}
                      id="user"
                      label="User"
                      name="user"
                      margin="normal"
                      fullWidth
                      value={params.inputProps.value ? userTyped : ''}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item style={{ marginRight: '30px' }}>
                <CustomButton onClick={() => modalClose()}>
                  <strong>CANCEL</strong>
                </CustomButton>
              </Grid>

              <Grid item>
                <SaveButton
                  onClick={() => createVoice()}
                  disabled={name.length <= 0 || nameError}
                >
                  CREATE VOICE
                </SaveButton>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </>
    )
  }

  return (
    <MuiThemeProvider theme={theme}>
      {!loading && !success && renderUI()}
      {loading && renderLoading()}
      {success && renderSuccess()}
    </MuiThemeProvider>
  )
}

const voiceOption = [
  { uuid: '1', title: 'Dan Lee | danlee', year: 1994 },
  { uuid: '2', title: 'Yasi Delam | yasidelam', year: 1972 }
]

export default NewVoice
