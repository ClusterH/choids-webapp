import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art2.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'

const MainWrapper = styled(FlexRow)`
  z-index: 1;
`
const AboutContainer2: React.FC = () => {
  return (
    <MainWrapper padding={'0 8%'}>
      <ImageContainer src={ART_IMG} alt={'about art'} width={'40%'} />
      <FlexColumn alignItems={'flex-start'} colWidth={'50%'}>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'Create with no'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'boundaries.'}
        </TextWrapper>
        <TextWrapper opacity={0.7} lineHeight={32}>
          {
            'You are the creator. There is no guide or instructional videos for creating the pieces, enjoy with no boundaries. Full commercial rights are granted to the holder of a Blockchain Choids for any personal and commercial use.'
          }
        </TextWrapper>
      </FlexColumn>
    </MainWrapper>
  )
}

export default AboutContainer2
