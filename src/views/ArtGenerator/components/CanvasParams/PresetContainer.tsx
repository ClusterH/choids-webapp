import React, { useCallback } from 'react'

import styled from 'styled-components'

import SelectBox from 'components/SelectBox'
import TotalSupplyInfo from 'components/TotalSupplyInfo'
import { ART_PRESET_LIST } from 'config/constants'
import { setArtParamSettings } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { FlexColumn, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'
import { isMobile } from 'utils'

const MainWrapper = styled(FlexColumn)`
  border-bottom: ${themeColor.border2};
`

const PresetContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const optionList = Object.keys(ART_PRESET_LIST)

  const handleOptionChange = useCallback(
    (selectedOption: string) => {
      dispatch(setArtParamSettings(ART_PRESET_LIST[selectedOption]))
    },
    [dispatch]
  )

  return (
    <MainWrapper alignItems={'flex-start'} padding={isMobile ? '8px' : '16px'}>
      <TotalSupplyInfo />
      <TextWrapper color={'text5'} fontSize={isMobile ? 'base' : 'xs'} fontWeight={'semiBold'} lineHeight={isMobile ? 16 : 14}>
        {'PRESET'}
      </TextWrapper>
      <SelectBox optionList={optionList} isBorder handleOptionChange={handleOptionChange} />
    </MainWrapper>
  )
}

export default PresetContainer
