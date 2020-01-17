import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BackButton,
  ChangeServer,
  TableLoader,
  ButtonWithIcon
} from "common-components";
import Metrics from "./components/metrics/Metrics";
import HeaderMenu from "./components/HeaderMenu";
import { IoIosSettings } from "react-icons/io";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Span = styled.div`
  font-size: 16px;
  color: #bbbbbb;
  margin: 16px 0px;
`;
const Overview = (props) => {
  const [menu, setMenu] = useState([]);
  const [current, setCurrent] = useState({});
  const [companySlug, setCompanySlug] = useState("");
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(false);
  const [options, setOption] = useState([
    {
      name: "All",
      uuid: "all"
    }
  ]);

  return (
    <>
      <HeaderContainer>
        <BackButton text="Back to campaigns" to="/manage/campaigns/" />
        <ChangeServer
          selected={selected}
          options={options}
          onChangeFn={() => console.log("")}
        />
      </HeaderContainer>
      {loading ? (
        <TableLoader />
      ) : (
        <>
          {/* <HeaderLink menu={menu} title={current.name} /> */}
          {menu.length !== 0 ? (
            <HeaderMenu menu={menu} title={current.name} />
          ) : null}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Span>4 metrics showing</Span>
            <ButtonWithIcon
              onClick={() => alert("edit widgets")}
              style={{ marginLeft: "auto" }}
              icon={<IoIosSettings />}
            >
              Edit widgets
            </ButtonWithIcon>
          </div>
          <Metrics
            companySlug={companySlug}
            campaignSlug={props.match.params.slug}
          />
        </>
      )}
    </>
  );
};

export default Overview;
