import { useCallback } from 'react'

import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { connectorLocalStorageKey, ConnectorNames } from 'config/constants'
import { connectorsByName } from 'config/constants/web3Connectors'
import { notifyToast } from 'config/toast'
import { setupNetwork } from 'utils/walletSetupMainNet'

export const useWalletConnect = () => {
  const { activate, deactivate } = useWeb3React()

  const connect = useCallback(
    (connector: AbstractConnector | undefined, connectorId: ConnectorNames | undefined) => {
      if (connectorId) window.localStorage.setItem(connectorLocalStorageKey, connectorId)

      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            if (error instanceof NoEthereumProviderError) {
              notifyToast({ id: 'Provider Error', type: 'error', content: 'No provider was found' })
            } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              notifyToast({ id: 'Authorization Error', type: 'error', content: 'Please authorize to access your account' })
            } else {
              notifyToast({ id: error.name, type: 'error', content: error.message })
            }
          }
        })
      } else {
        notifyToast({ id: 'Unable to find connector', type: 'error', content: 'The connector config is wrong' })
      }
    },
    [activate]
  )

  const disconnect = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate])

  return { connect, disconnect }
}
