import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  width: 60vw;
  h1 {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 300;
    text-align: center;
    font-family: Roboto, 'Helvetica Neue', sans-serif;
  }
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const Header = styled.div`
  height: 64px;
  background: #5f7d98;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  h2 {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.00833em;
    font-size: 20px;
  }
  span {
    svg {
      margin: 0 6px;
      cursor: pointer;
    }
  }
`
const Card = styled.div`
  height: 80vh;
  background: #fff;
  border-radius: 4px;
`

export { Container, Header, Card }
