import React from 'react'
import styled from 'styled-components'
import { Close, Check, Error, CheckCircle } from '@material-ui/icons'
import { Dialog } from '@material-ui/core'

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
  min-height: 290px;
  height: auto;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`
const CheckIcon = styled(Check)`
  background: #b6d36b;
  color: white;
  border-radius: 50%;
  width: 30px !important;
  height: 30px !important;
  path {
    width: 18px !important;
    height: 13.8px !important;
  }
`
const CloseIcon = styled(Close)`
  color: #444851;
`
const CloseIconCont = styled.div`
  margin: 20px 18.5px 10px auto;
  cursor: pointer;
`
const CloseBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`
const BtnFn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;
  cursor: pointer;
  border: none;
  outline: none;
`
const BtnText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`
const CloseText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`
const BtnCont = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 27px 0 34px 0;
`
const Text = styled.div`
  margin-top: 20px;
  width: 340px;
  min-height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #7c8a97;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`
const P = styled.p`
  color: #7c8a97;
  margin: 10px 0 40px 0;
  max-width: 75%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const SubDiv = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  color: #7c8a97;
  margin: 10px 0 23px 0;
  max-width: 80%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const GridDiv = styled.div`
  display: grid;
  width: 332px;
`

const Did = styled.p`
  margin: 0px 0px 12px;
  display: grid;
  grid-template-columns: 120px 25px;
  align-items: center;
  color: #7c8a97;
  max-width: 75%;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`

const ErrorDid = styled.span`
  text-decoration: line-through;
  color: #bbbbbb;
`

const SuccessModal = ({
  open,
  dids,
  subtitle,
  text,
  btnText,
  closeFn,
  btnFn
}) => {
  return (
    <Dialog open={open}>
      <Center data-cy="success-modal">
        <Card>
          <CloseIconCont>
            <CloseIcon onClick={closeFn} />
          </CloseIconCont>
          <CheckIcon />
          <Text>{text}</Text>
          <SubDiv>
            <Error style={{ color: 'red' }} />
            {subtitle}
          </SubDiv>
          <GridDiv>
            <P style={{ margin: '13px 0 13px 0' }}>
              <strong>
                {[...dids].filter(did => did.purchased).length} DID's Purchased:
              </strong>
            </P>
            {dids.map(did => (
              <Did style={{ margin: '0 0 12px 0' }}>
                {did.purchased ? did.number : <ErrorDid>{did.number}</ErrorDid>}
                {did.purchased ? (
                  <CheckCircle style={{ color: '#b6d36b', fontSize: 20 }} />
                ) : (
                  <Error style={{ color: 'red', fontSize: 20 }} />
                )}
              </Did>
            ))}
          </GridDiv>
          <BtnCont>
            <CloseBtn onClick={closeFn}>
              <CloseText>Close</CloseText>
            </CloseBtn>
            {btnFn || btnText ? (
              <BtnFn onClick={btnFn}>
                <BtnText>{btnText}</BtnText>
              </BtnFn>
            ) : null}
          </BtnCont>
        </Card>
      </Center>
    </Dialog>
  )
}

export default SuccessModal
