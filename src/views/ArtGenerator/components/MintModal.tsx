import React from 'react'

import { ClipLoader } from 'react-spinners'

import { FlexColumn, FlexRow, ImageContainer, InputWrapper, MainButton, TextWrapper } from 'styles/components'
import { themeBorderRadius } from 'styles/theme'

import { useArtMetaData } from '../hooks'

const MintModal: React.FC = () => {
  const { metaData, artImgData, isLoading } = useArtMetaData()
  // const decoded = b64DecodeUnicode(encoded)
  return (
    <FlexRow rowHeight={isLoading ? '30vh' : 'auto'}>
      {isLoading ? (
        <ClipLoader size={120} />
      ) : (
        <>
          <ImageContainer src={artImgData} width={'50%'} borderRadius={themeBorderRadius.regular} />
          <FlexColumn colWidth={'46%'} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <TextWrapper>{'Name your piece'}</TextWrapper>
            <InputWrapper />
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'DNA:'}</TextWrapper>
              <TextWrapper>{'This is the DNA'}</TextWrapper>
            </FlexRow>
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'Description:'}</TextWrapper>
              <TextWrapper>{'This is the Description'}</TextWrapper>
            </FlexRow>
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'Image:'}</TextWrapper>
              <TextWrapper>{'Image URI'}</TextWrapper>
            </FlexRow>
            <FlexRow justifyContent={'flex-start'} alignItems={'flex-start'}>
              <TextWrapper>{'Attributes:'}</TextWrapper>
              <TextWrapper>{'This is the Attributes'}</TextWrapper>
            </FlexRow>
            <MainButton width={'100%'}>{'Confirm Mint'}</MainButton>
          </FlexColumn>
        </>
      )}
    </FlexRow>
  )
}

export default MintModal
