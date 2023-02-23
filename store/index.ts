import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './Api/authApi';
import { boardApi } from './Api/boardApi';
import { taskApi } from './Api/taskApi';
import auth from './slices/authSlice';
import boards from './slices/boardSlice';
import client from './slices/clientSlice';
import tasks from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    client,
    auth,
    boards,
    tasks,
    [authApi.reducerPath]: authApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(boardApi.middleware)
      .concat(taskApi.middleware),
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
