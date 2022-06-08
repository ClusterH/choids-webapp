import { useCallback, useEffect, useRef, useState } from 'react'

import { useMetaDataList } from 'state/choid/hook'

import { useGetArtMetaData } from '../hooks'

export const useMintedArtList = () => {
  const { isLoading, handleGetArtMetaData } = useGetArtMetaData()

  const metaDataList = useMetaDataList()

  const increaseRef = useRef<HTMLDivElement>(null)
  const [increaseSet, setIncreaseSet] = useState(false)
  const [categorySlideTimer, setCategorySlideTimer] = useState<any>(undefined)

  const onMouseEnter = useCallback(() => {
    window.clearInterval(categorySlideTimer)
    setCategorySlideTimer(undefined)
    setIncreaseSet(true)
  }, [categorySlideTimer])

  const onMouseLeave = useCallback(() => {
    setIncreaseSet(false)
  }, [])

  const Timer = useCallback(() => {
    if (!increaseSet) {
      const timer = setInterval(() => {
        if (
          increaseRef.current &&
          increaseRef.current.scrollLeft + 2 <= increaseRef.current.scrollWidth - increaseRef.current.clientWidth
        ) {
          increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0)
        }
        if (increaseRef.current && increaseRef.current.scrollLeft + 2 > increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          increaseRef.current.scrollLeft = 0
          increaseRef.current.scrollTo(0, 0)
        }
      }, 20)
      setCategorySlideTimer(timer)
      setIncreaseSet(true)
    }
  }, [increaseSet])

  useEffect(() => {
    if (!increaseSet && increaseRef && increaseRef.current) {
      Timer()
    }

    return () => {
      clearInterval(categorySlideTimer)
    }
  }, [Timer, categorySlideTimer, increaseSet])

  useEffect(() => {
    handleGetArtMetaData()
  }, [handleGetArtMetaData])

  return { increaseRef, isLoading, metaDataList, onMouseEnter, onMouseLeave }
}
