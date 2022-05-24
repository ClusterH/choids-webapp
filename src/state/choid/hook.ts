import { AppState } from 'state'
import { useAppSelector } from 'state/hooks'

export const usePrice = () => {
  return useAppSelector((state: AppState) => state.choidReducer.price)
}

export const useTokenURIs = () => {
  return useAppSelector((state: AppState) => state.choidReducer.tokenURIs)
}

export const useMetaDataList = () => {
  return useAppSelector((state: AppState) => state.choidReducer.metaDataList)
}
