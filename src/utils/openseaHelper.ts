import { SupportedChainId } from 'config/constants'

export const OPENSEA_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.MAIN]: '',
  [SupportedChainId.RINKEBY_TESTNET]: 'testnets.',
}

export enum OPENSEA_TYPE {
  COLLECTION = 'collection',
  ASSETS = 'assets',
}

export const getOpenSeaLink = (chainId: number, type: OPENSEA_TYPE, link: string) => {
  return `https://${OPENSEA_PREFIXES[chainId] ?? ''}opensea.io/${type}/${link}`
}
