import React, { useCallback, useState } from 'react'

import 'react-color-palette/lib/css/styles.css'
import { IoIosArrowDown, IoIosArrowUp, IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

import { FlexColumn, FlexRow, HoverTextWrapper, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

import ColorParam from './ColorParam'
import RangeParam from './RangeParam'

const MainWrapper = styled(FlexColumn)`
  border-bottom: ${themeColor.border2};
`

const RadiusContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [val, setVal] = useState<number>(0)

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <MainWrapper alignItems={'flex-start'} padding={'16px'}>
      <FlexRow onClick={handleOpen}>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'RADIUS'}
        </TextWrapper>
        {isOpen ? <IoIosArrowUp color={themeColor.text5} size={16} /> : <IoIosArrowDown color={themeColor.text5} size={16} />}
      </FlexRow>
      {isOpen && (
        <FlexColumn padding={'12px 0'}>
          <RangeParam label={'Stator'} range={{ min: 0, max: 360 }} defaultVal={180} />
          <RangeParam label={'Roto'} range={{ min: 0, max: 360 }} defaultVal={180} />
          <FlexRow>
            <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'} gap={'4px'}>
              <IoMdAddCircleOutline size={14} />
              <HoverTextWrapper fontSize={'xs'}>{'Add Rotor'}</HoverTextWrapper>
            </FlexRow>
            <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'} gap={'4px'}>
              <IoMdRemoveCircleOutline size={14} />
              <HoverTextWrapper fontSize={'xs'}>{'Remove Last Rotor'}</HoverTextWrapper>
            </FlexRow>
          </FlexRow>
        </FlexColumn>
      )}
    </MainWrapper>
  )
}

export default RadiusContainer
