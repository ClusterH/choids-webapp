import React from 'react'

import { useGetTotalSupply } from 'hooks'
import { PageWrapper } from 'styles/components'

import { MainContainer } from './components'

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <MainContainer />
    </PageWrapper>
  )
}

export default Home
