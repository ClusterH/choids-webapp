import React, { useCallback, useEffect, useRef, useState } from 'react'

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'

import Modal from 'components/Modal/ModalWrapper'
import { useModal } from 'hooks'
import { useArtParamSettings, useIsDraw } from 'state/artGenerator/hook'
import { setArtParamRadii, setArtParamSettings } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { Divider, FlexColumn, FlexRow, HoverTextWrapper, MainButton, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'
import { useMintPhaseStatus } from 'views/ArtGenerator/hooks'
import { IArtParams } from 'views/ArtGenerator/types'

import { MintModal } from '..'

import ColorParam from './ColorParam'
import RangeParam from './RangeParam'

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
    <RangeParam label={`Radius #${radius.id}`} range={{ min: 1, max: 200 }} defaultVal={radius.r} handleRangeChange={handleSizeChange} />
  )
}

const CanvasContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const artParams = useArtParamSettings()

  const { isOpen, handleOpenModal } = useModal()

  const [params, setParams] = useState<IArtParams>(() => artParams)

  const paramsRef = useRef({
    ...params,
  })

  const { mintPhase } = useMintPhaseStatus()

  const handleColorChange = useCallback(
    (canvasColor: string) => {
      paramsRef.current.canvasColor = canvasColor
      dispatch(setArtParamSettings({ canvasColor }))
    },
    [dispatch]
  )

  const handleBackColorChange = useCallback(
    (backgroundColor: string) => {
      paramsRef.current.backgroundColor = backgroundColor
      dispatch(setArtParamSettings({ backgroundColor }))
    },
    [dispatch]
  )

  const handleSizeChange = useCallback(
    (value: number) => {
      paramsRef.current.size = value
      dispatch(setArtParamSettings({ size: value }))
    },
    [dispatch]
  )

  const handlePencilSizeChange = useCallback(
    (value: number) => {
      paramsRef.current.pencilSize = value
      dispatch(setArtParamSettings({ pencilSize: value }))
    },
    [dispatch]
  )

  const handleAddRadius = useCallback(() => {
    if (paramsRef.current.radii.length > 6) return
    const radii = [...paramsRef.current.radii]
    radii.push({ id: paramsRef.current.radii.length + 1, r: Math.floor(Math.random() * 190 + 10) })
    paramsRef.current.radii = radii
    dispatch(setArtParamSettings({ radii }))
  }, [dispatch])

  const handleRemoveRadius = useCallback(() => {
    if (paramsRef.current.radii.length === 2) return
    const radii = [...paramsRef.current.radii]
    radii.pop()
    paramsRef.current.radii = radii
    dispatch(setArtParamSettings({ radii }))
  }, [dispatch])

  useEffect(() => {
    paramsRef.current = { ...paramsRef.current, ...artParams }
    setParams({ ...artParams })
  }, [artParams])

  return (
    <FlexColumn alignItems={'flex-start'} padding={'16px'}>
      <FlexRow>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'CANVAS'}
        </TextWrapper>
      </FlexRow>
      <FlexColumn padding={'12px 0'}>
        <RangeParam label={'Size'} range={{ min: 1, max: 200 }} defaultVal={paramsRef.current.size} handleRangeChange={handleSizeChange} />
        <RangeParam
          label={'Pen Size'}
          range={{ min: 1, max: 4 }}
          defaultVal={paramsRef.current.pencilSize}
          handleRangeChange={handlePencilSizeChange}
        />
        <ColorParam label={'Color'} value={paramsRef.current.canvasColor} handleChange={handleColorChange} />
        <ColorParam label={'Back Color'} value={paramsRef.current.backgroundColor} handleChange={handleBackColorChange} />
      </FlexColumn>
      <FlexRow>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'RADIUS'}
        </TextWrapper>
      </FlexRow>
      <FlexColumn padding={'12px 0'}>
        {paramsRef.current.radii.map((radii) => (
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
      <Divider />
      <MainButton
        width={'100%'}
        disabled={mintPhase === 0}
        onClick={() => {
          if (mintPhase === 0) return
          handleOpenModal()
        }}
      >
        {mintPhase === 0 ? 'Mint Paused' : 'Mint'}
      </MainButton>
      <Modal isOpen={isOpen} handleOpenModal={handleOpenModal} width={isMobile ? '90%' : '50%'} isBorder>
        <MintModal />
      </Modal>
    </FlexColumn>
  )
}

export default CanvasContainer
