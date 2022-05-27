import { useCallback, useEffect, useRef, useState } from 'react'

import { useMetaDataList } from 'state/choid/hook'

import { useGetArtMetaData } from '../hooks'

export const useMintedArtList = () => {
  const { isLoading, handleGetArtMetaData } = useGetArtMetaData()

  const metaDataList = useMetaDataList()

  const increaseRef = useRef<HTMLDivElement>(null)
  const [increaseSet, setIncreaseSet] = useState(false)
  const [categorySlideTimer, setCategorySlideTimer] = useState<number>()

  const onMouseEnter = () => {
    window.clearInterval(categorySlideTimer)
    setCategorySlideTimer(undefined)
    setIncreaseSet(true)
  }

  const onMouseLeave = () => {
    setIncreaseSet(false)
  }

  const Timer = useCallback(() => {
    if (!increaseSet) {
      const timer = window.setInterval(() => {
        if (increaseRef.current && increaseRef.current.scrollLeft < increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0)
        }
        if (increaseRef.current && increaseRef.current.scrollLeft >= increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
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
  }, [Timer, increaseSet])

  useEffect(() => {
    handleGetArtMetaData()
  }, [handleGetArtMetaData])

  return { increaseRef, isLoading, metaDataList, onMouseEnter, onMouseLeave }
}
