import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useArtParamSettings } from 'state/artGenerator/hook'
import { setArtImgData, setCanvasContainerSize } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'

import { hypotrochoid } from '../utils/drawHelper'

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
      console.log(blob)
      dispatch(setArtImgData(blob))
    },
    [dispatch]
  )

  const handleDraw = useCallback(() => {
    let output: number[] = []

    const h = params.size // To Do -- should update with screen size Height or Container height

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
      ctx.fillStyle = params.backgroundColor
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
      ctx.save()
      ctx.translate(canvasSize.width / 2, canvasSize.height / 2)

      ctx.lineWidth = params.pencilSize
      ctx.strokeStyle = params.canvasColor
      ctx.beginPath()

      // The rest of the code is presentation:
      // this is how you would use the module
      // to trace out a curv
      hypotrochoid(
        h,
        params.radii.map((radius) => radius.r),
        0,
        output
      )
      ctx.moveTo(output[0], output[1])
      for (let i = 0; i < 40000; i += 2.5) {
        hypotrochoid(
          h,
          params.radii.map((radius) => radius.r),
          (i * Math.PI) / 200,
          output
        )
        ctx.lineTo(output[0], output[1])
      }
      ctx.stroke()

      ctx.restore()

      canvasRef.current.toBlob(handleImageData, 'image/png', 1.0)
    }
  }, [canvasSize, handleImageData, params])

  useEffect(() => {
    handleDraw()
  }, [handleDraw])

  useEffect(() => {
    dispatch(setCanvasContainerSize(canvasSize))
  }, [canvasSize, dispatch])

  return { canvasRef, canvasContainerRef, canvasSize }
}
