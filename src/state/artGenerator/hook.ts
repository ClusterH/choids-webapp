import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

export const useLayerList = () => {
  return useAppSelector((state: AppState) => state.artGeneratorReducer.layerList)
}

export const useArtParamSettings = () => {
  return useAppSelector((state: AppState) => state.artGeneratorReducer.artParamSettings)
}

export const useCanvasContainerSize = () => {
  return useAppSelector((state: AppState) => state.artGeneratorReducer.canvasContainerSize)
}

export const useArtImgData = () => {
  return useAppSelector((state: AppState) => state.artGeneratorReducer.artImgData)
}

export const useIsMinting = () => {
  return useAppSelector((state: AppState) => state.artGeneratorReducer.isMinting)
}
