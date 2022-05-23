import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art7.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'

const GradientTextWrapper = styled(TextWrapper)`
  background: linear-gradient(180deg, #dcafe8 0%, rgba(255, 255, 255, 0) 132.01%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`

const AboutContainer5: React.FC = () => {
  return (
    <FlexRow padding={'6% 8% 6% 0'} alignItems={'flex-start'}>
      <ImageContainer src={ART_IMG} alt={'about art'} width={'40%'} />
      <FlexColumn alignItems={'flex-start'} colWidth={'40%'}>
        <TextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={63}>
          {'This project will not do...'}
        </TextWrapper>
        <GradientTextWrapper fontSize={'extra'} fontWeight={'bold'} lineHeight={78}>
          {'Giveaways.'}
          <br />
          {'Whitelists.'}
          <br />
          {'Discords.'}
        </GradientTextWrapper>

        <TextWrapper opacity={0.7} lineHeight={32}>
          {
            'This project will not boast about our finances or other experiences to foster credibility. This project is about a decentralized community and falling in love with NFTs.'
          }
        </TextWrapper>
      </FlexColumn>
    </FlexRow>
  )
}

export default AboutContainer5
