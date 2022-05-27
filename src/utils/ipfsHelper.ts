import { API_URL, BASE_IPFS_URL } from 'config/constants'

export const convertIPFSToWebURL = (ipfs: string) => {
  const cid = ipfs.split('ipfs://')[1]
  // return `${BASE_IPFS_URL}${cid}`
  return `${API_URL}public/images/${cid}.png`
}
