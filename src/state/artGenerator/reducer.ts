import { createSlice } from '@reduxjs/toolkit'

import { ART_PRESET_LIST } from 'config/constants'
import { IArtLayer, IArtParams } from 'views/ArtGenerator/types'

interface IState {
  layerList: IArtLayer[]
  artParamSettings: IArtParams
  isDraw: boolean
  canvasContainerSize: { width: number; height: number }
}

export const initialState: IState = {
  layerList: [],
  artParamSettings: ART_PRESET_LIST.PRESET1,
  isDraw: false,
  canvasContainerSize: { width: 800, height: 800 },
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
    setArtParamSettings(state, action) {
      state.artParamSettings = { ...state.artParamSettings, ...action.payload }
    },
    setArtParamRadii(state, action) {
      state.artParamSettings.radii[action.payload.id - 1].r = action.payload.value
    },
    setIsDraw(state, action) {
      state.isDraw = !state.isDraw
    },
    setCanvasContainerSize(state, action) {
      state.canvasContainerSize = { ...action.payload }
    },
  },
})

export const { setAddRemoveLayer, setHideLayer, setArtParamSettings, setArtParamRadii, setIsDraw, setCanvasContainerSize } =
  artGeneratorSlice.actions
export default artGeneratorSlice.reducer
