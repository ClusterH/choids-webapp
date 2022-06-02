import React from 'react'

import { FaDiscord, FaTwitter } from 'react-icons/fa'

import ETHERSCAN_ICON from 'assets/images/etherscan_icon.svg'
import OPENSEA_ICON from 'assets/images/opensea_icon.svg'
import { DEFAULT_CHAIN_ID, DISCORD_LINK, TWITTER_LINK } from 'config/constants'
import { useActiveWeb3React, useHandleExternalLink } from 'hooks'
import { FlexRow, ImageContainer } from 'styles/components'
import { themeColor } from 'styles/theme'
import { ExplorerDataType, getExplorerLink, getMintableAddress } from 'utils'
import { OPENSEA_PREFIXES } from 'utils/openseaHelper'

const SocialIconsContainer: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const { handleOpenExternalLink } = useHandleExternalLink()

  return (
    <FlexRow rowWidth={'fit-content'}>
      <FaTwitter
        fill={themeColor.text1}
        fillOpacity={'0.6'}
        size={32}
        cursor={'pointer'}
        onClick={() => handleOpenExternalLink(TWITTER_LINK)}
      />
      <FaDiscord
        fill={themeColor.text1}
        fillOpacity={'0.6'}
        size={38}
        cursor={'pointer'}
        onClick={() => handleOpenExternalLink(DISCORD_LINK)}
      />
      <ImageContainer
        src={ETHERSCAN_ICON}
        alt={'etherscan'}
        width={'32px'}
        cursor={'pointer'}
        onClick={() =>
          handleOpenExternalLink(
            `${getExplorerLink(chainId ?? DEFAULT_CHAIN_ID, getMintableAddress(chainId ?? DEFAULT_CHAIN_ID), ExplorerDataType.TOKEN)}`
          )
        }
      />
      <ImageContainer
        src={OPENSEA_ICON}
        alt={'opensea'}
        width={'32px'}
        cursor={'pointer'}
        onClick={() =>
          handleOpenExternalLink(`https://${OPENSEA_PREFIXES[chainId ?? DEFAULT_CHAIN_ID] ?? ''}opensea.io/collection/blockchain-choids-v4`)
        }
      />
    </FlexRow>
  )
}

export default SocialIconsContainer
