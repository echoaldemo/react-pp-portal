import styled from 'styled-components'
import { Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export const MainContainer = styled.div`
  background-color: '#ececec';
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: 'center';
`

export const LoginBoxCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 350px;
  margin-top: 64px;
`

export const LoginForm = styled.div`
  height: 80px;
  max-width: 335px;
`

export const CustomInput = styled(Input)`
  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
  }
`
export const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '450px',
    zIndex: '1',
    top: '-15px',
    left: '0'
  },
  inputLabel: {
    '&.Mui-focused': {
      color: '#667d98'
    }
  },
  inputLabelError: {
    '&.Mui-focused': {
      color: 'red'
    }
  },
  inputField: {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#637b97'
    },
    '&:after': {
      borderColor: '#637b97'
    },
    '&:before': {
      borderColor: '#e0e0e0'
    }
  },
  inputUnderline: {
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #e0e0e0'
    }
  }
}))
