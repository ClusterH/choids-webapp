import { MINTER_CONTRACT_ADDRESSES, MINTABLE_CONTRACT_ADDRESSES } from 'config/constants'

export const getMinterAddress = (chainId: number) => {
  return MINTER_CONTRACT_ADDRESSES[chainId]
}

export const getMintableAddress = (chainId: number) => {
  return MINTABLE_CONTRACT_ADDRESSES[chainId]
}
