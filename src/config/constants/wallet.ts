import { AbstractConnector } from '@web3-react/abstract-connector'

import COINBASE_ICON_URL from 'assets/images/coinbase_icon.png'
import METAMASK_ICON_URL from 'assets/images/metamask_icon.svg'
import WALLETCONNECT_ICON_URL from 'assets/images/wallet_connect_icon.svg'
import { connectorsByName } from 'config/constants/web3Connectors'

import { ConnectorNames } from './web3'

interface WalletInfo {
  connector?: AbstractConnector
  connectorId?: ConnectorNames
  name: string
  iconURL: string
  description: string
  href: string | undefined
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: connectorsByName.injected,
    connectorId: ConnectorNames.Injected,
    name: 'MetaMask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: undefined,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: connectorsByName.walletconnect,
    connectorId: ConnectorNames.WalletConnect,
    name: 'WalletConnect',
    iconURL: WALLETCONNECT_ICON_URL,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: undefined,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: connectorsByName.walletlink,
    connectorId: ConnectorNames.WalletLink,
    name: 'Coinbase Wallet',
    iconURL: COINBASE_ICON_URL,
    description: 'Use Coinbase Wallet app on mobile device',
    href: undefined,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconURL: COINBASE_ICON_URL,
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
}
