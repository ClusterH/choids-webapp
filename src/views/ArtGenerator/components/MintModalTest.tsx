import React from 'react'

import { FlexColumn, FlexRow } from 'styles/components'

import { useArtAnimation } from '../hooks'

const MintModalTest: React.FC = () => {
  const { canvasRef, canvasContainerRef, canvasSize } = useArtAnimation()

  return (
    <FlexRow rowWidth={'100%'} rowHeight={'40vh'} justifyContent={'center'}>
      <FlexColumn ref={canvasContainerRef} colWidth={'100%'} colHeight={'100%'}>
        <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
      </FlexColumn>
    </FlexRow>
  )
}

export default MintModalTest
