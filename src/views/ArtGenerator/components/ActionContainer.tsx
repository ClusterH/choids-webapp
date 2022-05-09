import React, { useCallback } from 'react'

import { useIsDraw } from 'state/artGenerator/hook'
import { setIsDraw } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { FlexColumn, MainButton } from 'styles/components'

const ActionContainer: React.FC = () => {
  const isDraw = useIsDraw()
  const dispatch = useAppDispatch()
  const handleDraw = useCallback(() => {
    dispatch(setIsDraw(!isDraw))
  }, [dispatch, isDraw])

  return (
    <FlexColumn padding={'12px'}>
      <MainButton width={'100%'} onClick={handleDraw}>
        {isDraw ? 'Pause' : 'Draw'}
      </MainButton>
    </FlexColumn>
  )
}

export default ActionContainer
