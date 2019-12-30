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
    title: 'Realms',
    path: '/manage/realms'
  },
  {
    title: 'Dids',
    path: '/manage/dids'
  }
]
const headers = ['Name', 'UUID', 'Status', 'Inbound', 'DID Count', '']

const new_did_const = {
  active: true,
  allow_inbound: true,
  campaign: '',
  company: '',
  did_count: 0,
  locale_name: 'US',
  matching_preference: '',
  name: '',
  priority: 0,
  sip_uri: '',
  skip_inbound_ivr: false,
  start_node: null,
  vars_prospect_channel: '',
  voice_provider: ''
}

export { menus, headers, new_did_const }
