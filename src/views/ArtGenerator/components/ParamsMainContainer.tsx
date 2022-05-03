import React from 'react'

import { FlexColumn } from 'styles/components'
import { themeColor } from 'styles/theme'

import ActionContainer from './ActionContainer'
import { CanvasContainer, OriginContainer, PencilContainer, PresetContainer, RadiusContainer, SpeedContainer } from './CanvasParams'

const ParamsMainContainer: React.FC = () => {
  return (
    <FlexColumn colWidth={'16%'} colHeight={'calc(100vh - 60px)'} backgroundColor={themeColor.background4} gap={'0px'}>
      <PresetContainer />
      <CanvasContainer />
      <OriginContainer />
      <SpeedContainer />
      <PencilContainer />
      <RadiusContainer />
      <ActionContainer />
    </FlexColumn>
  )
}

export default ParamsMainContainer
