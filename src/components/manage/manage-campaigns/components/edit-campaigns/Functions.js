import axios from 'axios';

async function getEditData(uuid) {
	const response = await axios
		.get(`https://dev-api.perfectpitchtech.com/identity/campaign/${uuid}/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'token f6620e466b3902fa6f2edf7f8d28332bd875c79d'
			}
		})
		.then((result) => {
			return result.data;
		})
		.catch((err) => {
			return err;
		});

	return response;
}

export { getEditData };
