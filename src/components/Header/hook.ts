import { useCallback, useEffect, useState } from 'react'

import { useActiveWeb3React, useWalletConnect } from 'hooks'
import { getSimpleRPCProvider } from 'utils/web3Helpers'

export const useWalletConnectionModal = () => {
  const { connect, disconnect } = useWalletConnect()
  const [walletView, setWalletView] = useState<'account' | 'list'>('account')

  const handleChangeWalletView = useCallback((walletView: 'account' | 'list') => setWalletView(walletView), [])

  return { walletView, handleChangeWalletView, connect, disconnect }
}

export const useReverseENSLookUp = () => {
  const { account, chainId } = useActiveWeb3React()
  const [ens, setEns] = useState<string>('')

  useEffect(() => {
    const provider = getSimpleRPCProvider(chainId)
    if (account && provider) {
      provider
        .lookupAddress(account)
        .then((name) => {
          setEns(name as string)
        })
        .catch((error) => {
          ///console.log(`error resolving reverse ens lookup: `, error);
        })
    }

    return () => {
      setEns('')
    }
  }, [account, chainId])

  return ens
}

export const useMenuController = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('about')

  const handleOnClick = useCallback((menu: string) => {
    setCurrentMenu(menu)
  }, [])

  return { currentMenu, handleOnClick }
}
