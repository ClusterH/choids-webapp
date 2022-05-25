import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { BigNumber, Bytes, Contract, ethers } from 'ethers'

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
  return totalSupply.toNumber()
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

export const checkMintPhaseStatus = async (minterContract: Contract) => {
  return await minterContract.phase()
}

export const getMintPrice = async (minterContract: Contract) => {
  const price = await minterContract.getMintPrice()
  return price
}
export const mintNFT = async (
  minterContract: Contract,
  to: string,
  creation: { price: string; cid: string },
  nonce: string,
  signature: Bytes,
  value: BigNumber,
  gasLimit: BigNumber
) => {
  const txHash = await minterContract.mint(to, creation, nonce, signature, { value, gasLimit })
  const { status, logs, transactionHash } = await txHash.wait()
  return { status, logs, transactionHash }
}

export const getTokenURI = async (contract: Contract, tokenId: number) => {
  return await contract.tokenURI(tokenId)
}

export const getSupplyLimit = async (contract: Contract) => {
  return await contract.supplyLimit()
}
