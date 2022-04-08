import React, { useEffect, useState } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import styled from 'styled-components'

import { PUBLIC_APP_FLARE_URL } from 'config/constants'
import { useAppNavigate, useHandleExternalLink } from 'hooks'
import { CloseButton, FlexColumn, FlexRow, HoverTextWrapper, TextWrapper } from 'styles/components'
import { themeBreakPoint, themeColor } from 'styles/theme'

const HamburgerContainer = styled(FlexRow)`
  display: fixed;

  @media ${themeBreakPoint.md} {
    display: none;
  }
`

const HamburgerMenuWrapper = styled(FlexColumn)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.background3};
  padding: 24px;
  border: ${({ theme }) => theme.border4};
  transition: background-color 3000ms ease-in-out 0s, opacity 8000ms ease-in-out 0s;
`
const CloseIconWrapper = styled(CloseButton)`
  position: absolute;
  top: 12px;
  right: 12px;
`
const HamburgerMenuItem: React.FC<{ label: string; navLink: string; disabled?: boolean }> = ({ label, navLink, disabled }) => {
  const { handleNavigate } = useAppNavigate()
  return (
    <FlexRow margin={'24px 0 0 0'} justifyContent={'center'}>
      <TextWrapper fontSize={'extra'} fontWeight={'bold'} fontFamily={'title'} onClick={() => handleNavigate(navLink)}>
        {label}
      </TextWrapper>
    </FlexRow>
  )
}

const HamburgerMenu: React.FC<{ setIsOpen: (isOpen: boolean) => void }> = ({ setIsOpen }) => {
  const { handleOpenExternalLink } = useHandleExternalLink()

  return (
    <HamburgerMenuWrapper justifyContent={'flex-start'} onClick={() => setIsOpen(false)}>
      <HamburgerMenuItem label={'Home'} navLink={'/'} />
      <HamburgerMenuItem label={'Partnerships'} navLink={'/partnership'} />
      <HamburgerMenuItem label={'NFT'} navLink={'/nft'} />
      <HoverTextWrapper
        fontSize={'extra'}
        fontWeight={'bold'}
        fontFamily={'title'}
        onClick={() => handleOpenExternalLink(PUBLIC_APP_FLARE_URL!)}
        margin={'24px 0 0 0'}
      >
        {'Flare Edition'}
      </HoverTextWrapper>
      <CloseIconWrapper size={30} onClick={() => setIsOpen(false)} />
    </HamburgerMenuWrapper>
  )
}
const Hamburger: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [])

  return (
    <>
      <HamburgerContainer rowWidth={'fit-content'} onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu size={24} color={themeColor.text1} />
      </HamburgerContainer>

      {isOpen && (
        <>
          <HamburgerMenu setIsOpen={setIsOpen} />
        </>
      )}
    </>
  )
}

export default Hamburger
