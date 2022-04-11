import React, { memo } from 'react'

import ART_IMG from 'assets/images/inspired_art_img.svg'
import { useAppNavigate } from 'hooks'
import { FlexColumn, FlexRow, ImageContainer, MainButton, TextWrapper } from 'styles/components'

const ArtIntroContainer: React.FC = () => {
  const { handleNavigate } = useAppNavigate()
  return (
    <FlexRow alignItems={'flex-end'}>
      <FlexColumn alignItems={'flex-start'} gap={'0px'}>
        <TextWrapper>{'MATH IS BEAUTIFUL!'}</TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} fontFamily={'title'} lineHeight={56}>
          {'Creating a no-code'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} fontFamily={'title'} lineHeight={56}>
          {'mathematically'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} fontFamily={'title'} lineHeight={56}>
          {'inspired art.'}
        </TextWrapper>
        <TextWrapper lineHeight={32} margin={'24px 0'}>
          {
            'Blockchain Choids are 3.141x10³ decentralized generative art pieces.This project aims to provide a interactive approach to NFT creation.'
          }
        </TextWrapper>
        <MainButton onClick={() => handleNavigate('/generator')}>{'Create new design'}</MainButton>
        <TextWrapper fontSize={'xs'} fontFamily={'title'} letterSpacing={'16%'} margin={'32px 0'}>
          {'An assemblage of minter created art on the Ethereum blockchain.'}
        </TextWrapper>
      </FlexColumn>
      <FlexColumn alignItems={'flex-end'}>
        <ImageContainer src={ART_IMG} maxWidth={'60%'} />
      </FlexColumn>
    </FlexRow>
  )
}

export default memo(ArtIntroContainer)
