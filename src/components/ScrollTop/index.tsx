import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = ({ children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return <>{children}</>
}
