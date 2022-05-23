import React from 'react'

import { FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'

import GRADIENT_BG from 'assets/images/footer_gradient.svg'
import LOGO from 'assets/images/logo_sm.svg'
import { Divider, FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

const FooterWrapper = styled(FlexColumn)`
  background-image: url(${GRADIENT_BG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left top;
  background-attachment: fixed;
  height: max-content;
`

const Footer: React.FC = () => {
  return (
    <FooterWrapper padding={'6% 8%'} margin={'6% 0 0'}>
      <Divider />
      <FlexRow rowWidth={'fit-content'} margin={'2% 0 0'}>
        <ImageContainer src={LOGO} width={'42px'} />
        <FlexColumn colWidth={'fit-content'} alignItems={'flex-start'} gap={'0px'}>
          <TextWrapper fontSize={'xl'}>{'Blochain'}</TextWrapper>
          <TextWrapper fontWeight={'bold'} fontSize={'xl'} lineHeight={24}>
            {'Choids'}
          </TextWrapper>
        </FlexColumn>
      </FlexRow>
      <FaTwitter size={32} color={themeColor.text1} />
    </FooterWrapper>
  )
}

export default Footer
