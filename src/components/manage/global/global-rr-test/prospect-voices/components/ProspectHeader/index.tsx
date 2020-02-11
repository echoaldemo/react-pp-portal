import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { HeaderButton } from "common-components";

const HeaderContainer = styled.div`
  width: 95.4%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
`;

const HeaderText = styled(Typography)`
  width: fit-content;
  height: 19px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #777777;
  text-indent: 20px;
`;

interface Props {
  openCreateVoice: Function;
}

export default (props: Props) => {
  return (
    <HeaderContainer>
      <HeaderText>
        Here you can create a new prospect voice for this specific test.
      </HeaderText>

      <HeaderButton
        style={{
          marginRight: "14px"
        }}
        buttonText="Create new voice"
        openFunction={() => props.openCreateVoice(true)}
      />
    </HeaderContainer>
  );
};
