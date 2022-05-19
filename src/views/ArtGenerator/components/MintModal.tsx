import React from 'react'

import { ClipLoader } from 'react-spinners'
import styled from 'styled-components'

import { useArtMetaData } from 'state/artGenerator/hook'
import { FlexColumn, FlexRow, ImageContainer, InputWrapper, MainButton, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'

import { useGenerateArtMetaData } from '../hooks'
import { shortString } from '../utils/encodeHelper'

const LongTextWrapper = styled(TextWrapper)`
  word-break: break-all;
`

const MintModal: React.FC = () => {
  const { name, artMetaData, artImgData, creatorName, isLoading, handleOnChange, handleMint } = useGenerateArtMetaData()

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
          <ImageContainer src={artImgData} width={'50%'} borderRadius={themeBorderRadius.regular} />
          <FlexColumn colWidth={'46%'} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <TextWrapper>{'Name your piece'}</TextWrapper>
            <InputWrapper height={'40px'} onChange={handleOnChange} />
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'DNA:'}</TextWrapper>
              <LongTextWrapper>{shortString(artMetaData.dna, 14)}</LongTextWrapper>
            </FlexRow>
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'Description:'}</TextWrapper>
              <TextWrapper>{'This is the Description'}</TextWrapper>
            </FlexRow>
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'Image:'}</TextWrapper>
              <LongTextWrapper>{artMetaData.image}</LongTextWrapper>
            </FlexRow>
            <FlexColumn justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'Attributes:'}</TextWrapper>
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
            <MainButton width={'100%'} height={'40px'} onClick={handleMint} disabled={name === ''}>
              {'Confirm Mint'}
            </MainButton>
          </FlexColumn>
        </>
      )}
    </FlexRow>
  )
}

export default MintModal
