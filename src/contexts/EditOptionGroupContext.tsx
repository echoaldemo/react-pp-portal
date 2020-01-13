import React, { createContext, useReducer } from 'react'

const initialState = {
	loading: true,
	anchorEl: null,
	group: {},
	current: {},
	edit: {
		uuid: "",
		name: "",
		open: false,
		edit: false,
		delete: false,
		delete2: false,
		load: false,
		done: false,
		done2: false,
		done3: false,
		snackErr: "",
		description: "",
		value: "",
		editData: {},
		error: {
			description: "",
			value: ""
		}
	}
}

const store = createContext<any>(initialState)
const { Provider } = store

const StateProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case 'LOADING':
				return { ...state, loading: action.payload.loading }
			case 'GROUP':
				return { ...state, group: action.payload.group }
			case 'CURRENT':
				return { ...state, current: action.payload.current }
			case 'EDIT':
				return { ...state, edit: action.payload.edit }
			case 'ANCHOR_EL':
				return { ...state, anchorEl: action.payload.anchorEl }
			default:
				return null
		}
	}, initialState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
