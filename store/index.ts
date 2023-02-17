import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { useDispatch } from 'react-redux';
import { boardApi } from './Api/boardApi';
import { taskApi } from './Api/taskApi';
import { userApi } from './Api/userApi';
import boardReducer from './slices/boardSlice';
import clientReducer from './slices/clientSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    board: boardReducer,
    task: taskReducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(boardApi.middleware)
      .concat(taskApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export * from './Api/boardApi';
export * from './Api/taskApi';
export * from './Api/userApi';
export * from './slices/boardSlice';
export * from './slices/clientSlice';
export * from './slices/taskSlice';
