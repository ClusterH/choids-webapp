import React, { useRef } from 'react'

import { FlexColumn } from 'styles/components'

import { useDraw } from '../hooks'

const ArtCanvasContainer: React.FC = () => {
  const { circlesCanvasRef, artCanvasRef } = useDraw()
  return (
    <FlexColumn colWidth={'68%'} colHeight={'calc(100vh - 60px)'}>
      <canvas style={{ position: 'absolute' }} ref={circlesCanvasRef} width={'100%'} height={'100%'} />
      <canvas style={{ position: 'absolute' }} ref={artCanvasRef} width={'100%'} height={'100%'} />
    </FlexColumn>
  )
}

export default ArtCanvasContainer
