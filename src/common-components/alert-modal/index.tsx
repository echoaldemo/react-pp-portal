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
  handlerClickBtn: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}

const AlertModal: React.FC<Props> = ({ open, severity, message, showBtn, textBtn, handlerClickBtn }) => {

  interface Icons {
    [loading:string]: React.ReactNode,
    success: React.ReactNode,
    error: React.ReactNode,
    info: React.ReactNode
  }

  const IconList: Icons = {
    loading: <LoadingIcon />,
    success: <StyledCheckIcon />,
    error: <StyledErrorIcon/>,
    info: <StyledInfoIcon/>
  }

  const getSeverityIcon = (icon:string) => IconList[icon]

  return (
    <Dialog open={open}>
      <Center data-cy="loading-modal">
        <Card>
          <Text>{message}</Text>
            {getSeverityIcon(severity)}
          {showBtn && 
          <Button onClick={handlerClickBtn}>
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
