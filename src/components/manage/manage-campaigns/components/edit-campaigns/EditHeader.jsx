import React, { useState } from "react";
import {
  NavTabs,
  BackButton,
  StatusLabel,
  ChangeServer
} from "common-components";
import { Typography } from "@material-ui/core";
import SEO from "utils/seo";

export default function EditHeader({ campaignDetails, match, history }) {
  const localData = JSON.parse(localStorage.getItem("campaignData"));
  const [selected, setSelected] = useState("1");
  const options = [
    {
      name: "PP23",
      uuid: "1"
    },
    {
      name: "PP33",
      uuid: "2"
    }
  ];
  const { name, active } = campaignDetails ? campaignDetails : localData;
  return (
    <div>
      <SEO title={name ? `Edit Campaign: ${name}` : "Portal"} />
      <div className="campaign-edit-header-container pb-normal">
        <BackButton
          text="Back to campaigns"
          backFn={() => history.push("/manage/campaigns")}
        />
        <ChangeServer
          selected={selected}
          options={options}
          onChangeFn={setSelected}
        />
      </div>
      <div className="campaign-edit-header-container pb-normal">
        <div className="title-container">
          <Typography className="edit-title">{name}</Typography>
          &emsp;
          <StatusLabel status={active} />
        </div>

        <NavTabs
          tabnames={[
            {
              name: <b>DASHBOARD</b>,
              active: checkUrl("home"),
              onClickFn: () =>
                history.push(
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/home`
                )
            },
            {
              name: <b>SETTINGS</b>,
              active: checkUrl("settings"),
              onClickFn: () =>
                history.push(
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/settings`
                )
            },
            {
              name: <b>PITCH</b>,
              active: checkUrl("details"),
              onClickFn: () =>
                history.push(
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/pitch/details`
                )
            },
            {
              name: <b>DATA POSTING</b>,
              active: checkUrl("dataposting"),
              onClickFn: () =>
                history.push(
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/dataposting`
                )
            }
          ]}
        />
      </div>
    </div>
  );
}
function checkUrl(str) {
  if (window.location.href.indexOf(str) > -1) {
    return true;
  }
  return false;
}
