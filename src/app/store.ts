import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import alertReducer from '../features/alertSlice';
import accountReducer from '../features/accountSlice';
import walletSelectReducer from '../features/walletSelectSlice';
import mintModalReducer from '../features/mintModalSlice';
import generatorReducer from '../features/generatorSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    account: accountReducer,
    walletSelect: walletSelectReducer,
    mintModal: mintModalReducer,
    generator: generatorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
