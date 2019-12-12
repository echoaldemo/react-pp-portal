import React, { SyntheticEvent } from 'react'
import { Center, Card, Text, LoadingIcon, Button, Cancel } from './styles'

interface Props {
  text: string
  cancelFn: (e: SyntheticEvent<HTMLButtonElement>) => void
}

const LoadingModal: React.FC<Props> = ({ text, cancelFn }) => {
  return (
    <Center data-cy="loading-modal">
      <Card>
        <Text>{text}</Text>
        <LoadingIcon />
        <Button onClick={cancelFn}>
          <Cancel>cancel</Cancel>
        </Button>
      </Card>
    </Center>
  )
}

LoadingModal.defaultProps = {
  text: ''
} as Partial<Props>

export default LoadingModal
