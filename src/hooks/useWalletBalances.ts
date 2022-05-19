import { useCallback, useEffect } from 'react'

import { useGetMinterContract } from 'hooks'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setWalletBalance } from 'state/web3/reducer'
import { getNFTBalance } from 'utils/web3CallHelpers'
import { getSimpleRPCProvider } from 'utils/web3Helpers'

import { useActiveWeb3React } from './useActiveWeb3React'

export const useWalletBalances = () => {
  return useAppSelector((state: AppState) => state.web3Reducer.walletBalance)
}

export const useGetWalletBalance = () => {
  const { account, chainId } = useActiveWeb3React()
  const minterContract = useGetMinterContract()

  const dispatch = useAppDispatch()

  const handleFetchBalances = useCallback(async () => {
    try {
      const provider = getSimpleRPCProvider(chainId)

      if (!account || !provider) return
      const minterBalance = minterContract ? await getNFTBalance(minterContract, account) : 0

      dispatch(setWalletBalance({ minterBalance }))
    } catch (e) {
      console.log(e)
    }
  }, [chainId, account, minterContract, dispatch])

  useEffect(() => {
    handleFetchBalances()
  }, [handleFetchBalances])
}
