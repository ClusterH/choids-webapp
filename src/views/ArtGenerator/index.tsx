import React from 'react'

import { FlexRow, PageWrapper } from 'styles/components'

import { ArtCanvasContainer, ParamsMainContainer } from './components'

const ArtGenerator: React.FC = () => {
  return (
    <PageWrapper>
      <FlexRow gap={'0px'}>
        <ArtCanvasContainer />
        <ParamsMainContainer />
      </FlexRow>
    </PageWrapper>
  )
}

export default ArtGenerator
