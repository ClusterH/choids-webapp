import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

import { connectorsByName } from 'config/constants'
import { EthereumProvider } from 'types'

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    const ethereum = window.ethereum as EthereumProvider | undefined

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(connectorsByName.injected, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(connectorsByName.injected, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
