import React from 'react'

import ReactDOM from 'react-dom'

import { useEagerConnect, useGetTotalSupply, useGetWalletBalance, useInactiveListener, usePollGasPrice } from 'hooks'
import 'react-toastify/dist/ReactToastify.css'
import { ToastWrapper } from 'styles/components'
import GlobalStyles from 'styles/globalStyles'

import App from './App'
import './index.scss'
import { Providers } from './Providers'
import reportWebVitals from './reportWebVitals'

const GlobalHooks = () => {
  useEagerConnect()
  useInactiveListener()
  usePollGasPrice()
  useGetWalletBalance()
  useGetTotalSupply()

  return null
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <GlobalHooks />
      <GlobalStyles />
      <ToastWrapper
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'colored'}
      />
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
