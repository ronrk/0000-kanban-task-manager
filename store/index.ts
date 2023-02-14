import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import clientReducer from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export * from './slices/clientSlice';
