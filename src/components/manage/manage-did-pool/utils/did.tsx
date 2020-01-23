import { get, post } from 'utils/api'

const DID = 'did/company/all/campaign/all/did/'
export const getAllDid = async () => {
	return await get(DID)
		.then((response: any) => {
			// console.log("DID: ", response.data);
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return err.response.status
			} catch (err) {
				return 500
			}
		})
}

export const createNewDid = async (coSlug: string, caSlug: string, poolId: string, numbers: any) => {
	return post(`/did/company/${coSlug}/campaign/${caSlug}/pool/${poolId}/did/`, {
		numbers,
		owned: true
	})
		.then((response: any) => {
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return {
					status: err.response.status,
					data:
						err.response.data.length > 30
							? err.response.data.substring(0, 30) + ' ...'
							: err.response.data
				}
			} catch (err) {
				return { status: 500, data: 'Creating DID failed.' }
			}
		})
}

export const getAllInvalidDidByPool = async (coSlug: string, caSlug: string, poolId: string) => {
	return get(`/did/company/${coSlug}/campaign/${caSlug}/pool/${poolId}/cnam`)
		.then((response: any) => {
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch (err) {
				return { status: 500, data: 'Connection timed out!' }
			}
		})
}

export const getSpecificDid = async (coSlug: string, caSlug: string, poolId: string, didId: string) => {
	return get(
		`/did/company/${coSlug}/campaign/${caSlug}/pool/${poolId}/did/${didId}/`
	)
		.then((response: any) => {
			//console.log("Returning: ", response);
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch (err) {
				return { status: 500, data: 'Connection timed out!' }
			}
		})
}

export const getDidComplaints = async (coSlug: string, caSlug: string, poolId: string, didId: string) => {
	return get(
		`/did/company/${coSlug}/campaign/${caSlug}/pool/${poolId}/did/${didId}/complaints`
	)
		.then((response: any) => {
			//console.log("Complaints: ", response);
			return { status: response.status, data: response.data }
		})
		.catch((err: any) => {
			try {
				return { status: err.response.status, data: err.response.data }
			} catch (err) {
				return { status: 500, data: 'Connection timed out!' }
			}
		})
}

// testing
// demo
//
