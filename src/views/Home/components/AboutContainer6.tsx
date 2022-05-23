import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art8.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'

const GradientTextWrapper = styled(TextWrapper)`
  background: linear-gradient(90.05deg, #795998 2.33%, #eb8fa1 99.98%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`

const AboutContainer6: React.FC = () => {
  return (
    <FlexRow padding={'6% 8%'} alignItems={'flex-start'}>
      <FlexColumn alignItems={'flex-start'} colWidth={'40%'}>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'But this project is...'}
        </TextWrapper>
        <GradientTextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'Forward Thinking.'}
        </GradientTextWrapper>

        <TextWrapper opacity={0.7} lineHeight={32}>
          {
            'This project intends to provide significant value to the community. We’re just not going to tell you what the value is just yet.'
          }
        </TextWrapper>
      </FlexColumn>
      <ImageContainer src={ART_IMG} alt={'about art'} width={'40%'} />
    </FlexRow>
  )
}

export default AboutContainer6
