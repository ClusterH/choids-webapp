import { COK_CONTRACT_ADDRESSES, HCOK_CONTRACT_ADDRESSES, MINT_PASS_CONTRACT_ADDRESSES } from 'config/constants'

export const getCokAddress = (chainId: number) => {
  return COK_CONTRACT_ADDRESSES[chainId]
}

export const getHCokAddress = (chainId: number) => {
  return HCOK_CONTRACT_ADDRESSES[chainId]
}

export const getMintPassAddress = (chainId: number) => {
  return MINT_PASS_CONTRACT_ADDRESSES[chainId]
}
