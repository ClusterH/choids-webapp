import React from 'react'

import styled from 'styled-components'

import { FlexRow, PageWrapper } from 'styles/components'
import { isMobile } from 'utils'

import { ArtCanvasContainer, ParamsMainContainer } from './components'

const ArtGenerator: React.FC = () => {
  return (
    <PageWrapper>
      <FlexRow gap={'0px'} isWrap={isMobile}>
        <ArtCanvasContainer />
        <ParamsMainContainer />
      </FlexRow>
    </PageWrapper>
  )
}

export default ArtGenerator
