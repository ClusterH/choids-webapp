import React from 'react'

import { UnsupportedChainIdError } from '@web3-react/core'

import { useActiveWeb3React } from 'hooks'
import { FlexColumn, FlexRow, TextWrapper } from 'styles/components'

const WalletConnectionErrorContent: React.FC = () => {
  const { error } = useActiveWeb3React()
  return (
    <FlexColumn>
      <FlexRow>
        <TextWrapper fontSize={'xxl'} fontFamily={'title'} lineHeight={40}>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}
        </TextWrapper>
      </FlexRow>
      <FlexColumn>
        <TextWrapper>
          {error instanceof UnsupportedChainIdError
            ? 'Please connect to a supported network in your wallet.'
            : 'Error connecting. Try refreshing the page.'}
        </TextWrapper>
      </FlexColumn>
    </FlexColumn>
  )
}

export default WalletConnectionErrorContent
