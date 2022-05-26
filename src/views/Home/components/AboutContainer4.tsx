import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art6.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'

const BorderText = styled(TextWrapper)`
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #90669b;
  -webkit-text-fill-color: transparent;
  font-size: 4.1vmax;
`
const AboutContainer4: React.FC = () => {
  return (
    <FlexRow
      padding={isMobile ? '6%' : '10% 0 6% 8%'}
      justifyContent={isMobile ? 'center' : 'space-between'}
      alignItems={'flex-end'}
      isWrap={isMobile}
    >
      <FlexColumn alignItems={'flex-start'} colWidth={isMobile ? '100%' : '40%'}>
        <BorderText fontWeight={'bold'} fontSize={'extra'} lineHeight={78}>
          {'MANIFESTO'}
        </BorderText>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'This project is not a'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'moneygrab or '}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'rug pull. This is'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'art. This is web3.'}
        </TextWrapper>
        <TextWrapper opacity={0.7} lineHeight={32} fontSize={isMobile ? 'xl' : 'base'}>
          {'This project does not aspire to be hype driven. This is for the love of web3 and the love of building.'}
        </TextWrapper>
      </FlexColumn>
      <ImageContainer src={ART_IMG} alt={'about art'} width={isMobile ? '100%' : '40%'} />
    </FlexRow>
  )
}

export default AboutContainer4
