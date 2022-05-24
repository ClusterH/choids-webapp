import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useArtParamSettings } from 'state/artGenerator/hook'
import { setArtImgData, setCanvasContainerSize } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'

import { IArtParams } from '../types'
import { drawArt } from '../utils/drawHelper'

export const useDraw = () => {
  const canvasContainerRef: any = useRef<HTMLDivElement>(null)
  const canvasRef: any = useRef<HTMLCanvasElement>(null)
  const artParamSettings = useArtParamSettings()

  const params = useMemo(() => artParamSettings, [artParamSettings])

  const offset = 200

  const dispatch = useAppDispatch()

  const canvasSize = useMemo(() => {
    return {
      width: canvasContainerRef.current ? canvasContainerRef.current.width - offset : 800,
      height: canvasContainerRef.current ? canvasContainerRef.current.height - offset : 800,
    }
  }, [])

  const handleImageData = useCallback(
    async (blob: any) => {
      dispatch(setArtImgData(blob))
    },
    [dispatch]
  )

  const handleDraw = useCallback(
    (params: IArtParams, canvasRef: any) => {
      drawArt(params, canvasRef, canvasSize.width, canvasSize.height)
      canvasRef.current.toBlob(handleImageData, 'image/png', 1.0)
    },
    [canvasSize, handleImageData]
  )

  useEffect(() => {
    handleDraw(params, canvasRef)
  }, [handleDraw, params])

  useEffect(() => {
    dispatch(setCanvasContainerSize(canvasSize))
  }, [canvasSize, dispatch])

  return { canvasRef, canvasContainerRef, canvasSize, handleDraw }
}
