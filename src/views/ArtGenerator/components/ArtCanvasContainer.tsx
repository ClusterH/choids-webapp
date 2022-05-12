import React, { useRef } from 'react'

import { FlexColumn } from 'styles/components'
import { themeColor } from 'styles/theme'

import { useDraw } from '../hooks'

const ArtCanvasContainer: React.FC = () => {
  const { canvasRef, canvasContainerRef, canvasSize } = useDraw()
  return (
    <FlexColumn colHeight={'calc(100vh - 60px)'} padding={'24px'} ref={canvasContainerRef}>
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
    </FlexColumn>
  )
}

export default ArtCanvasContainer
