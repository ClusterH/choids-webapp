import React from 'react'

import { FlexColumn } from 'styles/components'
import { isMobile } from 'utils'

import { useDraw } from '../hooks'

const ArtCanvasContainer: React.FC = () => {
  const { canvasRef, canvasContainerRef, canvasSize } = useDraw()
  return (
    <FlexColumn colHeight={isMobile ? 'auto' : 'calc(100vh - 80px)'} padding={isMobile ? '0px' : '24px'} ref={canvasContainerRef}>
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
    </FlexColumn>
  )
}

export default ArtCanvasContainer
