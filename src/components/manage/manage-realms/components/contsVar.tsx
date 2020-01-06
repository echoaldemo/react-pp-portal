import {
  Tooltip,
  MenuItem as MenuItem2,
  Switch as Switch2
} from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { SaveButton } from 'common-components'

const CancelBtn = styled(SaveButton)`
  background: #eeeeee;
  strong {
    color: #444851;
  }
`
const BtnCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px 0;
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: auto;
`
const menus = [
  {
    title: 'Users',
    path: '/manage/users'
  },
  {
    title: 'Campaigns',
    path: '/manage/campaigns'
  },
  {
    title: 'Companies',
    path: '/manage/companies'
  },
  {
    title: 'Locations',
    path: '/manage/locations'
  },
  {
    title: 'Did Pools',
    path: '/manage/did-pool'
  },

  {
    title: 'Dids',
    path: '/manage/dids'
  }
]
const headers = ['Name', 'UUID', 'Status', '']
const constCreate = {
  open: false,
  active: true,
  name: '',
  nameErr: '',
  load: false,
  done: false
}
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip)

const Switch = styled(Switch2)`
  .MuiSwitch-track {
    background: #eeeeee !important;
  }
  color: #ffffff;
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #1194f6;
  }
`

const MenuItem = styled(MenuItem2)`
  min-width: 200px;
  padding-top: 0;
  padding-bottom: 0;
`

const MockRealm = [{
  "uuid": "994dceb8-5062-11e7-a132-02420a000304",
  "leader": null,
  "slug": "external_rec",
  "datetime_created": "2017-06-13T18:03:26.715623Z",
  "datetime_modified": "2019-11-05T09:18:19.641105Z",
  "name": "arman locas",
  "active": false
},
{
  "uuid": "996d157a-5062-11e7-8332-02420a000304",
  "leader": "9f795eaa-9807-11e7-9f36-0242ac11000b",
  "slug": "ppus",
  "datetime_created": "2017-06-13T18:03:26.922947Z",
  "datetime_modified": "2019-11-05T06:02:38.943179Z",
  "name": "echo-location",
  "active": false
},
{
  "uuid": "98584da8-5062-11e7-ac0c-02420a000304",
  "leader": null,
  "slug": "external-recorders",
  "datetime_created": "2017-06-13T18:03:25.111481Z",
  "datetime_modified": "2017-06-13T18:03:25.111568Z",
  "name": "External Recorders",
  "active": true
},
{
  "uuid": "9918d51e-5062-11e7-a2b5-02420a000304",
  "leader": null,
  "slug": "gcs",
  "datetime_created": "2017-06-13T18:03:26.368296Z",
  "datetime_modified": "2017-06-13T18:03:26.368361Z",
  "name": "gcs",
  "active": true
},
{
  "uuid": "9933f0f6-5062-11e7-b057-02420a000304",
  "leader": "a8a1783e-9781-11e9-9501-0242ac110012",
  "slug": "licensing",
  "datetime_created": "2017-06-13T18:03:26.545622Z",
  "datetime_modified": "2019-11-05T06:06:23.965248Z",
  "name": "Licensin'",
  "active": true
},
{
  "uuid": "98df9b78-5062-11e7-9d64-02420a000304",
  "leader": null,
  "slug": "mx",
  "datetime_created": "2017-06-13T18:03:25.992977Z",
  "datetime_modified": "2017-06-13T18:03:25.993032Z",
  "name": "mx",
  "active": true
},
{
  "uuid": "988f4984-5062-11e7-9ec2-02420a000304",
  "leader": null,
  "slug": "pp",
  "datetime_created": "2017-06-13T18:03:25.466589Z",
  "datetime_modified": "2017-06-13T18:03:25.466647Z",
  "name": "pp",
  "active": true
},
{
  "uuid": "98fccaea-5062-11e7-ba6d-02420a000304",
  "leader": "43350234-785e-11e7-ae55-02420aff0008",
  "slug": "pp-office",
  "datetime_created": "2017-06-13T18:03:26.185569Z",
  "datetime_modified": "2017-08-03T18:28:46.755914Z",
  "name": "PP Office",
  "active": true
},
{
  "uuid": "98c2efd2-5062-11e7-9c14-02420a000304",
  "leader": null,
  "slug": "rccc",
  "datetime_created": "2017-06-13T18:03:25.804812Z",
  "datetime_modified": "2017-06-13T18:03:25.804869Z",
  "name": "RCCC",
  "active": true
}]

export {
  menus,
  headers,
  LightTooltip,
  Container,
  MenuItem,
  BtnCont,
  Switch,
  SaveButton,
  CancelBtn,
  constCreate,
  MockRealm
}
