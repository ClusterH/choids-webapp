import React from 'react'

import { FaEthereum } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

import { DEFAULT_CHAIN_ID } from 'config/constants'
import { useActiveWeb3React, useGetTotalSupply, useHandleExternalLink } from 'hooks'
import { useIsMinting } from 'state/artGenerator/hook'
import { usePrice } from 'state/choid/hook'
import { FlexColumn, FlexRow, ImageContainer, InputWrapper, MainButton, TextWrapper, TransparentButton } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { ExplorerDataType, getExplorerLink, getMintableAddress } from 'utils'
import { getOpenSeaLink } from 'utils/openseaHelper'

import { useMint } from '../hooks'
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
  const { name, dna, artImgData, creatorName, isMinted, txData, handleOnChange, handleMint } = useMint()
  const { handleOpenExternalLink } = useHandleExternalLink()
  const { chainId } = useActiveWeb3React()
  const price = usePrice()
  const isMinting = useIsMinting()

  const choidAddress = getMintableAddress(chainId ?? DEFAULT_CHAIN_ID)

  return (
    <FlexRow rowWidth={'100%'} rowHeight={'auto'} justifyContent={'center'} padding={'32px 0'}>
      <>
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
            <TransparentButton
              onClick={() => {
                if (txData === undefined) return
                handleOpenExternalLink(`${getExplorerLink(chainId ?? DEFAULT_CHAIN_ID, txData.txHash, ExplorerDataType.TRANSACTION)}`)
              }}
            >
              {'View on Etherscan'}
            </TransparentButton>
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
              {isMinting ? 'Minting...' : 'Confirm Mint'}&nbsp;
              {isMinting && <ClipLoader size={24} color={themeColor.text1} />}
            </MainButton>
          </FlexColumn>
        )}
      </>
    </FlexRow>
  )
}

export default MintModal
