import React, { Children, useCallback, useMemo } from 'react'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import styled from 'styled-components'

import { FlexRow } from 'styles/components'
import { themeColor } from 'styles/theme'

import { ICarouselOption } from './types'

const ArrowLeftWrapper = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -32px;
  cursor: pointer;
  &:hover {
    color: ${themeColor.text3};
  }
`
const ArrowRightWrapper = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -32px;
  cursor: pointer;
  &:hover {
    color: ${themeColor.text3};
  }
`

const CarouselWrapper: React.FC<ICarouselOption> = (props) => {
  const { handlePageChange, totalCount, currentPage, pageSize, children } = props

  const onPageChange = useCallback(
    (direction: 'left' | 'right') => {
      handlePageChange(direction === 'left' ? currentPage - 1 : currentPage + 1, direction)
    },
    [currentPage, handlePageChange]
  )

  const { left, right } = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    if (currentPage === 1) {
      if (totalPageCount === 1) {
        return { left: false, right: false }
      } else {
        return { left: false, right: true }
      }
    } else if (currentPage === totalPageCount) {
      return { left: true, right: false }
    } else {
      return { left: true, right: true }
    }
  }, [currentPage, pageSize, totalCount])

  return (
    <FlexRow>
      <ArrowLeftWrapper onClick={() => onPageChange('left')} isShow={left}>
        <IoIosArrowBack size={32} />
      </ArrowLeftWrapper>
      {children}
      <ArrowRightWrapper onClick={() => onPageChange('right')} isShow={right}>
        <IoIosArrowForward size={32} />
      </ArrowRightWrapper>
    </FlexRow>
  )
}

export default CarouselWrapper
