import contract from './contracts/contract.json';
import { ChainId } from '@usedapp/core';

type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | ChainId.Hardhat;

export const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI4ZjU1OWRCMUI3RTk5NkE0NmM1N0I4NjJlNTYzYjk0NTFBQTYwMjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzI2NDMzMjEyOSwibmFtZSI6IlNTUyBUZXN0In0.ibnql4FMPJNU4ADbUwSlhilbGJy-t-qPl0Wf6ClbudY';

export const CHAIN_ID: SupportedChains = contract.network.id ?? '4';
const INFURA_PROJECT_ID = contract.infuraId;
const CHAIN_DESCRIPTION: string =
  contract.network.description ?? 'unknown network';

export const createNetworkHttpUrl = (network: string): string => {
  return `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  return `wss://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

const app = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
  },
};

const config = {
  chainId: CHAIN_ID,
  chainDescriptoin: CHAIN_DESCRIPTION,
  jsonRpcUri: app[CHAIN_ID].jsonRpcUri,
  wsRpcUri: app[CHAIN_ID].wsRpcUri,
  contractAddress: contract.contractAddress,
  deployerAddress: contract.deployerAddress,
};

console.log('config', config);

export default config;
