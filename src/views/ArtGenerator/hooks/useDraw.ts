import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import keccak256 from 'keccak256'

import { notifyToast } from 'config/toast'
import { useGetMinterContract } from 'hooks'
import { useArtParamSettings } from 'state/artGenerator/hook'
import { setArtImgData, setCanvasContainerSize } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { checkDNAIsUnique, isMobile } from 'utils'
import { checkDNAUniqueness } from 'utils/api/metadata'

import { IArtParams } from '../types'
import { drawArt } from '../utils/drawHelper'
import { b64EncodeUnicode } from '../utils/encodeHelper'

export const useDraw = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const pixelRatio = window.devicePixelRatio
  const OFFSET = isMobile ? 0 : 50

  const canvasContainerRef: any = useRef<HTMLDivElement>(null)
  const canvasRef: any = useRef<HTMLCanvasElement>(null)
  const artParamSettings = useArtParamSettings()
  const dispatch = useAppDispatch()

  const params = useMemo(() => artParamSettings, [artParamSettings])

  const canvasSize = useMemo(() => {
    return { width, height }
  }, [height, width])

  const displayWidth = useMemo(() => Math.floor(width), [width])
  const displayHeight = useMemo(() => Math.floor(height), [height])

  const handleDraw = useCallback(
    (params: IArtParams, canvasRef: any) => {
      drawArt(params, canvasRef, canvasSize.width, canvasSize.height)
      dispatch(setArtImgData(canvasRef.current.toDataURL()))
    },
    [canvasSize, dispatch]
  )

  useEffect(() => {
    handleDraw(params, canvasRef)
  }, [handleDraw, params])

  // responsive width and height
  useEffect(() => {
    const size =
      canvasContainerRef.current.clientHeight === 0
        ? canvasContainerRef.current.clientWidth - OFFSET
        : Math.min(canvasContainerRef.current.clientWidth, canvasContainerRef.current.clientHeight) - OFFSET
    setWidth(size)
    setHeight(size)
  }, [OFFSET])

  useLayoutEffect(() => {
    handleDraw(params, canvasRef)
  }, [handleDraw, params])

  useEffect(() => {
    dispatch(setCanvasContainerSize(canvasSize))
  }, [canvasSize, dispatch])

  return { canvasRef, canvasContainerRef, canvasSize, displayWidth, displayHeight, handleDraw }
}

export const useCheckDNAUniqueness = () => {
  const minterContract = useGetMinterContract(false)
  const artParamSettings = useArtParamSettings()

  const params = useMemo(() => artParamSettings, [artParamSettings])

  const handleCheckDNA = useCallback(async () => {
    try {
      if (!minterContract) return
      const dna = b64EncodeUnicode(params)
      const dnaHash = keccak256(dna).toString('hex')
      const isDuplicated: boolean = await checkDNAUniqueness(dnaHash)
      const isDuplicatedContract: boolean = await checkDNAIsUnique(minterContract, `0x${dnaHash}`)

      if (isDuplicated === true || isDuplicatedContract === true) {
        notifyToast({ id: 'dna_uniqueness', type: 'error', content: 'Same choid is already exist, please draw different ones.' })

        return true
      }

      return false
    } catch (error) {
      console.log(error)
      notifyToast({
        id: 'dna_uniqueness',
        type: 'error',
        content: 'We cannot estimate your DNA uniqueness. Set the parameters differently.',
      })
      return true
    }
  }, [minterContract, params])

  return { handleCheckDNA }
}
