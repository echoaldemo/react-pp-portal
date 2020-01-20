import React from "react";
import { HeaderLink, CampaignMenuSelect } from "common-components";
import { options, otherOptions } from "./metrics/options";
import styled from "styled-components";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const HeaderMenu = ({ menu, title }) => {
  return (
    <Cont>
      <HeaderLink menu={menu} title={title} />
      <CampaignMenuSelect
        title="Campaign menu"
        options={options}
        otherOptions={otherOptions}
      />
    </Cont>
  );
};

export default HeaderMenu;
