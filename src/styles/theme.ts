import { isMobile } from 'utils'

import { ThemeProps } from './types'
export const themeColor: ThemeProps = {
  // background color
  background1: 'var(--darkPurple3)',
  background2: 'var(--darkPurple4)',
  background3: 'var(--darkPurple5)',
  background4: 'var(--darkPurple6)',
  background5: 'var(--darkPurple2)',
  // text color
  text1: 'var(--white)',
  text2: 'var(--purple1)',
  text3: 'var(--purple3)',
  text4: 'var(--darkPurple7)',
  text5: 'var(--darkPurple5)',
  text6: 'var(--lightPurple3)',
  text7: 'var(--lightPurple1)',
  text8: 'var(--lightPurple4)',
  text9: 'var(--white2)',

  //button color
  button1: 'var(--buttonColor1)',
  buttonHover1: 'var(--buttonHoverColor1)',
  button2: 'var(--buttonColor2)',
  buttonHover2: 'var(--buttonHoverColor2)',
  button3: 'var(--buttonColor3)',
  buttonHover3: 'var(--buttonHoverColor3)',
  button4: 'var(--buttonColor4)',
  buttonHover4: 'var(--buttonHoverColor4)',
  button5: 'var(--buttonColor5)',
  buttonHover5: 'var(--buttonHoverColor5)',
  button6: 'var(--buttonColor6)',
  buttonHover6: 'var(--buttonHoverColor6)',

  buttonDisabled: 'var(--disable)',

  // border, divider color
  border1: '1px solid var(--purple1)',
  border2: '0.5px solid var(--divider)',
  border3: '1px solid var(--darkPurple4)',
  border4: '1px solid var(--borderColor)',
  border5: '1px solid var(--borderColor2)',
  divider: 'var(--divider)',
  // box-shadow
  boxShadow1: '0px 4px 4px rgba(0, 0, 0, 0.25);',
}

// export const themeTypography = {
//   xs: isMobile ? '0.7vmax' : '0.5vmax',
//   sm: isMobile ? '0.9vmax' : '0.7vmax',
//   base: isMobile ? '1.1vmax' : '0.9vmax',
//   lg: isMobile ? '1.2vmax' : '0.95vmax',
//   xl: isMobile ? '1.3vmax' : '1.1vmax',
//   xxl: isMobile ? '1.6vmax' : '1.4vmax',
//   xxxl: isMobile ? '1.9vmax' : '1.7vmax',
//   xxxxl: isMobile ? '3.2vmax' : '3vmax',
//   extra: isMobile ? '3.7vmax' : '3.54vmax',
// }

export const themeTypography = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '36px',
  extra: '48px',
}

export const themeFontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
}

export const themeFontFamily = {
  title: 'Roboto',
  main: 'Poppins',
}

export const themeBorderRadius = {
  none: '0',
  small: '8px',
  regular: '12px',
  medium: '24px',
  circle: '50%',
}

export const themeSize = {
  xs: '576px',
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1440px',
}

export const themeBreakPoint = {
  xs: `(min-width: ${themeSize.xs})`,
  sm: `(min-width: ${themeSize.sm})`,
  md: `(min-width: ${themeSize.md})`,
  lg: `(min-width: ${themeSize.lg})`,
  xl: `(min-width: ${themeSize.xl})`,
}
