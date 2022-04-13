import { createSlice } from '@reduxjs/toolkit'

import { IArtLayer } from 'views/ArtGenerator/types'

interface IState {
  layerList: IArtLayer[]
}

export const initialState: IState = {
  layerList: [],
}

const artGeneratorSlice = createSlice({
  name: 'artGenerator',
  initialState,
  reducers: {
    setAddRemoveLayer(state, action) {
      if (action.payload.option === 'add') state.layerList.push({ id: state.layerList.length + 1, isActived: true, isHide: false })
      else {
        state.layerList.splice(action.payload.id, 1)
      }
    },
    setHideLayer(state, action) {
      state.layerList[action.payload.id - 1] = {
        ...state.layerList[action.payload.id - 1],
        isHide: !state.layerList[action.payload.id - 1].isHide,
      }
    },
  },
})

export const { setAddRemoveLayer, setHideLayer } = artGeneratorSlice.actions
export default artGeneratorSlice.reducer
