import { useCallback, useMemo } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

// This hooks used for react-router to get router informations and manage them
export const useGetCurrentURLPath = () => {
  const location = useLocation()
  return useMemo(() => location.pathname, [location.pathname])
}

export const useAppNavigate = () => {
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    (route: string) => {
      navigate(route)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [navigate]
  )

  return { handleNavigate }
}
