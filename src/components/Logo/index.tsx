import React from 'react'

import styled from 'styled-components'

import LOGO_SM from 'assets/images/logo.png'
import { useAppNavigate } from 'hooks'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { isMobile } from 'utils'

const LogoWrapper = styled(FlexRow)`
  z-index: 1;
  cursor: pointer;
  width: fit-content;
  gap: 8px;
`
const Logo: React.FC = () => {
  const { handleNavigate } = useAppNavigate()
  return (
    <LogoWrapper
      borderRadius={'0'}
      onClick={() => {
        handleNavigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <ImageContainer src={LOGO_SM} height={'42px'} alt="choids" />
      {!isMobile && (
        <FlexColumn gap={'0px'} alignItems={'flex-start'}>
          <TextWrapper fontSize={'sm'} lineHeight={20}>
            {'Blockchain'}
          </TextWrapper>
          <TextWrapper fontSize={'base'} fontWeight={'bold'} lineHeight={20}>
            {'Choids'}
          </TextWrapper>
        </FlexColumn>
      )}
    </LogoWrapper>
  )
}

export default Logo
