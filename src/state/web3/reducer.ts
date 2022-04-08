import { createSlice } from '@reduxjs/toolkit'

interface IState {
  gasPrice: string
  walletBalance: { ethBalance: string; cokBalance: string; hcokBalance: string; mintPassBalance: string }
  totalSupply: { cokTotalSupply: number; hcokTotalSupply: number }
}

export const initialState: IState = {
  gasPrice: '',
  walletBalance: { ethBalance: '0.00', cokBalance: '0', hcokBalance: '0', mintPassBalance: '0' },
  totalSupply: { cokTotalSupply: 0, hcokTotalSupply: 0 },
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
