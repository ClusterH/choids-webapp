import axios from 'axios'

import { setupInterceptorsTo } from 'config/axios/axiosInterceptors'
import { API_URL } from 'config/constants'
import { IMetaData, TUseCase } from 'views/ArtGenerator/types'

const specificAxios = setupInterceptorsTo(axios.create())

export const checkDNAUniqueness = async (dnaHash: string) => {
  try {
    const { data, status } = await specificAxios.get(`${API_URL}is-duplicate/dna/${dnaHash}`)
    if (status === 200) {
      return data.result as boolean
    } else return true
  } catch (e: any) {
    console.log(e)
    return true
  }
}

export const checkArtNameUniqueness = async (nameHash: string) => {
  try {
    const { data, status } = await specificAxios.get(`${API_URL}is-duplicate/name/${nameHash}`)
    if (status === 200) {
      return data.result as boolean
    } else return true
  } catch (e: any) {
    console.log(e)
    return true
  }
}

export const storeMetadata = async (encryptedMetadata: string) => {
  try {
    const { data, status } = await specificAxios.post(`${API_URL}metadata/add`, { data: encryptedMetadata })
    if (status === 200) {
      return data
    } else return { result: false }
  } catch (e: any) {
    console.log(e)
  }
}

export const getDefaultMetadata = async () => {
  try {
    const { data, status } = await specificAxios.get(`${API_URL}metadata/get/default`)
    if (status === 200) {
      return data
    } else return false
  } catch (e: any) {
    console.log(e)
  }
}

export const getMetadata = async (count: number) => {
  try {
    const { data, status } = await specificAxios.get(`${API_URL}metadata/get-all/${count}`)
    if (status === 200) {
      return data.result
    } else return false
  } catch (e: any) {
    console.log(e)
  }
}
