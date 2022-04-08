import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
  show: boolean;
  type: 'none' | 'danger' | 'success' | 'info' | 'warning';
  message: string;
}

const initialState: AlertState = {
  show: false,
  type: 'none',
  message: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.show = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
