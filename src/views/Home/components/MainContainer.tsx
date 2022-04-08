import React from 'react'

import styled from 'styled-components'

import GRADIENT_BG from 'assets/images/gradient_bg.png'
import { FlexColumn } from 'styles/components'

import ArtIntroContainer from './ArtIntroContainer'
import MintedArtList from './MintedArtListContainer'

const MainWrapper = styled(FlexColumn)`
  background-image: url(${GRADIENT_BG});
  background-size: cover;
  background-repeat: no-repeat;
`

const WelcomeContainer: React.FC = () => {
  return (
    <MainWrapper padding={'6%'} colHeight={'calc(100vh)'}>
      <ArtIntroContainer />
      <MintedArtList />
    </MainWrapper>
  )
}

export default WelcomeContainer
