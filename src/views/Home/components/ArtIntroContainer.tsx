import React, { memo } from 'react'

import styled from 'styled-components'

import GRADIENT_BG from 'assets/images/gradient_bg2.svg'
import ART_IMG from 'assets/images/inspired_art_img.png'
import { useAppNavigate } from 'hooks'
import { FlexColumn, FlexRow, ImageContainer, MainButton, TextWrapper } from 'styles/components'

import MintedArtList from './MintedArtListContainer'

const GradientBgWrapper = styled(ImageContainer)`
  position: absolute;
  right: 0;
  bottom: -110%;
  width: 100%;
  height: auto;
`

const ArtIntroContainer: React.FC = () => {
  const { handleNavigate } = useAppNavigate()
  return (
    <FlexColumn>
      <GradientBgWrapper src={GRADIENT_BG} />

      <FlexRow padding={'6% 8% 0'}>
        <FlexColumn alignItems={'flex-start'} gap={'0px'}>
          <TextWrapper fontFamily={'title'} fontWeight={'bold'} color={'text9'} opacity={0.9}>
            {'MATH IS BEAUTIFUL.'}
          </TextWrapper>
          <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
            {'Crafting no-code'}
          </TextWrapper>
          <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
            {'mathematically'}
          </TextWrapper>
          <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
            {'inspired art.'}
          </TextWrapper>
          <TextWrapper fontFamily={'title'} lineHeight={32} margin={'24px 0'} opacity={0.9}>
            {
              'Blockchain Choids are 3.141x10³ decentralized generative art pieces.This project aims to provide a interactive approach to NFT creation.'
            }
          </TextWrapper>
          <MainButton onClick={() => handleNavigate('/generator')}>{'Create new design'}</MainButton>
        </FlexColumn>
        <FlexColumn alignItems={'flex-end'}>
          <ImageContainer src={ART_IMG} maxWidth={'60%'} />
        </FlexColumn>
      </FlexRow>
      <MintedArtList />
    </FlexColumn>
  )
}

export default memo(ArtIntroContainer)
