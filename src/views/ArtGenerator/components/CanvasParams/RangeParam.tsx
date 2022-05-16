import React, { useCallback, useEffect } from 'react'

import RangeInput from 'components/RangeInput'
import { useStateWithProps } from 'hooks'
import { FlexRow, InputWrapper, TextWrapper } from 'styles/components'
import { themeBorderRadius } from 'styles/theme'

const RangeParam: React.FC<{
  label: string
  range: { min: number; max: number }
  handleRangeChange: (value: number) => void
  defaultVal?: number
}> = ({ label, range, handleRangeChange, defaultVal = 1 }) => {
  const [val, setVal] = useStateWithProps<number>(defaultVal)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value as unknown as number)
    },
    [setVal]
  )

  useEffect(() => {
    handleRangeChange(val)
  }, [handleRangeChange, val])

  return (
    <FlexRow>
      <TextWrapper color={'text8'} fontSize={'xs'} lineHeight={14}>
        {label}
      </TextWrapper>
      <FlexRow justifyContent={'flex-end'} rowWidth={'60%'}>
        <InputWrapper
          value={val}
          onChange={handleChange}
          width={'34px'}
          height={'34px'}
          padding={'0px'}
          borderRadius={themeBorderRadius.regular}
          color={'text8'}
          fontSize={'xs'}
          textAlign={'center'}
        />
        <FlexRow gap={'0px'}>
          <RangeInput onChange={setVal} defaultValue={val} min={range.min} max={range.max} step={label === 'Pen Size' ? 0.1 : 1} />
        </FlexRow>
      </FlexRow>
    </FlexRow>
  )
}

export default RangeParam
