import React, { useCallback, useEffect, useRef, useState } from 'react'

import { DotLoader } from 'react-spinners'
import styled from 'styled-components'

import ANIMATED_GIF from 'assets/images/art_animation.gif'
import PLACEHOLDER_IMG from 'assets/images/placeholder.webp'
import ProgressiveImg from 'components/ProgressiveImg'
import TotalSupplyInfo from 'components/TotalSupplyInfo'
import { useMetaDataList } from 'state/choid/hook'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { isMobile } from 'utils'
import { convertIPFSToWebURL } from 'utils/ipfsHelper'
import { IMetaData } from 'views/ArtGenerator/types'

import { useGetArtMetaData } from '../hooks'

const ArtListWrapper = styled(FlexRow)`
  overflow-x: auto;
  min-height: ${isMobile ? 'auto' : '28vh'};

  ::-webkit-scrollbar {
    display: none;
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
        <FlexRow
          rowWidth={isMobile ? '24%' : '16%'}
          minWidth={isMobile ? '24%' : '16%'}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ProgressiveImg
            src={convertIPFSToWebURL(metadata.image)}
            placeholderSrc={PLACEHOLDER_IMG}
            width={'100%'}
            height={'auto'}
            borderRadius={themeBorderRadius.regular}
            isShadow
          />
          <PopUpWrapper padding={'8px'} isPopUp={isPopUp}>
            <TextWrapper>{`${metadata.name}`}</TextWrapper>
          </PopUpWrapper>
        </FlexRow>
      ) : (
        <ImageContainer src={PLACEHOLDER_IMG} width={isMobile ? '24%' : '16%'} height={'auto'} borderRadius={themeBorderRadius.regular} />
      )}
    </>
  )
}

const MintedArtList: React.FC = () => {
  const { isLoading, handleGetArtMetaData } = useGetArtMetaData()

  const metaDataList = useMetaDataList()

  const increaseRef = useRef<HTMLDivElement>(null)
  const [increaseSet, setIncreaseSet] = useState(false)
  const [categorySlideTimer, setCategorySlideTimer] = useState<number>()

  const onMouseEnter = () => {
    window.clearInterval(categorySlideTimer)
    setCategorySlideTimer(undefined)
    setIncreaseSet(true)
  }

  const onMouseLeave = () => {
    setIncreaseSet(false)
  }

  const Timer = useCallback(() => {
    if (!increaseSet) {
      const timer = window.setInterval(() => {
        if (increaseRef.current && increaseRef.current.scrollLeft < increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0)
        }
        if (increaseRef.current && increaseRef.current.scrollLeft >= increaseRef.current.scrollWidth - increaseRef.current.clientWidth) {
          increaseRef.current.scrollTo(0, 0)
        }
      }, 30)
      setCategorySlideTimer(timer)
      setIncreaseSet(true)
    }
  }, [increaseSet])

  useEffect(() => {
    if (!increaseSet && increaseRef && increaseRef.current) {
      Timer()
    }
  }, [Timer, increaseSet])

  useEffect(() => {
    handleGetArtMetaData()
  }, [handleGetArtMetaData])

  return (
    <FlexColumn alignItems={'flex-start'} padding={isMobile ? '6%' : '0% 8%'}>
      <TextWrapper>{'RECENTLY MINTED CREATIONS'}</TextWrapper>
      <TotalSupplyInfo />

      <ArtListWrapper
        gap={isMobile ? '12px' : '24px'}
        justifyContent={'flex-start'}
        padding={'12px 0'}
        ref={increaseRef}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
      >
        {isLoading || !metaDataList ? (
          <FlexRow justifyContent={'center'}>
            {/* <DotLoader size={isMobile ? '120px' : '240px'} color={themeColor.text3} speedMultiplier={0.5} /> */}
            <ImageContainer src={ANIMATED_GIF} width={isMobile ? '45%' : '16%'} borderRadius={themeBorderRadius.regular} />
          </FlexRow>
        ) : (
          metaDataList.length > 0 &&
          metaDataList.map((metadata, index) => <MintedArtItem key={`${metadata.attributes[1].value}_${index}`} metadata={metadata} />)
        )}
      </ArtListWrapper>
    </FlexColumn>
  )
}

export default MintedArtList
