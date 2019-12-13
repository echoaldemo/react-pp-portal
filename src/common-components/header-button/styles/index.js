import styled from 'styled-components'
import { Button as Btn } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const Button = styled(Btn)`
  background: #b6d36b !important;
  color: #fff !important;
  font-size: 14px;
  font-weight: 700 !important;
  height: 40px;
  border-radius: 3px;
  text-transform: none !important;
  padding: 0 15px;
`

const AddIcon = styled(Add)`
  width: 24px;
  height: 24px;
  margin: 0 3px 0 -6px;
`

export { Button, AddIcon }
