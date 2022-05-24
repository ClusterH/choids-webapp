import React from 'react'

import styled from 'styled-components'

import ART_IMG1 from 'assets/images/about_art3.svg'
import ART_IMG2 from 'assets/images/about_art4.svg'
import ART_IMG3 from 'assets/images/about_art5.png'
import GRADIENT_IMG from 'assets/images/gradient_bg3.svg'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'

const GradientBgWrapper = styled(ImageContainer)`
  position: absolute;
  left: 0;
  top: -180%;
  width: 100%;
  height: ${isMobile ? '900%' : 'auto'};
`
const ArtImgWrapper1 = styled(ImageContainer)`
  position: absolute;
  right: 0;
  top: -10%;
  width: 20%;
  height: auto;
`
const ArtImgWrapper2 = styled(ImageContainer)`
  position: absolute;
  left: 0;
  bottom: -50%;
  width: 30%;
  height: auto;
`
const ArtImgWrapper3 = styled(ImageContainer)`
  position: absolute;
  left: 0;
  bottom: -80%;
  width: 20%;
  height: auto;
`

const AboutContainer3: React.FC = () => {
  return (
    <FlexRow justifyContent={'center'}>
      <GradientBgWrapper src={GRADIENT_IMG} />

      {isMobile === false && (
        <>
          <ArtImgWrapper1 src={ART_IMG1} />
          <ArtImgWrapper2 src={ART_IMG2} />
          <ArtImgWrapper3 src={ART_IMG3} />
        </>
      )}

      <FlexColumn padding={isMobile ? '6%' : '12% 8%'} colWidth={isMobile ? '100%' : '50%'} alignItems={isMobile ? 'flex-start' : 'center'}>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'DNA right at your'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'browsertips.'}
        </TextWrapper>
        <TextWrapper opacity={0.7} lineHeight={32} textAlign={isMobile ? 'flex-start' : 'center'} fontSize={isMobile ? 'xl' : 'base'}>
          {
            'The Blockchain Choids is created all within your browser using intricate equations. Through the interactive interface, your creation’s DNA is represented through the input parameters of the algorithm and is generated alongside your art.'
          }
        </TextWrapper>
      </FlexColumn>
    </FlexRow>
  )
}

export default AboutContainer3
