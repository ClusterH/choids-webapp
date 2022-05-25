import { useCallback, useEffect } from 'react'

import { CONTRACT_ABIS, DEFAULT_CHAIN_ID } from 'config/constants'
import { useActiveWeb3React } from 'hooks'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setTotalSupply } from 'state/web3/reducer'
import { getMintableAddress, getMinterAddress } from 'utils/addressHelper'
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
      const choidContract = getContractWithSimpleProvider(
        getMintableAddress(chainId ?? DEFAULT_CHAIN_ID),
        CONTRACT_ABIS.MINTABLE,
        chainId ?? DEFAULT_CHAIN_ID
      )
      if (!choidContract) return
      const choidTotalSupply = await getTotalSupply(choidContract)

      dispatch(setTotalSupply({ choidTotalSupply }))
    } catch (e) {
      console.log(e)
    }
  }, [chainId, dispatch])

  useEffect(() => {
    handleFetchTotalSupply()
  }, [handleFetchTotalSupply])

  return { handleFetchTotalSupply }
}
