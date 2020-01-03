import React, { Component } from "react";
import NavTabs from "../../../common-components/nav-tabs/Settings-menu-bar";
/*COMPONENTS*/
import TableLoader from "../../../common-components/table-loader/TableLoader";

import { get, patch, post, cancel, getGroups } from "../../../../utils/api";

import RealmSettings from "./realmSettings";

class RealmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoaded: false,
      realm: null,
      active: null,
      name: "",
      saveLoader: false,
      campaigns: [],
      paginateList: [],
      campaignsOrig: []
    };
    this.initialData = {};
  }

  async componentDidMount() {
    let active, name;
    await get(`/identity/realm/${this.props.match.params.uuid}/`).then(
      result => {
        active = result.data.active;
        name = result.data.name;
        this.setState({
          realm: result.data,
          active,
          name,
          campaigns: result.data.campaigns,
          campaignsOrig: result.data.campaigns,
          paginateList: result.data.campaigns
        });
      }
    );
    this.initialData = { active, name };
    this.setState({ dataLoaded: true });
  }

  handleActive = () => {
    this.setState({
      active: !this.state.active
    });
  };

  handleName = value => {
    this.setState({ name: value });
  };

  updateRealm = () => {
    const { active, name, campaigns, paginateList } = this.state;
    this.setState({ saveLoader: true });
    patch(`/identity/realm/${this.props.match.params.uuid}/`, {
      active,
      name,
      campaigns: paginateList
    }).then(res => {
      this.initialData = { active: res.data.active, name: res.data.name };
      this.setState({
        realm: res.data,
        saveLoader: false,
        active: res.data.active,
        name: res.data.name
      });
    });
  };

  addCampaign = async campaign => {
    let arrCamp = [...campaign, ...this.state.campaignsOrig];

    /* campaign.map(camp => {
      arrCamp.push(camp);
    }); */

    this.setState({
      campaigns: arrCamp,
      campaignsOrig: arrCamp,
      paginateList: arrCamp
    });
    const update = await patch(
      `/identity/realm/${this.props.match.params.uuid}/`,
      {
        campaigns: arrCamp
      }
    );
    return update;
  };

  removeCampaign = async uuid => {
    var campaigns = this.state.paginateList.filter(camp => {
      return camp.uuid !== uuid;
    });
    this.setState({ campaigns, paginateList: campaigns });
    const update = await patch(
      `/identity/realm/${this.props.match.params.uuid}/`,
      { campaigns }
    );
    return update;
  };

  paginate = (from, to) => {
    const campaigns = this.state.paginateList.slice(from, to);
    this.setState({ campaigns });
  };

  render() {
    const {
      realm,
      active,
      name,
      dataLoaded,
      campaigns,
      saveLoader,
      paginateList
    } = this.state;
    var edit =
      JSON.stringify(this.initialData) === JSON.stringify({ active, name })
        ? false
        : this.state.name.length === 0
        ? false
        : true;
    if (dataLoaded) {
      return (
        <>
          <NavTabs
            data={realm}
            tabnames={[]}
            history={realm}
            back={{
              name: "Back to realms",
              url: "/manage/realms/"
            }}
          />
          <RealmSettings
            active={active}
            realm={realm}
            handleActive={this.handleActive}
            handleName={this.handleName}
            edit={edit}
            updateRealm={this.updateRealm}
            saveLoader={saveLoader}
            campaigns={campaigns}
            campaignsOrig={this.state.campaignsOrig}
            removeCampaign={this.removeCampaign}
            paginateList={paginateList}
            paginateFn={this.paginate}
            addCampaign={this.addCampaign}
          />
        </>
      );
    } else {
      return <TableLoader />;
    }
  }
}

export default RealmContainer;
