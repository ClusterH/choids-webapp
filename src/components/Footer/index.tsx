import React, { useMemo } from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import LOGO from 'assets/images/main_logo.png'
import { useAppNavigate } from 'hooks'
import { BlurBackground, FlexColumn, FlexRow, HoverTextWrapper, ImageContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor, themeSize } from 'styles/theme'
import { isMobile } from 'utils'

const BlueWrapper = styled(BlurBackground)`
  transform: translateX(-50%);
`

const Footer: React.FC = () => {
  const { handleNavigate } = useAppNavigate()
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <FlexColumn>
      <BlueWrapper
        top={isMobile ? '-40px' : '-80px'}
        left={'50%'}
        bottom={'unset'}
        height={isMobile ? '140px' : '280px'}
        width={isMobile ? '80%' : '40%'}
      />
      <FlexRow padding={'6%'} backgroundColor={themeColor.background2} isWrap={isMobile}>
        <FlexRow justifyContent={isMobile ? 'center' : 'flex-start'} rowWidth={'fit-content'} gap={'24px'} margin={'24px 0'}>
          <HoverTextWrapper lineHeight={20} onClick={() => handleNavigate('/')}>
            {'Home'}
          </HoverTextWrapper>
          <HoverTextWrapper lineHeight={20} onClick={() => handleNavigate('/partnership')}>
            {'Partnerships'}
          </HoverTextWrapper>
          <HoverTextWrapper lineHeight={20} onClick={() => handleNavigate('/nft')}>
            {'NFT'}
          </HoverTextWrapper>
        </FlexRow>
        <FlexColumn alignItems={isMobile ? 'center' : 'flex-start'} colWidth={'fit-content'} gap={'0px'}>
          <ImageContainer src={LOGO} height={isMobile ? '20px' : '27px'} borderRadius={themeBorderRadius.none} />
          <TextWrapper fontSize={'lg'}>{`©${currentYear}. All Rights Reserved`}</TextWrapper>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}

export default Footer
