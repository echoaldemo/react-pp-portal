import React, { useState, useEffect } from 'react'

import { Typography } from '@material-ui/core'

import { Dialog } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { makeStyles } from '@material-ui/styles'

import styled from 'styled-components'
import {
  Modal,
  SuccessModal,
  LoadingModal,
  SaveButton
} from 'common-components'
// import Toast from "../../../../voice-components/common-components/toast/toast";
import { InputField as TextField } from '../../../utils/const-var'
import { cancel, post } from 'utils/api'
const Container = styled.div`
  margin: 8px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 6px;
`

const Helper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`

const Text = styled(Typography)``

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1194f6' }
  }
})

const useStyles = makeStyles({})

const Create = props => {
  let classes = useStyles()
  const [numbers, setNumbers] = useState('')
  const [numberError, setNumberError] = useState(false)
  const [status, setStatus] = useState('create')
  const [errorSaving, setErrorSaving] = useState(false)
  const [error, setError] = useState('No connection.')

  useEffect(() => {
    console.log('Props:', props)
  }, [])

  const createNewDid = async (coSlug, caSlug, poolId, numbers) => {
    return post(
      `/did/company/${coSlug}/campaign/${caSlug}/pool/${poolId}/did/`,
      {
        numbers,
        owned: true
      }
    )
      .then(response => {
        return { status: response.status, data: response.data }
      })
      .catch(err => {
        try {
          return {
            status: err.response.status,
            data:
              err.response.data.length > 30
                ? err.response.data.substring(0, 30) + ' ...'
                : err.response.data
          }
        } catch (err) {
          return { status: 500, data: 'Creating DID failed.' }
        }
      })
  }

  function tagline() {
    return (
      <Helper>
        <Text
          style={{
            fontSize: '14px',
            marginBottom: '11px'
          }}
        >
          Enter numbers separated by new lines, ex:{' '}
        </Text>
        <Text
          style={{
            fontSize: '14px'
          }}
        >
          +180015684929
        </Text>
        <Text
          style={{
            fontSize: '14px'
          }}
        >
          +528183419054
        </Text>
      </Helper>
    )
  }

  function handleChange(e) {
    numChecker(e.target.value)
  }

  function validNumber(number) {
    return number.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
      ? true
      : false
  }

  function parseNumber(number) {
    return number
      .map(num => {
        if (number.length === 1 && number[0] === '+') {
          return '+'
        }
        if (num[0] !== '+' && num.length > 0) {
          return `+${num}`
        } else if (num.length === 1 && num[0] === '+') {
          if (
            number[number.indexOf(num)].length <
              numbers[numbers.indexOf(num)].length ||
            numbers[numbers.indexOf(num)] < 0
          ) {
            return ''
          }
        }
        return num
      })
      .join('\n')
  }

  function numChecker(number) {
    let numArr = number.split('\n')
    try {
      numArr = numArr.map(num => {
        if (validNumber(num) || (num.length === 1 && num[0] === '+')) {
          return num
        } else {
          return ''
        }
      })
      let checkedNumber = parseNumber(numArr)
      setNumbers(checkedNumber)
      setNumberError(false)
      return true
    } catch (e) {
      setNumberError(true)
      return false
    }
  }

  async function saveDid() {
    setStatus('creating')
    let companySlug = props.companySlug
    let campaignSlug = props.campaignSlug
    let poolId = props.poolId

    if (companySlug && campaignSlug && poolId) {
      let validNumbers = numbers.split('\n').filter(key => key.length > 1)

      validNumbers = validNumbers
        .map(key => {
          return key.substring(1, key.length)
        })
        .join(',')

      //console.log("Sending: ", validNumbers, props);
      let response = await createNewDid(
        companySlug,
        campaignSlug,
        poolId,
        validNumbers
      )
      if (response.status < 300) {
        setErrorSaving(false)
        setStatus('created')
        // console.log("Success", response);
      } else {
        setStatus('create')
        setErrorSaving(true)
        try {
          setError(response.data.detail || response.data)
        } catch {
          setError(response.data)
        }
        console.log('Failed', response)
      }
    }
  }

  function renderCreate() {
    return (
      <MuiThemeProvider theme={theme}>
        <Modal
          open={props.open}
          onClose={props.onClose}
          title="Creating new DID"
        >
          <Container>
            <TextField
              onChange={handleChange}
              multiline
              style={{
                marginBottom: '31px'
              }}
              error={numberError}
              label="Phone numbers"
              value={numbers}
              fullWidth
              required
              helperText={tagline()}
            />
            <SaveButton
              onClick={e => saveDid()}
              disabled={numberError || numbers.length < 2}
            >
              CREATE DID
            </SaveButton>
          </Container>
        </Modal>
      </MuiThemeProvider>
    )
  }

  function cancelSaving() {
    cancel()
    setStatus('create')
  }

  function didCreated() {
    return (
      <span>
        You have created the did <br />
        {numbers.split('\n').map(key => (
          <>
            <span>{key}</span>
            <br />
          </>
        ))}
      </span>
    )
  }

  function resetForm() {
    setNumbers('')
    setStatus('create')
  }

  function closeForm() {
    setNumbers('')
    setStatus('create')
    props.onClose()
  }

  function renderComponent() {
    switch (status) {
      case 'creating':
        return (
          <Dialog>
            <LoadingModal
              open={true}
              text={'One moment. We’re adding creating the new did...'}
              cancelFn={cancelSaving}
            />
          </Dialog>
        )
        break
      case 'created':
        return (
          <SuccessModal
            open={true}
            text={didCreated()}
            closeFn={closeForm}
            btnText="CREATE ANOTHER"
            btnFn={resetForm}
          />
        )
        break
      default:
        return <>{renderCreate()}</>
    }
  }

  return (
    <>
      {/* <Toast
        open={errorSaving}
        handleClose={e => null}
        message={error}
        toastType=""
        vertical="top"
        horizontal="right"
      /> */}
      {renderComponent()}
    </>
  )
}

export default Create