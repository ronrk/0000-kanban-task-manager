import { IBoard, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface IBoardState {
  data: any[];
  templateBord: IBoard | null;
  status: StatusType;
}

const initialState: IBoardState = {
  data: [],
  templateBord: null,
  status: StatusType.IDLE,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createTemplateBoard: (state, action) => {},
  },
});

export const { createTemplateBoard } = boardSlice.actions;

export const selectBoardValue = (state: RootState) => state.board;
export default boardSlice.reducer;
