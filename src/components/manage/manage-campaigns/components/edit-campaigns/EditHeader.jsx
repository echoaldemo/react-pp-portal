import React, { useState } from "react";
import {
  NavTabs,
  BackButton,
  StatusLabel,
  ChangeServer
} from "common-components";
import { Typography } from "@material-ui/core";
import SEO from "utils/seo";

<<<<<<< HEAD
export default function EditHeader({ campaignDetails, history }) {
=======
export default function EditHeader({ campaignDetails, match, history }) {
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
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
<<<<<<< HEAD
  const { name, active, uuid, slug } = campaignDetails
    ? campaignDetails
    : localData;
=======
  const { name, active } = campaignDetails ? campaignDetails : localData;
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
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
<<<<<<< HEAD
                history.push(`/manage/campaign/edit/${slug}/${uuid}/home`)
=======
                history.push(
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/home`
                )
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
            },
            {
              name: <b>SETTINGS</b>,
              active: checkUrl("settings"),
              onClickFn: () =>
<<<<<<< HEAD
                history.push(`/manage/campaign/edit/${slug}/${uuid}/settings`)
=======
                history.push(
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/settings`
                )
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
            },
            {
              name: <b>PITCH</b>,
              active: checkUrl("details"),
              onClickFn: () =>
                history.push(
<<<<<<< HEAD
                  `/manage/campaign/edit/${slug}/${uuid}/pitch/details`
=======
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/pitch/details`
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
                )
            },
            {
              name: <b>DATA POSTING</b>,
              active: checkUrl("dataposting"),
              onClickFn: () =>
                history.push(
<<<<<<< HEAD
                  `/manage/campaign/edit/${slug}/${uuid}/dataposting`
=======
                  `/manage/campaign/edit/${match.params.slug}/${match.params.uuid}/dataposting`
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
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
