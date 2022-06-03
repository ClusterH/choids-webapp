import React, { useCallback, useState } from 'react'

import styled from 'styled-components'

import PLACEHOLDER_IMG from 'assets/images/placeholder.png'
import ProgressiveImg from 'components/ProgressiveImg'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { isMobile } from 'utils'
import { IMetaData } from 'views/ArtGenerator/types'

const ItemWrapper = styled(FlexRow)`
  transition: all 0.15s ease-in-out 0s;
  border-radius: ${themeBorderRadius.regular};
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #6c05ac 95%);
    transform: translateY(-3px);
  }
`

const PopUpWrapper = styled(FlexColumn)<{ isPopUp: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 100%;
  background-color: ${themeColor.background1};
  border-radius: ${themeBorderRadius.regular};
  opacity: ${({ isPopUp }) => (isPopUp ? 0.7 : 0)};
  transition: opacity 0.3s ease-in-out;
`

const MintedArtItem: React.FC<{ metadata: IMetaData }> = ({ metadata }) => {
  const [isPopUp, setIsPopUp] = useState<boolean>(false)

  const onMouseEnter = useCallback(() => {
    setIsPopUp(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsPopUp(false)
  }, [])

  return (
    <>
      {metadata && metadata.image ? (
        <ItemWrapper
          rowWidth={isMobile ? '24%' : '16%'}
          minWidth={isMobile ? '24%' : '16%'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ProgressiveImg
            src={metadata.image}
            placeholderSrc={PLACEHOLDER_IMG}
            width={'100%'}
            height={'auto'}
            borderRadius={themeBorderRadius.regular}
            isShadow
          />
          <PopUpWrapper padding={'8px'} isPopUp={isPopUp}>
            <TextWrapper>{`${metadata.name}`}</TextWrapper>
          </PopUpWrapper>
        </ItemWrapper>
      ) : (
        <ImageContainer src={PLACEHOLDER_IMG} width={isMobile ? '24%' : '16%'} height={'auto'} borderRadius={themeBorderRadius.regular} />
      )}
    </>
  )
}

export default MintedArtItem
