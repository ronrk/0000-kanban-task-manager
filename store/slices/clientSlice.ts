import { StatusType } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { RootState } from '..';

interface IClientState {
  darkTheme: boolean;
  isDrawerOpen: boolean;
  isModalOpen: boolean;
  modalChildren: null | React.ReactNode;
  status: StatusType;
  user: any;
}

const initialState: IClientState = {
  darkTheme: true,
  isDrawerOpen: true,
  isModalOpen: false,
  modalChildren: null,
  status: StatusType.IDLE,
  user: null,
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalChildren = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.modalChildren = null;
      state.isModalOpen = false;
    },
    setActiveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  toggleTheme,
  toggleDrawer,
  openModal,
  closeModal,
  setActiveUser,
} = clientSlice.actions;

export const selectClientValue = (state: RootState) => state.client;
export default clientSlice.reducer;
