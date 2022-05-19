import React from 'react'

import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

import { DEFAULT_CHAIN_ID } from 'config/constants'
import { useActiveWeb3React, useGetTotalSupply, useHandleExternalLink, useTotalSupply } from 'hooks'
import { FlexColumn, FlexRow, ImageContainer, InputWrapper, MainButton, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { getMintableAddress } from 'utils'
import { getOpenSeaLink } from 'utils/openseaHelper'

import { useGenerateArtMetaData } from '../hooks'
import { shortString } from '../utils/encodeHelper'

const LongTextWrapper = styled(TextWrapper)`
  word-break: break-all;
`

const MintModal: React.FC = () => {
  useGetTotalSupply()
  const { name, artMetaData, artImgData, creatorName, isLoading, isMinting, isMinted, handleOnChange, handleMint } =
    useGenerateArtMetaData()
  const { handleOpenExternalLink } = useHandleExternalLink()
  const { chainId } = useActiveWeb3React()
  const { choidTotalSupply } = useTotalSupply()

  const choidAddress = getMintableAddress(chainId ?? DEFAULT_CHAIN_ID)

  return (
    <FlexRow rowHeight={isLoading ? '40vh' : 'auto'} justifyContent={'center'}>
      {isLoading ? (
        <FlexColumn>
          <ClipLoader size={120} color={themeColor.text1} />
          <TextWrapper fontSize={'xl'} fontWeight={'bold'}>
            {'Uploading image to ipfs....'}
          </TextWrapper>
        </FlexColumn>
      ) : (
        <>
          <ImageContainer src={URL.createObjectURL(artImgData)} width={'50%'} borderRadius={themeBorderRadius.regular} />
          {isMinted ? (
            <FlexColumn colHeight={'100%'} justifyContent={'flex-end'}>
              <TextWrapper fontSize={'xl'} fontWeight={'bold'} lineHeight={78}>
                {'BlockChain Choid Minted'}
              </TextWrapper>
              <MainButton
                onClick={() =>
                  handleOpenExternalLink(
                    `${getOpenSeaLink(chainId ?? DEFAULT_CHAIN_ID, Number(choidTotalSupply) + 1, choidAddress.toLowerCase())}`
                  )
                }
              >
                {'View on OpenSea'}
              </MainButton>
            </FlexColumn>
          ) : (
            <FlexColumn colWidth={'46%'} justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper fontWeight={'medium'}>{'Name your piece'}</TextWrapper>
              <InputWrapper height={'40px'} onChange={handleOnChange} />
              <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
                <TextWrapper fontWeight={'medium'}>{'DNA:'}</TextWrapper>
                <LongTextWrapper>{shortString(artMetaData.dna, 14)}</LongTextWrapper>
              </FlexRow>
              <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
                <TextWrapper fontWeight={'medium'}>{'Description:'}</TextWrapper>
                <TextWrapper>{'This is the Description'}</TextWrapper>
              </FlexRow>
              <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
                <TextWrapper fontWeight={'medium'}>{'Image:'}</TextWrapper>
                <LongTextWrapper>{artMetaData.image}</LongTextWrapper>
              </FlexRow>
              <FlexColumn justifyContent={'flex-start'} alignItems={'flex-start'}>
                <TextWrapper fontWeight={'medium'}>{'Attributes:'}</TextWrapper>
                <FlexRow justifyContent={'flex-start'} margin={'0 0 0 24px'}>
                  <TextWrapper>{'Creator:'}</TextWrapper>
                  <TextWrapper>{creatorName}</TextWrapper>
                </FlexRow>
                <FlexRow justifyContent={'flex-start'} margin={'0 0 0 24px'}>
                  <TextWrapper>{'Birth Date:'}</TextWrapper>
                  <TextWrapper>{new Date().toLocaleDateString()}</TextWrapper>
                </FlexRow>
                <FlexRow justifyContent={'flex-start'} margin={'0 0 0 24px'}>
                  <TextWrapper>{'Edition:'}</TextWrapper>
                  <TextWrapper>{'First Generation'}</TextWrapper>
                </FlexRow>
              </FlexColumn>
              <MainButton width={'100%'} height={'40px'} onClick={handleMint} disabled={name === '' || isMinting}>
                {'Confirm Mint'}&nbsp;
                {isMinting && <ClipLoader size={24} color={themeColor.text1} />}
              </MainButton>
            </FlexColumn>
          )}
        </>
      )}
    </FlexRow>
  )
}

export default MintModal
