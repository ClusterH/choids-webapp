import React, { useCallback, useEffect, useRef, useState } from 'react'

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'

import Modal from 'components/Modal/ModalWrapper'
import { ART_PRESET_LIST } from 'config/constants'
import { useActiveWeb3React, useModal, useTotalSupply } from 'hooks'
import { useSupplyLimit } from 'hooks/useSupplyLimit'
import { useArtParamSettings, useIsMinting } from 'state/artGenerator/hook'
import { setArtParamRadii, setArtParamSettings } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { Divider, FlexColumn, FlexRow, HoverTextWrapper, MainButton, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'
import { isMobile } from 'utils'
import { useCheckDNAUniqueness, useMintPhaseStatus } from 'views/ArtGenerator/hooks'
import { IArtParams } from 'views/ArtGenerator/types'

import { MintModal } from '..'

import ColorParam from './ColorParam'
import RangeParam from './RangeParam'

const ParamWrapper = styled(FlexColumn)`
  overflow-y: auto;
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
    <RangeParam label={`Radius #${radius.id}`} range={{ min: 1, max: 100 }} defaultVal={radius.r} handleRangeChange={handleSizeChange} />
  )
}

const CanvasContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const artParams = useArtParamSettings()
  const { choidTotalSupply } = useTotalSupply()
  const supplyLimit = useSupplyLimit()

  const { isOpen, handleOpenModal } = useModal()
  const { account } = useActiveWeb3React()
  const isMinting = useIsMinting()

  const [params, setParams] = useState<IArtParams>(() => artParams)

  const paramsRef = useRef({
    ...params,
  })

  const { mintPhase } = useMintPhaseStatus()
  const { handleCheckDNA, isLoading } = useCheckDNAUniqueness()

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
      dispatch(setArtParamSettings({ size: Number(value) }))
    },
    [dispatch]
  )

  const handlePencilSizeChange = useCallback(
    (value: number) => {
      paramsRef.current.pencilSize = value
      dispatch(setArtParamSettings({ pencilSize: Number(value) }))
    },
    [dispatch]
  )

  const handleZoomChange = useCallback(
    (value: number) => {
      paramsRef.current.zoom = value
      dispatch(setArtParamSettings({ zoom: Number(value) }))
    },
    [dispatch]
  )

  const handleRotateChange = useCallback(
    (value: number) => {
      paramsRef.current.degrees = value
      dispatch(setArtParamSettings({ degrees: Number(value) }))
    },
    [dispatch]
  )

  const handleAddRadius = useCallback(() => {
    if (paramsRef.current.radii.length > 4) return
    const radii = [...paramsRef.current.radii]
    radii.push({ id: paramsRef.current.radii.length + 1, r: Math.floor(Math.random() * 90 + 10) })
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
    return () => {
      setParams(ART_PRESET_LIST.Shrek)
    }
  }, [artParams])

  return (
    <>
      <ParamWrapper alignItems={'flex-start'} padding={isMobile ? '8px' : '16px'} colHeight={'100%'}>
        <TextWrapper
          color={'text5'}
          fontSize={isMobile ? 'base' : 'xs'}
          fontWeight={'semiBold'}
          lineHeight={isMobile ? 16 : 14}
          margin={'12px 0'}
        >
          {'CANVAS'}
        </TextWrapper>
        <RangeParam label={'Zoom'} range={{ min: 0.1, max: 20 }} defaultVal={paramsRef.current.zoom} handleRangeChange={handleZoomChange} />
        <RangeParam label={'Size'} range={{ min: 1, max: 100 }} defaultVal={paramsRef.current.size} handleRangeChange={handleSizeChange} />
        <RangeParam
          label={'Pen Size'}
          range={{ min: 1, max: 4 }}
          defaultVal={paramsRef.current.pencilSize}
          handleRangeChange={handlePencilSizeChange}
        />
        <RangeParam
          label={'Rotate'}
          range={{ min: 0, max: 359 }}
          defaultVal={paramsRef.current.degrees}
          handleRangeChange={handleRotateChange}
        />
        <ColorParam label={'Color'} value={paramsRef.current.canvasColor} handleChange={handleColorChange} />
        <ColorParam label={'Back Color'} value={paramsRef.current.backgroundColor} handleChange={handleBackColorChange} />
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14} margin={'12px 0'}>
          {'RADIUS'}
        </TextWrapper>
        {paramsRef.current.radii.map((radii) => (
          <RadiusItemWrapper key={radii.id} radius={radii} />
        ))}
        <FlexRow>
          <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'} gap={'4px'} onClick={handleAddRadius}>
            {paramsRef.current.radii.length < 4 && (
              <>
                <IoMdAddCircleOutline size={14} />
                <HoverTextWrapper fontSize={isMobile ? 'sm' : 'xs'}>{'Add Rotor'}</HoverTextWrapper>
              </>
            )}
          </FlexRow>
          <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'} gap={'4px'} onClick={handleRemoveRadius}>
            {paramsRef.current.radii.length > 2 && (
              <>
                <IoMdRemoveCircleOutline size={14} />
                <HoverTextWrapper fontSize={isMobile ? 'sm' : 'xs'}>{'Remove Last Rotor'}</HoverTextWrapper>
              </>
            )}
          </FlexRow>
        </FlexRow>
      </ParamWrapper>
      <FlexColumn colHeight={'fit-content'}>
        <Divider margin={isMobile ? '8px' : '1rem'} />
        <MainButton
          width={`calc(100% - ${isMobile ? '8px' : '32px'})`}
          margin={isMobile ? '0 0 8px' : '0 0 24px'}
          disabled={mintPhase === 0 || !account || choidTotalSupply >= supplyLimit || isLoading === true}
          onClick={async () => {
            if (mintPhase === 0 || !account) return
            const isDuplicate = await handleCheckDNA()
            if (isDuplicate === true) return
            handleOpenModal()
          }}
        >
          {mintPhase === 0
            ? 'Mint Paused'
            : choidTotalSupply >= supplyLimit
            ? `All Choids Minted`
            : isLoading === true
            ? 'DNA Checking...'
            : 'Mint'}
          {isLoading && <ClipLoader size={24} color={themeColor.text1} />}
        </MainButton>
        <Modal isOpen={isOpen} handleOpenModal={handleOpenModal} width={isMobile ? '90%' : '50%'} isBorder isCloseDisabled={isMinting}>
          <MintModal />
        </Modal>
      </FlexColumn>
    </>
  )
}

export default CanvasContainer
