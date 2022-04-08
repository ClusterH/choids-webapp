import { createSlice } from '@reduxjs/toolkit';

export interface GeneratorState {
  drawing: boolean;
}

const initialState: GeneratorState = {
  drawing: false,
};

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    startDrawing: (state) => {
      state.drawing = true;
    },
    stopDrawing: (state) => {
      state.drawing = false;
    },
  },
});

export const { startDrawing, stopDrawing } = generatorSlice.actions;
export default generatorSlice.reducer;
