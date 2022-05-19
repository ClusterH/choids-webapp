import { createSlice } from '@reduxjs/toolkit'

interface IState {
  gasPrice: string
  walletBalance: { ethBalance: string; minterBalance: string }
  totalSupply: { minterTotalSupply: number }
}

export const initialState: IState = {
  gasPrice: '',
  walletBalance: { ethBalance: '0.00', minterBalance: '0' },
  totalSupply: { minterTotalSupply: 0 },
}

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setGasPrice(state, action) {
      if (action.payload) state.gasPrice = action.payload
    },
    setWalletBalance(state, action) {
      if (action.payload) state.walletBalance = { ...action.payload }
    },
    setTotalSupply(state, action) {
      if (action.payload) state.totalSupply = { ...state.totalSupply, ...action.payload }
    },
  },
})

export const { setGasPrice, setWalletBalance, setTotalSupply } = web3Slice.actions
export default web3Slice.reducer
