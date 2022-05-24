import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art2.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'

const MainWrapper = styled(FlexRow)`
  z-index: 1;
`
const AboutContainer2: React.FC = () => {
  return (
    <MainWrapper padding={isMobile ? '6%' : '0 8%'} isWrap={isMobile} justifyContent={isMobile ? 'center' : 'space-between'}>
      <ImageContainer src={ART_IMG} alt={'about art'} width={isMobile ? '100%' : '40%'} />
      <FlexColumn alignItems={'flex-start'} colWidth={isMobile ? '100%' : '50%'} margin={isMobile ? '6% 0' : '0'}>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'Create with no'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'boundaries.'}
        </TextWrapper>
        <TextWrapper opacity={0.7} lineHeight={32} fontSize={isMobile ? 'xl' : 'base'}>
          {
            'You are the creator. There is no guide or instructional videos for creating the pieces, enjoy with no boundaries. Full commercial rights are granted to the holder of a Blockchain Choids for any personal and commercial use.'
          }
        </TextWrapper>
      </FlexColumn>
    </MainWrapper>
  )
}

export default AboutContainer2
