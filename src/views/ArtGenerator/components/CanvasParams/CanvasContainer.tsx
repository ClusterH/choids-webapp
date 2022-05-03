import React, { useCallback, useState } from 'react'

import 'react-color-palette/lib/css/styles.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styled from 'styled-components'

import { useArtParamSettings } from 'state/artGenerator/hook'
import { setArtParamSettings } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { FlexColumn, FlexRow, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

import ColorParam from './ColorParam'
import RangeParam from './RangeParam'

const MainWrapper = styled(FlexColumn)`
  border-bottom: ${themeColor.border2};
`

const CanvasContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const artParams = useArtParamSettings()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [canvasColor, setCanvasColor] = useState<string>(() => artParams[0].canvasColor)

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCanvasColor(e.target.value)
      dispatch(setArtParamSettings({ id: 1, setting: 'canvasColor', value: e.target.value }))
    },
    [dispatch]
  )

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <MainWrapper alignItems={'flex-start'} padding={'16px'}>
      <FlexRow onClick={handleOpen}>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'CANVAS'}
        </TextWrapper>
        {isOpen ? <IoIosArrowUp color={themeColor.text5} size={16} /> : <IoIosArrowDown color={themeColor.text5} size={16} />}
      </FlexRow>
      {isOpen && (
        <FlexColumn padding={'12px 0'}>
          <ColorParam label={'Color'} value={canvasColor} handleChange={handleColorChange} />
          <RangeParam label={'Rotate'} range={{ min: 0, max: 360 }} defaultVal={180} />
        </FlexColumn>
      )}
    </MainWrapper>
  )
}

export default CanvasContainer
