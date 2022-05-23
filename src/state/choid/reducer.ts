import { createSlice } from '@reduxjs/toolkit'

import { ART_PRESET_LIST } from 'config/constants'
import { IArtLayer, IArtParams, IMetaData } from 'views/ArtGenerator/types'

interface IState {
  tokenURIs: string[]
  metaDataList: IMetaData[]
}

export const initialState: IState = {
  tokenURIs: [],
  metaDataList: [],
}

const choidSlice = createSlice({
  name: 'artGenerator',
  initialState,
  reducers: {
    setTokenURIs(state, action) {
      state.tokenURIs = [...action.payload]
    },
    setMetaDataList(state, action) {
      state.metaDataList = [...action.payload]
    },
  },
})

export const { setTokenURIs, setMetaDataList } = choidSlice.actions
export default choidSlice.reducer
