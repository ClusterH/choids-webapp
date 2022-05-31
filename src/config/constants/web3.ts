import ETHEREUM_ICON from 'assets/images/ethereum.svg'
import POLYGON_ICON from 'assets/images/polygon.svg'
import MINTABLE_ABI from 'config/abis/mintable.json'
import MINTER_ABI from 'config/abis/minter.json'

export enum SupportedChainId {
  MAIN = 1,
  RINKEBY_TESTNET = 4,
}
export const DEFAULT_CHAIN_ID = process.env.REACT_APP_ENVIRONMENT === 'prod' ? SupportedChainId.MAIN : SupportedChainId.RINKEBY_TESTNET

export const NETWORK_INDICATOR: { [chainId: number]: { name: 'Ethereum' | 'Rinkeby'; icon: string } } = {
  [SupportedChainId.MAIN]: { name: 'Ethereum', icon: ETHEREUM_ICON },
  [SupportedChainId.RINKEBY_TESTNET]: { name: 'Rinkeby', icon: ETHEREUM_ICON },
}

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  WalletLink = 'walletlink',
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.MAIN, SupportedChainId.RINKEBY_TESTNET]

type AddressMap = { [chainId: number]: string }

export const MINTER_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAIN]: '0x6beEA5649Fc6BFEb7f2d23E0678aD9D02408B1F7',
  [SupportedChainId.RINKEBY_TESTNET]: '0xC72D9aD4e8A9C3E6EC010ce183ad69D86221713B',
}
export const MINTABLE_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAIN]: '0x6b3A1C4F88Fd57013C2c2ac97aB35317dfD424B3',
  [SupportedChainId.RINKEBY_TESTNET]: '0xf148Fe0237F063160aa7eCab235a694938c10Da8',
}

export const CONTRACT_ABIS = {
  MINTER: MINTER_ABI,
  MINTABLE: MINTABLE_ABI,
}

const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY
const ALCHEMY_KEY_RINKEBY = process.env.REACT_APP_ALCHEMY_KEY_RINKEBY

export const NETWORK_URLS: {
  [chainId in number]: string
} = {
  [SupportedChainId.MAIN]: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  [SupportedChainId.RINKEBY_TESTNET]: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY_RINKEBY}`,
}

export const POLLING_INTERVAL = 30000
export const GAS_PRICE_POLLING_INTERVAL = 60000
export const connectorLocalStorageKey = 'connectorId'
export const walletLocalStorageKey = 'wallet'
