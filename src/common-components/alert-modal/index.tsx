import React from 'react'
import { Dialog } from '@material-ui/core'


import {
  Center,
  Card,
  Text,
  LoadingIcon,
  StyledInfoIcon,
  StyledCheckIcon,
  StyledErrorIcon,
  Button,
  Cancel
} from './styles/styles'

interface Props {
  open: boolean
  severity: string
  showBtn: boolean
  textBtn: string
  message: string
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}

const AlertModal: React.FC<Props> = ({ open, severity, message, showBtn, textBtn, onClick }) => {

  const getSeverityIcon = () => {
    if(severity === 'loading')
     return <LoadingIcon />
    else if(severity === 'success')
     return <StyledCheckIcon />
    else if(severity === 'error')
     return <StyledErrorIcon />
     else return <StyledInfoIcon/>
  }

  return (
    <Dialog open={open}>
      <Center data-cy="loading-modal">
        <Card>
          <Text>{message}</Text>
            {getSeverityIcon()}
          {showBtn && 
          <Button onClick={onClick}>
            <Cancel>{textBtn}</Cancel>
          </Button>}
        </Card>
      </Center>
    </Dialog>
  )
}

AlertModal.defaultProps = {
  open: false,
  severity: 'info' ,
  showBtn: true,
  textBtn: 'Close',
  message: ''
} as Partial<Props>

export { AlertModal }
