import React, { useEffect, useMemo } from 'react'

import Davatar from '@davatar/react'
import { UnsupportedChainIdError } from '@web3-react/core'

import Modal from 'components/Modal/ModalWrapper'
import { SUPPORTED_WALLETS } from 'config/constants/wallet'
import { notifyToast } from 'config/toast'
import { useActiveWeb3React, useModal } from 'hooks'
import { ImageContainer, MainButton, TextWrapper } from 'styles/components'
import { themeBorderRadius } from 'styles/theme'
import { isMobile } from 'utils'
import { isSupportedNetwork, shortenAddress } from 'utils/web3Helpers'

import { useReverseENSLookUp } from '../hook'

import NetworkIndicator from './NetworkIndicator'

import { WalletConnectionModal } from '.'

const WalletConnection: React.FC = () => {
  const { account, chainId, connector, error } = useActiveWeb3React()
  const { isOpen, handleOpenModal } = useModal()

  const ens = useReverseENSLookUp()

  const iconUrl = useMemo(
    () =>
      Object.keys(SUPPORTED_WALLETS)
        .filter((wallet) => SUPPORTED_WALLETS[wallet].connector === connector)
        .map((k) => SUPPORTED_WALLETS[k].iconURL)[0],
    [connector]
  )

  useEffect(() => {
    if (isSupportedNetwork(chainId) === false)
      notifyToast({ id: 'wrong_network', type: 'error', content: 'Please connect Ethereum Network!' })
  }, [chainId])

  return (
    <>
      <MainButton height={'40px'} padding={'0 24px'} onClick={() => handleOpenModal()}>
        {account ? (
          <>
            <NetworkIndicator />
            <Davatar size={isMobile ? 12 : 16} address={account} />
            <TextWrapper fontWeight={'bold'}>&nbsp;{ens ?? shortenAddress(account)}</TextWrapper>
            {!isMobile && <ImageContainer src={iconUrl} width={'24px'} borderRadius={themeBorderRadius.none} margin={'0 0 0 12px'} />}
          </>
        ) : error ? (
          <TextWrapper>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</TextWrapper>
        ) : (
          <TextWrapper>{'Connect a wallet'}</TextWrapper>
        )}
      </MainButton>
      <Modal isOpen={isOpen} handleOpenModal={handleOpenModal} width={isMobile ? '90%' : '30%'} isBorder>
        <WalletConnectionModal />
      </Modal>
    </>
  )
}

export default WalletConnection
