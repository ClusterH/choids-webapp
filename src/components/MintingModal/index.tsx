import { useEffect, useState } from 'react';
// styles
// web3
import { useEthers } from '@usedapp/core';
import { InjectedConnector } from '@web3-react/injected-connector'; // MM
import { WalletLinkConnector } from '@web3-react/walletlink-connector'; //Coinbase
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import config, { CHAIN_ID } from '../../config';
// redux
import { hideMintModal } from '../../features/mintModalSlice';
// components
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Button, Modal } from 'react-bootstrap';
import { RootState } from '../../app/store';

const MintingModal = (props: any) => {
  const dispatch = useAppDispatch();
  const mintModal = useAppSelector((state: RootState) => state.mintModal);
  const { activate } = useEthers();
  const supportedChainIds = [CHAIN_ID];

  useEffect(() => {
    console.log(mintModal.show);
    // setTimeout(() => {
    //   dispatch(hide());
    // }, 5000);
  }, [dispatch, mintModal]);

  function handleClose() {
    dispatch(hideMintModal());
  }

  return (
    <Modal show={mintModal.show} onHide={handleClose}>
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

export default MintingModal;
