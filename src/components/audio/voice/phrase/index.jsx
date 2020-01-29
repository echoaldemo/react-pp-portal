import React, { Component } from 'react';
import clsx from 'clsx';
import {
	withWidth,
	withStyles,
	CssBaseline,
	Container,
	Grid,
	Paper,
	Divider,
	Fab,
	Tooltip,
	Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Dropdown from '../../common-components/dropdown/Mobile';
import DropdownDesktop from '../../common-components/dropdown/Desktop';
import Tabs from '../../common-components/tabs/Mobile';
import TabsDesktop from '../../common-components/tabs/Desktop';
import useStyles from './styles';
import Filter from './phrase_audio/Filter';
import Search from './phrase_audio/Search';
import Table from './phrase_audio/Table';

import Toast from '../../common-components/toast';
import MainAddNewAudio from '../../common-components/add-new-voice/MainAddNewVoice';
// import Loader from '../../common-components/loader';

//CARDS
import UnrecordedCard from '../../common-components/cards/Unrecorded';
import RerecordCard from '../../common-components/cards/Rerecord';
import RecordedCard from '../../common-components/cards/Recorded';

import { get, patch, post } from '../../utils/api';
import { TableLoader, HeaderLink } from 'common-components';

class Phrase extends Component {
	constructor() {
		super();

		this.state = {
			loader: false,
			user: 1,
			links: [
				{ name: 'phrase audio', link: '/phrase' },
				{ name: 'pitch audio', link: '/pitch' },
				{ name: 'prospect audio', link: '/prospect' }
			],
			state: 'DATA_LOADED',
			campaigns: [],
			versions: [],
			tabSelected: 0,
			unrecorded: [],
			rerecord: [],
			recorded: [],
			unrecordedTblName: [ 'Name', 'Dialog', 'Action' ],
			rerecordTblName: [ 'Name', 'Dialog', 'Action' ],
			recordedTblName: [ 'Name', 'Audio', 'Action' ],
			display: [],
			displayRerecord: [],
			displayRecorded: [],
			filtered: false,
			searchVoice: null,
			searchDialogRecord: '',
			searchDialogRerecord: '',
			searchDialogUnrecord: '',
			openAddNew: false,
			showTable: false,
			voices: [],
			user_data: [],
			checkIfGlobal: false,
			companySlug: '',
			campaignList: [],
			unrecordedList: [],
			unrecordedSelected: '',
			voiceSelected: '',
			campaignSelected: '',
			versionSelected: '',
			audioToBeUploaded: '',
			openToast: false,
			toastType: '',
			message: '',
			vertical: 'top',
			horizontal: 'right',
			token: '',
			fetchedUnrecorded: false,
			fetchedRerecord: false,
			fetchedRecorded: false,
			file: null,
			audioFile: '',
			fileName: '',
			recordedName: '',
			addNewVoiceModal: false,
			uploadLoading: false,
			mainFileName: '',
			mainFile: '',
			mainUploadLoading: false,
			isAudioLoading: false,
			audio: [],
			profile: [],
			user_uuid: '',
			groups: [],
			manage_user: [],
			selectedVersion: '',
			user_group: 10,
			//modal fix
			currentMode: null,
			isAudioLoadingRerec: false
		};
	}

	componentDidMount() {
		document.title = 'Phrase Audio';
		var tokenLogin = localStorage.getItem('ngStorage-ppToken');
		if (localStorage.getItem('error')) {
			this.setState({
				openToast: true,
				toastType: 'caution',
				message: `Your user does not have access to that page. You may need to sign-in.`,
				vertical: 'top',
				horizontal: 'right'
			});
			localStorage.removeItem('error');
		}
		this.setState({ token: tokenLogin });

		const mockProfileData = {
			uuid: 'ba540c0e-c5b2-11e9-a0b7-0242ac110013',
			groups: [ 1 ],
			company: null,
			campaigns: [ '832e87d4-a859-11e9-b505-0242ac110012' ],
			team: null,
			last_login: '2020-01-27T17:58:45.015557Z',
			username: 'rogelio',
			first_name: 'Rogelio',
			last_name: 'Jimenez',
			is_active: true,
			date_joined: '2019-08-23T14:31:43.242964Z',
			email: 'rogelio@boomsourcing.com',
			password_update_required: false,
			password_last_update: '2019-11-06T02:46:19.495631Z',
			hire_date: '2019-09-11'
		};

		setTimeout(() => {
			this.setState({
				state: 'DATA_LOADED',
				profile: mockProfileData,
				user_uuid: mockProfileData.uuid,
				user_group: mockProfileData.groups[0],
				voices: [
					{
						uuid: '346516de-5aa6-11e7-88db-02420aff0012',
						last_login: '2019-11-14T02:50:49.913632Z',
						username: 'ahayterVoice',
						first_name: 'aodhan-voice',
						last_name: 'hayter',
						is_active: true,
						date_joined: '2017-06-26T19:32:34.818980Z',
						email: null,
						password_update_required: false,
						password_last_update: '2019-09-26T03:02:51.152101Z',
						hire_date: null
					},
					{
						uuid: '5cfc5e92-6c92-11e7-94dc-02420aff0015',
						last_login: '2018-07-23T20:50:32.797472Z',
						username: 'awhite',
						first_name: 'a',
						last_name: 'white',
						is_active: true,
						date_joined: '2017-07-19T14:55:53.913298Z',
						email: 'testingforaudio@testing.com',
						password_update_required: false,
						password_last_update: '2018-07-23T20:48:53.780656Z',
						hire_date: null
					},
					{
						uuid: '79041608-5c29-11e7-9756-02420aff000e',
						last_login: '2017-07-20T17:19:26.063777Z',
						username: 'compManager',
						first_name: 'CompManager',
						last_name: 'CompManager',
						is_active: true,
						date_joined: '2017-06-28T17:44:45.180722Z',
						email: null,
						password_update_required: false,
						password_last_update: '2017-06-28T17:45:11.216414Z',
						hire_date: null
					},
					{
						uuid: 'c4d8bac6-fab4-11e9-981d-0242ac110014',
						last_login: '2019-11-25T08:39:48.822360Z',
						username: 'eco-dev',
						first_name: 'eco',
						last_name: 'aldemo',
						is_active: true,
						date_joined: '2019-10-30T01:29:51.510443Z',
						email: null,
						password_update_required: true,
						password_last_update: '2019-10-30T06:05:02.833473Z',
						hire_date: '1970-01-01'
					},
					{
						uuid: '5544d13e-f949-11e9-ac72-0242ac110014',
						last_login: '2019-12-09T06:21:18.792850Z',
						username: 'ecofriendly',
						first_name: 'eco',
						last_name: 'aldemo',
						is_active: true,
						date_joined: '2019-10-28T06:08:17.001162Z',
						email: null,
						password_update_required: true,
						password_last_update: '2019-10-30T01:36:17.085441Z',
						hire_date: '1970-01-01'
					},
					{
						uuid: '51a059fe-e3f5-11e9-8aab-0242ac11000e',
						last_login: '2019-10-01T05:31:14.471862Z',
						username: 'el_chapo',
						first_name: 'Joaquin',
						last_name: 'Guzman',
						is_active: true,
						date_joined: '2019-10-01T02:43:58.746532Z',
						email: null,
						password_update_required: true,
						password_last_update: null,
						hire_date: null
					},
					{
						uuid: '91dd2102-9283-11e7-a3d8-02420aff0015',
						last_login: '2017-09-05T21:51:36.724644Z',
						username: 'newVoice',
						first_name: 'New',
						last_name: 'Voice',
						is_active: true,
						date_joined: '2017-09-05T21:45:44.360843Z',
						email: null,
						password_update_required: false,
						password_last_update: '2017-09-05T21:51:30.314024Z',
						hire_date: null
					},
					{
						uuid: '43614808-9788-11e9-85ae-0242ac110012',
						last_login: '2020-01-13T01:41:29.592267Z',
						username: 'samuel-dev',
						first_name: 'Samuel',
						last_name: 'Lopez',
						is_active: true,
						date_joined: '2019-06-25T20:31:51.330423Z',
						email: 'samuel.lopez@boom.camp',
						password_update_required: false,
						password_last_update: '2019-06-26T08:33:43.667057Z',
						hire_date: '2019-05-15'
					},
					{
						uuid: 'a00b8df0-042c-11ea-a1c7-0242ac110014',
						last_login: '2019-11-11T02:49:43.330276Z',
						username: 'test-pass',
						first_name: 'test',
						last_name: 'password',
						is_active: true,
						date_joined: '2019-11-11T02:40:29.840353Z',
						email: null,
						password_update_required: true,
						password_last_update: null,
						hire_date: '1970-01-01'
					},
					{
						uuid: '6a336dd6-0424-11ea-b8a8-0242ac110014',
						last_login: null,
						username: 'testUser1',
						first_name: 'Testa',
						last_name: 'Datest',
						is_active: true,
						date_joined: '2019-11-11T01:41:43.530409Z',
						email: 'testtst@tst.net',
						password_update_required: true,
						password_last_update: null,
						hire_date: '2019-11-12'
					},
					{
						uuid: 'f55f5ace-a93f-11e7-8740-0242ac110008',
						last_login: '2017-10-04T20:11:31.607253Z',
						username: 'voice-user',
						first_name: 'Voice',
						last_name: 'User',
						is_active: true,
						date_joined: '2017-10-04T20:09:42.277778Z',
						email: null,
						password_update_required: false,
						password_last_update: '2017-10-04T20:11:21.013984Z',
						hire_date: null
					},
					{
						uuid: 'e301d554-e3fe-11e9-97bb-0242ac11000e',
						last_login: null,
						username: 'wsmith',
						first_name: 'Will',
						last_name: 'Smith',
						is_active: true,
						date_joined: '2019-10-01T03:52:28.125468Z',
						email: null,
						password_update_required: true,
						password_last_update: null,
						hire_date: null
					}
				]
			});
		}, 1000);

		//UNCOMMENT FOR ACTUAL DATA
		//view data
		// get('/identity/user/profile/').then((profileData) => {
		// 	this.setState({
		// 		state: 'DATA_LOADED',
		// 		profile: profileData.data,
		// 		user_uuid: profileData.data.uuid,
		// 		user_group: profileData.data.groups[0]
		// 	});
		// 	if (profileData.data.groups[0] === 10) {
		// 		this.recorderCamp(profileData.data.uuid, tokenLogin);
		// 		this.recorderSelectCampaign(profileData.data.uuid);
		// 	}
		// 	else {
		// 		get('/identity/user/manage/list/?groups=10&limit=100').then((voiceData) => {
		// 			this.setState({
		// 				state: 'DATA_LOADED',
		// 				voices: voiceData.data.results
		// 			});
		// 		});
		// 	}
		// });

		get(`/identity/group/list/`).then((res) => {
			this.setState({
				state: 'DATA_LOADED',
				groups: res.data
			});
		});

		get(`/identity/user/profile/`).then((res) => {
			this.setState({
				state: 'DATA_LOADED',
				manage_user: res
			});
		});
	}

	recorderCamp = (uuid, token) => {
		this.setState({
			searchVoice: uuid
		});

		let campaigns = [];

		const global = {
			uuid: 'global1111',
			name: 'Global (Globally1 Required Phrases)',
			company: 'global',
			slug: 'global'
		};
		campaigns.push(global);

		get(`/identity/user/profile/`).then((user) => {
			this.setState({
				state: 'DATA_LOADED',
				user_data: user.data
			});

			get(`/identity/campaign/list/`).then((campaign) => {
				user.data.campaigns.map((camps) => {
					campaign.data.map((res) => {
						if (res.uuid === camps) {
							campaigns.push(res);
						}
						return null;
					});
					return null;
				});
				this.setState({
					campaigns
				});
			});
		});
	};

	recorderSelectCampaign = (uuid) => {
		this.setState({
			voiceSelected: uuid
		});

		let campaigns = [];

		const global = {
			uuid: 'global1111',
			name: 'Global (Globally2 Required Phrases)',
			company: 'global',
			slug: 'global'
		};
		campaigns.push(global);

		get(`/identity/user/profile/`).then((user) => {
			this.setState({
				state: 'DATA_LOADED',
				user_data: user.data
			});

			get(`/identity/campaign/list/`).then((campaign) => {
				user.data.campaigns.map((camps) => {
					campaign.data.map((res) => {
						if (res.uuid === camps) {
							campaigns.push(res);
						}
						return null;
					});
					return null;
				});
				this.setState({
					campaigns
				});
			});
		});
	};

	toTitleCase = (str) => {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	//tabs (unrecorded, rerecord, recorded) function
	tabSelected = (val) => {
		this.setState({
			tabSelected: val
		});
	};

	//voice selected
	selectVoice = (val) => {
		this.setState({
			voiceSelected: val
		});

		let campaigns = [];
		const global = {
			uuid: 'global1111',
			name: 'Global (Globally3 required phrases)',
			company: 'global',
			slug: 'global'
		};
		campaigns.push(global);

		get(`/identity/user/manage/${val}/`).then((user) => {
			this.setState({
				state: 'DATA_LOADED',
				user_data: user.data
			});

			get(`/identity/campaign/list/`).then((campaign) => {
				user.data.campaigns.map((camps) => {
					campaign.data.map((res) => {
						if (res.uuid === camps) {
							campaigns.push(res);
						}
						return null;
					});
					return null;
				});

				this.setState({
					campaigns
				});
				return null;
			});
		});
	};

	// selecting campaign function
	selectCampaign = (value, uuid) => {
		this.setState({
			selectedCampaign: value,
			versions: []
		});

		if (uuid === 'global') {
			//global for phrasebook
			this.setState({
				versions: [
					{
						uuid: '61a1e872-dae7-11e7-a483-0242ac110009',
						name: 'PB 1 test ed',
						company: null,
						slug: 'pb-1',
						phrases: [ '785123b8-0523-11ea-8e22-0242ac11000f', '5b7836d2-0523-11ea-acda-0242ac110005' ]
					},
					{
						uuid: '77242e56-fa31-11e9-8f09-0242ac110005',
						name: 'asf',
						company: null,
						slug: 'asf',
						phrases: [ 'fe08ad8e-043b-11ea-a070-0242ac11000f' ]
					},
					{
						uuid: 'f6f80738-fa31-11e9-a038-0242ac11000f',
						name: 'sadfsadf',
						company: null,
						slug: 'sadfsadf',
						phrases: []
					},
					{
						uuid: '1d6621b2-fab3-11e9-9d8b-0242ac11000f',
						name: 'asfsadfsadf',
						company: null,
						slug: 'asfsadfsadf',
						phrases: []
					},
					{
						uuid: '1ffcf29a-0079-11ea-a7d2-0242ac110005',
						name: 'test-phrase',
						company: null,
						slug: 'test-phrase',
						phrases: [ '2029e6d8-0079-11ea-8f26-0242ac110005' ]
					},
					{
						uuid: 'dad2c19e-0079-11ea-9234-0242ac110005',
						name: 'try-phrase',
						company: null,
						slug: 'try-phrase',
						phrases: []
					},
					{
						uuid: '16750bf8-007a-11ea-babc-0242ac110005',
						name: 'renamed-test-phrase',
						company: null,
						slug: 'test-cypress-phrase',
						phrases: [ '864c8c28-3025-11ea-81c0-0242ac110005' ]
					},
					{
						uuid: '3cd03c64-007a-11ea-9695-0242ac11000f',
						name: 'test-cypress-phrase',
						company: null,
						slug: 'test-cypress-phrase-2',
						phrases: [ '3d9ee398-007a-11ea-adfa-0242ac110005' ]
					},
					{
						uuid: '3d0e5a4e-0101-11ea-9153-0242ac110005',
						name: 'test-cypress-phrase-2',
						company: null,
						slug: 'test-cypress-phrase-2-3',
						phrases: []
					},
					{
						uuid: '4e2cfc44-0102-11ea-9f17-0242ac11000f',
						name: 'test-cypress-phrase-3',
						company: null,
						slug: 'test-cypress-phrase-3',
						phrases: []
					},
					{
						uuid: '767d87b2-0103-11ea-974d-0242ac110008',
						name: 'test-cypress-phrase-4',
						company: null,
						slug: 'test-cypress-phrase-4',
						phrases: []
					},
					{
						uuid: 'bf64703a-0103-11ea-9510-0242ac110008',
						name: 'test-cypress-phrase-5',
						company: null,
						slug: 'test-cypress-phrase-5',
						phrases: []
					},
					{ uuid: '75ad3184-32bd-11ea-a261-0242ac11000f', name: 'u', company: null, slug: 'u', phrases: [] }
				],
				checkIfGlobal: true
			});

			//UNCOMMENT FOR ACTUAL DATA
			// get(`/pitch/global/phrases/`).then(global => {
			//   //if choose global checkIfGlobal will be true
			//   this.setState({
			//     versions: global.data,
			//     checkIfGlobal: true
			//   });
			// });
		}
		else {
			get(`/identity/company/${uuid}/`).then((res) => {
				this.setState({
					companySlug: res.data.slug
				});

				get(`/pitch/company/${res.data.slug}/phrases/`).then((camp) => {
					this.setState({
						versions: camp.data,
						checkIfGlobal: false
					});
				});
			});
		}
	};

	selectVoiceCampaign = (value, uuid) => {
		this.setState({
			campaignSelected: value
		});

		if (uuid === 'global') {
			//global for phrasebook

			this.setState({
				versions: [
					{
						uuid: '61a1e872-dae7-11e7-a483-0242ac110009',
						name: 'PB 1 test ed',
						company: null,
						slug: 'pb-1',
						phrases: [ '785123b8-0523-11ea-8e22-0242ac11000f', '5b7836d2-0523-11ea-acda-0242ac110005' ]
					},
					{
						uuid: '77242e56-fa31-11e9-8f09-0242ac110005',
						name: 'asf',
						company: null,
						slug: 'asf',
						phrases: [ 'fe08ad8e-043b-11ea-a070-0242ac11000f' ]
					},
					{
						uuid: 'f6f80738-fa31-11e9-a038-0242ac11000f',
						name: 'sadfsadf',
						company: null,
						slug: 'sadfsadf',
						phrases: []
					},
					{
						uuid: '1d6621b2-fab3-11e9-9d8b-0242ac11000f',
						name: 'asfsadfsadf',
						company: null,
						slug: 'asfsadfsadf',
						phrases: []
					},
					{
						uuid: '1ffcf29a-0079-11ea-a7d2-0242ac110005',
						name: 'test-phrase',
						company: null,
						slug: 'test-phrase',
						phrases: [ '2029e6d8-0079-11ea-8f26-0242ac110005' ]
					},
					{
						uuid: 'dad2c19e-0079-11ea-9234-0242ac110005',
						name: 'try-phrase',
						company: null,
						slug: 'try-phrase',
						phrases: []
					},
					{
						uuid: '16750bf8-007a-11ea-babc-0242ac110005',
						name: 'renamed-test-phrase',
						company: null,
						slug: 'test-cypress-phrase',
						phrases: [ '864c8c28-3025-11ea-81c0-0242ac110005' ]
					},
					{
						uuid: '3cd03c64-007a-11ea-9695-0242ac11000f',
						name: 'test-cypress-phrase',
						company: null,
						slug: 'test-cypress-phrase-2',
						phrases: [ '3d9ee398-007a-11ea-adfa-0242ac110005' ]
					},
					{
						uuid: '3d0e5a4e-0101-11ea-9153-0242ac110005',
						name: 'test-cypress-phrase-2',
						company: null,
						slug: 'test-cypress-phrase-2-3',
						phrases: []
					},
					{
						uuid: '4e2cfc44-0102-11ea-9f17-0242ac11000f',
						name: 'test-cypress-phrase-3',
						company: null,
						slug: 'test-cypress-phrase-3',
						phrases: []
					},
					{
						uuid: '767d87b2-0103-11ea-974d-0242ac110008',
						name: 'test-cypress-phrase-4',
						company: null,
						slug: 'test-cypress-phrase-4',
						phrases: []
					},
					{
						uuid: 'bf64703a-0103-11ea-9510-0242ac110008',
						name: 'test-cypress-phrase-5',
						company: null,
						slug: 'test-cypress-phrase-5',
						phrases: []
					},
					{ uuid: '75ad3184-32bd-11ea-a261-0242ac11000f', name: 'u', company: null, slug: 'u', phrases: [] }
				],
				checkIfGlobal: true
			});

			//UNCOMMENT FOR ACTUAL DATA
			// get(`/pitch/global/phrases/`).then(global => {
			//   this.setState({
			//     versions: global.data,
			//     checkIfGlobal: true
			//   });
			// });
		}
		else {
			// campaign
			get(`/identity/company/${uuid}/`).then((res) => {
				this.setState({
					companySlug: res.data.slug
				});

				get(`/pitch/company/${res.data.slug}/phrases/`).then((book) => {
					this.setState({
						versions: book.data,
						checkIfGlobal: false
					});
				});
			});
		}
	};

	selectVersion = (value) => {
		this.setState({
			selectedVersion: value
		});
	};

	//selecting phrasebook
	selectPhraseBook = (value) => {
		this.setState({
			versionSelected: value
		});

		if (this.state.checkIfGlobal === true) {
			this.setState({
				unrecordedList: [
					{
						uuid: '785123b8-0523-11ea-8e22-0242ac11000f',
						name: 'echo-phrase',
						slug: 'echo-phrase',
						phrase: 'Jerecho echo echo',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					},
					{
						uuid: '5b7836d2-0523-11ea-acda-0242ac110005',
						name: 'test-me',
						slug: 'test-me',
						phrase: 'hi my name is Echo Jerecho',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					}
				]
			});

			//UNCOMMENT FOR ACTUAL DATA
			// get(
			// 	`/pitch/global/audio/phrase-book/${value}/voice/${this.state.user_data.uuid}/unrecorded/`
			// ).then((unrec) => {
			// 	this.setState({
			// 		unrecordedList: unrec.data
			// 	});
			// });
		}
		else {
			this.setState({
				unrecordedList: [
					{
						uuid: '785123b8-0523-11ea-8e22-0242ac11000f',
						name: 'echo-phrase',
						slug: 'echo-phrase',
						phrase: 'Jerecho echo echo',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					},
					{
						uuid: '5b7836d2-0523-11ea-acda-0242ac110005',
						name: 'test-me',
						slug: 'test-me',
						phrase: 'hi my name is Echo Jerecho',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					}
				]
			});

			//UNCOMMENT FOR ACTUAL DATA
			// get(
			// 	`/pitch/company/${this.state.campaignSelected}/audio/phrase-book/${value}/voice/${this.state.user_data
			// 		.uuid}/unrecorded/`
			// ).then((unrec) => {
			// 	this.setState({
			// 		unrecordedList: unrec.data
			// 	});
			// });
		}
	};

	selectUnrecorded = (value) => {
		this.setState({
			unrecordedSelected: value
		});
	};

	filterData = () => {
		var data1, data2, data3;
		this.setState({
			loader: true,
			showTable: false,
			display: [],
			displayRerecord: [],
			fetchedRecorded: false,
			fetchedRerecord: false,
			fetchedUnrecorded: false
		});
		// end

		//global phrase
		if (this.state.checkIfGlobal === true) {
			this.setState({
				display: [
					{
						uuid: '785123b8-0523-11ea-8e22-0242ac11000f',
						name: 'echo-phrase',
						slug: 'echo-phrase',
						phrase: 'Jerecho echo echo',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					},
					{
						uuid: '5b7836d2-0523-11ea-acda-0242ac110005',
						name: 'test-me',
						slug: 'test-me',
						phrase: 'hi my name is Echo Jerecho',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					}
				],
				fetchedUnrecorded: true,
				loader: false,
				showTable: true
			});

			//UNCOMMENT FOR ACTUAL DATA
			// data1 = get(
			// 	`/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data
			// 		.uuid}/unrecorded/`
			// ).then((unrecorded) => {
			// 	this.setState({
			// 		display: unrecorded.data,
			// 		fetchedUnrecorded: unrecorded.status === 200 ? true : false
			// 	});
			// });
			data2 = get(
				`/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data
					.uuid}/rerecord/`
			).then((rerecord) => {
				this.setState({
					displayRerecord: rerecord.data,
					fetchedRerecorded: rerecord.status === 200 ? true : false
				});
			});
			data3 = get(
				`/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data
					.uuid}/recorded/`
			).then((recorded) => {
				this.setState({
					displayRecorded: recorded.data,
					fetchedRecorded: recorded.status === 200 ? true : false
				});
			});
		}
		else {
			this.setState({
				display: [
					{
						uuid: '785123b8-0523-11ea-8e22-0242ac11000f',
						name: 'echo-phrase',
						slug: 'echo-phrase',
						phrase: 'Jerecho echo echo',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					},
					{
						uuid: '5b7836d2-0523-11ea-acda-0242ac110005',
						name: 'test-me',
						slug: 'test-me',
						phrase: 'hi my name is Echo Jerecho',
						phrase_book: '61a1e872-dae7-11e7-a483-0242ac110009'
					}
				],
				fetchedUnrecorded: true
			});

			//UNCOMMENT FOR ACTUAL DATA
			// data1 = get(
			// 	`/pitch/company/${this.state.selectedCampaign}/audio/phrase-book/${this.state
			// 		.selectedVersion}/voice/${this.state.user_data.uuid}/unrecorded/`
			// ).then((unrecorded) => {
			// 	this.setState({
			// 		display: unrecorded.data,
			// 		fetchedUnrecorded: unrecorded.status === 200 ? true : false
			// 	});
			// });
			data2 = get(
				`/pitch/company/${this.state.selectedCampaign}/audio/phrase-book/${this.state
					.selectedVersion}/voice/${this.state.user_data.uuid}/rerecord/`
			).then((rerecord) => {
				this.setState({
					displayRerecord: rerecord.data,
					fetchedRecorded: rerecord.status === 200 ? true : false
				});
			});
			data3 = get(
				`/pitch/company/${this.state.selectedCampaign}/audio/phrase-book/${this.state
					.selectedVersion}/voice/${this.state.user_data.uuid}/recorded/`
			).then((recorded) => {
				this.setState({
					displayRecorded: recorded.data,
					fetchedRecorded: recorded.status === 200 ? true : false
				});
			});
		}
		Promise.all([ data1, data2, data3 ]).then(() => {
			this.setState({
				loader: false,
				showTable: true
			});
		});
	};

	// end fetching unrecorded, rerecord, recorded  ------

	refreshData = () => {
		this.setState({
			display: [],
			displayRerecord: [],
			displayRecorded: [],
			fetchedRecorded: false,
			fetchedUnrecorded: false,
			fetchedRerecord: false
		});
		this.filterData();
	};

	resetFilters = (val) => {
		this.setState({
			display: [],
			filtered: false,
			showTable: val
		});
	};

	handleChange = (key, val) => {
		this.setState({
			[key]: val
		});
	};

	selectedVoice = (val) => {
		this.setState({
			searchVoice: val
		});

		let campaigns = [];

		const global = {
			uuid: 'global1111',
			name: 'Global (Globally Required Phrases)',
			company: 'global',
			slug: 'global'
		};
		campaigns.push(global);

		this.setState({
			state: 'DATA_LOADED',
			campaigns: campaigns
		});

		// get(`/identity/user/manage/${val}/`).then((user) => {
		// 	this.setState({
		// 		state: 'DATA_LOADED',
		// 		user_data: user.data
		// 	});
		// 	// if (this.state.user_group === 10) {
		// 	// }

		// 	get(`/identity/campaign/list/`).then((campaign) => {
		// 		user.data.campaigns.map((camps) => {
		// 			campaign.data.map((res) => {
		// 				if (res.uuid === camps) {
		// 					campaigns.push(res);
		// 				}
		// 				return null;
		// 			});
		// 			return null;
		//     });
		//     console.log(campaigns);
		// 		this.setState({
		// 			campaigns
		// 		});
		// 	});
		// });
	};

	deleteAudio = (val) => {
		this.state.recorded.map((data, id) => {
			if (val === data.name) {
				this.state.recorded.splice(id, 1);
			}
			return null;
		});
	};

	// for uploading audio
	handleAudio = (e) => {
		this.setState({
			audioFile: e.target.value
		});

		let files = e.target.files;
		var uploadFile = new FormData();
		uploadFile.append('file', files[0]);
		this.setState({
			fileName: files[0].name,
			file: uploadFile
		});
	};

	removeAudio = () => {
		this.setState({
			audioFile: '',
			fileName: ''
		});
	};

	getRecordedName = (val) => {
		this.setState({
			recordedName: val
		});

		this.state.unrecorded.map((data, id) => {
			if (val === data.name) {
				this.state.unrecorded.splice(id, 1);
			}
			return null;
		});
	};

	// table audio upload
	uploadAudio = (voice, phrasebook, slug, phrase, file, modification, fadein, fadeout, convert) => {
		if (file == null) {
			this.setState({
				openToast: true,
				toastType: 'caution',
				message: `Please Select Audio File`,
				vertical: 'top',
				horizontal: 'right'
			});
		}
		else {
			this.setState({
				uploadLoading: true
			});

			if (this.state.checkIfGlobal) {
				post(
					`/pitch/global/audio/phrase-book/${phrasebook}/voice/${voice}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
					file
				)
					.then((res) => {
						this.setState({
							display: [],
							displayRerecord: [],
							displayRecorded: [],
							fetchedRecorded: false,
							fetchedUnrecorded: false,
							fetchedRerecord: false,
							audio: [],
							file: null,
							audioFile: '',
							fileName: '',
							uploadLoading: false,
							addNewVoiceModal: false
						});
						this.filterData();

						// checks if status response was 201.
						if (res.status === 201 || res.status === 200) {
							this.setState({
								openToast: true,
								toastType: 'check',
								message: `Successfully uploaded`,
								vertical: 'top',
								horizontal: 'right',
								addNewVoiceModal: false,
								uploadLoading: false
							});
						}
						else {
							this.setState({
								openToast: true,
								toastType: 'caution',
								message: `Error uploading file`,
								vertical: 'top',
								horizontal: 'right',
								addNewVoiceModal: false,
								uploadLoading: false
							});
						}
					})
					// if there is no response we will show a failed upload message
					.catch((err) => {
						this.setState({
							openToast: true,
							toastType: 'caution',
							message: `Error uploading file`,
							vertical: 'top',
							horizontal: 'right',
							addNewVoiceModal: false,
							uploadLoading: false
						});
					});
			}
			else {
				post(
					`/pitch/company/${this.state
						.companySlug}/audio/phrase-book/${phrasebook}/voice/${voice}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
					file
				)
					.then((res) => {
						this.setState({
							display: [],
							displayRerecord: [],
							displayRecorded: [],
							fetchedRecorded: false,
							fetchedUnrecorded: false,
							fetchedRerecord: false,
							audio: [],
							file: null,
							audioFile: '',
							fileName: '',
							uploadLoading: false,
							addNewVoiceModal: false
						});
						this.filterData();

						// checks if status response was 201.
						if (res.status === 201 || res.status === 200) {
							this.setState({
								openToast: true,
								toastType: 'check',
								message: `Successfully uploaded`,
								vertical: 'top',
								horizontal: 'right',
								addNewVoiceModal: false,
								uploadLoading: false
							});
						}
						else {
							this.setState({
								openToast: true,
								toastType: 'caution',
								message: `Failed to upload file`,
								vertical: 'top',
								horizontal: 'right',
								addNewVoiceModal: false,
								uploadLoading: false
							});
						}
					})
					// if there is no response we will show a failed upload message
					.catch((err) => {
						this.setState({
							openToast: true,
							toastType: 'caution',
							message: `Error uploading file`,
							vertical: 'top',
							horizontal: 'right',
							addNewVoiceModal: false,
							uploadLoading: false
						});
					});
			}
		}
	};

	//ANCHOR UPLOAD SESSION

	uploadSession = (session) => {
		let requests;
		this.setState({
			uploadLoading: true
		});
		if (this.state.checkIfGlobal) {
			requests = session.map((audio) => {
				return post(
					`/pitch/global/audio/phrase-book/${audio.phrasebook}/voice/${audio.voice}/phrase/${audio.phrase}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
					audio.file
				);
			});
			Promise.all(requests)
				.then(() => {
					this.setState({
						display: [],
						displayRerecord: [],
						displayRecorded: [],
						fetchedRecorded: false,
						fetchedUnrecorded: false,
						fetchedRerecord: false,
						audio: [],
						file: null,
						audioFile: '',
						fileName: '',
						uploadLoading: false,
						addNewVoiceModal: false
					});
					this.filterData();
					this.setState({
						openToast: true,
						toastType: 'check',
						message: `Successfully uploaded`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				})
				// if there is no response we will show a failed upload message
				.catch((err) => {
					this.setState({
						openToast: true,
						toastType: 'caution',
						message: `Error uploading file`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				});
		}
		else {
			requests = session.map((audio) => {
				return post(
					`/pitch/company/${this.state
						.companySlug}/audio/phrase-book/${audio.phrasebook}/voice/${audio.voice}/phrase/${audio.phrase}/upload/?convert=${audio.convert}&fadeIn=${audio.fadein}&fadeOut=${audio.fadeout}&noModification=${audio.modification}`,
					audio.file
				);
			});
			Promise.all(requests)
				.then(() => {
					this.setState({
						display: [],
						displayRerecord: [],
						displayRecorded: [],
						fetchedRecorded: false,
						fetchedUnrecorded: false,
						fetchedRerecord: false,
						audio: [],
						file: null,
						audioFile: '',
						fileName: '',
						uploadLoading: false,
						addNewVoiceModal: false
					});
					this.filterData();
					this.setState({
						openToast: true,
						toastType: 'check',
						message: `Successfully uploaded`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				})
				// if there is no response we will show a failed upload message
				.catch((err) => {
					this.setState({
						openToast: true,
						toastType: 'caution',
						message: `Error uploading file`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				});
		}
	};

	openAddNewVoiceModal = (bool, currentMode) => {
		if (bool === false) {
			this.setState({
				addNewVoiceModal: false,
				audioFile: '',
				fileName: '',
				file: ''
			});
		}
		else {
			this.setState({
				currentMode,
				addNewVoiceModal: true,
				anchorEl: null
			});
		}
	};

	handleCloseToast = () => {
		this.setState({
			openToast: false
		});
	};

	//Transfer data to Rerecord
	addToRerecord = (version, voice, val) => {
		this.setState({
			loader: true,
			display: [],
			displayRerecord: [],
			displayRecorded: [],
			fetchedUnrecorded: false,
			fetchedRerecord: false,
			fetchedRecorded: false
		});

		if (this.state.checkIfGlobal === true) {
			patch(
				`/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data
					.uuid}/phrase/${val.uuid}/file/`,
				{ rerecord: true }
			).then((audio) => {
				this.filterData();
				this.setState({
					openToast: true,
					toastType: 'check',
					message: `Successfully uploaded`,
					vertical: 'top',
					horizontal: 'right',
					addNewVoiceModal: false,
					uploadLoading: false
				});
			});
		}
		else {
			patch(
				`/pitch/company/${this.state.companySlug}/audio/phrase-book/${this.state.selectedVersion}/voice/${this
					.state.user_data.uuid}/phrase/${val.uuid}/file/`,
				{ rerecord: true }
			).then((res) => {
				// checks if status response was 201.
				if (res.status === '201' || res.status === '200') {
					this.setState({
						openToast: true,
						toastType: 'check',
						message: `Successfully uploaded`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				}
				else {
					this.setState({
						openToast: true,
						toastType: 'caution',
						message: `Error uploading file`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				}

				this.filterData();
			});
		}
	};

	//transfer data back to recorded
	addToRecorded = (val) => {
		this.setState({
			loader: true,
			display: [],
			displayRerecord: [],
			displayRecorded: [],
			fetchedUnrecorded: false,
			fetchedRerecord: false,
			fetchedRecorded: false
		});

		if (this.state.checkIfGlobal === true) {
			patch(
				`/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data
					.uuid}/phrase/${val.uuid}/file/`,
				{ rerecord: false }
			).then((audio) => {
				this.filterData();
				this.setState({
					openToast: true,
					toastType: 'check',
					message: `Undo successful`,
					vertical: 'top',
					horizontal: 'right',
					addNewVoiceModal: false,
					uploadLoading: false
				});
			});
		}
		else {
			patch(
				`/pitch/company/${this.state.companySlug}/audio/phrase-book/${this.state.selectedVersion}/voice/${this
					.state.user_data.uuid}/phrase/${val.uuid}/file/`,
				{ rerecord: false }
			).then((audio) => {
				this.filterData();
				this.setState({
					openToast: true,
					toastType: 'check',
					message: `Undo successful`,
					vertical: 'top',
					horizontal: 'right',
					addNewVoiceModal: false,
					uploadLoading: false
				});
			});
		}
	};

	// main audio upload
	openAddNewDialog() {
		this.setState({
			openAddNew: true
		});
	}

	closeAddNewDialog() {
		this.setState({
			openAddNew: false,
			voiceSelected: '',
			campaignSelected: '',
			versionSelected: '',
			unrecordedSelected: ''
		});
	}

	changeAudioToBeUploaded = (e) => {
		this.setState({
			audioToBeUploaded: e.target.value
		});

		let files = e.target.files;
		var uploadFile = new FormData();

		uploadFile.append('file', files[0]);
		this.setState({
			mainFileName: files[0].name,
			mainFile: uploadFile
		});
	};

	mainUploadAudio = (voice, phrasebook, slug, phrase, file, modification, fadein, fadeout, convert) => {
		if (file == null) {
			this.setState({
				openToast: true,
				toastType: 'caution',
				message: `Please select audio file`,
				vertical: 'top',
				horizontal: 'right'
			});
		}
		else if ((phrasebook && slug && phrase) === '') {
			this.setState({
				openToast: true,
				toastType: 'caution',
				message: `Please complete the form first`,
				vertical: 'top',
				horizontal: 'right'
			});
		}
		else {
			this.setState({
				mainUploadLoading: true
			});

			if (slug === 'global') {
				post(
					`/pitch/global/audio/phrase-book/${phrasebook}/voice/${voice}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
					file
				)
					.then((res) => {
						this.setState({
							display: [],
							displayRerecord: [],
							fetchedUnrecorded: false,
							fetchedRerecord: false,
							voiceSelected: '',
							campaignSelected: '',
							versionSelected: '',
							unrecordedSelected: '',
							searchVoice: voice,
							selectedCampaign: slug,
							selectedVersion: phrasebook,
							file: null,
							openAddNew: false,
							mainUploadLoading: false
						});
						this.filterData();

						// checks if status response was 201.
						if (res.status === 201 || res.status === 200) {
							this.setState({
								openToast: true,
								toastType: 'check',
								message: `Successfully uploaded`,
								vertical: 'top',
								horizontal: 'right',
								openAddNew: false,
								mainUploadLoading: false
							});
						}
						else {
							this.setState({
								openToast: true,
								toastType: 'caution',
								message: `Error uploading file`,
								vertical: 'top',
								horizontal: 'right',
								openAddNew: false,
								mainUploadLoading: false
							});
						}
					})
					// if there is no response we will show a failed upload message
					.catch((err) => {
						this.setState({
							openToast: true,
							toastType: 'caution',
							message: `Error uploading file`,
							vertical: 'top',
							horizontal: 'right',
							openAddNew: false,
							mainUploadLoading: false
						});
					});
			}
			else {
				post(
					`/pitch/company/${slug}/audio/phrase-book/${phrasebook}/voice/${voice}/phrase/${phrase}/upload/?convert=${convert}&fadeIn=${fadein}&fadeOut=${fadeout}&noModification=${modification}`,
					file
				)
					.then((res) => {
						this.setState({
							display: [],
							displayRerecord: [],
							fetchedUnrecorded: false,
							fetchedRerecord: false,
							voiceSelected: '',
							campaignSelected: '',
							versionSelected: '',
							unrecordedSelected: '',
							searchVoice: voice,
							selectedCampaign: slug,
							selectedVersion: phrasebook,
							file: null,
							mainUploadLoading: false,
							openAddNew: false
						});
						this.filterData();

						// checks if status response was 201.
						if (res.status === 201 || res.status === 200) {
							this.setState({
								openToast: true,
								toastType: 'check',
								message: `Successfully uploaded`,
								vertical: 'top',
								horizontal: 'right',
								openAddNew: false,
								mainUploadLoading: false
							});
						}
						else {
							this.setState({
								openToast: true,
								toastType: 'caution',
								message: `Failed to upload file`,
								vertical: 'top',
								horizontal: 'right',
								openAddNew: false,
								mainUploadLoading: false
							});
						}
					})
					// if there is no response we will show a failed upload message
					.catch((err) => {
						this.setState({
							openToast: true,
							toastType: 'caution',
							message: `Error uploading file`,
							vertical: 'top',
							horizontal: 'right',
							openAddNew: false,
							mainUploadLoading: false
						});
					});
			}
		}
	};

	savedAudio = () => {
		this.setState(
			(prevState) => ({
				openAddNew: !prevState.openAddNew
			}),
			() => this.showSuccessBar()
		);
	};

	showSuccessBar = () => {
		this.setState({
			openToast: true,
			toastType: 'check',
			message: `Successfully uploaded`,
			vertical: 'top',
			horizontal: 'right',
			voiceSelected: '',
			campaignSelected: '',
			versionSelected: '',
			unrecordedSelected: ''
		});
	};

	handleCloseToast = () => {
		this.setState({
			openToast: false
		});
	};

	getUpdatedRecorded = (val) => {
		this.setState({
			recorded: val
		});
	};

	playAudio = (version, voice, key, uuid) => {
		if (this.state.checkIfGlobal === true) {
			get(
				`/pitch/global/audio/phrase-book/${this.state.selectedVersion}/voice/${this.state.user_data
					.uuid}/phrase/${uuid}/file/`
			).then((res) => {
				this.setState({ audio: res.data, isAudioLoading: false });
			});
		}
		else {
			get(
				`/pitch/company/${this.state.companySlug}/audio/phrase-book/${this.state.selectedVersion}/voice/${this
					.state.user_data.uuid}/phrase/${uuid}/file/`
			).then((res) => {
				this.setState({
					audio: res.data,
					isAudioLoading: false,
					isAudioLoadingRerec: false
				});
			});
		}
	};

	stopLoading = () => {
		this.setState({ isAudioLoading: false });
	};
	showLoader = (type) => {
		if (type === 'recorded') {
			this.setState({ isAudioLoading: true });
		}
		else {
			this.setState({ isAudioLoadingRerec: true });
		}
	};
	removeAudioPlayed = () => {
		this.setState({ audio: [] });
	};

	handleUnrecordedSelected = (val) => {
		this.setState({ unrecordedSelected: val });
	};
	showToastSession = (type, message) => {
		this.setState({
			openToast: true,
			toastType: type,
			message: message,
			vertical: 'top',
			horizontal: 'right'
		});
	};

	rerecordAudio = (version, voice, key) => {
		this.setState({
			display: [],
			displayRecorded: [],
			displayRerecord: [],
			fetchedRecorded: false,
			fetchedUnrecorded: false,
			fetchedRerecord: false
		});

		patch(`/pitch/audio/version/${version}/voice/${voice}/${key}/`, {
			rerecord: true
		})
			.then((res) => {
				this.filterData(version);

				// checks if status response was 201.
				if (res.status === 201 || res.status === 200) {
					this.setState({
						openToast: true,
						toastType: 'check',
						message: `Successfully added to rerecord`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				}
				else {
					this.setState({
						openToast: true,
						toastType: 'caution',
						message: `Request failed`,
						vertical: 'top',
						horizontal: 'right',
						addNewVoiceModal: false,
						uploadLoading: false
					});
				}
			})
			// if there is no response we will show a failed upload message
			.catch((err) => {
				this.setState({
					openToast: true,
					toastType: 'caution',
					message: `Request failed`,
					vertical: 'top',
					horizontal: 'right',
					addNewVoiceModal: false,
					uploadLoading: false
				});
			});
	};

	render() {
		const { classes, width } = this.props;
		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
		return (
			<React.Fragment>
				<div className={classes.root}>
					<CssBaseline />
					{/* Navbar */}
					<main className={classes.content}>
						<Container maxWidth="xl" className={classes.container}>
							<Grid container spacing={3}>
								{/* Header */}
								<Grid container className={classes.navBar}>
									{/* HEADER - DESKTOP VERSION START */}
									<Grid item xs={12} sm={3} md={5} lg={5} className={classes.desktopCon}>
										{localStorage.getItem('type') !== '10' && (
											<HeaderLink
												menu={[
													{
														title: 'Audio Resources',
														path: '/manage/audio/resources'
													}
												]}
												title="Voice"
											/>
										)}
									</Grid>
									<Grid container className={classes.mobileConDropdown}>
										<Grid item xs={7} sm={8}>
											<DropdownDesktop groupID={this.state.user_group} />
										</Grid>
										<Grid item xs={5} sm={4}>
											<Dropdown
												links={this.state.links}
												refreshData={this.refreshData}
												version={this.state.selectedVersion}
												fetchedRecorded={this.state.fetchedRecorded}
												fetchedUnrecorded={this.state.fetchedUnrecorded}
												fetchedRerecord={this.state.fetchedRerecord}
											/>
										</Grid>
									</Grid>
									{/* HEADER - MOBILE VERSION START */}

									{/* TABS - DESKTOP VERSION START */}

									<Grid item xs={12} sm={9} md={7} lg={7} className={classes.desktopCon}>
										<TabsDesktop
											tabSelected={this.tabSelected}
											reset={this.resetFilters}
											defaultValue={1}
										/>
									</Grid>

									{/* TABS - DESKTOP VERSION END */}
									{/* TABS - MOBILE VERSION START */}
									<Grid item xs={12} sm={12} className={classes.mobileCon}>
										<Tabs tabSelected={this.tabSelected} reset={this.resetFilters} />
									</Grid>

									{/* TABS - MOBILE VERSION END */}
								</Grid>

								{/* Main Content - DESKTOP VERSION START*/}
								<React.Fragment>
									<Grid item xs={12} className={classes.desktopCon}>
										<Paper className={classes.filterWrapper}>
											{width === 'xl' || width === 'lg' || width === 'md' ? (
												/* Search and FilterToolbar */
												<Grid container className={classes.header}>
													<Grid item xs={12} sm={4} className={classes.searchMargin}>
														{localStorage.getItem('type') !== '10' && (
															<Search
																searchFunction={this.selectedVoice}
																voices={this.state.voices}
															/>
														)}
													</Grid>

													<Grid
														item
														xs={12}
														sm={localStorage.getItem('type') === '10' ? 12 : 8}
													>
														<Filter
															campaigns={this.state.campaigns}
															versions={this.state.versions}
															tab={this.state.tabSelected}
															unrecorded={this.state.unrecorded}
															rerecord={this.state.rerecord}
															recorded={this.state.recorded}
															filterData={this.filterData}
															filtered={(val) => this.setState({ filtered: val })}
															user={this.state.user}
															searched={this.state.searchVoice}
															selectCampaign={this.selectCampaign}
															selectVersion={this.selectVersion}
															selectedCampaign={this.state.selectedCampaign}
															selectedVersion={this.state.selectedVersion}
															refreshData={this.refreshData}
														/>
													</Grid>
												</Grid>
											) : null}
										</Paper>
										<Paper
											className={classes.tableWrapper}
											style={
												this.state.showTable ? (
													{ background: 'white' }
												) : (
													{ background: '#fafafa' }
												)
											}
										>
											{this.state.loader ? (
												<TableLoader />
											) : this.state.showTable ? (
												<Grid container className={classes.pitchTable}>
													<Grid item sm={12} xs={12} md={4} lg={4}>
														<UnrecordedCard
															unrecorded={this.state.display}
															tblName={'Unrecorded'}
															rows={this.state.unrecorded}
															columns={this.state.unrecordedTblName}
															displayData={this.state.display}
															filtered={this.state.filtered}
															handleChange={this.handleChange}
															searchPhrase={this.state.searchDialogUnrecord}
															searchKey={'searchDialogUnrecord'}
															fetched={this.state.fetchedUnrecorded}
															// for adding audio
															handleAudio={this.handleAudio}
															removeAudio={this.removeAudio}
															getRecordedName={this.getRecordedName}
															fileName={this.state.fileName}
															user_id={this.state.user}
															file={this.state.file}
															uploadAudio={this.uploadAudio}
															version={this.state.selectedVersion}
															voice={this.state.searchVoice}
															audio={this.state.audio}
															openAddNewVoiceModal={this.openAddNewVoiceModal}
															addNewVoiceModal={
																this.state.currentMode === 'Unrecorded' ? (
																	this.state.addNewVoiceModal
																) : (
																	false
																)
															}
															typeOfAudio="phrase"
															uploadLoading={this.state.uploadLoading}
															refreshData={this.refreshData}
															//toast
															showToast={this.showToastSession}
															//upload session
															uploadSession={this.uploadSession}
														/>
													</Grid>
													{/* ANCHOR Rerecord */}
													<Grid item sm={12} xs={12} md={4} lg={4}>
														<RerecordCard
															addToRecorded={this.addToRecorded}
															rerecord={this.state.displayRerecord}
															tblName={'Rerecord'}
															rows={this.state.rerecord}
															columns={this.state.rerecordTblName}
															openAddNewVoiceModal={this.openAddNewVoiceModal}
															filtered={this.state.filtered}
															handleChange={this.handleChange}
															searchPhrase={this.state.searchDialogRerecord}
															searchKey={'searchDialogRerecord'}
															user_id={this.state.user}
															fetched={this.state.fetchedRerecord}
															refreshData={this.refreshData}
															version={this.state.selectedVersion}
															handleAudio={this.handleAudio}
															audio={this.state.audioFile}
															removeAudio={this.removeAudio}
															getRecordedName={this.getRecordedName}
															fileName={this.state.fileName}
															file={this.state.file}
															uploadAudio={this.uploadAudio}
															voice={this.state.searchVoice}
															addNewVoiceModal={
																this.state.currentMode === 'Rerecord' ? (
																	this.state.addNewVoiceModal
																) : (
																	false
																)
															}
															uploadLoading={this.state.uploadLoading}
															rerecordAudio={this.rerecordAudio}
															//playing audio
															preview={this.state.audio}
															showLoader={this.showLoader}
															playAudio={this.playAudio}
															isLoading={this.state.isAudioLoadingRerec}
															//debugging
															typeOfAudio="phrase"
															//toast
															showToast={this.showToastSession}
															//upload session
															uploadSession={this.uploadSession}
														/>
													</Grid>
													{/* ANCHOR Recorded */}
													<Grid item sm={12} xs={12} md={4} lg={4}>
														<RecordedCard
															//rerecordAudio={this.rerecordAudio}
															recorded={this.state.displayRecorded}
															tblName={'Recorded'}
															rows={this.state.recorded}
															columns={this.state.recordedTblName}
															openAddNewVoiceModal={this.openAddNewVoiceModal}
															displayData={this.state.displayRecorded}
															filtered={this.state.filtered}
															handleChange={this.handleChange}
															searchPhrase={this.state.searchDialogRecord}
															searchKey={'searchDialogRecord'}
															deleteAudio={this.deleteAudio}
															user_id={this.state.user}
															rerecordAudio={this.addToRerecord}
															playAudio={this.playAudio}
															version={this.state.selectedVersion}
															voice={this.state.searchVoice}
															audio={this.state.audio}
															fetched={this.state.fetchedRecorded}
															isLoading={this.state.isAudioLoading}
															showLoader={this.showLoader}
															removeAudio={this.removeAudioPlayed}
															refreshData={this.refreshData}
															uploadLoading={this.state.uploadLoading}
															handleAudio={this.handleAudio}
															getRecordedName={this.getRecordedName}
															fileName={this.state.fileName}
															file={this.state.file}
															//addNewVoiceModal={this.state.addNewVoiceModal}
														/>
													</Grid>
												</Grid>
											) : (
												<Grid item xs={12}>
													<div className={classes.largeTitle} id="table-title">
														<Typography variant="h3" className={classes.headerTitle}>
															{this.toTitleCase('phrase audio recordings')}
														</Typography>
													</div>
													{this.state.user_uuid ? (
														<div className={classes.emptyPitch}>
															<b> No phrase selected </b>
															<br />
															Select voice, campaign and pitch version to view phrase
															audio
														</div>
													) : (
														<div className={classes.emptyPitch}>
															<TableLoader />
														</div>
													)}
												</Grid>
											)}
										</Paper>
									</Grid>
									{/* Main Content - DESKTOP VERSION END */}

									{/* Main Content - MOBILE VERSION START*/}
									<Grid item xs={12} className={classes.mobileCon}>
										<Paper className={fixedHeightPaper}>
											{width === 'xs' || width === 'sm' ? (
												/* Search and FilterToolbar */
												<Grid container className={classes.header}>
													<Grid item xs={12} sm={4} className={classes.searchMargin}>
														{localStorage.getItem('type') !== '10' && (
															<Search
																searchFunction={this.selectedVoice}
																voices={this.state.voices}
															/>
														)}
													</Grid>
													<Grid
														item
														xs={12}
														sm={localStorage.getItem('type') === '10' ? 12 : 8}
													>
														<Filter
															campaigns={this.state.campaigns}
															versions={this.state.versions}
															tab={this.state.tabSelected}
															unrecorded={this.state.unrecorded}
															rerecord={this.state.rerecord}
															recorded={this.state.recorded}
															filterData={this.filterData}
															filtered={(val) => this.setState({ filtered: val })}
															user={this.state.user}
															searched={this.state.searchVoice}
															selectCampaign={this.selectCampaign}
															selectVersion={this.selectVersion}
															selectedCampaign={this.state.selectedCampaign}
															selectedVersion={this.state.selectedVersion}
															checkIfGlobal={this.state.checkIfGlobal}
															user_group={this.state.user_group}
														/>
													</Grid>
												</Grid>
											) : null}
										</Paper>

										<Divider />

										{/* Phrase Audio Recordings Title*/}
										<Paper
											className={classes.tableWrapper}
											style={
												this.state.showTable ? (
													{ background: 'white' }
												) : (
													{ background: '#fafafa' }
												)
											}
										>
											{/* Pitch Audio Recordings Title*/}
											{this.state.showTable ? (
												<Grid item xs={12}>
													{this.state.tabSelected === 0 ? (
														<React.Fragment>
															<Table
																tblName={'Unrecorded'}
																rows={this.state.unrecorded}
																columns={this.state.unrecordedTblName}
																displayData={this.state.display}
																filtered={this.state.filtered}
																handleChange={this.handleChange}
																searchPhrase={this.state.searchDialogUnrecord}
																searchKey={'searchDialogUnrecord'}
																fetched={this.state.fetchedUnrecorded}
																// for adding audio
																handleAudio={this.handleAudio}
																removeAudio={this.removeAudio}
																getRecordedName={this.getRecordedName}
																fileName={this.state.fileName}
																user_id={this.state.user}
																file={this.state.file}
																uploadAudio={this.uploadAudio}
																version={this.state.selectedVersion}
																voice={this.state.searchVoice}
																audio={this.state.audio}
																openAddNewVoiceModal={this.openAddNewVoiceModal}
																addNewVoiceModal={
																	this.state.currentMode === 'UnrecTable' ? (
																		this.state.addNewVoiceModal
																	) : (
																		false
																	)
																}
																uploadLoading={this.state.uploadLoading}
																refreshData={this.refreshData}
															/>
														</React.Fragment>
													) : this.state.tabSelected === 1 ? (
														<React.Fragment>
															<Table
																tblName={'Rerecord'}
																addToRecorded={this.addToRecorded}
																rows={this.state.rerecord}
																columns={this.state.rerecordTblName}
																openAddNewVoiceModal={this.openAddNewVoiceModal}
																displayData={this.state.displayRerecord}
																filtered={this.state.filtered}
																handleChange={this.handleChange}
																searchPhrase={this.state.searchDialogRerecord}
																searchKey={'searchDialogRerecord'}
																user_id={this.state.user}
																fetched={this.state.fetchedRerecord}
																refreshData={this.refreshData}
																version={this.state.selectedVersion}
																handleAudio={this.handleAudio}
																audio={this.state.audioFile}
																removeAudio={this.removeAudio}
																getRecordedName={this.getRecordedName}
																fileName={this.state.fileName}
																file={this.state.file}
																upload={this.uploadAudio}
																voice={this.state.searchVoice}
																addNewVoiceModal={
																	this.state.currentMode === 'RerecTable' ? (
																		this.state.addNewVoiceModal
																	) : (
																		false
																	)
																}
																uploadLoading={this.state.uploadLoading}
																rerecordAudio={this.rerecordAudio}
																//playing audio
																preview={this.state.audio}
																showLoader={this.showLoader}
																playAudio={this.playAudio}
																isLoading={this.state.isAudioLoading}
															/>
														</React.Fragment>
													) : this.state.tabSelected === 2 ? (
														<React.Fragment>
															<Table
																tblName={'Recorded'}
																rows={this.state.recorded}
																columns={this.state.recordedTblName}
																openAddNewVoiceModal={this.openAddNewVoiceModal}
																displayData={this.state.displayRecorded}
																filtered={this.state.filtered}
																handleChange={this.handleChange}
																searchPhrase={this.state.searchDialogRecord}
																searchKey={'searchDialogRecord'}
																deleteAudio={this.deleteAudio}
																user_id={this.state.user}
																addToRerecord={this.addToRerecord}
																playAudio={this.playAudio}
																version={this.state.selectedVersion}
																voice={this.state.searchVoice}
																audio={this.state.audio}
																fetched={this.state.fetchedRecorded}
																isLoading={this.state.isAudioLoading}
																showLoader={this.showLoader}
																removeAudio={this.removeAudioPlayed}
																refreshData={this.refreshData}
																rerecordAudio={this.rerecordAudio}
																uploadLoading={this.state.uploadLoading}
																handleAudio={this.handleAudio}
																getRecordedName={this.getRecordedName}
																fileName={this.state.fileName}
																file={this.state.file}
																addNewVoiceModal={this.state.addNewVoiceModal}
															/>
														</React.Fragment>
													) : null}
												</Grid>
											) : (
												<Grid item xs={12}>
													<div className={classes.largeTitle} id="table-title">
														<Typography variant="h3" className={classes.headerTitle}>
															{this.toTitleCase('phrase audio recordings')}
														</Typography>
													</div>
													{this.state.user_uuid ? (
														<div className={classes.emptyPitch}>
															<b> No phrase selected </b>
															<br />
															Select voice, campaign and pitch version to view phrase
															audio
														</div>
													) : (
														<div className={classes.emptyPitch}>
															<TableLoader />
														</div>
													)}
												</Grid>
											)}
										</Paper>
									</Grid>
								</React.Fragment>
								{/* Main Content - MOBILE VERSION END*/}
							</Grid>
						</Container>
					</main>
					{localStorage.getItem('type') !== '10' && (
						<Tooltip title="Add New Audio" placement="top">
							<Fab
								color="secondary"
								size="large"
								aria-label="add"
								float="right"
								className={classes.addBtn}
								onClick={() => {
									this.openAddNewDialog();
								}}
							>
								<AddIcon fontSize="large" className={classes.resIcon} />
							</Fab>
						</Tooltip>
					)}
				</div>

				<MainAddNewAudio
					label1="Select Global or Campaign"
					label2="Select Phrase Book"
					onClose={() => this.closeAddNewDialog()}
					voices={this.state.voices}
					campaigns={this.state.campaigns}
					versions={this.state.versions}
					audio={this.state.unrecordedList}
					selectVoice={this.selectVoice}
					selectCampaign={this.selectVoiceCampaign}
					selectVersion={this.selectPhraseBook}
					selectUnrecorded={this.selectUnrecorded}
					voiceSelected={this.state.voiceSelected}
					campaignSelected={this.state.campaignSelected}
					versionSelected={this.state.versionSelected}
					unrecordedSelected={this.state.unrecordedSelected}
					mainFile={this.state.mainFile}
					mainFileName={this.state.mainFileName}
					audioToBeUploaded={this.state.audioToBeUploaded}
					changeAudioToBeUploaded={this.changeAudioToBeUploaded}
					getUpdatedRecorded={this.getUpdatedRecorded}
					getRecordedName={this.getRecordedName}
					mainUploadAudio={this.mainUploadAudio}
					loading={this.state.mainUploadLoading}
					user_group={this.state.user_group}
					handleUnrecordedSelected={this.handleUnrecordedSelected}
					selectedVoice={this.state.searchVoice}
					token={this.state.token}
					open={this.state.openAddNew}
					openAddNew={this.state.openAddNew}
					typeOfAudio="phrase"
					phrase={'forPhrase'}
					showToast={this.showToastSession}
				/>
				<Toast
					open={this.state.openToast}
					handleClose={this.handleCloseToast}
					toastType={this.state.toastType}
					message={this.state.message}
					vertical={this.state.vertical}
					horizontal={this.state.horizontal}
				/>
			</React.Fragment>
		);
	}
}

export default withWidth()(withStyles(useStyles)(Phrase));
