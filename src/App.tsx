import { useEffect } from 'react';
// styles
import './App.css';
// web3
import { useEthers } from '@usedapp/core';
import { CHAIN_ID } from './config';
// redux
import { useAppDispatch, useAppSelector } from './app/hooks';
import { showAlert } from './features/alertSlice';
// import { showAlert } from './features/alertSlice';
import { setActiveAccount } from './features/accountSlice';
// import { showWalletSelect } from './features/walletSelectSlice';
// components
import Alert from './components/Alert';
import Header from './components/Header';
import Generator from './components/Generator';
import Manifesto from './components/Manifesto';
import About from './components/About';
import WalletSelectModal from './components/WalletSelectModal';

function App() {
  // detect changes from the provider
  const { account, chainId, deactivate } = useEthers();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (account && chainId !== CHAIN_ID) {
      console.log('Chain Id Mismatch');
      deactivate();
      dispatch(
        showAlert({
          type: 'danger',
          message: 'Wallet is connected to the wrong network!',
        })
      );
    } else if (account && chainId === CHAIN_ID) {
      dispatch(
        showAlert({
          type: 'info',
          message: 'Wallet connected!',
        })
      );
      // Local account array updated
      dispatch(setActiveAccount(account));
    }
  }, [account, chainId, dispatch]);

  return (
    <div>
      <Alert />
      <WalletSelectModal />
      <Header />
      <Generator />
      <Manifesto />
      <About />
    </div>
  );
}

export default App;
