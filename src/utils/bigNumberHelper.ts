import { formatEther, formatUnits, parseEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'

export const getBalanceNumber = (balance: BigNumber, decimals = 18, displayDecimals = 2) => {
  const formattedString = formatUnits(balance, decimals)
  return (+formattedString).toFixed(displayDecimals)
}

export const weiToFormatEthToBigNumber = (value: string) => {
  const eth = formatEther(value)
  return parseEther(eth)
}
