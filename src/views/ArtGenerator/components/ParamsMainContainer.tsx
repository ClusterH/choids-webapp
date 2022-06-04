import React, { useEffect } from 'react'

import { useCanvasContainerSize } from 'state/artGenerator/hook'
import { FlexColumn } from 'styles/components'
import { themeColor } from 'styles/theme'
import { isMobile } from 'utils'

import { useGetDefaltMetadata } from '../hooks'

import { CanvasContainer, PresetContainer } from './CanvasParams'

const ParamsMainContainer: React.FC = () => {
  const { handleGetDefaultMetadata } = useGetDefaltMetadata()
  const { width, height } = useCanvasContainerSize()

  useEffect(() => {
    handleGetDefaultMetadata()
  }, [handleGetDefaultMetadata])

  return (
    <FlexColumn
      colWidth={isMobile ? '100%' : '30%'}
      colHeight={isMobile ? `calc(100vh - ${height}px - 80px)` : 'calc(100vh - 80px)'}
      minWidth={isMobile ? '100%' : '428px'}
      backgroundColor={themeColor.background4}
      justifyContent={'space-between'}
      gap={'0px'}
    >
      <PresetContainer />
      <CanvasContainer />
    </FlexColumn>
  )
}

export default ParamsMainContainer
