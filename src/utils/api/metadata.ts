import axios from 'axios'

import { setupInterceptorsTo } from 'config/axios/axiosInterceptors'
import { API_URL } from 'config/constants'
import { IMetaData, TUseCase } from 'views/ArtGenerator/types'

const specificAxios = setupInterceptorsTo(axios.create())

export const storeMetadata = async (metadata: IMetaData & { useCase: TUseCase }) => {
  try {
    const { data, status } = await specificAxios.post(`${API_URL}metadata/add`, metadata)
    if (status === 200) {
      return data
    } else return { result: false }
  } catch (e: any) {
    console.log(e)
  }
}

export const getMetadata = async (tokenURI: string) => {
  try {
    const { data, status } = await specificAxios.get(`${tokenURI}`)
    if (status === 200) {
      return data
    } else return false
  } catch (e: any) {
    console.log(e)
  }
}
