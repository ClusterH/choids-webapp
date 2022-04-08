import React from 'react'

import { FaGasPump } from 'react-icons/fa'

import { useGasPrice } from 'hooks'
import { FlexRow, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

const GasPriceContainer: React.FC = () => {
  const gasPrice = useGasPrice()
  return (
    <FlexRow rowWidth={'fit-content'}>
      <FaGasPump size={20} color={themeColor.text3} />
      <TextWrapper>{gasPrice}</TextWrapper>
    </FlexRow>
  )
}

export default GasPriceContainer
