import { useMemo } from 'react'

import { Contract } from 'ethers'

import { MINTER_CONTRACT_ADDRESSES, CONTRACT_ABIS, MINTABLE_CONTRACT_ADDRESSES } from 'config/constants'
import { getContract, getContractWithSimpleProvider, isSupportedNetwork } from 'utils/web3Helpers'

import { useActiveWeb3React } from './useActiveWeb3React'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
  withSimpleProvider = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || isSupportedNetwork(chainId) === false) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId!]
    if (!address) return null
    try {
      if (withSimpleProvider) {
        if (!chainId) return null
        return getContractWithSimpleProvider(address, ABI, chainId)
      }
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error: any) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSimpleProvider, withSignerIfPossible, account]) as T
}

export const useGetMinterContract = (withSigner = false, withSimpleProvider = true) => {
  return useContract(MINTER_CONTRACT_ADDRESSES, CONTRACT_ABIS.MINTER, withSigner, withSimpleProvider)
}

export const useGetMintableContract = () => {
  return useContract(MINTABLE_CONTRACT_ADDRESSES, CONTRACT_ABIS.MINTABLE, false)
}
