import { IUser, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { authApi } from '../Api/authApi';

const initialState = {
  user: null,
  status: StatusType.IDLE,
  demoUser: false,
} as {
  user: null | IUser;
  status: StatusType;
  demoUser: boolean;
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setAuthenticatedUser: (state, action) => {
      state.user = action.payload;
    },
    setDemoUser: (state) => {
      state.demoUser = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
      console.log('PENDING');
      state.status = StatusType.PENDING;
    });
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
      state.status = StatusType.IDLE;
    });
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, action) => {
        if (action.payload) {
          state.status = StatusType.ERROR;
        }
        console.log({ payload: action.payload });
      }
    );
  },
});

export const { setAuthenticatedUser, logout, setDemoUser } = slice.actions;
export default slice.reducer;

export const selectUser = (state: RootState) => state.auth;
export const selectStatus = (state: RootState) => state.auth.status;
