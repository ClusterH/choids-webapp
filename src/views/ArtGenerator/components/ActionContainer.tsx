import React from 'react'

import { FlexColumn, MainButton } from 'styles/components'

const ActionContainer: React.FC = () => {
  return (
    <FlexColumn padding={'12px'}>
      <MainButton width={'100%'}>{'Draw'}</MainButton>
    </FlexColumn>
  )
}

export default ActionContainer
