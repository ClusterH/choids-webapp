import { createSlice } from '@reduxjs/toolkit'

import { ART_PRESET_LIST } from 'config/constants'
import { IArtLayer, IArtParams } from 'views/ArtGenerator/types'

interface IState {
  layerList: IArtLayer[]
  artParamSettings: IArtParams[]
}

export const initialState: IState = {
  layerList: [],
  artParamSettings: ART_PRESET_LIST.PRESET1,
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
      state.artParamSettings[action.payload.id - 1] = {
        ...state.artParamSettings[action.payload.id - 1],
        [action.payload.setting]: action.payload.value,
      }
    },
  },
})

export const { setAddRemoveLayer, setHideLayer, setArtParamSettings } = artGeneratorSlice.actions
export default artGeneratorSlice.reducer
