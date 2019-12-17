import React from 'react'
import { Dialog } from '@material-ui/core'
import {
  Center,
  Card,
  Text,
  LoadingIcon,
  Button,
  Cancel
} from './styles/styles'

interface Props {
  open: boolean
  text: string
  cancelFn: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}

const LoadingModal: React.FC<Props> = ({ open, text, cancelFn }) => {
  return (
    <Dialog open={open}>
      <Center data-cy="loading-modal">
        <Card>
          <Text>{text}</Text>
          <LoadingIcon />
          <Button onClick={cancelFn}>
            <Cancel>cancel</Cancel>
          </Button>
        </Card>
      </Center>
    </Dialog>
  )
}

LoadingModal.defaultProps = {
  open: false,
  text: ''
} as Partial<Props>

export { LoadingModal }
