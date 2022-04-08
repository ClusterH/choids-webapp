import React from 'react'

import { useActiveWeb3React } from 'hooks'
import { FlexColumn } from 'styles/components'

import { useWalletConnectionModal } from '../hook'

import { AccountDetailContainer, ErrorContentContainer, OptionListContainer } from '.'

const WalletConnectionModal: React.FC = () => {
  const { account, error } = useActiveWeb3React()
  const { walletView, handleChangeWalletView } = useWalletConnectionModal()

  return (
    <FlexColumn>
      {error ? (
        <ErrorContentContainer />
      ) : account && walletView === 'account' ? (
        <AccountDetailContainer handleWalletView={() => handleChangeWalletView('list')} />
      ) : (
        <OptionListContainer />
      )}
    </FlexColumn>
  )
}

export default WalletConnectionModal
