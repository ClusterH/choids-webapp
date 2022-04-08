import useSWR from 'swr'

import { GAS_PRICE_POLLING_INTERVAL } from 'config/constants'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setGasPrice } from 'state/web3/reducer'
import { getGasPrice } from 'utils/web3CallHelpers'
import { getSimpleRPCProvider } from 'utils/web3Helpers'

import { useActiveWeb3React } from './useActiveWeb3React'

export const usePollGasPrice = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  const { data } = useSWR(
    ['gasPrice'],
    async () => {
      const provider = getSimpleRPCProvider(chainId)
      if (!provider) return
      const gasPrice = await getGasPrice(provider)
      dispatch(setGasPrice(Number(gasPrice).toFixed(2)))
      return gasPrice
    },
    { refreshInterval: GAS_PRICE_POLLING_INTERVAL, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
  )
}

export const useGasPrice = () => {
  return useAppSelector((state: AppState) => state.web3Reducer.gasPrice)
}
