import React from 'react'

import styled from 'styled-components'

import ANIMATED_GIF from 'assets/images/art_animation.gif'
import TotalSupplyInfo from 'components/TotalSupplyInfo'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius } from 'styles/theme'
import { isMobile } from 'utils'

import { useMintedArtList } from '../hooks'

import MintedArtItem from './MintedArtItem'

const ArtListWrapper = styled(FlexRow)`
  overflow-x: auto;
  min-height: ${isMobile ? 'auto' : '28vh'};

  ::-webkit-scrollbar {
    display: none;
  }
`

const MintedArtList: React.FC = () => {
  const { increaseRef, isLoading, metaDataList, onMouseEnter, onMouseLeave } = useMintedArtList()

  return (
    <FlexColumn alignItems={'flex-start'} padding={isMobile ? '6%' : '0% 8%'}>
      <TextWrapper>{'RECENTLY MINTED CREATIONS'}</TextWrapper>
      <TotalSupplyInfo isLanding />

      <ArtListWrapper
        gap={isMobile ? '12px' : '24px'}
        justifyContent={'flex-start'}
        padding={'36px 0'}
        ref={increaseRef}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
      >
        {isLoading || !metaDataList ? (
          <FlexRow justifyContent={'center'}>
            <ImageContainer src={ANIMATED_GIF} width={isMobile ? '45%' : '16%'} borderRadius={themeBorderRadius.regular} />
          </FlexRow>
        ) : (
          metaDataList.length > 0 &&
          metaDataList.map((metadata, index) => <MintedArtItem key={`${metadata.name}_${index}`} metadata={metadata} />)
        )}
      </ArtListWrapper>
    </FlexColumn>
  )
}

export default MintedArtList
