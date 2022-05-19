import { NETWORK_INDICATOR, SupportedChainId } from 'config/constants'

const OPENSEA_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.MAIN]: '',
  [SupportedChainId.RINKEBY_TESTNET]: 'testnets.',
}

export const getOpenSeaLink = (chainId: number, tokenId: number, contractAddress: string) => {
  return `https://${OPENSEA_PREFIXES[chainId] ?? ''}opensea.io/assets/${NETWORK_INDICATOR[
    chainId
  ].name.toLowerCase()}/${contractAddress}/${tokenId}`
}
