import React, { useState } from "react";
import { Tooltip, Dialog } from "@material-ui/core";
import {
  GroupOutlined,
  Add,
  FileCopyOutlined as Icon,
  Remove,
  Error
} from "@material-ui/icons/";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { TableRow, TableCell } from "@material-ui/core";
import { mdiContentCopy } from "@mdi/js";

// import AddCampaignModal from "./component/realm-add-campaign/AddCampaignModal";
import {
  ActiveCell,
  AsyncTable,
  SuccessModal,
  LoadingModal,
  Pagination,
  TableLoader
} from "common-components";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 145px;
  padding: 5px 20px;
  border-radius: 3px;
  background-color: #fafafa;
  margin: 10px 0;
`;

const P = styled.p`
  font-size: 16px;
  color: #777777;
`;

const AddCamp = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  color: #1194f6;
  font-size: 16px;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RemoveBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  text-decoration: underline;
  color: #444851;
`;

const IdCont = styled.span`
  width: 278px;
  padding: 12px 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const RealmName = styled.p`
  width: fit-content;
  text-decoration: underline;
  color: #444851;
`;

const NoDiv = styled.div`
  min-height: 400px;
`;

const GridDiv = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 150px;
`;

const NoCamp = styled.p`
  font-size: 18px;
  text-align: center;
  color: #7c8a97;
`;

const NoCampSub = styled.p`
  font-size: 16px;
  text-align: center;
  color: #777777;
  max-width: 355px;
`;

export default function CampaignSettings(props: any) {
  const {
    data,
    removeCampaign,
    realm,
    paginateList,
    paginateFn,
    addCampaign,
    campaignsOrig
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [copy, setCopy] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [modalType, setModalType] = useState("warn");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const openFunc = () => {
    setOpenAdd(!openAdd);
  };

  const removeFn = () => {
    setModalType("loading");
    setText("One moment. We're removing the campaign...");
    setTimeout(async () => {
      const data = await removeCampaign(selected.uuid);
      if (data.status === 200) {
        setModalType("success");
        setText(`You have removed "${selected.name}" from ${realm.name}`);
      }
    }, 2000);
  };

  const closeFn = () => {
    setOpenDelete(false);
    setTimeout(() => {
      setModalType("warn");
    }, 800);
  };

  const addCamp = () => {
    setOpenDelete(false);
    setOpenAdd(true);
    setTimeout(() => {
      setModalType("warn");
    }, 800);
  };

  const campFn = async (camps: any) => {
    setSelected(true);
    setModalType("loading");
    setText("One moment. We're adding the campaigns...");
    setTimeout(() => {
      setOpenAdd(false);
      setOpenDelete(true);
    }, 500);
    const data = await addCampaign(camps);
    if (data.status) {
      setText("Successfully added campaigns");
      setModalType("success");
    }
  };

  return loading ? (
    <TableLoader />
  ) : (
    <>
      <Grid>
        <P>You can associate a campaign to this realm right from this page.</P>
        <AddCamp onClick={openFunc}>
          <Add />
          Add Campaign
        </AddCamp>
        {/* <AddCampaignModal
          open={openAdd}
          openFunc={openFunc}
          data={campaignsOrig}
          addCampaign={campFn}
        /> */}
      </Grid>
      {data.length > 0 ? (
        <AsyncTable
          customHeight={480}
          withBorder
          headers={["Name", "Slug", "UUID", "Status", ""]}
          tableData={data}
          render={(samples: any, { userCell, row, cell, uuid, icon }: any) =>
            samples.map((sample: any) => (
              <TableRow className={row} key={sample.uuid}>
                <TableCell className={userCell}>
                  <RealmName>{sample.name}</RealmName>
                </TableCell>
                <TableCell className={userCell}>{sample.slug}</TableCell>
                <TableCell className={uuid}>
                  <IdCont>{sample.uuid}</IdCont>
                  <CopyToClipboard
                    text={sample.uuid}
                    onCopy={() => setCopy(true)}
                    onPointerLeave={() => setCopy(false)}
                  >
                    {copy ? (
                      <LightTooltip title="UUID Copied!" placement="top">
                        <Icon className={icon} rotate={360} />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title="Copy UUID" placement="top">
                        <Icon className={icon} rotate={360} />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </TableCell>
                <ActiveCell className={cell}>{sample.active}</ActiveCell>
                <TableCell className={cell} align="right">
                  <RemoveBtn
                    onClick={() => {
                      setSelected(sample);
                      setOpenDelete(true);
                    }}
                  >
                    <Remove />
                    Remove
                  </RemoveBtn>
                </TableCell>
              </TableRow>
            ))
          }
        />
      ) : (
        <NoDiv>
          <GridDiv>
            <Error style={{ color: "red" }} />
            <NoCamp>There are no campaigns associated with this realm.</NoCamp>
            <NoCampSub>
              Would you like to add a campaign? Just hit the “Add Campaign”
              button.
            </NoCampSub>
          </GridDiv>
        </NoDiv>
      )}
      {Boolean(paginateList.length) && (
        <Pagination
          paginateFn={paginateFn}
          totalItems={paginateList.length}
          itemsPerPage={5}
        />
      )}
      {selected ? (
        modalType === "warn" ? (
          <SuccessModal
            open={openDelete}
            warning
            btnText={"YES, REMOVE"}
            btnFn={removeFn}
            closeFn={closeFn}
            text={`Are you sure you want to remove "${selected.name}" from ${realm.name}?`}
          />
        ) : modalType === "loading" ? (
          <LoadingModal open={true} text={text} cancelFn={closeFn} />
        ) : (
          <SuccessModal
            open={openDelete}
            btnText={
              text === "Successfully added campaigns"
                ? "ADD ANOTHER"
                : "ADD CAMPAIGN"
            }
            btnFn={addCamp}
            closeFn={closeFn}
            text={text}
          />
        )
      ) : null}
    </>
  );
}
