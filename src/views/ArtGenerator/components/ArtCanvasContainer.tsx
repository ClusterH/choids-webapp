import React, { useRef } from 'react'

import { FlexColumn } from 'styles/components'

import { useDraw } from '../hooks'

const ArtCanvasContainer: React.FC = () => {
  const { penCanvasRef, circlesCanvasRef, divContainerRef } = useDraw()
  return (
    <FlexColumn colHeight={'calc(100vh - 60px)'} ref={divContainerRef}>
      <canvas style={{ position: 'absolute' }} ref={circlesCanvasRef} width={'800px'} height={'800px'} />
      <canvas style={{ position: 'absolute' }} ref={penCanvasRef} width={'800px'} height={'800px'} />
    </FlexColumn>
  )
}

export default ArtCanvasContainer
