import { get, patch, post } from 'utils/api'
export const getVoices = async () => {
	return await get('/identity/user/manage/list?groups=10')
		.then((response: any) => {
			return { status: response.status, data: response.data.results }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch {
				return 500
			}
		})
}

export const updateVoices = async (test: any, voices: any) => {
	return await patch(`/pitch/global/rapid-response/tests/${test}/`, { voices })
		.then((response: any) => {
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch {
				return 500
			}
		})
}

export const getRRTest = async (test: any) => {
	return await get(`/pitch/global/rapid-response/tests/${test}/`)
		.then((response: any) => {
			return { status: response.status, data: response.data };
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data };
			} catch {
				return 500;
			}
		});
};

export const getProspectVoices = async () => {
	return await get(`/pitch/audio/prospect/voice/`)
		.then((response: any) => {
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch {
				return 500
			}
		})
}

export const createProspectVoices = async (voice: any) => {
	return await post(`/pitch/audio/prospect/voice/`, voice)
		.then((response: any) => {
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch {
				return 500
			}
		})
}

export const getGlobalSegments = async () => {
	return await get('/pitch/global/rapid-response/segments/')
		.then((response: any) => {
			return { status: response.status, data: response.data };
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data };
			} catch {
				return 500;
			}
		});
};

export const updateSegments = async (test: string, segments: any) => {
	return await patch(`/pitch/global/rapid-response/tests/${test}/`, { segments })
		.then((response: any) => {
			return { status: response.status, data: response.data };
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data };
			} catch {
				return 500;
			}
		});
};

