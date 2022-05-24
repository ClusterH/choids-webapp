import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { load, save } from 'redux-localstorage-simple'

import artGeneratorReducer from 'state/artGenerator/reducer'
import choidReducer from 'state/choid/reducer'
import web3Reducer from 'state/web3/reducer'

import { updateVersion } from './global/actions'

const PERSISTED_KEYS: string[] = ['choidReducer']

const store = configureStore({
  devTools: process.env.REACT_APP_ENVIRONMENT !== 'prod',
  reducer: { web3Reducer, artGeneratorReducer, choidReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }),
})

store.dispatch(updateVersion())
setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
