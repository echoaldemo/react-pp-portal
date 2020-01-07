import React from 'react'
import Modal from '../../../../../../../common-components/Modal'
import { SaveButton } from '../../../../../../../common-components/buttons'
import InputField from '../../../../../../../common-components/input-field/InputField'
import styled from 'styled-components'
import { MenuItem } from '@material-ui/core'
const BtnCont = styled.div`
  display: flex;
  justify-content: center;
`

const data = [
  {
    uuid: '1',
    name: 'POSA Pledge Assistence'
  },
  {
    uuid: '2',
    name: 'POSA Pledge Assistence 2'
  }
]

const SendPost = ({ state, setState }) => {
  return (
    <Modal
      open={state.post}
      title="Send post"
      onClose={() => setState({ ...state, post: false })}
    >
      <InputField
        fullWidth
        style={{ margin: '30px 0' }}
        value={state.postUUID}
        select
        onChange={e => setState({ ...state, postUUID: e.target.value })}
      >
        {data.map(post => (
          <MenuItem key={post.uuid} value={post.uuid}>
            {post.name}
          </MenuItem>
        ))}
      </InputField>
      <BtnCont>
        <SaveButton onClick={() => alert('work in progress')}>Send</SaveButton>
      </BtnCont>
    </Modal>
  )
}

export default SendPost
