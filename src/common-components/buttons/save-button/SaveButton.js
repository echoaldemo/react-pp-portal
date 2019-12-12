import React from 'react'
import styled from 'styled-components'

const Save = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
`
const SaveText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`
const DisSave = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  text-transform: uppercase;
`
const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`

const SaveButton = props => {
  return props.disabled ? (
    <DisSave {...props}>
      <DisText>{props.children}</DisText>
    </DisSave>
  ) : (
    <Save {...props}>
      <SaveText>{props.children}</SaveText>
    </Save>
  )
}

export default SaveButton
