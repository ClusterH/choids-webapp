import React, { memo } from 'react'

import styled from 'styled-components'

import GRADIENT_BG from 'assets/images/gradient_bg2.svg'
import ART_IMG from 'assets/images/inspired_art_img.png'
import { useAppNavigate } from 'hooks'
import { FlexColumn, FlexRow, ImageContainer, MainButton, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'

import MintedArtList from './MintedArtListContainer'

const GradientBgWrapper = styled(ImageContainer)`
  position: absolute;
  right: 0;
  bottom: ${isMobile ? '-20%' : '-110%'};
  width: 100%;
  height: ${isMobile ? '125%' : 'auto'};
`

const ArtIntroContainer: React.FC = () => {
  const { handleNavigate } = useAppNavigate()

  return (
    <FlexColumn>
      <GradientBgWrapper src={GRADIENT_BG} />

      <FlexRow padding={isMobile ? '6%' : '6% 8% 0'} isWrap={isMobile}>
        <FlexColumn alignItems={'flex-start'} gap={'0px'}>
          <TextWrapper
            fontFamily={'title'}
            fontWeight={'bold'}
            fontSize={isMobile ? 'xl' : 'base'}
            color={'text9'}
            lineHeight={24}
            opacity={0.9}
            margin={isMobile ? '0 0 12px' : '0'}
          >
            {'MATH IS BEAUTIFUL'}
          </TextWrapper>
          <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={isMobile ? 72 : 63}>
            {'Generating'}
          </TextWrapper>
          <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={isMobile ? 72 : 63}>
            {'mathematically'}
          </TextWrapper>
          <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={isMobile ? 72 : 63}>
            {'inspired art.'}
          </TextWrapper>
          <TextWrapper fontFamily={'title'} fontSize={isMobile ? 'xl' : 'base'} lineHeight={32} margin={'24px 0'} opacity={0.9}>
            {
              'Blockchain Choids are 3.141x10³ decentralized generative art pieces.This project aims to provide a interactive approach to NFT creation.'
            }
          </TextWrapper>
          <MainButton width={isMobile ? '100%' : 'auto'} onClick={() => handleNavigate('/generator')}>
            {'Create new design'}
          </MainButton>
        </FlexColumn>
        <FlexColumn alignItems={'center'}>
          <ImageContainer src={ART_IMG} maxWidth={isMobile ? '100%' : '60%'} />
        </FlexColumn>
      </FlexRow>
      <MintedArtList />
    </FlexColumn>
  )
}

export default memo(ArtIntroContainer)
