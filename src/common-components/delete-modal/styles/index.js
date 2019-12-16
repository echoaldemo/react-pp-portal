import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { GoTrashcan } from 'react-icons/go'

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 420px;
  min-height: 420px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 60px;
  background-color: #5f7d98;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
`
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`
const CloseIcon = styled(Close)`
  cursor: pointer;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px;
`
const DelBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #ff504d;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 36px;
`
const DisBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #bbbbbb;
  outline: none;
  border: none;
  margin: 0 auto;
  margin-top: 36px;
`
const DelBtnText = styled.strong`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: #eeeeee;
  margin: 0 36px;
`
const Trash = styled(GoTrashcan)`
  position: relative;
  font-size: 20px;
  bottom: 2px;
`
const Text = styled.strong`
  font-size: 18px;
  color: #7c8a97;
  margin: 0 0 20px 0;
`
const Name = styled.strong`
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #444851;
`
const Text2 = styled.p`
  color: #777777;
  font-size: 16px;
  margin: 0 0 20px 0;
`

export {
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
}
