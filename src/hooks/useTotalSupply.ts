import { useCallback, useEffect } from 'react'

import { CONTRACT_ABIS } from 'config/constants'
import { useActiveWeb3React, useGetCOKContract, useGetHCOKContract } from 'hooks'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setTotalSupply } from 'state/web3/reducer'
import { getCokAddress, getHCokAddress } from 'utils/addressHelper'
import { getTotalSupply } from 'utils/web3CallHelpers'
import { getContractWithSimpleProvider, getSimpleRPCProvider } from 'utils/web3Helpers'

export const useTotalSupply = () => {
  return useAppSelector((state: AppState) => state.web3Reducer.totalSupply)
}

export const useGetTotalSupply = () => {
  const { chainId } = useActiveWeb3React()

  const dispatch = useAppDispatch()

  const handleFetchTotalSupply = useCallback(async () => {
    try {
      const cokContract = getContractWithSimpleProvider(getCokAddress(chainId ?? 1), CONTRACT_ABIS.COK, chainId ?? 1)
      const hcokContract = getContractWithSimpleProvider(getHCokAddress(chainId ?? 1), CONTRACT_ABIS.HCOK, chainId ?? 1)
      if (!cokContract || !hcokContract) return
      const cokTotalSupply = await getTotalSupply(cokContract)
      const hcokTotalSupply = await getTotalSupply(hcokContract)

      dispatch(setTotalSupply({ cokTotalSupply, hcokTotalSupply }))
    } catch (e) {
      console.log(e)
    }
  }, [chainId, dispatch])

  useEffect(() => {
    handleFetchTotalSupply()
  }, [handleFetchTotalSupply])
}
