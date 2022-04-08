import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { hideAlert } from '../../features/alertSlice';
import { RootState } from '../../app/store';

// web3
import contract from '../../contracts/contract.json';
import { ERC721Mintable__factory } from '../../contracts/factory/ERC721Mintable__factory';
import { useContractCall, useEthers, useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
// redux
import { showWalletSelect } from '../../features/walletSelectSlice';

import ShortAddress from './ShortAddress';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { totalSupply } from '../../wrappers/choids';
import { Contract } from '@ethersproject/contracts';
import { getContractAddress } from '@ethersproject/address';

const AccountCard = () => {
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector((state) => state.account.activeAccount);
  const { account, deactivate } = useEthers();
  // const supply = totalSupply();
  const abi = new utils.Interface(contract.abi);
  const address = contract.contractAddress;
  const mintableContract = new Contract(address, abi);

  const supply = useContractCall({
    abi,
    address: address,
    method: 'totalSupply',
    args: [],
  });

  const { state, send } = useContractFunction(mintableContract, 'mint', {
    transactionName: 'MintIt',
  });

  function handleMint() {
    console.log('handleMint');
    send(1, { value: utils.parseEther('0.01') });
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    // setTimeout(() => {
    //   dispatch(hide());
    // }, 5000);
    console.log('AccountCard:activeAccount', activeAccount);
  }, [dispatch, activeAccount]);

  return activeAccount ? (
    <React.Fragment>
      <div
        style={{
          display: 'inline-block',
          textAlign: 'right',
          fontFamily: 'Courier New',
          justifyContent: 'right',
          fontSize: '1em',
          paddingTop: '4px',
        }}
      >
        {activeAccount && (
          <ShortAddress address={activeAccount} avatar={true} />
        )}
      </div>
      <div>supply: {supply?.toString()}</div>
      <div>state: {state.status}</div>
      <div>
        <Button
          // className={styles.button}
          aria-label="Connect wallet"
          onClick={() => {
            console.log('mint clicked');
            handleMint();
          }}
        >
          Mint
        </Button>
      </div>
    </React.Fragment>
  ) : (
    <Button
      // className={styles.button}
      aria-label="Connect wallet"
      onClick={() => {
        console.log('connect clicked');
        dispatch(showWalletSelect());
      }}
    >
      Connect Wallet
    </Button>
  );
};

export default AccountCard;
