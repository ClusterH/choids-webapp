import React from 'react'

import styled from 'styled-components'

import GRADIENT_BG from 'assets/images/footer_gradient.svg'
import SocialIconsContainer from 'components/Header/SocialIconsContainer'
import Logo from 'components/Logo'
import { useGetCurrentURLPath } from 'hooks'
import { Divider, FlexColumn } from 'styles/components'

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
          <Logo />
          <SocialIconsContainer />
        </FooterWrapper>
      )}
    </>
  )
}

export default Footer
