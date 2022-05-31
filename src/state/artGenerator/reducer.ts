import { createSlice } from '@reduxjs/toolkit'

import { ART_PRESET_LIST } from 'config/constants'
import { IArtLayer, IArtParams, IMetaData } from 'views/ArtGenerator/types'

interface IState {
  layerList: IArtLayer[]
  artParamSettings: IArtParams
  isDraw: boolean
  canvasContainerSize: { width: number; height: number }
  artImgData: any
  artMetaData: IMetaData
}

export const initialState: IState = {
  layerList: [],
  artParamSettings: ART_PRESET_LIST.Shrek,
  isDraw: false,
  canvasContainerSize: { width: 800, height: 800 },
  artImgData: '',
  artMetaData: {
    name: '',
    dna: '',
    description: 'Description',
    image: `ipfs://`, // this may be an id for Google Storage in the near future
    attributes: [
      {
        trait_type: 'Creator',
        value: '',
      },
      {
        display_type: 'date',
        trait_type: 'Birth Date',
        value: 0, // 1644148800 // this needs to be in epoch to work with OpenSea
      },
      {
        trait_type: 'Edition',
        value: 'First Generation',
      },
    ],
  },
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
    setArtImgData(state, action) {
      state.artImgData = action.payload
    },
    setArtMetaData(state, action) {
      state.artMetaData = { ...state.artMetaData, ...action.payload }
    },
  },
})

export const {
  setAddRemoveLayer,
  setHideLayer,
  setArtParamSettings,
  setArtParamRadii,
  setIsDraw,
  setCanvasContainerSize,
  setArtImgData,
  setArtMetaData,
} = artGeneratorSlice.actions
export default artGeneratorSlice.reducer
