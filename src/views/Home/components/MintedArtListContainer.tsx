import React, { memo, useEffect } from 'react'

import { DotLoader } from 'react-spinners'
import styled from 'styled-components'

import { useTotalSupply } from 'hooks'
import { useSupplyLimit } from 'hooks/useSupplyLimit'
import { useMetaDataList } from 'state/choid/hook'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { isMobile } from 'utils'
import { convertIPFSToWebURL } from 'utils/ipfsHelper'

import { useGetArtMetaData } from '../hooks'

const ArtListWrapper = styled(FlexRow)`
  overflow-x: auto;
`
const ArtWrapper = styled(ImageContainer)`
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25));
  border-radius: ${themeBorderRadius.regular};
`

const MintedArtList: React.FC = () => {
  const { choidTotalSupply } = useTotalSupply()
  const supplyLimit = useSupplyLimit()

  const { isLoading, handleGetArtMetaData } = useGetArtMetaData()

  const metaDataList = useMetaDataList()

  useEffect(() => {
    handleGetArtMetaData()
  }, [handleGetArtMetaData])

  return (
    <FlexColumn alignItems={'flex-start'} padding={isMobile ? '6%' : '6% 8%'}>
      <TextWrapper>{'RECENTLY MINTED CREATIONS'}</TextWrapper>
      <TextWrapper fontWeight={'bold'} fontSize={'xl'}>{`${choidTotalSupply} / ${supplyLimit} choids minted`}</TextWrapper>

      <ArtListWrapper gap={'24px'} justifyContent={'flex-start'} padding={'12px 0'}>
        {isLoading ? (
          <FlexRow justifyContent={'center'}>
            <DotLoader size={isMobile ? '120px' : '240px'} color={themeColor.text3} speedMultiplier={0.5} />
          </FlexRow>
        ) : (
          metaDataList &&
          metaDataList.length > 0 &&
          metaDataList.map((metadata, index) => (
            <FlexRow key={`${metadata.attributes[1].value}_${index}`} rowWidth={isMobile ? '45%' : '16%'}>
              {metadata && <ArtWrapper src={convertIPFSToWebURL(metadata?.image)} />}
            </FlexRow>
          ))
        )}
      </ArtListWrapper>
    </FlexColumn>
  )
}

export default MintedArtList
