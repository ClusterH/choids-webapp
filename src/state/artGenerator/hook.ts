import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

export const useLayerList = () => {
  return useAppSelector((state: AppState) => state.artGeneratorReducer.layerList)
}
