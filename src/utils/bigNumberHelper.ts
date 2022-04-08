import { formatUnits } from '@ethersproject/units'
import { ethers, BigNumber } from 'ethers'

export const getBalanceNumber = (balance: BigNumber, decimals = 18, displayDecimals = 2) => {
  const formattedString = formatUnits(balance, decimals)
  return (+formattedString).toFixed(displayDecimals)
}
