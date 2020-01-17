import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackButton from "../../common-components/back-button/";
import ChangeServer from "../../common-components/change-server/ChangeServer";
import TableLoader from "../../common-components/table-loader/TableLoader";
import { ButtonWithIcon } from "../../common-components/buttons";
import { get } from "../../../utils/api";
import Metrics from "./components/metrics/Metrics";
import HeaderMenu from "./components/HeaderMenu";
import SEO from "../../../utils/seo";
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
const Overview = props => {
  const [menu, setMenu] = useState([]);
  const [current, setCurrent] = useState({});
  const [companySlug, setCompanySlug] = useState("");
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [options, setOption] = useState([
    {
      name: "All",
      uuid: "all"
    }
  ]);

  useEffect(() => {
    setMenu([]);
    setLoading(true);
    get(`/identity/campaign/list/`).then(res => {
      const test = res.data.map(campaign => {
        if (props.match.params.slug === campaign.slug) {
          setCurrent(campaign);
          get(`/identity/company/${campaign.company}/`).then(res =>
            setCompanySlug(res.data.slug)
          );
          let op = [
            {
              name: "All",
              uuid: "all"
            }
          ];
          get(`/identity/realm/list/`).then(res => {
            campaign.realms.forEach(realm => {
              op.push(res.data.find(real => real.uuid === realm));
            });
            setOption(op);
          });
        }
        const obj = {
          title: campaign.name,
          path: `/dashboard/all/${campaign.slug}/overview`
        };
        return obj;
      });
      setMenu(test);
      setLoading(false);
    });
  }, [props.match.params.slug]);

  return (
    <>
      <SEO title={current.name ? current.name : "Portal"} />
      <HeaderContainer>
        <BackButton text="Back to campaigns" to="/manage/campaigns/" />
        <ChangeServer
          selected={selected}
          options={options}
          onChangeFn={setSelected}
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
