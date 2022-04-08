import React, { useCallback } from 'react'

import styled from 'styled-components'

import { FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'

import { IWalletModalItem } from '../types'

const ItemWrapper = styled(FlexRow)<{ isClickable?: boolean }>`
  background-color: ${themeColor.background3};
  border-radius: ${themeBorderRadius.regular};
  border: 1px solid ${themeColor.background3};
  padding: 8px 24px;
  &:hover {
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : '')};
    border: ${({ isClickable }) => (isClickable ? `1px solid ${themeColor.background4}` : ``)};
  }
`
const GreenCircle = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${themeColor.background1};
  border-radius: ${themeBorderRadius.circle};
`

const WalletModalItem: React.FC<IWalletModalItem> = ({ name, iconUrl, isClickable = true, handleClick, isActive = false, href }) => {
  return (
    <ItemWrapper onClick={handleClick} isClickable={isClickable && !isActive}>
      <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'}>
        {isActive && <GreenCircle />}
        <TextWrapper fontSize={'xl'} fontWeight={'semiBold'} lineHeight={40}>
          {name}
        </TextWrapper>
      </FlexRow>
      <ImageContainer src={iconUrl} width={'36px'} borderRadius={themeBorderRadius.none} />
    </ItemWrapper>
  )
}

export default WalletModalItem
