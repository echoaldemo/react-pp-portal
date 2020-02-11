import React, { useState } from "react";

import { Grid, Typography, Paper, Divider } from "@material-ui/core";
import AgentFilter from "./filter";
import DatePicker from "./filter/datePicker";
import styled from "styled-components";
import AgentTable from "./agent-table/AgentTable";
import { data } from "./mockData";
import Performance from "./Performance/Performance";

import { SearchBar, CallMenu, Pagination } from "common-components";

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
// const data2 = [
// 	{
// 		server: 'PP26',
// 		station: 'slg_s3',
// 		rep: 'aarandela',
// 		wait_time: '0:00:14',
// 		transferred: 'No'
// 	},
// 	{
// 		server: 'PP22',
// 		station: 'slg_s108',
// 		rep: 'jfmanalang',
// 		wait_time: '0:00:12',
// 		transferred: 'No'
// 	},
// 	{
// 		server: 'PP24',
// 		station: 'pp_s916',
// 		rep: 'ammarcellana',
// 		wait_time: '0:00:12',
// 		transferred: 'No'
// 	}
// ]
function AgentDashboard({ history }: any) {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2019-11-15T21:11:54")
  );
  const [activeData, setActiveData] = useState("");
  const [openMonitor, setOpenMonitor] = useState(false);
  const [agents, setAgents] = useState<any>([]);
  const [paginateList, setPaginateList] = useState<any>({});
  const [callInfo, setCallInfo] = useState<any>({
    agentName: "",
    agentImage: "",
    listening: true,
    whisper: false
  });

  React.useEffect(() => {
    setAgents(data);
    setPaginateList(data);
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const OpenMonitorFunc = (data: any) => {
    setOpenMonitor(!openMonitor);
    setActiveData(data);
    setCallInfo({
      ...callInfo,
      agentName: data.name,
      agentImage: data.avatar
    });
  };

  const ToggleCallButton = (button: any) => {
    setCallInfo({ ...callInfo, [button]: !callInfo[button] });
  };

  const paginate = (from: number, to: number) => {
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
                ].map((key: any, i: number) => (
                  <AgentFilter key={i} tag={key.tag} filterData={key.data} />
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
              history={history}
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
