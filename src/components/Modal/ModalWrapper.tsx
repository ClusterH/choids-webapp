import React from 'react'

import styled from 'styled-components'

import { FadeAnimationWrapper } from 'components/AnimationWrapper'
import { CloseIconWrapper, FlexColumn, OverlayContainer } from 'styles/components'
import { themeBorderRadius, themeColor } from 'styles/theme'

const ModalWrapper = styled(FlexColumn)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  z-index: 999;
`

interface IModalProps {
  isOpen: boolean
  handleOpenModal: () => void
  width?: string
  backgroundColor?: string
  isBorder?: boolean
  isCloseDisabled?: boolean
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, handleOpenModal, width, backgroundColor, isBorder, isCloseDisabled }) => {
  if (!isOpen) return null

  return (
    <>
      <FadeAnimationWrapper>
        <OverlayContainer
          onClick={() => {
            isCloseDisabled !== true && handleOpenModal()
          }}
        />
        <ModalWrapper
          backgroundColor={backgroundColor ? backgroundColor : themeColor.background4}
          borderRadius={themeBorderRadius.small}
          colWidth={width ?? '30%'}
          border={isBorder ? themeColor.border4 : 'none'}
        >
          {children}
          <CloseIconWrapper
            onClick={() => {
              isCloseDisabled !== true && handleOpenModal()
            }}
          />
        </ModalWrapper>
      </FadeAnimationWrapper>
    </>
  )
}

export default Modal
