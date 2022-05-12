import React from 'react'

import { FlexColumn } from 'styles/components'
import { themeColor } from 'styles/theme'

import { CanvasContainer, PresetContainer } from './CanvasParams'

const ParamsMainContainer: React.FC = () => {
  return (
    <FlexColumn colWidth={'30%'} colHeight={'calc(100vh - 60px)'} backgroundColor={themeColor.background4} gap={'0px'}>
      <PresetContainer />
      <CanvasContainer />
    </FlexColumn>
  )
}

export default ParamsMainContainer
