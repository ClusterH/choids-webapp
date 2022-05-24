import React, { useEffect } from 'react'

import { FlexColumn } from 'styles/components'
import { themeColor } from 'styles/theme'

import { useGetDefaltMetadata } from '../hooks'

import { CanvasContainer, PresetContainer } from './CanvasParams'

const ParamsMainContainer: React.FC = () => {
  const { handleGetDefaultMetadata } = useGetDefaltMetadata()

  useEffect(() => {
    handleGetDefaultMetadata()
  }, [handleGetDefaultMetadata])

  return (
    <FlexColumn
      colWidth={'30%'}
      colHeight={'calc(100vh - 80px)'}
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
