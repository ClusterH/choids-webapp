import { createSlice } from '@reduxjs/toolkit';

export interface MintModalState {
  show: boolean;
}

const initialState: MintModalState = {
  show: false,
};

export const mintModalSlice = createSlice({
  name: 'mintModal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showMintModal: (state) => {
      console.log('showing mint modal');
      state.show = true;
    },
    hideMintModal: (state) => {
      state.show = false;
    },
  },
});

export const { showMintModal, hideMintModal } = mintModalSlice.actions;
export default mintModalSlice.reducer;
