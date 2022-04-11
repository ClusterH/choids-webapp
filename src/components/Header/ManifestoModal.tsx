import React from 'react'

import styled from 'styled-components'

import { FlexColumn, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

const ModalWrapper = styled(FlexColumn)`
  border-top: 8px solid ${themeColor.text3};
  margin-top: 12px;
  padding: 6%;
  align-items: flex-start;
  background-color: ${themeColor.background1};
`
const ManifestoModal: React.FC = () => {
  return (
    <ModalWrapper>
      <TextWrapper fontSize={'xxl'} fontWeight={'bold'} fontFamily={'title'} lineHeight={49}>
        {'Project Manifesto'}
      </TextWrapper>
      <TextWrapper fontFamily={'title'} lineHeight={32} margin={'12px 0'}>
        {
          'This project is not a start up business with a vague business plan. This is mostly an art project, mostly. This project is not hype engine driven with the intent to evoke an emotional response.'
        }
      </TextWrapper>
      <TextWrapper fontFamily={'title'} lineHeight={32} margin={'12px 0'}>
        {
          'This project will not do giveaways to build artificial interest. This project will not boast about our finances or other experiences to foster credibility.'
        }
      </TextWrapper>
      <TextWrapper fontFamily={'title'} lineHeight={32} margin={'12px 0'}>
        {
          'This project will not do a whitelist. This project is about a decentralized Community. Thus, no discord. This project is about having fun and falling in love with NFTs.'
        }
      </TextWrapper>
      <TextWrapper fontFamily={'title'} lineHeight={32} margin={'12px 0'}>
        {
          'This project is forward thinking and intends to provide significant value to the Community. We`re just not going to tell you the value comes from meeting us for a meal or working out together in a public park.'
        }
      </TextWrapper>
    </ModalWrapper>
  )
}

export default ManifestoModal
