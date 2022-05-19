import { useCallback, useEffect } from 'react'

import { CONTRACT_ABIS } from 'config/constants'
import { useActiveWeb3React } from 'hooks'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setTotalSupply } from 'state/web3/reducer'
import { getMinterAddress } from 'utils/addressHelper'
import { getTotalSupply } from 'utils/web3CallHelpers'
import { getContractWithSimpleProvider } from 'utils/web3Helpers'

export const useTotalSupply = () => {
  return useAppSelector((state: AppState) => state.web3Reducer.totalSupply)
}

export const useGetTotalSupply = () => {
  const { chainId } = useActiveWeb3React()

  const dispatch = useAppDispatch()

  const handleFetchTotalSupply = useCallback(async () => {
    try {
      const minterContract = getContractWithSimpleProvider(getMinterAddress(chainId ?? 1), CONTRACT_ABIS.MINTER, chainId ?? 1)
      if (!minterContract) return
      const minterTotalSupply = await getTotalSupply(minterContract)

      dispatch(setTotalSupply({ minterTotalSupply }))
    } catch (e) {
      console.log(e)
    }
  }, [chainId, dispatch])

  useEffect(() => {
    handleFetchTotalSupply()
  }, [handleFetchTotalSupply])
}
