import { useEffect } from 'react'

import { connectorLocalStorageKey, ConnectorNames } from 'config/constants'
import { connectorsByName } from 'config/constants/web3Connectors'
import { useWalletConnect } from 'hooks'

export const useEagerConnect = () => {
  const { connect } = useWalletConnect()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      connect(connectorsByName[connectorId], connectorId)
    }
  }, [connect])
}
