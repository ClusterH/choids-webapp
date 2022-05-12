import React, { useCallback, useState, useEffect } from 'react'

import { IoIosArrowDown, IoIosArrowUp, IoMdCheckmark } from 'react-icons/io'
import styled from 'styled-components'

import { FlexColumn, FlexRow, HoverTextWrapper, TextWrapper } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'

const SelectBoxWrapper = styled(FlexRow)<{ isBorder?: boolean }>`
  border: ${({ isBorder }) => (isBorder ? themeColor.border3 : 'none')};
  background-color: ${themeColor.background5};
  padding: 12px;
  border-radius: ${themeBorderRadius.medium};

  &:hover {
    border: ${({ isBorder }) => (isBorder ? themeColor.border1 : 'none')};
  }
`
const OptionPanelWrapper = styled(FlexColumn)`
  position: absolute;
  top: 48px;
  left: 0;
  border: ${themeColor.border3};
  border-radius: ${themeBorderRadius.medium};
  background-color: ${themeColor.background5};
  z-index: 1;
`
const OptionWrapper = styled(FlexRow)`
  cursor: pointer;
  padding: 8px 0;
  &:hover {
    span {
      color: ${themeColor.text1};
    }
  }
`

const SelectBox: React.FC<{ optionList: string[]; isBorder: boolean; handleOptionChange: (selectedOption: string) => void }> = ({
  optionList,
  isBorder,
  handleOptionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(() => optionList[0])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleSelectOption = useCallback((option) => {
    setSelectedOption(option)
  }, [])

  useEffect(() => {
    handleOptionChange(selectedOption)
  }, [handleOptionChange, selectedOption])

  return (
    <SelectBoxWrapper isBorder={isBorder} onClick={handleOpen}>
      <TextWrapper color={'text8'} fontSize={'sm'} lineHeight={16}>
        {selectedOption ?? 'PRESET 1'}
      </TextWrapper>
      {isOpen ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
      {isOpen && (
        <OptionPanelWrapper padding={'4%'} alignItems={'flex-start'} gap={'0px'}>
          {optionList.map((item, index) => (
            <OptionWrapper
              key={`${item}_index`}
              onClick={() => {
                handleSelectOption(item)
                handleOpen()
              }}
            >
              <TextWrapper color={selectedOption === item ? 'text1' : 'text7'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
                {item}
              </TextWrapper>
              {selectedOption === item && <IoMdCheckmark size={16} />}
            </OptionWrapper>
          ))}
        </OptionPanelWrapper>
      )}
    </SelectBoxWrapper>
  )
}

export default SelectBox
