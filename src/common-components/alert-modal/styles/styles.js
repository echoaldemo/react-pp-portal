import styled from "styled-components"
import { CircularProgress } from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"
import ErrorIcon from "@material-ui/icons/Error"

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 270px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`
const Text = styled.div`
  margin-top: 47px;
  width: 272px;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #7c8a97;
`
const WrapperIcon = `
  width: 45px !important;
  height: 45px !important;
  margin-top: 15px;
  margin-bottom: 42px;
`

const LoadingIcon = styled(CircularProgress)`
  color: #1194f6 !important;
  margin-top: 35px !important;
  margin-bottom: 30px !important;
  width: 45px !important;
  height: 45px !important;
`
const StyledInfoIcon = styled(InfoIcon)`
  color: #2196f3 !important;
  ${WrapperIcon}
`
const StyledCheckIcon = styled(CheckCircleOutlineIcon)`
  color: #4caf50 !important;
  ${WrapperIcon}
`
const StyledErrorIcon = styled(ErrorIcon)`
  color: #f44336 !important;
  ${WrapperIcon}
`

const Button = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  cursor: pointer;
`
const Cancel = styled.span`
  margin-bottom: 31px;
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`

export {
  Center,
  Card,
  Text,
  LoadingIcon,
  StyledInfoIcon,
  StyledCheckIcon,
  StyledErrorIcon,
  Button,
  Cancel
}
