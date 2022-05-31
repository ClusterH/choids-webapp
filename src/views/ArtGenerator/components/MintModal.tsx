import React from 'react'

import { FaEthereum } from 'react-icons/fa'
import { ClipLoader, PulseLoader } from 'react-spinners'
import styled from 'styled-components'

import ANIMATED_GIF from 'assets/images/art_animation.gif'
import { DEFAULT_CHAIN_ID } from 'config/constants'
import { useActiveWeb3React, useGetTotalSupply, useHandleExternalLink, useTotalSupply } from 'hooks'
import { usePrice } from 'state/choid/hook'
import { FlexColumn, FlexRow, HoverTextWrapper, ImageContainer, InputWrapper, MainButton, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { ExplorerDataType, getExplorerLink, getMintableAddress } from 'utils'
import { getOpenSeaLink } from 'utils/openseaHelper'

import { useGenerateArtMetaData } from '../hooks'
import { shortString } from '../utils/encodeHelper'

const LongTextWrapper = styled(TextWrapper)`
  word-break: break-all;
`
const PriceWrapper = styled(FlexRow)`
  position: absolute;
  right: 0px;
  top: -30px;
`

const MintModal: React.FC = () => {
  useGetTotalSupply()
  const { name, dna, artImgData, creatorName, isDuplicatedName, isMinting, isMinted, txData, handleOnChange, handleMint } =
    useGenerateArtMetaData()
  const { handleOpenExternalLink } = useHandleExternalLink()
  const { chainId } = useActiveWeb3React()
  const price = usePrice()

  const choidAddress = getMintableAddress(chainId ?? DEFAULT_CHAIN_ID)

  return (
    <FlexRow rowWidth={'100%'} rowHeight={'auto'} justifyContent={'center'} padding={'32px 0'}>
      {/* {isLoading ? (
        <FlexColumn>
          <ImageContainer src={ANIMATED_GIF} borderRadius={themeBorderRadius.regular} maxWidth={'50%'} />
          <TextWrapper fontSize={'xl'} fontWeight={'bold'}>
            {'Uploading image to ipfs'}
            <PulseLoader size={6} margin={2} color={themeColor.text1} />
          </TextWrapper>
        </FlexColumn>
      ) : ( */}
      <>
        {/* <ImageContainer src={URL.createObjectURL(artImgData)} width={'50%'} borderRadius={themeBorderRadius.regular} /> */}
        <ImageContainer src={artImgData} width={'50%'} borderRadius={themeBorderRadius.regular} />
        {isMinted ? (
          <FlexColumn colHeight={'100%'} justifyContent={'flex-end'}>
            <TextWrapper fontSize={'xl'} fontWeight={'bold'} lineHeight={78}>
              {'BlockChain Choid Minted'}
            </TextWrapper>
            <MainButton
              onClick={() => {
                if (txData === undefined) return
                handleOpenExternalLink(`${getOpenSeaLink(chainId ?? DEFAULT_CHAIN_ID, txData.id, choidAddress.toLowerCase())}`)
              }}
            >
              {'View on OpenSea'}
            </MainButton>
            <HoverTextWrapper
              onClick={() => {
                if (txData === undefined) return
                handleOpenExternalLink(`${getExplorerLink(chainId ?? DEFAULT_CHAIN_ID, txData.txHash, ExplorerDataType.TRANSACTION)}`)
              }}
            >
              {'View on Etherscan'}
            </HoverTextWrapper>
          </FlexColumn>
        ) : (
          <FlexColumn colWidth={'46%'} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <PriceWrapper rowWidth={'fit-content'} gap={'8px'}>
              <FaEthereum color={themeColor.background3} size={20} />
              <TextWrapper fontWeight={'bold'} fontSize={'xl'}>
                {price}
              </TextWrapper>
            </PriceWrapper>
            <FlexRow>
              <TextWrapper fontWeight={'medium'}>{'Name your piece'}</TextWrapper>
              <TextWrapper color={'text2'}>{`${name.length} / 30`}</TextWrapper>
            </FlexRow>
            <InputWrapper height={'40px'} onChange={handleOnChange} maxLength={30} />
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper fontWeight={'medium'}>{'DNA:'}</TextWrapper>
              <LongTextWrapper>{shortString(dna, 14)}</LongTextWrapper>
            </FlexRow>
            {/* <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper fontWeight={'medium'}>{'Image:'}</TextWrapper>
              <LongTextWrapper>{artMetaData.image}</LongTextWrapper>
            </FlexRow> */}
            <FlexColumn justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper fontWeight={'medium'}>{'Attributes:'}</TextWrapper>
              <FlexRow justifyContent={'flex-start'} margin={'0 0 0 24px'}>
                <TextWrapper>{'Creator:'}</TextWrapper>
                <TextWrapper>{creatorName}</TextWrapper>
              </FlexRow>
              <FlexRow justifyContent={'flex-start'} margin={'0 0 0 24px'}>
                <TextWrapper>{'Created On:'}</TextWrapper>
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
      {/* )} */}
    </FlexRow>
  )
}

export default MintModal
