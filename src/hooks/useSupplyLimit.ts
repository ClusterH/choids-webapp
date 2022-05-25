import { useCallback, useEffect } from 'react'

import { CONTRACT_ABIS, DEFAULT_CHAIN_ID } from 'config/constants'
import { useActiveWeb3React } from 'hooks'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setSupplyLimit } from 'state/web3/reducer'
import { getMintableAddress } from 'utils/addressHelper'
import { getSupplyLimit } from 'utils/web3CallHelpers'
import { getContractWithSimpleProvider } from 'utils/web3Helpers'

export const useSupplyLimit = () => {
  return useAppSelector((state: AppState) => state.web3Reducer.supplyLimit)
}

export const useGetSupplyLimit = () => {
  const { chainId } = useActiveWeb3React()

  const dispatch = useAppDispatch()

  const handleFetchSupplyLimit = useCallback(async () => {
    try {
      const minterContract = getContractWithSimpleProvider(
        getMintableAddress(chainId ?? DEFAULT_CHAIN_ID),
        CONTRACT_ABIS.MINTER,
        chainId ?? DEFAULT_CHAIN_ID
      )
      if (!minterContract) return
      const supplyLimit = await getSupplyLimit(minterContract)

      dispatch(setSupplyLimit(supplyLimit))
    } catch (e) {
      console.log(e)
    }
  }, [chainId, dispatch])

  useEffect(() => {
    handleFetchSupplyLimit()
  }, [handleFetchSupplyLimit])
}
