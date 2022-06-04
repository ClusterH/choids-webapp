import React from 'react'

import AOS from 'aos'
import ReactDOM from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'
import 'aos/dist/aos.css'

import { useEagerConnect, useGetTotalSupply, useInactiveListener } from 'hooks'
import { useGetSupplyLimit } from 'hooks/useSupplyLimit'
import { ToastWrapper } from 'styles/components'
import GlobalStyles from 'styles/globalStyles'

import App from './App'
import './index.scss'
import { Providers } from './Providers'
import reportWebVitals from './reportWebVitals'

const GlobalConfig = () => {
  AOS.init({ offset: 200, duration: 1000, easing: 'ease-in-sine', delay: 300, disable: 'mobile' })
  return null
}

const GlobalHooks = () => {
  useEagerConnect()
  useInactiveListener()
  useGetSupplyLimit()
  useGetTotalSupply()

  return null
}

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <GlobalHooks />
      <GlobalStyles />
      <GlobalConfig />
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
