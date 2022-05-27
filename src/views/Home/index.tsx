import React, { lazy } from 'react'

import LazyLoad from 'react-lazyload'

import { useGetTotalSupply } from 'hooks'
import { PageWrapper } from 'styles/components'

import {
  AboutContainer1,
  AboutContainer2,
  AboutContainer3,
  AboutContainer4,
  AboutContainer5,
  AboutContainer6,
  // ArtIntroContainer,
} from './components'

const ArtIntroContainer = lazy(() => import('./components/ArtIntroContainer'))

const Home: React.FC = () => {
  useGetTotalSupply()
  return (
    <PageWrapper>
      <ArtIntroContainer />
      <LazyLoad offset={1000}>
        <AboutContainer1 />
      </LazyLoad>
      <LazyLoad offset={100}>
        <AboutContainer2 />
      </LazyLoad>
      <LazyLoad offset={300}>
        <AboutContainer3 />
      </LazyLoad>
      <LazyLoad offset={100}>
        <AboutContainer4 />
      </LazyLoad>
      <LazyLoad offset={100}>
        <AboutContainer5 />
      </LazyLoad>
      <LazyLoad offset={100}>
        <AboutContainer6 />
      </LazyLoad>
    </PageWrapper>
  )
}

export default Home
