import axios from 'axios'

import { setupInterceptorsTo } from 'config/axios/axiosInterceptors'
import { API_URL, SIGNATURE_RELAY_API_URL } from 'config/constants'
import { ISignatureRequest } from 'views/ArtGenerator/types'

const specificAxios = setupInterceptorsTo(axios.create())
// https://us-central1-patchwork-canteen.cloudfunctions.net/app/signature
export const getSignatureAndNonce = async (body: ISignatureRequest) => {
  try {
    const { data, status } = await specificAxios.post(`${API_URL}signature`, body)
    if (status === 200 && data.code === 1) {
      return data
    } else return false
  } catch (e: any) {
    console.log(e)
  }
}
