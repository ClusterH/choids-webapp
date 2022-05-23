import React from 'react'

import { useGetTotalSupply } from 'hooks'
import { PageWrapper } from 'styles/components'

import {
  AboutContainer1,
  AboutContainer2,
  AboutContainer3,
  AboutContainer4,
  AboutContainer5,
  AboutContainer6,
  ArtIntroContainer,
} from './components'

const Home: React.FC = () => {
  useGetTotalSupply()
  return (
    <PageWrapper>
      <ArtIntroContainer />
      <AboutContainer1 />
      <AboutContainer2 />
      <AboutContainer3 />
      <AboutContainer4 />
      <AboutContainer5 />
      <AboutContainer6 />
    </PageWrapper>
  )
}

export default Home
