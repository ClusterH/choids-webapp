import React from 'react'

import { FlexRow, PageWrapper } from 'styles/components'

import { ArtCanvasContainer, ParamsMainContainer } from './components'

const ArtGenerator: React.FC = () => {
  return (
    <PageWrapper>
      {/* <Header /> */}
      <FlexRow gap={'0px'}>
        {/* <LayerListContainer /> */}
        <ArtCanvasContainer />
        <ParamsMainContainer />
      </FlexRow>
    </PageWrapper>
  )
}

export default ArtGenerator
