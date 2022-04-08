import { useLayoutEffect, useRef } from 'react'

import { useParams } from 'react-router-dom'

export const useScrollIntoView = (param: string) => {
  const ref = useRef<HTMLDivElement>(null)
  const { id } = useParams<{ id?: string }>()

  useLayoutEffect(() => {
    if (id === param && ref.current !== null) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id, param])

  return ref
}
