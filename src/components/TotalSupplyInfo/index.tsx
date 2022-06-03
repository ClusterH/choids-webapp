import React from 'react'

import { useTotalSupply } from 'hooks'
import { useSupplyLimit } from 'hooks/useSupplyLimit'
import { TextWrapper } from 'styles/components'

const TotalSupplyInfo: React.FC<{ isLanding?: boolean }> = ({ isLanding = false }) => {
  const { choidTotalSupply } = useTotalSupply()
  const supplyLimit = useSupplyLimit()

  return (
    <TextWrapper fontWeight={'bold'} fontSize={'xl'}>{`${choidTotalSupply} / ${supplyLimit} ${
      isLanding ? 'Choids' : ''
    }minted`}</TextWrapper>
  )
}

export default TotalSupplyInfo
