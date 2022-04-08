import React, { useMemo } from 'react'

import { FaRegCopy } from 'react-icons/fa'

import { SUPPORTED_WALLETS } from 'config/constants'
import { useActiveWeb3React, useGetWalletBalance, useWalletBalances } from 'hooks'
import { FlexColumn, FlexRow, HoverTextWrapper, TextWrapper } from 'styles/components'
import { shortenAddress } from 'utils/web3Helpers'

const WalletConnectionAccountDetail: React.FC<{ handleWalletView: () => void }> = ({ handleWalletView }) => {
  useGetWalletBalance()

  const { account, connector } = useActiveWeb3React()
  const { cokBalance, hcokBalance, mintPassBalance } = useWalletBalances()

  const connectedWallet = useMemo(() => {
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter((wallet) => SUPPORTED_WALLETS[wallet].connector === connector)
      .map((k) => SUPPORTED_WALLETS[k].name)[0]

    return `Connected with ${name}`
  }, [connector])

  return (
    <FlexColumn>
      <FlexRow justifyContent={'flex-start'}>
        <TextWrapper fontSize={'xxl'} fontFamily={'title'} lineHeight={40}>
          {'Account Detail'}
        </TextWrapper>
      </FlexRow>
      <FlexRow>
        <TextWrapper color={'text3'}>{connectedWallet}</TextWrapper>
        <HoverTextWrapper onClick={handleWalletView}>{'Switch Wallet'}</HoverTextWrapper>
      </FlexRow>
      <FlexRow justifyContent={'flex-start'}>
        {account && (
          <>
            <TextWrapper>{shortenAddress(account)}</TextWrapper>
            <HoverTextWrapper>
              <FaRegCopy size={20} onClick={() => navigator.clipboard.writeText(account)} />
            </HoverTextWrapper>
          </>
        )}
      </FlexRow>
      <FlexRow justifyContent={'flex-start'}>
        <FlexRow rowWidth={'fit-content'} gap={'4px'}>
          <TextWrapper fontWeight={'bold'}>{cokBalance}</TextWrapper>
          <TextWrapper fontFamily={'title'}>{'COK'}</TextWrapper>
        </FlexRow>
        <FlexRow rowWidth={'fit-content'} gap={'4px'}>
          <TextWrapper fontWeight={'bold'}>{hcokBalance}</TextWrapper>
          <TextWrapper fontFamily={'title'}>{'HCOK'}</TextWrapper>
        </FlexRow>
        <FlexRow rowWidth={'fit-content'} gap={'4px'}>
          <TextWrapper fontWeight={'bold'}>{mintPassBalance}</TextWrapper>
          <TextWrapper fontFamily={'title'}>{'MPCOK'}</TextWrapper>
        </FlexRow>
      </FlexRow>
    </FlexColumn>
  )
}

export default WalletConnectionAccountDetail
