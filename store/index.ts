import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { boardApi } from './Api/boardApi';
import boardReducer from './slices/boardSlice';
import clientReducer from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    board: boardReducer,
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(boardApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export * from './Api/boardApi';
export * from './slices/boardSlice';
export * from './slices/clientSlice';
export * from './thunks/boardThunks';
