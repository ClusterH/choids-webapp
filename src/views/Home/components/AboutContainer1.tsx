import React from 'react'

import ART_IMG from 'assets/images/about_art1.svg'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'

const AboutContainer1: React.FC = () => {
  return (
    <FlexRow padding={'6% 8%'}>
      <FlexColumn alignItems={'flex-start'} colWidth={'50%'}>
        <TextWrapper fontFamily={'title'} fontWeight={'bold'} color={'text9'} opacity={0.9} letterSpacing={'0.1em'}>
          {'ABOUT'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'Driven by the'}
        </TextWrapper>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'beauty of math.'}
        </TextWrapper>
        <TextWrapper opacity={0.7} lineHeight={32}>
          {
            'The art engine for this project is driven by math equations. It does not claim to be driven by AI. The art is generated by old fashioned Human Intelligence.'
          }
        </TextWrapper>
      </FlexColumn>
      <ImageContainer src={ART_IMG} alt={'about art'} width={'40%'} />
    </FlexRow>
  )
}

export default AboutContainer1
