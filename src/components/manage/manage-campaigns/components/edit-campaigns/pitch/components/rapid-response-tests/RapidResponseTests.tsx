import React, { useState, useEffect, useContext } from "react";
import DNDCards from "../cards/DNDCards";
import { TableLoader } from "common-components";
import { get } from "utils/api";
import { IdentityContext } from "contexts/IdentityProvider";
import { styles } from "./styles";

//MOCK DATA
import { global, company } from "./Mock";

interface ICompany {
  uuid: string;
  slug: string;
  name: string;
  active: boolean;
  company: any;
  live: boolean;
  test_type: number;
  final_disposition_regex: string;
  final_revenue: number;
  segments: string[];
  variables: any;
  voices: string[];
  tts_voice: any;
}

interface IState {
  loadingState: boolean;
  activeTestData: any;
  globalTestData: any;
  companyTestData: any;
  activeData: any;
}

const RapidResponseTests: React.FC = () => {
  //const [info, setInfo] = useState<IState>(defaultState);

  const [info, setInfo] = useState({
    loadingState: true,
    activeTestData: [
      { uuid: 1, name: "Programs" },
      { uuid: 2, name: "Portal" },
      { uuid: 3, name: "First-names-sentence" },
      { uuid: 4, name: "First-names-questions" }
    ],
    globalTestData: global,
    companyTestData: company,
    activeData: []
  });
  const [companyTestData, setCompanyTestData] = useState<any>([]);
  const [activeTestData, setActiveTestData] = useState<any>([]);
  const [globalTestData, setGlobalTestData] = useState<any>([]);

  const { state } = useContext(IdentityContext);
  const { campaignCompany, campaignDetails } = state;
  const localstore: any = localStorage.getItem("campaignData");
  const localData = JSON.parse(localstore);

  const classes = styles();

  useEffect(() => {
    Promise.all([getGlobalTest(), getCompanyTest(), getActiveTest()]).then(
      (res: any) => {
        setInfo({ ...info, loadingState: false });
      }
    );
  }, []);

  const getCompanySlug = () => {
    return get(`/identity/company/${localData.company}/`).then(
      (res: any) => res
    );
  };

  function getGlobalTest() {
    return get(`/pitch/global/rapid-response/tests/`)
      .then((res: any) => {
        setGlobalTestData(res.data);
        return res;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  const getCompanyTest = async () => {
    const companyData = await getCompanySlug();
    return get(`/pitch/company/${companyData.data.slug}/rapid-response/tests/`)
      .then((res: any) => {
        setCompanyTestData(res.data);
        return res;
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const getActiveTest = async () => {
    const companyData = await getCompanySlug();
    return get(
      `/pitch/company/${companyData.data.slug}/campaign/${localData.slug}/`
    )
      .then((res: any) => {
        let temp = [];
        temp.push(res.data);
        setActiveTestData(temp);
        return res;
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const setActiveData = (data: any) => {
    setInfo({ ...info, activeData: data });
  };

  const saveActiveSegment = (data: any) => {
    //API request here for updating activeSegments
    setInfo({ ...info, activeTestData: data });
  };

  return (
    <div className="p-normal c-default">
      <div>
        {info.loadingState ? (
          <>
            <div style={{ height: 600 }}>
              <TableLoader />
            </div>
          </>
        ) : (
          <div className={classes.container}>
            <DNDCards
              card1Title="Active segments"
              card2Title="Global segments"
              card3Title="Company segments"
              card1Data={activeTestData}
              card2Data={globalTestData}
              card3Data={companyTestData}
              saveActiveSegment={saveActiveSegment}
              setActiveData={setActiveData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RapidResponseTests;
