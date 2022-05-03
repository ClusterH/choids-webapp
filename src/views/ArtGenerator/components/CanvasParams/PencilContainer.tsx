import React, { useCallback, useState } from 'react'

import 'react-color-palette/lib/css/styles.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styled from 'styled-components'

import { FlexColumn, FlexRow, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

import ColorParam from './ColorParam'
import RangeParam from './RangeParam'

const MainWrapper = styled(FlexColumn)`
  border-bottom: ${themeColor.border2};
`

const PencilContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [color, setColor] = useState<string>('#ffffff')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }, [])

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <MainWrapper alignItems={'flex-start'} padding={'16px'}>
      <FlexRow onClick={handleOpen}>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'PENCIL'}
        </TextWrapper>
        {isOpen ? <IoIosArrowUp color={themeColor.text5} size={16} /> : <IoIosArrowDown color={themeColor.text5} size={16} />}
      </FlexRow>
      {isOpen && (
        <FlexColumn padding={'12px 0'}>
          <RangeParam label={'Distance'} range={{ min: 0, max: 360 }} defaultVal={180} />
          <ColorParam label={'Color'} value={color} handleChange={handleChange} />
          <RangeParam label={'Size'} range={{ min: 0, max: 5 }} defaultVal={3} />
        </FlexColumn>
      )}
    </MainWrapper>
  )
}

export default PencilContainer
