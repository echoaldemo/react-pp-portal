import React, { createContext, useReducer } from 'react'

const initialState = {
	groupList: [],
	paginateList: [],
	groupState: {
		name: '',
		load: false,
		done: false,
		load2: false,
		done2: false,
		create: false,
		delete: false,
		errMsg: ''
	}
}

const store = createContext<any>(initialState)
const { Provider } = store

const StateProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case 'GROUP_LIST':
				return { ...state, groupList: action.payload.groupList }
			case 'PAGINATE':
				return { ...state, paginateList: action.payload.paginateList }
			case 'GROUP_STATE':
				return { ...state, groupState: action.payload.groupState }
			default:
				return null
		}
	}, initialState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
