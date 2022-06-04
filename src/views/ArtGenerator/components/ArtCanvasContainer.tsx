import React from 'react'

import { FlexColumn } from 'styles/components'
import { isMobile } from 'utils'

import { useDraw } from '../hooks'

const ArtCanvasContainer: React.FC = () => {
  const { canvasRef, canvasContainerRef, canvasSize, displayWidth, displayHeight } = useDraw()
  return (
    <FlexColumn
      colHeight={isMobile ? 'auto' : 'calc(100vh - 80px)'}
      padding={isMobile ? '0px' : '24px'}
      justifyContent={'center'}
      ref={canvasContainerRef}
    >
      <canvas ref={canvasRef} width={displayWidth} height={displayHeight} style={canvasSize} />
    </FlexColumn>
  )
}

export default ArtCanvasContainer
