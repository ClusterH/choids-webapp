import React from 'react'

import { FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'

import GRADIENT_BG from 'assets/images/footer_gradient.svg'
import LOGO from 'assets/images/main_logo.svg'
import { useGetCurrentURLPath } from 'hooks'
import { Divider, FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'
import { isMobile } from 'utils'

const FooterWrapper = styled(FlexColumn)`
  background-image: url(${GRADIENT_BG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left top;
  background-attachment: fixed;
  height: max-content;
`

const Footer: React.FC = () => {
  const path = useGetCurrentURLPath()

  return (
    <>
      {path.includes('/generator') === false && (
        <FooterWrapper padding={'6% 8%'} margin={'6% 0 0'}>
          <Divider />
          <FlexRow rowWidth={'fit-content'} margin={'2% 0 0'}>
            <ImageContainer src={LOGO} height={isMobile ? '42px' : '62px'} />
          </FlexRow>
          <FaTwitter size={isMobile ? 24 : 32} color={themeColor.text1} />
        </FooterWrapper>
      )}
    </>
  )
}

export default Footer
