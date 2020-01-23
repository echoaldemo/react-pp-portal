import React, { useState, useEffect } from "react";
import { Paper, Divider } from "@material-ui/core";
import styled from "styled-components";
import RouterSettingsForm from "./RouterSettingsForm";
import {
  HeaderButton,
  BackButton,
  StatusLabel,
  Pagination
} from "common-components";
import RoutesTable from "./RoutesTable";
import NewRoute from "./NewRouteModal";
import { routes } from "../mockRoutes";

const HeaderContainer = styled.div``;
const NameStyle = styled.span`
  font-size: 24px;
  color: #444;
`;
const TitleStyle = styled.span`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #444851;
`;

const LabelContainer = styled.div`
  padding-bottom: 25px;
`;
const CustomPaper = styled(Paper)`
  padding: 45px 20px 50px 30px;
`;
const classes = {
  headerText: {
    fontSize: 20
  },
  statusText: {
    fontSize: 20
  }
};

const EditRoute = (props: any) => {
  const routerDetails = props.location.state.router;

  const [routeDisplay] = useState({
    name: routerDetails.name,
    active: routerDetails.active
  });

  const [routesData, setRoutesData] = useState<any[]>([]);
  const [paginateList, setPaginateList] = useState<any[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);
  const [OpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRoutesData(routes);
      setPaginateList(routes);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const paginate = (from: number, to: number) => {
    setRoutesData(paginateList.slice(from, to));
  };
  const handleAddNewRoute = (data: any) => {
    setPaginateList(routesData.concat(data));
  };

  return (
    <div>
      <HeaderContainer>
        <BackButton
          to={`/manage/campaign/edit/${props.location.state.slug}/${props.location.state.campaign_uuid}/dataposting`}
          text="Back to Data Posting"
        />
        <LabelContainer>
          <NameStyle>{routeDisplay.name}</NameStyle>
          <StatusLabel
            status={routeDisplay.active}
            style={{ marginLeft: 15 }}
          />
        </LabelContainer>
      </HeaderContainer>
      <CustomPaper square={true}>
        <TitleStyle>Router settings</TitleStyle>
        <RouterSettingsForm
          RouterDetails={routerDetails}
          style={{}}
          slug={props.location.state.slug}
          uuid={props.location.state.campaign_uuid}
          history={props.history}
        />
      </CustomPaper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 0"
        }}
      >
        <span style={classes.headerText}>Routes</span>

        <HeaderButton
          buttonText="New Route"
          openFunction={() => handleOpenModal()}
        />
      </div>
      <Paper square={true}>
        <RoutesTable
          loading={Loading}
          data={routesData}
          openModal={handleOpenModal}
          campaignuuid={"1"}
          slug={"1"}
        />
        <Divider />
        {!Loading && (
          <Pagination
            totalItems={paginateList.length}
            itemsPerPage={10}
            paginateFn={paginate}
          />
        )}
      </Paper>
      <NewRoute
        open={OpenModal}
        openFn={handleOpenModal}
        onClose={handleCloseModal}
        handleAddNewRoute={handleAddNewRoute}
      />
    </div>
  );
};

export default EditRoute;
