import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useArtParamSettings } from 'state/artGenerator/hook'

import { drawArt } from '../utils/drawHelper'

export const useArtAnimation = () => {
  const artParamSettings = useArtParamSettings()
  const canvasContainerRef: any = useRef<HTMLDivElement>(null)
  const canvasRef: any = useRef<HTMLCanvasElement>(null)

  const params = useRef({
    ...artParamSettings,
  })

  const length = useMemo(() => params.current.radii.length, [])

  const canvasSize = useMemo(() => {
    return Math.min(canvasRef.current ? canvasRef.current.width : 400, canvasRef.current ? canvasRef.current.height : 400)
  }, [])

  const handleAnimation = useCallback(() => {
    const now = Date.now ? Date.now() : +new Date()

    const radii = [...params.current.radii]
    let size = Number(params.current.size)

    for (var i = 0, l = length; i < l; i += 1) {
      radii[i] = {
        ...radii[i],
        r: Number(radii[i].r) - Math.sin((now - i * 5000) * 0.0001 * Math.sin(i / 1.3)) * 0.005,
      }
      size -= Math.sin((now + 5000) * 0.00008) * 0.0025
      params.current.size = size
    }
    const zoom = 0.5 * (Math.sin(Math.PI / 6 + (Math.PI * (now - 1)) / now) + 1)

    console.log(radii, size, zoom)

    params.current.radii = [...radii]
    params.current.zoom = zoom

    drawArt(params.current, canvasRef, canvasSize, canvasSize)
  }, [canvasSize, length])

  useEffect(() => {
    const interval = setInterval(() => handleAnimation(), 100)

    return () => {
      clearInterval(interval)
    }
  }, [handleAnimation])

  // useEffect(() => {
  //   canvasRef.current.width = canvasRef.current.offsetWidth
  //   canvasRef.current.height = canvasRef.current.offsetHeight
  // }, [])

  return { canvasRef, canvasContainerRef, canvasSize }
}
