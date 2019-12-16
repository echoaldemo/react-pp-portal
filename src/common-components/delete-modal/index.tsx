import React, { useState } from 'react'
import {
  InputField,
  Center,
  Box,
  Header,
  CenterText,
  CloseIcon,
  Content,
  DelBtn,
  DisBtn,
  DelBtnText,
  Trash,
  Text,
  Text2,
  Name
} from './styles'

interface Props {
  header?: string
  msg?: string
  name: string
  closeFn: () => void
  delFn: () => void
}

const DeleteModal: React.FC<Props> = ({
  header,
  msg,
  name,
  closeFn,
  delFn
}) => {
  const [val, setVal] = useState('')
  const [ok, setOk] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
    if (e.target.value === name) {
      setOk(true)
    } else {
      setOk(false)
    }
  }

  return (
    <Center>
      <Box>
        <Header>
          <CenterText>{header}</CenterText>
          <CloseIcon onClick={closeFn} />
        </Header>
        <Content>
          <Text>Are you sure you want to delete this {msg}?</Text>
          <Name>{name}</Name>
          <Text2>
            <strong>{name}</strong> will be removed from all servers. Confirm by
            entering the {msg} name into the input.
          </Text2>
          <InputField
            label={name}
            margin="normal"
            value={val}
            onChange={handleChange}
            data-cy="del-field"
          />
          {ok ? (
            <DelBtn onClick={delFn} id="delBtn">
              <DelBtnText>
                <Trash />
                Delete
              </DelBtnText>
            </DelBtn>
          ) : (
            <DisBtn disabled>
              <DelBtnText>
                <Trash />
                Delete
              </DelBtnText>
            </DisBtn>
          )}
        </Content>
      </Box>
    </Center>
  )
}

DeleteModal.defaultProps = {
  header: '',
  msg: '',
  name: ''
} as Partial<Props>

export { DeleteModal }
