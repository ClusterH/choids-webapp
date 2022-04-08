import axios from 'axios'

import { setupInterceptorsTo } from 'config/axios/axiosInterceptors'

const AXIOS_BASE_URL = process.env.REACT_APP_API_BASE_URL
const specificAxios = setupInterceptorsTo(axios.create())

export const fetchEventDates = async () => {
  try {
    const { data, status } = await specificAxios.get(`${AXIOS_BASE_URL}/${'<API Endpoint>'}`)
    if (status === 200) {
      return data
    } else return false
  } catch (e: any) {
    console.log(e)
  }
}
