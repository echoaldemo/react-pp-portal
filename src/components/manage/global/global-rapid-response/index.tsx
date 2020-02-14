import React from "react";
import Tabs from "./components/Tabs";
import { Paper, Divider } from "@material-ui/core";
import NoTests from "../global-rr-test/components/NoResult";
import { get } from "utils/api";
import RRTTable from "./components/Table";
import CreateNewTestsModal from "./components/NewUser/Dialog";
import SEO from "utils/seo";

import {
  HeaderLink,
  HeaderButton,
  TableLoader,
  SearchBar,
  Pagination
} from "common-components";

const mock: any = [
  {
    uuid: "7443baa2-1b40-11e8-93ab-0242ac110002",
    slug: "test",
    name: "test",
    active: true,
    company: null,
    live: true,
    test_type: 0,
    final_disposition_regex: "1",
    final_revenue: 1,
    segments: [
      "26e9c358-7993-11e8-81e9-0242ac110016",
      "fee3637a-3957-11e9-ae74-0242ac110005"
    ],
    variables: {},
    voices: [
      "79041608-5c29-11e7-9756-02420aff000e",
      "c4d8bac6-fab4-11e9-981d-0242ac110014",
      "5544d13e-f949-11e9-ac72-0242ac110014",
      "346516de-5aa6-11e7-88db-02420aff0012",
      "5cfc5e92-6c92-11e7-94dc-02420aff0015",
      "e301d554-e3fe-11e9-97bb-0242ac11000e",
      "f55f5ace-a93f-11e7-8740-0242ac110008"
    ],
    tts_voice: null
  },
  {
    uuid: "53509d6a-0c25-11ea-a589-0242ac110005",
    slug: "test1",
    name: "test1",
    active: true,
    company: null,
    live: true,
    test_type: 0,
    final_disposition_regex: "",
    final_revenue: 1,
    segments: [
      "26e9c358-7993-11e8-81e9-0242ac110016",
      "b10f0afc-6265-11e7-a4fe-02420a000908",
      "fee3637a-3957-11e9-ae74-0242ac110005"
    ],
    variables: {},
    voices: [
      "5cfc5e92-6c92-11e7-94dc-02420aff0015",
      "79041608-5c29-11e7-9756-02420aff000e",
      "346516de-5aa6-11e7-88db-02420aff0012",
      "5cfc5e92-6c92-11e7-94dc-02420aff0015"
    ],
    tts_voice: "Joanna"
  },
  {
    uuid: "53509d6a-0c25-11ea-a589-0242ac110015",
    slug: "test2",
    name: "test3",
    active: true,
    company: null,
    live: true,
    test_type: 0,
    final_disposition_regex: "",
    final_revenue: 1,
    segments: [
      "26e9c358-7993-11e8-81e9-0242ac110016",
      "b10f0afc-6265-11e7-a4fe-02420a000908",
      "fee3637a-3957-11e9-ae74-0242ac110005"
    ],
    variables: {},
    voices: [
      "5cfc5e92-6c92-11e7-94dc-02420aff0015",
      "79041608-5c29-11e7-9756-02420aff000e",
      "346516de-5aa6-11e7-88db-02420aff0012",
      "5cfc5e92-6c92-11e7-94dc-02420aff0015"
    ],
    tts_voice: "Joanna"
  }
];
export default function GlobalRapidResponse() {
  const [loading, setLoading] = React.useState(true);
  const [tests, setTests] = React.useState([]);
  const [paginateList, setPaginateList] = React.useState([]);
  const [modal, setModal] = React.useState({
    create: false
  });

  React.useEffect(() => {
    get("/pitch/global/rapid-response/tests/").then((res: any) => {
      setTests(res.data);
      setPaginateList(res.data);
      setLoading(false);
    });
    // setTimeout(() => {
    //   setTests(mock);
    //   setPaginateList(mock);
    //   setLoading(false);
    // }, 1000);
  }, []);

  const handleUpdate = () => {
    setLoading(true);
    get("/pitch/global/rapid-response/tests/").then((res: any) => {
      setTests(res.data);
      setPaginateList(res.data);
      setLoading(false);
    });
  };
  const paginate = (from: number, to: number) => {
    setTests(paginateList.slice(from, to));
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <SEO title="Manage Rapid Response" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 30
        }}
      >
        <HeaderLink
          menu={[
            {
              title: "Phrase Books",
              path: "/manage/global-pitch-phrasebooks/"
            },
            {
              title: "Segments",
              path: "/manage/global-pitch-segments/"
            },
            {
              title: "Option Group",
              path: "/manage/global-option-group"
            }
          ]}
          title="Rapid Response"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {Boolean(tests.length) && (
            <HeaderButton
              buttonText="New test"
              openFunction={() => setModal({ create: true })}
            />
          )}
          <Tabs
            tabs={[
              {
                name: "RESPONSE TEST",
                active: true,
                path: "#"
              },
              {
                name: "RESPONSE SEGMENTS",
                active: false,
                path: "/manage/global-rapid-response/segments"
              }
            ]}
          />
        </div>
      </div>

      <Paper style={{ height: "auto", minHeight: 100 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
            height: "auto"
          }}
        >
          <div style={{ width: "100%" }}>
            <SearchBar
              title="tests"
              userData={tests}
              headers={["name", "slug", "uuid"]}
              loading={loading}
              link={true}
              active={true}
              live={true}
              pathnameData={{
                firstLink: `/manage/rapid-response-tests/global/edit/`,
                fetchData: ["uuid"],
                lastLink: `/menu/`
              }}
            />
            <Divider />
            {loading ? (
              <TableLoader />
            ) : tests.length ? (
              <RRTTable
                // DataNotFound={filterList}
                testsData={tests}
                // handleUpdated={handleUpdate}
                // innerLoading={false}
                headers={[
                  "Name",
                  "Slug",
                  "Final Revenue",
                  "Test Type",
                  "UUID",
                  "Live/Off",
                  "Active",
                  " "
                ]}
              />
            ) : (
              <NoTests
                open={true}
                newTestOpen={() => setModal({ create: true })}
              />
            )}
          </div>
          <div style={{ width: "100%" }}>
            <Divider />
            {!loading && Boolean(paginateList.length) && (
              <Pagination
                paginateFn={paginate}
                totalItems={paginateList.length}
                itemsPerPage={6}
              />
            )}
          </div>
        </div>
      </Paper>

      <CreateNewTestsModal
        open={modal.create}
        closeFn={() => setModal({ create: false })}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
