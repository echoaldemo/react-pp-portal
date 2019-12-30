import React from 'react'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

interface EditButtonProps {
  text: string
  style?: object
  iconStyle?: object
  textStyle?: object
  onClickFunc: Function
}

const EditButton: React.FC<EditButtonProps> = ({
  onClickFunc,
  style,
  iconStyle,
  textStyle,
  text
}) => {
  return (
    <Button
      onClick={() => {
        onClickFunc()
      }}
      style={{
        textTransform: 'none',
        ...style
      }}
    >
      <EditIcon
        style={{
          fontSize: 14,
          ...iconStyle
        }}
      />
      &nbsp;
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'underline',
          ...textStyle,
          color: '#444851'
        }}
      >
        {text}
      </span>
    </Button>
  )
}

EditButton.defaultProps = {
  text: 'Edit Test',
  onClickFunc: () => {
    alert('Edit button')
  }
} as Partial<EditButtonProps>

export default EditButton
