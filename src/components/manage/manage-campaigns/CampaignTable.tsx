/*eslint-disable */
import React, { useState, useEffect } from "react";
import {
  TableNoResult,
  SaveButton,
  TableLoader,
  AsyncTable,
  UnderlineCell,
  ActiveCell,
  EditButton
} from "common-components";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { LightTooltip } from "../globalConstsVar";

import { Add, FileCopyOutlined as Icon } from "@material-ui/icons";
import { TableCell, TableRow } from "@material-ui/core";
interface Props {
  data: Array<object>;
  loading: any;
  history: any;
  setOpenCreateModal: any;
  setLoading: any;
}

const CampaignTable: React.FC<Props> = ({
  data,
  setLoading,
  loading,
  history,
  setOpenCreateModal
}) => {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : data.length !== 0 ? (
        <AsyncTable
          headers={["Name", "Slug", "UUID", "Status", ""]}
          tableData={data}
          render={(campaigns: any, { row, cell, uuid, icon }: any) => {
            return campaigns.map((campaign: any, i: number) => (
              <TableRow className={row} key={i} id="demo-body">
                <UnderlineCell
                  className={cell}
                  onClick={() =>
                    history.history.push(
                      `/manage/campaign/edit/${campaign.slug}/${campaign.uuid}/settings`
                    )
                  }
                >
                  {campaign.name}
                </UnderlineCell>
                <TableCell className={cell}>{campaign.slug}</TableCell>

                <TableCell className={uuid}>
                  <p>{campaign.uuid}</p>
                  <CopyToClipboard
                    text={campaign.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        <Icon
                          // path={mdiContentCopy}
                          className={icon}
                          rotate={360}
                        />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        <Icon className={icon} rotate={360} />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>
                <ActiveCell className={cell} style={{ color: "#777777" }}>
                  {campaign.active}
                </ActiveCell>
                <TableCell className={cell} align="right">
                  <EditButton
                    text="Edit"
                    onClickFunc={() => {
                      history.history.push(
                        `/manage/campaign/edit/${campaign.slug}/${campaign.uuid}/settings`
                      );
                      localStorage.setItem(
                        `campaignData`,
                        JSON.stringify(campaign)
                      );
                    }}
                    style={{
                      color: "#444851"
                    }}
                  />
                </TableCell>
              </TableRow>
            ));
          }}
        />
      ) : (
        renderNoData(setOpenCreateModal)
      )}
    </div>
  );
};

function renderNoData(setOpenCreateModal: any) {
  return (
    <TableNoResult
      headerText="Campaigns"
      mainMessage="No campaigns have been created"
      subMessage="Would you like to create one? Just hit the “New Campaign button."
      renderButton={
        <SaveButton
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          {" "}
          <Add /> New Campaign
        </SaveButton>
      }
    />
  );
}

export default CampaignTable;
