import React from 'react'

import styled from 'styled-components'

import Logo from 'components/Logo'
import { FlexRow } from 'styles/components'
import { themeColor } from 'styles/theme'

const HeaderWrapper = styled(FlexRow)`
  border-bottom: ${themeColor.border2};
`
const GeneratorHeader: React.FC = () => {
  return (
    <HeaderWrapper rowHeight={'60px'}>
      <FlexRow rowWidth={'fit-content'}>
        <Logo />
      </FlexRow>
    </HeaderWrapper>
  )
}

export default GeneratorHeader
