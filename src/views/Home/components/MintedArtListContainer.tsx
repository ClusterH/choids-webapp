import React, { memo } from 'react'

import ART_IMG1 from 'assets/images/art_img.svg'
import ART_IMG2 from 'assets/images/art_img2.svg'
import { FlexColumn, FlexRow, ImageContainer, MainButton, TextWrapper } from 'styles/components'

const MintedArtList: React.FC = () => {
  return (
    <FlexColumn alignItems={'flex-start'}>
      <TextWrapper>{'RECENTLY MINTED ARTS'}</TextWrapper>
      {/* Static Art List atm */}
      <FlexRow>
        <ImageContainer src={ART_IMG2} maxWidth={'16%'} />
        <ImageContainer src={ART_IMG2} maxWidth={'16%'} />
        <ImageContainer src={ART_IMG1} maxWidth={'16%'} />
        <ImageContainer src={ART_IMG1} maxWidth={'16%'} />
        <ImageContainer src={ART_IMG2} maxWidth={'16%'} />
      </FlexRow>
    </FlexColumn>
  )
}

export default memo(MintedArtList)
