import React, { useState, useEffect } from "react";
import { HeaderLink, HeaderButton } from "common-components";
import { menus } from "../globalConstsVar";
import CampaignTable from "./CampaignTable";
import SEO from "utils/seo";

export default function Campaigns() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData([]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <SEO title="Manage Campaigns" />
      {renderHeader(data)}
      <CampaignTable loading={loading} data={data} />
    </>
  );
}

function renderHeader(data) {
  return (
    <div className="header-container">
      <HeaderLink menu={menus} title="Campaigns" />
      {data.length > 0 && (
        <HeaderButton
          openFunction={() => {
            return null;
          }}
          buttonText="New Campaign"
        />
      )}
    </div>
  );
}
