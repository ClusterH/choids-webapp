import { BASE_IPFS_URL } from 'config/constants'

export const convertToImageUrl = (ipfs: string) => {
  const cid = ipfs.split('ipfs://')[1]
  if (cid) return `${BASE_IPFS_URL}${cid}`
}
