import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'
import styled from 'styled-components'

import { useStateWithProps } from 'hooks'
import { FlexColumn, FlexRow, InputWrapper, OverlayContainer, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'
import { toColor, validHex } from 'views/ArtGenerator/utils/ColorConvertHelper'

const ColorPickerWrapper = styled(FlexColumn)`
  position: absolute;
  top: 40px;
  left: -50%;

  z-index: 1;
`

const ColorWrapper = styled(FlexRow)`
  min-width: 32px;
  border: ${themeColor.border3};
  cursor: pointer;
`

const ColorParam: React.FC<{ label: string; value: string; handleChange: (color: string) => void }> = ({ label, value, handleChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [val, setVal] = useStateWithProps<string>(value)
  const [color, setColor] = useColor('hex', value)
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (validHex(value)) {
        const color = toColor(value)
        if (color === undefined) {
          setVal(value)
          setIsValid(false)
        } else {
          setColor(color)
          setIsValid(true)
          handleChange(value)
        }
      } else setIsValid(false)
    },
    [handleChange, setColor, setVal]
  )

  const handleIsOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    setVal(color.hex)
    handleChange(color.hex)
  }, [color, handleChange, setVal])

  return (
    <FlexRow>
      <TextWrapper color={'text8'} fontSize={'xs'} lineHeight={14}>
        {label}
      </TextWrapper>
      <FlexRow justifyContent={'flex-end'} rowWidth={'60%'}>
        <ColorWrapper
          rowWidth={'32px'}
          rowHeight={'32px'}
          borderRadius={themeBorderRadius.regular}
          backgroundColor={val}
          onClick={handleIsOpen}
        />
        {isOpen && (
          <>
            <OverlayContainer onClick={handleIsOpen} opacity={0} />
            <ColorPickerWrapper>
              <ColorPicker width={240} height={120} color={color} onChange={setColor} hideHSV hideRGB dark alpha />
            </ColorPickerWrapper>
          </>
        )}
        <InputWrapper onChange={handleOnChange} value={val} border={isValid ? themeColor.border1 : '1px solid #eb2372'} />
      </FlexRow>
    </FlexRow>
  )
}

export default ColorParam
