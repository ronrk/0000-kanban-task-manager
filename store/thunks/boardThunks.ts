import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTemplateBoard = createAsyncThunk(
  'getTemplateBoard',
  async () => {
    try {
      const res = await fetch('ttp://localhost:3000/api/boards?template=tru');
      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }
);
