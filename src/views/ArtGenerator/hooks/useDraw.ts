import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import keccak256 from 'keccak256'

import { notifyToast } from 'config/toast'
import { useGetMinterContract } from 'hooks'
import { useArtParamSettings } from 'state/artGenerator/hook'
import { setArtImgData, setCanvasContainerSize } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { checkDNAIsUnique } from 'utils'
import { checkDNAUniqueness } from 'utils/api/metadata'

import { IArtParams } from '../types'
import { drawArt } from '../utils/drawHelper'
import { b64EncodeUnicode } from '../utils/encodeHelper'

export const useDraw = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef: any = useRef<HTMLCanvasElement>(null)
  const artParamSettings = useArtParamSettings()

  const params = useMemo(() => artParamSettings, [artParamSettings])

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 800 })

  const offset = 200

  const dispatch = useAppDispatch()

  // const view = canvasContainerRef
  // const ratio = window.devicePixelRatio || 1
  // const width = (view.clientWidth * ratio) | 0
  // const height = (view.clientHeight * ratio) | 0

  // const canvasSize = useMemo(() => {
  //   return {
  //     width: canvasContainerRef.current ? canvasContainerRef.current.clientWidth - offset : 800,
  //     height: canvasContainerRef.current ? canvasContainerRef.current.clientHeight - offset : 800,
  //   }
  // }, [])

  // const handleImageData = useCallback(
  //   async (blob: any) => {
  //     dispatch(setArtImgData(blob))
  //   },
  //   [dispatch]
  // )

  const handleDraw = useCallback(
    (params: IArtParams, canvasRef: any) => {
      drawArt(params, canvasRef, canvasSize.width, canvasSize.height)
      // canvasRef.current.toBlob(handleImageData, 'image/png', 1.0)
      dispatch(setArtImgData(canvasRef.current.toDataURL()))
    },
    [canvasSize, dispatch]
  )

  useEffect(() => {
    handleDraw(params, canvasRef)
  }, [handleDraw, params])

  useEffect(() => {
    dispatch(setCanvasContainerSize(canvasSize))
  }, [canvasSize, dispatch])

  return { canvasRef, canvasContainerRef, canvasSize, handleDraw }
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
