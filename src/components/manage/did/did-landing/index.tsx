import React from "react";
import { HeaderLink, NavTabs } from "common-components";
import HeaderContainer from "../components/HeaderContainer/HeaderContainer";

const ManageDID = () => {
  return (
    <>
      <HeaderContainer>
        <HeaderLink
          menu={[
            {
              title: "Users",
              path: "/manage/users"
            },
            {
              title: "Campaigns",
              path: "/manage/campaigns"
            },
            {
              title: "Companies",
              path: "/manage/companies"
            },
            {
              title: "Locations",
              path: "/manage/locations"
            },
            {
              title: "Realms",
              path: "/manage/realms"
            },
            {
              title: "DID Pools",
              path: "/manage/did-pool"
            }
          ]}
          title="Dids"
          pathSensitive={true}
        />
        <NavTabs
          tabnames={[
            {
              name: "DID POOLS",
              active: true,
              onClickFn: () => console.log("settings")
            },
            {
              name: "SEARCH DIDS",
              active: false,
              onClickFn: () => console.log("pitch")
            }
          ]}
        />
      </HeaderContainer>
    </>
  );
};

export default ManageDID;
