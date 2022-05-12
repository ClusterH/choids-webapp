import React, { useCallback, useState } from 'react'

import 'react-color-palette/lib/css/styles.css'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

import { useArtParamSettings, useIsDraw } from 'state/artGenerator/hook'
import { setArtParamRadii, setArtParamSettings } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { FlexColumn, FlexRow, HoverTextWrapper, MainButton, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

import ColorParam from './ColorParam'
import RangeParam from './RangeParam'

const MainWrapper = styled(FlexColumn)`
  border-bottom: ${themeColor.border2};
`

const RadiusItemWrapper: React.FC<{
  radius: { id: number; r: number }
}> = ({ radius }) => {
  const dispatch = useAppDispatch()

  const handleSizeChange = useCallback(
    (value: number) => {
      dispatch(setArtParamRadii({ id: radius.id, value }))
    },
    [dispatch, radius.id]
  )

  return (
    <RangeParam label={`Radius #${radius.id}`} range={{ min: 0, max: 200 }} defaultVal={radius.r} handleRangeChange={handleSizeChange} />
  )
}

const CanvasContainer: React.FC = () => {
  const isDraw = useIsDraw()
  const dispatch = useAppDispatch()
  const artParams = useArtParamSettings()

  const [canvasSize, setCanvasSize] = useState<number>(() => artParams.size)
  const [canvasColor, setCanvasColor] = useState<string>(() => artParams.canvasColor)
  const [backColor, setBackColor] = useState<string>(() => artParams.backgroundColor)
  const [radius, setRadius] = useState<{ id: number; r: number }[]>(() => artParams.radii)

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCanvasColor(e.target.value)
  }, [])

  const handleBackColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBackColor(e.target.value)
  }, [])

  const handleSizeChange = useCallback((value: number) => {
    setCanvasSize(value)
  }, [])

  const handleAddRadius = useCallback(() => {
    if (radius.length > 6) return
    const radii = [...radius]
    radii.push({ id: radius.length + 1, r: Math.floor(Math.random() * 190 + 10) })
    setRadius(radii)
    dispatch(setArtParamSettings({ radii }))
  }, [dispatch, radius])

  const handleRemoveRadius = useCallback(() => {
    if (radius.length === 2) return
    const radii = [...radius]
    radii.pop()
    setRadius(radii)
    dispatch(setArtParamSettings({ radii }))
  }, [dispatch, radius])

  const handleDraw = useCallback(() => {
    dispatch(setArtParamSettings({ canvasColor, backgroundColor: backColor, size: canvasSize }))
  }, [backColor, canvasColor, canvasSize, dispatch])

  return (
    <MainWrapper alignItems={'flex-start'} padding={'16px'}>
      <FlexRow>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'CANVAS'}
        </TextWrapper>
      </FlexRow>
      <FlexColumn padding={'12px 0'}>
        <RangeParam label={'Size'} range={{ min: 0, max: 200 }} defaultVal={canvasSize} handleRangeChange={handleSizeChange} />
        <ColorParam label={'Color'} value={canvasColor} handleChange={handleColorChange} />
        <ColorParam label={'Back Color'} value={backColor} handleChange={handleBackColorChange} />
      </FlexColumn>
      <FlexRow>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'RADIUS'}
        </TextWrapper>
      </FlexRow>
      <FlexColumn padding={'12px 0'}>
        {radius.map((radii) => (
          <RadiusItemWrapper key={radii.id} radius={radii} />
        ))}
        <FlexRow>
          <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'} gap={'4px'} onClick={handleAddRadius}>
            <IoMdAddCircleOutline size={14} />
            <HoverTextWrapper fontSize={'xs'}>{'Add Rotor'}</HoverTextWrapper>
          </FlexRow>
          <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'} gap={'4px'} onClick={handleRemoveRadius}>
            <IoMdRemoveCircleOutline size={14} />
            <HoverTextWrapper fontSize={'xs'}>{'Remove Last Rotor'}</HoverTextWrapper>
          </FlexRow>
        </FlexRow>
      </FlexColumn>
      <MainButton width={'100%'} onClick={handleDraw}>
        {isDraw ? 'Pause' : 'Draw'}
      </MainButton>
    </MainWrapper>
  )
}

export default CanvasContainer
