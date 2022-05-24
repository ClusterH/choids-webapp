import React, { Fragment } from 'react'

import styled from 'styled-components'

import { useGetCurrentURLPath } from 'hooks'
import { BlurBackground, FlexColumn, FlexRow } from 'styles/components'
import { themeColor } from 'styles/theme'
import { isMobile } from 'utils'

import Logo from '../Logo'

import GasPriceContainer from './GasPriceContainer'
import Hamburger from './hamburgerIcon'
import Menu from './Menu'
import SocialIconsContainer from './SocialIconsContainer'
import { WalletConnectionContainer } from './WalletConnection'

const HeaderContainer = styled(FlexRow)`
  z-index: 9;
  position: fixed;
  top: 0;
  height: 80px;
  background-color: ${themeColor.background1};
  border-bottom: ${themeColor.border2};
`

const Header: React.FC = () => {
  const path = useGetCurrentURLPath()
  return (
    <HeaderContainer padding={path.includes('/generator') === false ? (isMobile ? '0 6%' : '0 8%') : '0 12px'}>
      <FlexRow justifyContent={'flex-start'} rowWidth={'fit-content'}>
        <Logo />
      </FlexRow>
      {/* <Menu /> */}
      <FlexRow justifyContent={'flex-end'} rowWidth={'fit-content'}>
        {!isMobile && <SocialIconsContainer />}
        <WalletConnectionContainer />
      </FlexRow>
    </HeaderContainer>
  )
}

export default Header
