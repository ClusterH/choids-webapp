import React from 'react'

import Logo from 'components/Logo'
import { FlexRow } from 'styles/components'

const GeneratorHeader: React.FC = () => {
  return (
    <FlexRow rowHeight={'60px'} rowWidth={'fit-content'}>
      <Logo />
    </FlexRow>
  )
}

export default GeneratorHeader
