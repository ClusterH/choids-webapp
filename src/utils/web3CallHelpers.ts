import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, Contract, ethers } from 'ethers'

import { getBalanceNumber } from './bigNumberHelper'

export const getGasPrice = async (provider: StaticJsonRpcProvider) => {
  const gasPrice = await provider.getGasPrice()
  return ethers.utils.formatUnits(gasPrice, 'gwei')
}

export const getEthBalanace = async (provider: JsonRpcProvider, account: string) => {
  const balance = await provider.getBalance(account)
  return getBalanceNumber(balance)
}

export const getNFTBalance = async (contract: Contract, account: string) => {
  const balance = await contract.balanceOf(account)
  return balance.toString()
}

export const getTotalSupply = async (contract: Contract) => {
  const totalSupply = await contract.totalSupply()
  return totalSupply
}

export const getWalletOfOwner = async (contract: Contract, account: string) => {
  const res = await contract.walletOfOwner(account)
  const walletOfOwner = res.map((item: BigNumber) => {
    return item.toNumber()
  })

  return walletOfOwner as number[]
}

export const checkIsApprovedForAll = async (account: string, contract: Contract, operator: string) => {
  return await contract.isApprovedForAll(account, operator)
}

export const setApprovalForAll = async (contract: Contract, operator: string, approved = true) => {
  const txHash = await contract.setApprovalForAll(operator, approved)
  const receipt = await txHash.wait()
  return receipt.status
}

export const mintHighKingz = async (hcokContract: Contract, mintPassTokenId: number, burnTokenIds: number[], gas: BigNumber) => {
  const txHash = await hcokContract.mint(mintPassTokenId, burnTokenIds, { gasLimit: gas })
  const receipt = await txHash.wait()

  return { status: receipt.status, txHash: receipt.transactionHash }
}

export const checkIsValidMintPass = async (mintPassContract: Contract, tokenId: number) => {
  return await mintPassContract.isValid(tokenId)
}

export const checkIsExpiredMintPass = async (mintPassContract: Contract, tokenId: number) => {
  const res = await mintPassContract.isExpired(tokenId)
  return res
}

export const checkIsUsedMintPass = async (mintPassContract: Contract, tokenId: number) => {
  return await mintPassContract.isUsed(tokenId)
}

export const getMintPassSecondsUntilExpired = async (mintPassContract: Contract, tokenId: number) => {
  const seconds = await mintPassContract.secondsUntilExpired(tokenId)
  return seconds.toNumber()
}

export const getMintPassTotalExpired = async (mintPassContract: Contract) => {
  return await mintPassContract.totalExpired()
}

export const getMintPassTotalTotalUsed = async (mintPassContract: Contract) => {
  return await mintPassContract.totalUsed()
}

export const getMintPassTotalValid = async (mintPassContract: Contract) => {
  return await mintPassContract.totalValid()
}
