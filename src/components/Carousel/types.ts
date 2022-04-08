import { ReactNode } from 'react'

export interface ICarouselOption {
  totalCount: number
  pageSize: number
  currentPage: number
  handlePageChange: Function
}
