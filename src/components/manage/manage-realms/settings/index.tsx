import React, { useState, useEffect } from "react";
/*COMPONENTS*/
import { TableLoader, BackButton, StatusLabel } from "common-components";
import {
  MockCampaigns,
  MockRealmData
} from "../components/contsVar";
// import { get, patch, post, cancel, getGroups } from "../../../../utils/api";

import RealmSettings from "./realmSettings";

const RealmSettingsPage = () => {
  const [dataLoaded, setDataLoaded] = useState<any>(false);
  const [realm, setRealm] = useState<any>(null);
  const [active, setActive] = useState<any>(null);
  const [name, setName] = useState<any>("");
  const [saveLoader, setSaveLoader] = useState<any>(false);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>([]);
  const [campaignsOrig, setCampaignsOrig] = useState<any>([]);
  let initialData: any = {};

  // async componentDidMount() {
  //   let active, name;
  //   await get(`/identity/realm/${this.props.match.params.uuid}/`).then(
  //     result => {
  //       active = result.data.active;
  //       name = result.data.name;
  //       this.setState({
  //         realm: result.data,
  //         active,
  //         name,
  //         campaigns: result.data.campaigns,
  //         campaignsOrig: result.data.campaigns,
  //         paginateList: result.data.campaigns
  //       });
  //     }
  //   );
  //   this.initialData = { active, name };
  //   this.setState({ dataLoaded: true });
  // }

  useEffect(() => {
    // activeTemp = result.data.active;
    setRealm(MockRealmData);
    setActive(true);
    setName("Test");
    setCampaigns(MockCampaigns);
    setCampaignsOrig(MockCampaigns);
    setPaginateList(MockCampaigns);
    // this.initialData = { active, name };
    setTimeout(() => {
      setDataLoaded(true);
    }, 1500);
  }, []);

  const handleActive = () => {
    setActive(!active);
  };

  const handleName = (value: any) => {
    setName(value);
  };

  const updateRealm = () => {
    // const { active, name, campaigns, paginateList } = this.state;
    // this.setState({ saveLoader: true });
    // patch(`/identity/realm/${this.props.match.params.uuid}/`, {
    //   active,
    //   name,
    //   campaigns: paginateList
    // }).then(res => {
    //   this.initialData = { active: res.data.active, name: res.data.name };
    //   this.setState({
    //     realm: res.data,
    //     saveLoader: false,
    //     active: res.data.active,
    //     name: res.data.name
    //   });
    // });

    setSaveLoader(true);
    setTimeout(() => {
      setSaveLoader(false);
    }, 1500);
  };

  const addCampaign = async (campaign: any) => {
    // let arrCamp = [...campaign, ...this.state.campaignsOrig];
    // /* campaign.map(camp => {
    //   arrCamp.push(camp);
    // }); */
    // this.setState({
    //   campaigns: arrCamp,
    //   campaignsOrig: arrCamp,
    //   paginateList: arrCamp
    // });
    // const update = await patch(
    //   `/identity/realm/${this.props.match.params.uuid}/`,
    //   {
    //     campaigns: arrCamp
    //   }
    // );
    // return update;
    return { status: 200 };
  };

  const removeCampaign = async (uuid: string) => {
    // var campaigns = this.state.paginateList.filter(camp => {
    //   return camp.uuid !== uuid;
    // });
    // this.setState({ campaigns, paginateList: campaigns });
    // const update = await patch(
    //   `/identity/realm/${this.props.match.params.uuid}/`,
    //   { campaigns }
    // );
    // return update;
    return { status: 200 };
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
