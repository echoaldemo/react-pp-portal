import React, { createContext, useReducer } from 'react'

const initailState = {
  list: true
}
const store = createContext(initailState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LIST':
        return { ...state, list: true }
      case 'UPLOAD':
        return { ...state, list: false }
      default:
        return null
    }
  }, initailState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
