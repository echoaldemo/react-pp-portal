import React, { useEffect, useState } from "react";
// import BackButton from "../../common-components/back-button";
// import HeaderContainer from "../../common-components/HeaderContainer/HeaderContainer";
// import HeaderLink from "../../common-components/HeaderLink/HeaderLink";
import { TableWithSearch } from "../dialer-live/components";

import ChevDown from "@material-ui/icons/ChevronLeft";
import { Grid } from "@material-ui/core";
// import { get } from "../../../utils/api";
import { PauseComponent } from "../components";
import LiveDialer from "../dialer-live";
import { data, data2 } from "./mockData";
// import Pagination from "../../common-components/pagination/PaginationV2";
function DialerQueue(props: any) {
  const [queue, setQueue] = useState(data);
  const [connected, setConnected] = useState(data2);
  const [searchData, setSearchData] = useState({
    queue: data,
    connected: data2
  });

  // useEffect(() => {
  //   get(
  //     `/reporting/live/dialer/?campaigns=${props.match.params.slug}`
  //   ).then(res => console.log(res));
  // }, [searchData]);

  const paginateSet = (data: any, setFunc: any) => {
    setFunc(data);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LiveDialer {...props} />
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              fontSize: 24,
              color: "#444851",
              margin: "28px 0 8px 0"
            }}
          >
            Dialer queue report
          </div>
        </Grid>
        <Grid item style={{ margin: "28px 0 8px auto" }}>
          <PauseComponent
            time="10:59:32 AM"
            onClick={() => alert("no design")}
          />
        </Grid>
        <Grid item xs={6}>
          <TableWithSearch
            SearchFor="a queue record"
            searchData={searchData.queue}
            setFunc={setQueue}
            data={queue}
            paginateList={data}
            paginateSet={paginateSet}
            keys={["server", "station", "rep"]}
            headers={[
              "Server",
              "Station",
              "Rep",
              <Grid container alignItems="center">
                <Grid item>
                  <div
                    style={{
                      color: "#444851",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Wait time
                  </div>
                </Grid>
                <Grid item style={{ marginTop: 5 }}>
                  <ChevDown
                    style={{
                      transform: "rotate(270deg)"
                    }}
                  />
                </Grid>
              </Grid>,
              <Grid container alignItems="center">
                <Grid item>
                  <div
                    style={{
                      color: "#444851",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Talk time
                  </div>
                </Grid>
                <Grid item style={{ marginTop: 5 }}>
                  <ChevDown
                    style={{
                      transform: "rotate(270deg)"
                    }}
                  />
                </Grid>
              </Grid>,
              " "
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <TableWithSearch
            SearchFor="a connected record"
            searchData={searchData.connected}
            data={connected}
            setFunc={setConnected}
            paginateList={data2}
            paginateSet={paginateSet}
            keys={["server", "station", "rep"]}
            headers={[
              "Server",
              "Station",
              "Rep",
              <Grid container alignItems="center">
                <Grid item>
                  <div
                    style={{
                      color: "#444851",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    Duration
                  </div>
                </Grid>
                <Grid item style={{ marginTop: 5 }}>
                  <ChevDown
                    style={{
                      transform: "rotate(270deg)"
                    }}
                  />
                </Grid>
              </Grid>,
              "Transferred",
              " "
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DialerQueue;
