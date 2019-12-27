import styled from "styled-components"

const Container = styled.div`
  display: flex;
  color: white;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`
const Done = styled.div`
  background: #b6d36b;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`
const Current = styled.div`
  background: #f89523;
  min-width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Rest = styled.div`
  background: #f4f4f4;
  color: #bbbbbb;
  min-width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Line = styled.span`
  border-bottom: solid 2px #eeeeee;
  flex-grow: 1;
  margin: 0 4px;
`
const BtnCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`
const NormalBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  outline: none;
  cursor: pointer;
  border: none;
`
const CancelText = styled.strong`
  color: #444851;
  font-size: 14px;
  text-transform: uppercase;
`
const Next = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;
  outline: none;
  cursor: pointer;
  border: none;
`
const NextText = styled.strong`
  color: #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`
const BackText = styled.strong`
  color: #444851;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Finish = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  outline: none;
  cursor: pointer;
  border: none;
`
const FinishText = styled.strong`
  color: #ffffff;
  font-size: 14px;
  text-transform: uppercase;
`
const DisText = styled.strong`
  color: #bbbbbb;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`

export {
  Container,
  Done,
  Current,
  Rest,
  Line,
  BtnCont,
  NormalBtn,
  CancelText,
  Next,
  NextText,
  BackText,
  Finish,
  FinishText,
  DisText
}
