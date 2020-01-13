import React, { useEffect, useState } from 'react';
import { TableLoader } from 'common-components';
import EditForm from './EditForm';

export default function Info({ match }) {
	const initialState = JSON.parse(localStorage.getItem('campaignData'));

	const [ state, setState ] = useState(initialState);
	const [ errMsg, setErrMsg ] = useState({});
	const [ addRealms, setAddRealms ] = useState([]);
	const [ addCompany, setAddCompany ] = useState('');
	const [ realms, setRealms ] = useState([]);

	const [ loading, setLoading ] = useState(false);

	function filterRealm(data, initialRealms) {
		let newArr = [];

		initialRealms.map((item) => {
			const value = data.filter((realm) => {
				return realm.uuid === item;
			});

			newArr.push(value[0]);
		});
		console.log(newArr, 'newArr');
		return newArr;
	}

	useEffect(() => {
		setLoading(true);
		fetch('https://dev-api.perfectpitchtech.com/identity/realm/list/', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'token f6620e466b3902fa6f2edf7f8d28332bd875c79d'
			}
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				const initialRealms = filterRealm(data, initialState.realms);
				setAddRealms(initialRealms);
				setRealms(data);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			{loading ? (
				<TableLoader />
			) : (
				<EditForm
					initialState={initialState}
					state={state}
					setState={setState}
					errMsg={errMsg}
					setErrMsg={setErrMsg}
					addRealms={addRealms}
					setAddRealms={setAddRealms}
					addCompany={addCompany}
					setAddCompany={setAddCompany}
					realms={realms}
					setRealms={setRealms}
					filterRealm={filterRealm}
				/>
			)}
		</div>
	);
}
