import { ERC721Mintable__factory } from './../contracts/factory/ERC721Mintable__factory';
import { useContractCall, useEthers } from '@usedapp/core';
import { BigNumber as EthersBN, utils } from 'ethers';
import config from '../config';
import BigNumber from 'bignumber.js';
import contract from '../contracts/contract.json';

export enum ChoidContractFunction {
  mint = 'mint',
}

interface TotalSupply {
  supply: number;
}

const abi = new utils.Interface(contract.abi);
const address = contract.contractAddress;
const mintableContract = new ERC721Mintable__factory().attach(address);

export function totalSupply() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { account } = useEthers();
  console.log('fetching supply');
  // fetch total supply
  const [supply] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContractCall({
      abi,
      address: address,
      method: 'totalSupply',
      args: [account],
    }) || [];
  console.log('supply', supply);
  return supply ?? 0;
}

export function mint() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { account } = useEthers();
  console.log('fetching supply');
  // fetch total supply
  const [supply] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContractCall({
      abi,
      address: address,
      method: 'mint',
      args: [account],
    }) || [];
  return supply ?? 8;
}
