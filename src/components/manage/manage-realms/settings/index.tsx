import React, { useState, useEffect } from "react";
/*COMPONENTS*/
import { TableLoader, BackButton, StatusLabel } from "common-components";
import { MockCampaigns, MockRealmData } from "../components/contsVar";
import { get, patch, post, cancel } from "../../../../utils/api";

import RealmSettings from "./realmSettings";
import slugify from "slugify";

const RealmSettingsPage = (props: any) => {
  const [dataLoaded, setDataLoaded] = useState<any>(false);
  const [realm, setRealm] = useState<any>(null);
  const [active, setActive] = useState<any>(null);
  const [name, setName] = useState<any>("");
  const [saveLoader, setSaveLoader] = useState<any>(false);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);
  const [campaignsOrig, setCampaignsOrig] = useState<any>([]);
  let initialData: any = {};
  useEffect(() => {
    get(`/identity/realm/${props.match.params.uuid}/`).then((result: any) => {
      setRealm(result.data);
      setActive(result.data.active);
      setName(result.data.name);
      setCampaigns(result.data.campaigns);
      setCampaignsOrig(result.data.campaigns);
      setPaginateList(result.data.campaigns);
      setDataLoaded(true);
    });
  }, []);
  const handleActive = () => {
    setActive(!active);
  };
  const handleName = (value: any) => {
    setName(value);
  };
  const updateRealm = () => {
    setSaveLoader(true);
    patch(`/identity/realm/${props.match.params.uuid}/`, {
      active,
      name,
      campaigns: paginateList,
      slug: slugify(name)
    }).then((result: any) => {
      setRealm(result.data);
      setActive(result.data.active);
      setName(result.data.name);
      setCampaigns(result.data.campaigns);
      setCampaignsOrig(result.data.campaigns);
      setPaginateList(result.data.campaigns);
      setSaveLoader(false);
    });
  };
  const addCampaign = async (campaign: any) => {
    let arrCamp = [...campaign, ...campaignsOrig];
    setCampaigns(arrCamp);
    setCampaignsOrig(arrCamp);
    setPaginateList(arrCamp);

    return Promise.all(
      arrCamp.map(
        async camp =>
          await patch(`/identity/campaign/${camp.uuid}/`, {
            realms: [`${props.match.params.uuid}`]
          })
      )
    ).then(res => res[0].status);
  };
  const removeCampaign = async (uuid: string) => {
    var campaigns = paginateList.filter((camp: any) => {
      return camp.uuid !== uuid;
    });
    setCampaigns(campaigns);
    setPaginateList(campaigns);
    const update = await patch(`/identity/realm/${props.match.params.uuid}/`, {
      campaigns
    });
    return update;
  };
  const paginate = (from: number, to: number) => {
    const campaignsTemp = paginateList.slice(from, to);
    setCampaigns(campaignsTemp);
  };
  var edit =
    JSON.stringify(initialData) === JSON.stringify({ active, name })
      ? false
      : name.length === 0
      ? false
      : true;
  if (dataLoaded) {
    return (
      <>
        {console.log(campaigns)}
        <BackButton text="Back to realms" to="/manage/realms/" />
        <div
          style={{ display: "flex", alignItems: "center", margin: "25px 0" }}
        >
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "24px",
              color: "#444851",
              margin: "0 25px 0 0"
            }}
          >
            {name}
          </p>
          <StatusLabel status={true} />
        </div>
        <RealmSettings
          active={active}
          realm={realm}
          handleActive={handleActive}
          handleName={handleName}
          edit={edit}
          updateRealm={updateRealm}
          saveLoader={saveLoader}
          campaigns={campaigns}
          campaignsOrig={campaignsOrig}
          removeCampaign={removeCampaign}
          paginateList={paginateList}
          paginateFn={paginate}
          addCampaign={addCampaign}
        />
      </>
    );
  } else {
    return <TableLoader />;
  }
};

export { RealmSettingsPage };
