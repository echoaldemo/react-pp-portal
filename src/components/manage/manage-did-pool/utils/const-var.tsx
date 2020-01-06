import styled from 'styled-components'
import { TextField } from '@material-ui/core'

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

const mockDid = {
	id: '1',
	name: 'name 1',
	company: 'company 1',
	campaign: 'campaign 1',
	locale_name: 'locale_name 1',
	voice_provider: 'voice_provider 1',
	active: false,
	allow_inbound: false,
	skip_inbound_ivr: false,
	sip_uri: 'sip_uri 1',
	start_node: 'start_node 1',
	priority: 76,
	vars_prospect_channel: 'vars_prospect_channel 1',
	did_count: 66,
	ignore_caller_id: false,
	desired_cname: 'desired_cname 1',
	matching_preference: 'matching_preference 1',
	uuid: 'b4f87b18-d7c8-43e6-a443-249fe9bfa947'
}

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
	}
	.Mui-focused span {
		color: #1194f6 !important;
	}
	.MuiInputLabel-shrink {
		transform:translate(0,1.5px) scale(1);
	}
`;

export { menus, headers, new_did_const, mockDid, InputField }
