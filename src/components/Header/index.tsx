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
  padding: 0 6%;
  background-color: transparent;
`

const Header: React.FC = () => {
  const path = useGetCurrentURLPath()
  return (
    <HeaderContainer>
      {path.includes('/generator') === false && (
        <Fragment>
          <FlexRow justifyContent={'flex-start'} rowWidth={'fit-content'}>
            <Logo />
          </FlexRow>
          <Menu />
          <FlexRow justifyContent={'flex-end'} rowWidth={'fit-content'}>
            <SocialIconsContainer />
            <WalletConnectionContainer />
            <Hamburger />
          </FlexRow>
        </Fragment>
      )}
    </HeaderContainer>
  )
}

export default Header
