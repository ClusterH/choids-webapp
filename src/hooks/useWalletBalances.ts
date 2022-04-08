import { useCallback, useEffect } from 'react'

import { useGetCOKContract, useGetHCOKContract, useGetMintPassContract } from 'hooks'
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
  const cokContract = useGetCOKContract()
  const hcokContract = useGetHCOKContract()
  const mintPassContract = useGetMintPassContract()

  const dispatch = useAppDispatch()

  const handleFetchBalances = useCallback(async () => {
    try {
      const provider = getSimpleRPCProvider(chainId)

      if (!account || !provider) return
      const cokBalance = cokContract ? await getNFTBalance(cokContract, account) : 0
      const hcokBalance = hcokContract ? await getNFTBalance(hcokContract, account) : 0
      const mintPassBalance = mintPassContract ? await getNFTBalance(mintPassContract, account) : 0

      dispatch(setWalletBalance({ cokBalance, hcokBalance, mintPassBalance }))
    } catch (e) {
      console.log(e)
    }
  }, [chainId, account, cokContract, hcokContract, mintPassContract, dispatch])

  useEffect(() => {
    handleFetchBalances()
  }, [handleFetchBalances])
}
