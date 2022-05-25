import React from 'react'

import styled from 'styled-components'

import LOGO_SM from 'assets/images/logo_sm.svg'
import LOGO from 'assets/images/main_logo.svg'
import { useAppNavigate } from 'hooks'
import { ImageContainer } from 'styles/components'
import { isMobile } from 'utils'

const LogoWrapper = styled(ImageContainer)`
  z-index: 1;
`
const Logo: React.FC = () => {
  const { handleNavigate } = useAppNavigate()
  return (
    <LogoWrapper
      src={isMobile ? LOGO_SM : LOGO}
      borderRadius={'0'}
      height={'42px'}
      alt="choids"
      onClick={() => {
        handleNavigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    />
  )
}

export default Logo
