import React from 'react'
import { Button, AddIcon } from './styles'

const HeaderButton = ({ style, openFunction, buttonIcon, buttonText }) => {
  return (
    <>
      <Button style={style} onClick={openFunction}>
        {buttonIcon === 'off' ? null : <AddIcon />}
        {buttonText}
      </Button>
    </>
  )
}

export default HeaderButton
