import React from 'react'

import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { getLibrary } from 'utils/web3Helpers'

import store from './state'
import { themeColor } from './styles/theme'

export const Providers: React.FC<any> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProvider theme={themeColor}>{children}</ThemeProvider>
      </Provider>
    </Web3ReactProvider>
  )
}
