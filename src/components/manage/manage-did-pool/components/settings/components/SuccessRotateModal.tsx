import React from "react";
import styled from "styled-components";
import { Close, Check, Error } from "@material-ui/icons";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  min-height: 290px;
  height: auto;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;
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
`;
const CloseIcon = styled(Close)`
  color: #444851;
`;
const CloseIconCont = styled.div`
  margin: 20px 18.5px 10px auto;
  cursor: pointer;
`;
const CloseBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const BtnFn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;
  cursor: pointer;
  border: none;
  outline: none;
`;
const BtnText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`;
const CloseText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;
const BtnCont = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 27px 0 34px 0;
`;
const Text = styled.div`
  margin-top: 20px;
  width: 340px;
  min-height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #7c8a97;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const SubDiv = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  color: #7c8a97;
  margin: 10px 0 23px 0;
  max-width: 80%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

interface Props {
  subtitle: string;
  text: string;
  btnText?: string;
  closeFn: () => void;
  btnFn?: () => void;
}

const SuccessRotateModal: React.FC<Props> = ({
  subtitle,
  text,
  btnText,
  closeFn,
  btnFn
}) => {
  return (
    <>
      <Center data-cy="success-modal">
        <Card>
          <CloseIconCont>
            <CloseIcon onClick={closeFn} />
          </CloseIconCont>
          <CheckIcon />
          <Text>{text}</Text>
          <SubDiv>
            <Error style={{ color: "7c8a97" }} />
            {subtitle}
          </SubDiv>
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
    </>
  );
};

export default SuccessRotateModal;
