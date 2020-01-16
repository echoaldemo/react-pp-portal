import styled from "styled-components";
import { MenuItem as MenuItem2, Divider } from "@material-ui/core";
import { SaveButton } from "common-components";

const MenuItem = styled(MenuItem2)`
  color: #777777 !important;
  min-width: 256px;
  padding-top: 0;
  padding-bottom: 0;
  font-weight: 400;
`;

const CancelBtn = styled(SaveButton)`
  background: #eeeeee;
  margin-right: 40px;
  strong {
    color: #444851;
  }
`;
const BtnCont = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 20px 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  strong {
    font-size: 18px;
    color: #444851;
    margin-bottom: 16px;
  }
`;
const NewDivide = styled(Divider)`
  margin: 20px 0 !important;
`;
const Container = styled.div`
  background: #fafafa;
`;
const Span = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export { MenuItem, CancelBtn, BtnCont, Header, NewDivide, Container, Span };
