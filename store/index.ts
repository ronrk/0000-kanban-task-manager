import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './Api/authApi';
import { boardApi } from './Api/boardApi';
import auth from './slices/authSlice';
import boards from './slices/boardSlice';
import client from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    client,
    auth,
    boards,
    [authApi.reducerPath]: authApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(boardApi.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './Api/authApi';
export * from './Api/boardApi';
export * from './Api/taskApi';
export * from './Api/userApi';
export * from './slices/authSlice';
export * from './slices/boardSlice';
export * from './slices/clientSlice';
export * from './slices/taskSlice';
