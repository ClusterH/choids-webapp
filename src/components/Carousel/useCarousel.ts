import { useCallback, useRef, useState } from 'react'

export const useCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handlePageChange = useCallback((page: number, direction: string) => {
    setCurrentPage(page)
    const scrollWidth = carouselRef.current?.clientWidth || 0
    const carouselLeft = carouselRef.current?.scrollLeft || 0
    const collectionBoxWidth = carouselRef.current?.scrollWidth || 0
    if (direction === 'left') {
      let scrollLeft = carouselLeft - scrollWidth
      if (carouselLeft < scrollWidth * 1.5) {
        scrollLeft = 0
      }
      carouselRef.current?.scroll({ left: scrollLeft, behavior: 'smooth' })
    }
    if (direction === 'right') {
      let scrollLeft = carouselLeft + scrollWidth
      if (collectionBoxWidth - carouselLeft < scrollWidth * 1.5) {
        scrollLeft = collectionBoxWidth
      }
      carouselRef.current?.scroll({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [])

  const rangeBlock = useCallback((sliderList, pageSize) => {
    const length = Math.ceil(sliderList.length / pageSize)
    return Array.from({ length }, (_, idx) => idx)
  }, [])

  const pageBlock = useCallback((idx: number, sliderList, pageSize: number) => {
    return sliderList.slice(idx, idx + pageSize)
  }, [])

  return { carouselRef, currentPage, rangeBlock, handlePageChange, pageBlock }
}
