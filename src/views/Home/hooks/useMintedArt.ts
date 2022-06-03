import { useCallback, useEffect, useRef, useState } from 'react'

import { useMetaDataList } from 'state/choid/hook'

import { useGetArtMetaData } from '../hooks'

export const useMintedArtList = () => {
  const { isLoading, handleGetArtMetaData } = useGetArtMetaData()

  const metaDataList = useMetaDataList()

  const increaseRef = useRef<HTMLDivElement>(null)
  const [increaseSet, setIncreaseSet] = useState(false)
  const [categorySlideTimer, setCategorySlideTimer] = useState<number | undefined>(undefined)

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
      const timer = window.setInterval(() => {
        if (increaseRef.current && increaseRef.current.scrollLeft < increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0)
        }
        if (increaseRef.current && increaseRef.current.scrollLeft >= increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          console.log(
            increaseRef.current.scrollLeft,
            increaseRef.current.offsetLeft,
            increaseRef.current.scrollWidth,
            increaseRef.current.clientWidth
          )
          window.clearInterval(categorySlideTimer)
          increaseRef.current.scrollTo(0, 0)
        }
      }, 20)
      setCategorySlideTimer(timer)
      setIncreaseSet(true)
    }
  }, [categorySlideTimer, increaseSet])

  useEffect(() => {
    if (!increaseSet && increaseRef && increaseRef.current) {
      Timer()
    }

    return () => {
      window.clearInterval(categorySlideTimer)
    }
  }, [Timer, categorySlideTimer, increaseSet])

  useEffect(() => {
    handleGetArtMetaData()
  }, [handleGetArtMetaData])

  return { increaseRef, isLoading, metaDataList, onMouseEnter, onMouseLeave }
}
