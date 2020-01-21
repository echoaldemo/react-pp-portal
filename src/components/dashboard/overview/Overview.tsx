import React, { useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import {
  BackButton,
  ChangeServer,
  TableLoader,
  ButtonWithIcon,
  HeaderLink
} from "common-components";
import Metrics from "./components/metrics/Metrics";
import { Span, HeaderContainer } from "./styles/Overview.style";

interface Obj {
  [index: string]: any;
}

const Overview = () => {
  const [menu, setMenu] = useState([]);
  const [current, setCurrent] = useState<Obj>({});
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [options] = useState([
    {
      name: "All",
      uuid: "all"
    },
    {
      name: "1",
      uuid: "1"
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      const tmp = localStorage.getItem("campaign_db_data");
      const tmp1 = localStorage.getItem("all_campaigns");
      if (tmp) {
        setCurrent(JSON.parse(tmp));
        if (tmp1) {
          setMenu(
            JSON.parse(tmp1)
              .filter((x: any) => x.slug !== current.slug)
              .map((link: any) => ({
                title: link.name,
                path: `/dashboard/all/${link.slug}/overview`
              }))
          );
          setLoading(false);
        }
      }
    }, 1000);
  }, []);

  return (
    <>
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
            <HeaderLink menu={menu} title={current.name} />
          ) : null}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Span>4 metrics showing</Span>
            <ButtonWithIcon
              handleClick={() => alert("edit widgets")}
              style={{ marginLeft: "auto" }}
              icon={<IoIosSettings />}
            >
              Edit widgets
            </ButtonWithIcon>
          </div>
          <Metrics />
        </>
      )}
    </>
  );
};

export default Overview;
