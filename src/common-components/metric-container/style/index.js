import styled from 'styled-components'
const Card = styled.div`
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 0 6px 1px rgba(155, 155, 155, 0.18);
  background-color: #ffffff;
  padding: 24px 20px;
`
const HeaderText = styled.strong`
  font-size: 18px;
  font-family: Roboto;
  color: #444851;
  margin-left: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Header = styled.div`
  display: flex;
  align-items: center;
`
const Content = styled.div`
  margin-top: 20px;
  min-height: calc(100% - 44px);
  position: relative;
`
export { Card, Header, HeaderText, Content }
