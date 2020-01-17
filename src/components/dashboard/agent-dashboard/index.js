import React, { useState } from "react";

import { Grid, Typography, Paper, Divider } from "@material-ui/core";
import AgentFilter from "./filter";
import DatePicker from "./filter/datePicker";
import styled from "styled-components";
import SearchBar from "../../common-components/search-bar/SearchBar";
import AgentTable from "./agent-table/AgentTable";
import { data } from "./mockData";
import CallMenu from "../../common-components/call-menu";
import Performance from "./Performance/Performance";
import Pagination from "../../common-components/pagination/PaginationV2";

const FilterContainer = styled.div`
  width: 100%;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 3px 0px 9px 24px;
`;

const FilterActual = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ApplyText = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

const ApplyButton = styled.button`
  outline: none;
  border: none;
  margin-right: 25px;
  cursor: pointer;
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;

  &:hover {
    opacity: 0.8;
  }

  &.active {
    opacity: 1;
  }
`;

// const data = [
//   {
//     server: "PP26",
//     station: "slg_s3",
//     rep: "aarandela",
//     wait_time: "0:00:14",
//     take_time: "0:29:45"
//   },
//   {
//     server: "PP22",
//     station: "slg_s108",
//     rep: "jfmanalang",
//     wait_time: "0:00:12",
//     take_time: "0:22:13"
//   },
//   {
//     server: "PP24",
//     station: "pp_s916",
//     rep: "ammarcellana",
//     wait_time: "0:00:12",
//     take_time: "0:19:21"
//   }
// ];
const data2 = [
  {
    server: "PP26",
    station: "slg_s3",
    rep: "aarandela",
    wait_time: "0:00:14",
    transferred: "No"
  },
  {
    server: "PP22",
    station: "slg_s108",
    rep: "jfmanalang",
    wait_time: "0:00:12",
    transferred: "No"
  },
  {
    server: "PP24",
    station: "pp_s916",
    rep: "ammarcellana",
    wait_time: "0:00:12",
    transferred: "No"
  }
];
function AgentDashboard(props) {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2019-11-15T21:11:54")
  );
  const [activeData, setActiveData] = useState("");
  const [openMonitor, setOpenMonitor] = useState(false);
  const [agents, setAgents] = useState(data);
  const [paginateList, setPaginateList] = useState(data);
  const [callInfo, setCallInfo] = useState({
    agentName: "",
    agentImage: "",
    listening: true,
    whisper: false
  });

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const OpenMonitorFunc = data => {
    setOpenMonitor(!openMonitor);
    setActiveData(data);
    setCallInfo({
      ...callInfo,
      agentName: data.name,
      agentImage: data.avatar
    });
  };

  const ToggleCallButton = button => {
    setCallInfo({ ...callInfo, [button]: !callInfo[button] });
  };

  const paginate = (from, to) => {
    setAgents(paginateList.slice(from, to));
  };

  return (
    <>
      <Performance />
      <Paper>
        <SearchBar title="Agents" userData={agents} headers={["name"]} />
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <FilterContainer>
              <FilterActual>
                {[
                  {
                    tag: "Campaign",
                    data: [
                      {
                        name: "All"
                      },
                      {
                        name: "Campaign 1"
                      },
                      {
                        name: "Campaign 2"
                      },
                      {
                        name: "Campaign 3"
                      }
                    ]
                  },
                  {
                    tag: "Status",
                    data: [
                      {
                        name: "All"
                      },
                      {
                        name: "On Call"
                      },
                      {
                        name: "Idle"
                      },
                      {
                        name: "On Break"
                      }
                    ]
                  }
                ].map((key, i) => (
                  <AgentFilter
                    key={i}
                    tag={key.tag}
                    filterData={key.data}
                    result={key.result}
                  />
                ))}
                <DatePicker changeFn={handleDateChange} date={selectedDate} />
              </FilterActual>

              <ApplyButton style={{ marginLeft: "auto" }}>
                <ApplyText>Apply</ApplyText>
              </ApplyButton>
            </FilterContainer>
            <AgentTable
              agents={agents}
              activeData={activeData}
              OpenMonitorFunc={OpenMonitorFunc}
              history={props.history}
            />
            {openMonitor && (
              <CallMenu
                callInfo={callInfo}
                ToggleCallButton={ToggleCallButton}
                OpenMonitorFunc={OpenMonitorFunc}
              />
            )}
            {Boolean(paginateList.length) && (
              <Pagination
                paginateFn={paginate}
                totalItems={paginateList.length}
                paginateList={paginateList}
                itemsPerPage={6}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default AgentDashboard;
