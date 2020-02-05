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
  },
  mockData: [
    {
      uuid: '1b6eba8a-89de-4105-b6f8-1d248ed3483c',
      slug: 'slug 4',
      name: 'name 4',
      company: 'company 4',
      options: [
        {
          uuid: 'd75f6370-ea08-445a-afd6-080762632e4b',
          description: 'test',
          value: '1'
        },
        {
          uuid: 'a688c742-7cdc-4df3-9bd6-3c6e5c259f7a',
          description: 'wqer',
          value: '1'
        }
      ]
    },
    {
      uuid: '1b054163-a6a0-4826-b3ec-e304b5aec1c1',
      slug: 'slug 5',
      name: 'name 5',
      company: 'company 5',
      options: []
    },
    {
      uuid: 'a33b05a3-0968-40d0-8d0f-ed5debee0a62',
      slug: 'slug 6',
      name: 'name 6',
      company: 'company 6',
      options: []
    },
    {
      uuid: '75e95f1c-0015-4f95-aa61-a530ee407584',
      slug: 'slug 7',
      name: 'name 7',
      company: 'company 7',
      options: []
    },
    {
      uuid: '58240cbd-17c0-40b4-848f-267ad2bd6222',
      slug: 'slug 9',
      name: 'name 9',
      company: 'company 9',
      options: []
    }
  ]
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
      case 'MOCK':
        return { ...state, mockData: action.payload.mockData }
      default:
        return null
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
