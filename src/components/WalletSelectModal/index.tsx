import { useEffect, useState } from 'react';
// styles
// web3
import { useEthers } from '@usedapp/core';
import { InjectedConnector } from '@web3-react/injected-connector'; // MM
import { WalletLinkConnector } from '@web3-react/walletlink-connector'; //Coinbase
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import config, { CHAIN_ID } from '../../config';
// redux
import { hideWalletSelect } from '../../features/walletSelectSlice';
// components
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button, Modal } from 'react-bootstrap';
import { RootState } from '../../app/store';

const WalletSelectModal = (props: any) => {
  const dispatch = useAppDispatch();
  const walletSelect = useAppSelector((state: RootState) => state.walletSelect);
  const { activate } = useEthers();
  const supportedChainIds = [CHAIN_ID];

  useEffect(() => {
    console.log(walletSelect.show);
    // setTimeout(() => {
    //   dispatch(hide());
    // }, 5000);
  }, [dispatch, walletSelect]);

  function handleClose() {
    dispatch(hideWalletSelect());
  }

  return (
    <Modal show={walletSelect.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select a Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="primary"
          onClick={() => {
            const injected = new InjectedConnector({
              supportedChainIds,
            });
            activate(injected);
            console.log('chainId', supportedChainIds);
            handleClose();
          }}
        >
          Metamask
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            const walletlink = new WalletLinkConnector({
              appName: 'Nouns.WTF',
              appLogoUrl: 'https://nouns.wtf/static/media/logo.cdea1650.svg',
              url: config.jsonRpcUri,
              supportedChainIds,
            });
            activate(walletlink);
            handleClose();
          }}
        >
          WalletLink
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            const walletConnect = new WalletConnectConnector({
              supportedChainIds,
              chainId: CHAIN_ID,
              rpc: {
                [CHAIN_ID]: config.jsonRpcUri,
              },
            });
            activate(walletConnect);
            handleClose();
          }}
        >
          WalletConnect
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default WalletSelectModal;
