import { useCallback } from 'react'

import { setAddRemoveLayer, setHideLayer } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'

export const useLayerManagement = () => {
  const dispatch = useAppDispatch()

  const handleAddRemoveLayer = useCallback(
    (option: 'add' | 'remove', id?: number) => {
      dispatch(setAddRemoveLayer({ option, id }))
    },
    [dispatch]
  )

  const handleHideLayer = useCallback(
    (id: number) => {
      dispatch(setHideLayer({ id }))
    },
    [dispatch]
  )

  return { handleAddRemoveLayer, handleHideLayer }
}
