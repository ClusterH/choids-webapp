import { createGlobalStyle, withTheme } from 'styled-components'

import { themeFontFamily } from './theme'
import { GlobalThemeProps } from './types'

const GlobalStyles = createGlobalStyle`
  :root {
    --white: #ffffff;
    --purple1: #6c05ac;
    --purple2: #6805a5;
    --purple3: #8405bf;
    --darkPurple1: #291437;
    --darkPurple2: #28152d;
    --darkPurple3: #201124;
    --darkPurple4: #3d2b41;
    --darkPurple5: #5b4162;
    --darkPurple6: #231526;
    --darkPurple7: #492c4f;
    --lightPurple1: #896393;
    --lightPurple2: #d6bddb;
    --lightPurple3: #c2adc7;
    --lightPurple4: #d2c2d6;
    --divider: #3f444e;
    --borderColor: #383d45;
    --borderColor2: #ccb4e9;
    --inputBGColor: #383d4526;
    --buttonColor1: #6c05ac;
    --buttonHoverColor1: #7819b3;
    --disable: #2b1333;
    --scrollbarTrack: #c4c4c4;
    --scrollbarThumb: #794cec;

    // toastify style
    --toastify-font-family: ${themeFontFamily.main};
    --toastify-toast-width: fit-content;
  }

  body {
    background-repeat: repeat;
    background-color: ${({ theme }: GlobalThemeProps) => theme.background1};
    background-size: cover;
    color: ${({ theme }: GlobalThemeProps) => theme.text1};
    font-family: 'Roboto' !important;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
    -webkit-font-smoothing: antialiased;
    opacity: 1;
    z-index: -1;
    transition: background-color 300ms ease-in-out 0s, opacity 800ms ease-in-out 0s;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    input, select, textarea, button { font-family: inherit; }
  }

  /* For Chrome */
  /* width */
  ::-webkit-scrollbar {
    @media all and (min-width: 990px) {
      width: 4px;
      height: 2px;
    }
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--scrollbarTrack);
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--scrollbarThumb);
    height: 24px;
    width: 24px;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--violet);
  }
`

export const gradient = {
  normal: 'linear-gradient(var(--yellow1), var(--yellow3))',
  hover: 'linear-gradient(var(--yellow2), var(--yellow3))',
  active: 'linear-gradient(var(--yellow3), var(--yellow2))',
}

export default withTheme(GlobalStyles)
