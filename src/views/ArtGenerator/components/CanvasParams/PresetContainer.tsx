import React from 'react'

import styled from 'styled-components'

import SelectBox from 'components/SelectBox'
import { FlexColumn, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

const MainWrapper = styled(FlexColumn)`
  border-bottom: ${themeColor.border2};
`

const PresetContainer: React.FC = () => {
  const optionList = [
    { id: 1, option: 'PRESET' },
    { id: 2, option: 'tet' },
    { id: 3, option: 'fef' },
    { id: 4, option: 'dfd' },
    { id: 5, option: 'fgrg' },
  ]
  return (
    <MainWrapper alignItems={'flex-start'} padding={'16px'}>
      <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
        {'PRESET'}
      </TextWrapper>
      <SelectBox optionList={optionList} isBorder />
    </MainWrapper>
  )
}

export default PresetContainer
