import React from 'react'

import ETHERSCAN_ICON from 'assets/images/etherscan_icon.svg'
import OPENSEA_ICON from 'assets/images/opensea_icon.svg'
import TWITTER_ICON from 'assets/images/twitter_white.svg'
import { useHandleExternalLink } from 'hooks'
import { FlexRow, ImageContainer } from 'styles/components'

const SocialIconsContainer: React.FC = () => {
  const { handleOpenExternalLink } = useHandleExternalLink()

  return (
    <FlexRow rowWidth={'fit-content'}>
      <ImageContainer src={TWITTER_ICON} alt={'twitter'} width={'32px'} onClick={() => handleOpenExternalLink('https://twitter.com')} />
      <ImageContainer
        src={ETHERSCAN_ICON}
        alt={'etherscan'}
        width={'32px'}
        onClick={() => handleOpenExternalLink('https://etherscan.io')}
      />
      <ImageContainer src={OPENSEA_ICON} alt={'opensea'} width={'32px'} onClick={() => handleOpenExternalLink('https://opensea.io')} />
    </FlexRow>
  )
}

export default SocialIconsContainer
