import React, { useCallback, useState } from 'react'

import styled from 'styled-components'

import { FlexRow, InputWrapper, TextWrapper } from 'styles/components'
import { themeBorderRadius } from 'styles/theme'

const ColorInput = styled(InputWrapper)`
  padding: 0;
  border-radius: ${themeBorderRadius.regular};

  border: none;
  outline: none;
  -webkit-appearance: none;
  ::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  ::-webkit-color-swatch {
    border: none;
    border-radius: ${themeBorderRadius.regular};
  }
`

const ColorParam: React.FC<{ label: string; value: string; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({
  label,
  value,
  handleChange,
}) => {
  return (
    <FlexRow>
      <TextWrapper color={'text8'} fontSize={'xs'} lineHeight={14}>
        {label}
      </TextWrapper>
      <ColorInput type={'color'} value={value} onChange={handleChange} width={'32px'} height={'32px'} />
      <InputWrapper value={value} onChange={handleChange} width={'60%'} height={'32px'} />
    </FlexRow>
  )
}

export default ColorParam
