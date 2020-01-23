/*eslint-disable */
import React, { useState, useEffect, createRef } from 'react'

import { HeaderButton } from 'common-components'
import NewCampaign from './NewCampaign'
import LoadingDialog from './LoadingDialog'
import DoneDialog from './DoneDialog'
import SearchBar from './SearchBar'
import FakeData from './FakeData'

import Performance from '../Performance/Performance'
import CampaignData from '../Dashboard/SMSDashboardDatatable'

import { Paper, Typography, Divider } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import styles from './Styles/Container.styles'
import { mockData } from './mockData'
// import api from "services/fetchApi";
import SEO from 'utils/seo'

const useStyles = makeStyles(styles)
const SMSLandingPage = props => {
  const classes = useStyles()
  const searchField = createRef()

  const [dialog, setDialog] = useState(false)
  const [loader, setLoader] = useState(false)
  const [refresher, setRefresher] = useState(false)
  const [snack, setSnack] = useState(false)
  const [done, setDone] = useState(false)
  const [input, setInput] = useState('')
  const [campaign, setCampaign] = useState([])
  const [currentCamp, setCurrent] = useState(undefined)
  const [icon, setIcon] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState([])
  const [filtered, setFiltered] = useState([])
  const [realms, setRealms] = useState([])
  const [company, setCompany] = useState('')
  const [pop, setPop] = useState('')
  const [optional, setOptional] = useState(false)

  const [suggestion, setSuggestion] = React.useState([])
  const [realmList, setRealmList] = React.useState([])
  const [companyList, setCompanyList] = React.useState([])
  const [campaignLoader, setCampaignLoader] = React.useState([])
  const [realmLoader, setRealmLoader] = React.useState([])
  const [companyLoader, setCompanyLoader] = React.useState([])
  const [loaderClone, setLoaderClone] = useState(false)
  const [user, setUser] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    setList(mockData.data)
    setToken(localStorage.getItem('ngStorage-ppToken'))
    setTimeout(() => {
      fetchingCampaigns()
    }, 1000)

    // refresh();
  }, [])

  // function refresh() {
  //   api
  //     .fetch(`/data`, "get", null, "application/json")
  //     .then(res => {
  //       res.data.sort(function(a, b) {
  //         var camp1 = a.name.toLowerCase(),
  //           camp2 = b.name.toLowerCase();
  //         if (camp1 < camp2) return -1;
  //         if (camp1 > camp2) return 1;
  //         return 0;
  //       });
  //       setList(res.data);
  //     })
  //     .then(() => {
  //       setTimeout(() => {
  //         fetchingCampaigns();
  //       }, 1000);
  //     });
  // }

  function handleOpen() {
    setDialog(true)
    setLoader(false)
  }

  function handleClose() {
    setDialog(false)
    setIcon('')
  }

  function handleDone() {
    setDone(false)
    setDialog(false)
    setIcon('')
  }

  function setter(e) {
    setOptional(e)
  }

  function handleSubmit(uuid) {
    let fakeData = null

    setPop('')
    setDialog(false)
    setResult('')
    setError(false)
    setLoader(true)

    if (uuid) {
      fakeData = FakeData(currentCamp, uuid)
    } else {
      fakeData = FakeData(currentCamp)
    }

    setTimeout(() => {
      //validation here
      const match = list.filter(list => list.name === fakeData.name)
      if (
        fakeData.name &&
        (!realms.length || !company) &&
        !match.length &&
        !optional
      ) {
        saveToMockApi(fakeData)
      } else if (fakeData.name && company && !match.length) {
        saveToPortal(fakeData)
      } else {
        //when there is an error
        const msg = match.length
          ? 'Campaign name already exist!'
          : 'Error saving campaign!'
        handleError(msg)
      }
    }, 2000)
  }

  function saveToMockApi(data) {
    var post = list
    post.push(data)
    setList(post)
    handleSuccess()
    setRealms([])
    setCompany(null)
    setCurrent('')
    setTimeout(() => {
      setLoaderClone(false)
    }, 500)

    // api
    //   .fetch(`/data`, "post", data, "application/json")
    //   .then(res => {
    //     // refresh();
    //     handleSuccess();
    //     setRealms([]);
    //     setCompany(null);
    //     setCurrent("");
    //     setTimeout(() => {
    //       setLoaderClone(false);
    //     }, 500);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     setLoaderClone(false);
    //     handleError();
    //   });
  }

  function saveToPortal(fakeData, realm, comp) {
    const TOKEN = `Token ${localStorage.getItem('ngStorage-ppToken')}`
    var data = {
      realms: realm ? realm : realms,
      company: !company ? comp : company,
      slug: fakeData.name.replace(/\s+/g, '-').toLowerCase(),
      name: fakeData.name,
      active: true,
      archived: true
    }

    //Fake Copy
    let fakeDatas = null
    fakeDatas = FakeData(fakeData.name, fakeData.uuid)
    setTimeout(() => {
      saveToMockApi(fakeDatas)
      resetStates()
    }, 500)

    //-----Post Copy Data-----------
    // api
    //   .fetch(
    //     `http://devswarm.perfectpitchtech.com/identity/campaign/create/`,
    //     "post",
    //     data,
    //     "application/json",
    //     `${TOKEN}`
    //   )
    //   .then(res => {
    //     fakeDatas = FakeData(fakeData.name, res.data.uuid);
    //   })
    //   .then(() => {
    //     resetStates();
    //     saveToMockApi(fakeDatas);
    //     list.push(fakeDatas);
    //   })
    //   .catch(err => {
    //     setLoaderClone(false);
    //     console.error(err);
    //     handleError();
    //   });
  }

  function handleSuccess(data) {
    setLoader(false)
    setSnack(true)
    setCampaign([...campaign, currentCamp])
    setIcon('check_outline')
    setResult('Success message')
    setError(false)
    // setDone(true);
  }

  function resetStates() {
    setCompany(null)
    setRealms([])
  }

  function handleError(msg) {
    setLoader(false)
    setPop(msg)
    setCompany(null)
    setRealms([])
    setIcon('close')
    setError(true)
    setResult('Error Message')
    setDone(true)
  }

  function changeStatus(id1, status) {
    var temp = list
    var index = list.indexOf(list.find(({ id }) => id === id1))
    temp[index].status = status
    setList(temp)
  }

  function handleDelete(id1, uuid) {
    var del = list
    var delIndex = list.indexOf(list.find(({ id }) => id === id1))
    const token = localStorage.getItem('ngStorage-ppToken')
    del.splice(delIndex, 1)
    setList(del)
    console.log(del)
  }

  function closeSnack() {
    setSnack(false)
  }

  function handleSearch() {
    searchField.current.focus()
  }

  function saveCamp(e) {
    setCurrent(e)
  }

  function newRealms(realms) {
    setRealms(realms)
  }

  function newCompany(company) {
    setCompany(company)
  }

  function fetchingCampaigns() {
    // fetched data for suggestions
    // const API_URL = "http://devswarm.perfectpitchtech.com/identity/";
    // const TOKEN = `Token ${localStorage.getItem("ngStorage-ppToken")}`;
    // let failed = false;
    // api
    //   .fetch(`${API_URL}campaign/list/`, "get", null, "application/json", TOKEN)
    //   .then(res => {
    //     setSuggestion(res.data);
    //     res.data && setCampaignLoader(false);
    //   })
    //   .catch(() => {
    //     failed = true;
    //   });
    // api
    //   .fetch(`${API_URL}realm/list/`, "get", null, "application/json", TOKEN)
    //   .then(res => {
    //     setRealmList(res.data);
    //     res.data && setRealmLoader(false);
    //   })
    //   .catch(() => {
    //     failed = true;
    //   });
    // api
    //   .fetch(`${API_URL}company/list/`, "get", null, "application/json", TOKEN)
    //   .then(res => {
    //     setCompanyList(res.data);
    //     res.data && setCompanyLoader(false);
    //   })
    //   .catch(() => {
    //     failed = true;
    //   });
    // if (failed) {
    //   alert("Suggestions was not found!");
    //   window.location.reload();
    // }
    // ---------------------------
    // setTimeout(() => {
    //    (campaignLoader || realmLoader || companyLoader) &&
    //    fetchingCampaigns();
    // }, 5000)

    setTimeout(() => {
      setCampaignLoader(false)
      setRealmLoader(false)
      setCompanyLoader(false)
    }, 2000)
  }

  function cloneCampaign(id) {
    /*
    const TOKEN = `Token ${localStorage.getItem("ngStorage-ppToken")}`;
    var cloneId = id;
    var cloneIndex = list.indexOf(list.find(({ id }) => id === cloneId));
    // api.fetch(`/data/${id}`, "patch", null, "application/json").then(res => {
    let data = list[cloneIndex];
    api
      .fetch(
        `http://devswarm.perfectpitchtech.com/identity/campaign/${data.uuid}`,
        "get",
        null,
        "application/json",
        `${TOKEN}`
      )
      .then(res => {
        delete data.uuid;
        let num = 0;
        let input = data.name.split("_");

        list.map(camp => {
          let check = camp.name.split("_");
          if (input[0] === check[0]) {
            if (parseInt(check[1]) > num) {
              num = parseInt(check[1]) + 1;
            } else {
              num++;
            }
          }
        });
        data.name = `${input[0]}_${num}`;
        saveToPortal(data, res.data.realms, res.data.company);
        setLoaderClone(true);
      });
    // });
    */
  }
  return (
    <div className={classes.paperPadding}>
      <SEO title="SMS Dashboard" />
      <Performance campaigns={list} />
      <Paper
        className={classes.root}
        style={{ boxShadow: '0 0 6px 1px rgba(155, 155, 155, 0.18)' }}
      >
        <span className={classes.title}>Campaigns</span>
        <div className={classes.innerDiv}>
          <Typography data-cy-add-new-campaign className={classes.addText}>
            {' '}
            You can add a new campaign right here.
          </Typography>
          <div className={classes.addBtnWrapper}>
            <HeaderButton
              buttonText="Add new Campaign"
              openFunction={handleOpen}
            />
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.datatable}>
          <CampaignData
            router={props}
            data={list}
            changeStatus={changeStatus}
            handleDelete={handleDelete}
            cloneCampaign={cloneCampaign}
          />
        </div>
      </Paper>

      {!loader && (
        <NewCampaign
          handleClose={handleClose}
          closeSnack={closeSnack}
          snack={snack}
          loader={handleSubmit}
          open={dialog}
          saveCamp={saveCamp}
          newRealms={newRealms}
          newCompany={newCompany}
          setter={setter}
          suggestion={suggestion}
          realmList={realmList}
          companyList={companyList}
          campaignLoader={campaignLoader}
          realmLoader={realmLoader}
          companyLoader={companyLoader}
          data={list}
        />
      )}
      {loader && <LoadingDialog header="Creating new Campaign" />}
      {loaderClone && <LoadingDialog header="Cloning Campaign" />}
      {refresher && <LoadingDialog header="Refreshing" />}
      <DoneDialog
        icon={icon}
        message={result}
        handleClose={handleDone}
        open={done}
        error={error}
        pop={pop}
      />
    </div>
  )
}

export { SMSLandingPage }
