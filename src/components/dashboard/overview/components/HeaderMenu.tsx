import React from "react";
import { HeaderLink, CampaignMenuSelect } from "common-components";
import { options } from "./metrics/options";
import styled from "styled-components";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

interface Props {
  menu: any[];
  title: string;
}

const HeaderMenu = ({ menu, title }: Props) => {
  return (
    <Cont>
      <HeaderLink menu={menu} title={title} />
      <CampaignMenuSelect title="Campaign menu" options={options} />
    </Cont>
  );
};

export default HeaderMenu;
