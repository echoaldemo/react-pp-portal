import React, { useState, useEffect, useContext } from "react";
import DNDCards from "../cards/DNDCards";
import { TableLoader } from "common-components";
import { get, patch } from "utils/api";
import { styles } from "./styles";

interface IState {
  loadingState: boolean;
  activeTestData: any;
  globalTestData: any;
  companyTestData: any;
  activeData: any;
}

const RapidResponseTests: React.FC = () => {
  const [info, setInfo] = useState<IState>(
    {
    loadingState: true,
    activeTestData: [],
    globalTestData: [],
    companyTestData: [],
    activeData: []
  }
  );
  const [companyTestData, setCompanyTestData] = useState<any>([]);
  const [activeTestData, setActiveTestData] = useState<any>([]);
  const [globalTestData, setGlobalTestData] = useState<any>([]);

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
      .then(async (res: any) => {
        const data = await activeData(res.data.rapid_response_tests)
        setActiveTestData(data);
        return res;
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const activeData = (data:any) => {
    let segments:any[] = []; 
    data.forEach((item:any, index:number) => {
      segments.push({uuid: item, name: `Test ${index}`})
    });
    return segments
  }

  const setActiveData = (data: any) => {
    setInfo({ ...info, activeData: data });
  };

  const saveActiveSegment = async (data: any) => {
    //API request here for updating activeSegments
    const companyData = await getCompanySlug();

    let segments:string[] = [];

    data.forEach((item:any) => {
      segments.push(item.uuid)
    });

    patch(
      `/pitch/company/${companyData.data.slug}/campaign/${localData.slug}/`,
      {
        rapid_response_tests: segments
      }
    )
      .then((res: any) => {
        console.log('saved: ', res);
        
      })
      .catch((err: any) => {
        console.error(err);
      });

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
