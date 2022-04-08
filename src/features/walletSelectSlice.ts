import { createSlice } from '@reduxjs/toolkit';

export interface WalletSelectState {
  show: boolean;
}

const initialState: WalletSelectState = {
  show: false,
};

export const walletSelectSlice = createSlice({
  name: 'walletSelect',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showWalletSelect: (state) => {
      console.log('showWll slice');
      state.show = true;
    },
    hideWalletSelect: (state) => {
      state.show = false;
    },
  },
});

export const { showWalletSelect, hideWalletSelect } = walletSelectSlice.actions;
export default walletSelectSlice.reducer;
