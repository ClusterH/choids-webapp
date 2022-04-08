import { SupportedChainId } from 'config/constants'

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.MAIN]: '',
  [SupportedChainId.RINKEBY_TESTNET]: 'rinkeby.',
}

export enum ExplorerDataType {
  TRANSACTION = 'tx',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export const getExplorerLink = (chainId: number, data: string, type: ExplorerDataType): string => {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ''}etherscan.io`

  return `${prefix}/${type}/${data}`
}
