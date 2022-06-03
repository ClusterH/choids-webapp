import { createSlice } from '@reduxjs/toolkit'

import { IMetaData } from 'views/ArtGenerator/types'

interface IState {
  price: string
  tokenURIs: string[]
  metaDataList: IMetaData[]
}

export const initialState: IState = {
  price: '0.0',
  tokenURIs: [],
  metaDataList: [],
}

const choidSlice = createSlice({
  name: 'choid',
  initialState,
  reducers: {
    setPrice(state, action) {
      state.price = action.payload
    },
    setTokenURIs(state, action) {
      state.tokenURIs = [...action.payload]
    },
    setMetaDataList(state, action) {
      state.metaDataList = [...action.payload]
    },
  },
})

export const { setPrice, setTokenURIs, setMetaDataList } = choidSlice.actions
export default choidSlice.reducer
