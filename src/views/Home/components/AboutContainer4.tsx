import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art6.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'

const BorderText = styled(TextWrapper)`
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #90669b;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
`
const AboutContainer4: React.FC = () => {
  return (
    <FlexRow padding={'10% 0 6% 8%'} alignItems={'flex-end'}>
      <FlexColumn alignItems={'flex-start'} colWidth={'40%'}>
        <BorderText fontWeight={'bold'} fontSize={'extra'} lineHeight={78}>
          {'MANIFESTO'}
        </BorderText>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'This project is not a'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'moneygrab'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'with a vague'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'business plan.'}
        </TextWrapper>
        <TextWrapper opacity={0.7} lineHeight={32}>
          {'This is mostly an art project. This project is not hype engine driven with the intent to evoke an emotional response.'}
        </TextWrapper>
      </FlexColumn>
      <ImageContainer src={ART_IMG} alt={'about art'} width={'40%'} />
    </FlexRow>
  )
}

export default AboutContainer4
