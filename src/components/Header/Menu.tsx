import React from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Modal from 'components/Modal/ModalWrapper'
import { useAppNavigate, useGetCurrentURLPath, useModal } from 'hooks'
import { FlexRow, HoverTextWrapper } from 'styles/components'
import { themeBreakPoint, themeFontWeight } from 'styles/theme'
import { isMobile } from 'utils'

import AboutModal from './AboutModal'
import { useMenuController } from './hook'
import ManifestoModal from './ManifestoModal'

export const MenuWrapper = styled(FlexRow)`
  display: none;

  @media ${themeBreakPoint.md} {
    display: flex;
  }
`
export const MenuItem = styled(NavLink)<{ color?: string; isDisabled?: boolean }>`
  color: ${({ theme, color }) => (color ? color : theme.text1)};
  font-weight: ${themeFontWeight.regular};
  text-decoration: none;
  padding: 0 12px;
  &:hover {
    color: ${({ theme, isDisabled }) => (isDisabled ? theme.buttonDisabled : theme.text3)};
  }
  &.active {
    color: ${({ theme }) => theme.text3};
  }
`

const Menu: React.FC = () => {
  const { handleNavigate } = useAppNavigate()
  const { isOpen, handleOpenModal } = useModal()
  const pathName = useGetCurrentURLPath()
  const { currentMenu, handleOnClick } = useMenuController()

  return (
    <MenuWrapper rowWidth={'fit-content'} gap={'48px'}>
      <HoverTextWrapper
        fontFamily={'title'}
        letterSpacing={'0.16em'}
        onClick={() => handleNavigate('/')}
        color={pathName === '/' ? 'text3' : 'text1'}
        opacity={pathName === '/' ? 1 : 0.6}
      >
        {'Home'}
      </HoverTextWrapper>
      <HoverTextWrapper
        fontFamily={'title'}
        letterSpacing={'0.16em'}
        onClick={() => {
          handleOnClick('about')
          handleOpenModal()
        }}
        color={pathName === '/about' ? 'text3' : 'text1'}
        opacity={pathName === '/about' ? 1 : 0.6}
      >
        {'About'}
      </HoverTextWrapper>
      <HoverTextWrapper
        fontFamily={'title'}
        letterSpacing={'0.16em'}
        onClick={() => {
          handleOnClick('manifesto')
          handleOpenModal()
        }}
        color={pathName === '/manifesto' ? 'text3' : 'text1'}
        opacity={pathName === '/manifesto' ? 1 : 0.6}
      >
        {'Manifesto'}
      </HoverTextWrapper>
      <Modal isOpen={isOpen} handleOpenModal={handleOpenModal} width={isMobile ? '90%' : '50%'} backgroundColor={'transparent'}>
        {currentMenu === 'about' ? <AboutModal /> : <ManifestoModal />}
      </Modal>
    </MenuWrapper>
  )
}
export default Menu
