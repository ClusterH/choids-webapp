import React from 'react'

import styled from 'styled-components'

import ART_IMG from 'assets/images/about_art8.png'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'

const GradientTextWrapper = styled(TextWrapper)`
  background: linear-gradient(90.05deg, #795998 2.33%, #eb8fa1 99.98%);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`

const AboutContainer6: React.FC = () => {
  return (
    <FlexRow padding={isMobile ? '6%' : '6% 8%'} alignItems={'flex-start'} isWrap={isMobile}>
      <FlexColumn alignItems={'flex-start'} colWidth={isMobile ? '100%' : '40%'}>
        <TextWrapper
          fontSize={'extra'}
          fontWeight={'bold'}
          lineHeight={63}
          data-aos={'fade-zoom-in'}
          data-aos-easing="ease-in-back"
          data-aos-delay={50}
        >
          {'But this project is...'}
        </TextWrapper>
        <GradientTextWrapper
          fontSize={'extra'}
          fontWeight={'bold'}
          lineHeight={63}
          data-aos={'fade-zoom-in'}
          data-aos-easing="ease-in-back"
          data-aos-delay={50}
        >
          {'Forward Thinking.'}
        </GradientTextWrapper>

        <TextWrapper
          opacity={0.7}
          lineHeight={32}
          fontSize={isMobile ? 'xl' : 'base'}
          data-aos={'fade-zoom-in'}
          data-aos-easing="ease-in-back"
          data-aos-delay={100}
        >
          {
            'Made it this far? The alpha. Diamond hand your Choids. Big things incoming. Join our Discord. Follow us on Twitter. Turn on notifications.'
          }
        </TextWrapper>
      </FlexColumn>
      <ImageContainer src={ART_IMG} alt={'about art'} width={isMobile ? '100%' : '40%'} data-aos={'flip-up'} data-aos-delay={50} />
    </FlexRow>
  )
}

export default AboutContainer6
