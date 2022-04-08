import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
// import { WebSocketProvider } from '@ethersproject/providers';
import { ChainId, DAppProvider } from '@usedapp/core';
import { CHAIN_ID, createNetworkHttpUrl } from './config';

dotenv.config();

// prettier-ignore
const useDappConfig = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Rinkeby]: createNetworkHttpUrl('rinkeby'),
    [ChainId.Mainnet]: createNetworkHttpUrl('mainnet'),
    [ChainId.Hardhat]: 'http://localhost:8545',
  },
};

console.log(useDappConfig);
console.log(process.env);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Web3ReactProvider
        getLibrary={(provider) => {
          new Web3Provider(provider);
        }}
      >
        <DAppProvider config={useDappConfig}>
          <App />
        </DAppProvider>
      </Web3ReactProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
