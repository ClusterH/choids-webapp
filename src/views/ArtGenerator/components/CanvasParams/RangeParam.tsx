import React, { useCallback, useState } from 'react'

import styled from 'styled-components'

import RangeInput from 'components/RangeInput'
import { FlexRow, InputWrapper, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'

const RangeParam: React.FC<{ label: string; range: { min: number; max: number }; defaultVal?: number }> = ({
  label,
  range,
  defaultVal = 0,
}) => {
  const [val, setVal] = useState<number>(() => defaultVal)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value as unknown as number)
  }, [])

  return (
    <FlexRow>
      <TextWrapper color={'text8'} fontSize={'xs'} lineHeight={14}>
        {label}
      </TextWrapper>
      <InputWrapper
        value={val}
        onChange={handleChange}
        width={'32px'}
        height={'32px'}
        padding={'0px'}
        borderRadius={themeBorderRadius.regular}
        color={'text8'}
        fontSize={'xs'}
        textAlign={'center'}
      />
      <FlexRow rowWidth={'60%'} gap={'0px'}>
        <RangeInput onChange={setVal} defaultValue={val} min={range.min} max={range.max} />
      </FlexRow>
    </FlexRow>
  )
}

export default RangeParam
