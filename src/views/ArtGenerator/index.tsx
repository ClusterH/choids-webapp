import React from 'react'

import styled from 'styled-components'

import { FlexRow, PageWrapper } from 'styles/components'
import { isMobile } from 'utils'

import { ArtCanvasContainer, ParamsMainContainer } from './components'

const RotatePageWrapper = styled(PageWrapper)<{ isLandscape: boolean }>`
  // transform: ${({ isLandscape }) => (isLandscape ? `rotate(0deg)` : `rotate(90deg)`)};
`

const ArtGenerator: React.FC = () => {
  const isLandscape = () => window.matchMedia('(orientation:landscape)').matches
  return (
    <RotatePageWrapper isLandscape={isLandscape()}>
      <FlexRow gap={'0px'}>
        <ArtCanvasContainer />
        <ParamsMainContainer />
      </FlexRow>
    </RotatePageWrapper>
  )
}

export default ArtGenerator
