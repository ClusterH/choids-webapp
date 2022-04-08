import ETHEREUM_ICON from 'assets/images/ethereum.svg'
import POLYGON_ICON from 'assets/images/polygon.svg'
import COK_ABI from 'config/abis/cok.json'
import HCOK_ABI from 'config/abis/hcok.json'
import MINT_PASS_ABI from 'config/abis/mintPass.json'

export enum SupportedChainId {
  MAIN = 1,
  RINKEBY_TESTNET = 4,
}

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

export const COK_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAIN]: '0x34A32Df38FC511bf002Aed9dEC1B70E16870317f',
  [SupportedChainId.RINKEBY_TESTNET]: '0x545a267e59282af53684fbad66c05da5d3c2b1cc',
}
export const MINT_PASS_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAIN]: '0xA877A0A06F141217ec15aF907E9617d5eD246B6f',
  [SupportedChainId.RINKEBY_TESTNET]: '0xe3dd15f3Cf3975227a833442F03bc9A6870B1DcE',
}
export const HCOK_CONTRACT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAIN]: '0x5f386f05e9aae19be551d4e8a98f2209c3a1dd91',
  [SupportedChainId.RINKEBY_TESTNET]: '0x2Cf8cDA15D39D2d6448C433e4e4D316B71Bd4C31',
}

export const CONTRACT_ABIS = {
  COK: COK_ABI,
  MINT_PASS: MINT_PASS_ABI,
  HCOK: HCOK_ABI,
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
