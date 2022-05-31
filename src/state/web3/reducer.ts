import { createSlice } from '@reduxjs/toolkit'

interface IState {
  gasPrice: string
  walletBalance: { ethBalance: string; choidBalance: string }
  totalSupply: { choidTotalSupply: number }
  supplyLimit: number
}

export const initialState: IState = {
  gasPrice: '',
  walletBalance: { ethBalance: '0.00', choidBalance: '0' },
  totalSupply: { choidTotalSupply: 0 },
  supplyLimit: 0,
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
    setSupplyLimit(state, action) {
      if (action.payload) state.supplyLimit = action.payload
    },
  },
})

export const { setGasPrice, setWalletBalance, setTotalSupply, setSupplyLimit } = web3Slice.actions
export default web3Slice.reducer
