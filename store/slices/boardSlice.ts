import { IBoard, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { boardApi } from '../Api/boardApi';

const initialState = {
  boards: [],
  currentBoard: null,
  status: StatusType.IDLE,
} as { boards: IBoard[]; currentBoard: IBoard | null; status: StatusType };

const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchFulfilled,
      (state, action) => {
        console.log('GET BOARD BY ID');
        console.log({ payload: action.payload });
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardsByUID.matchFulfilled,
      (state, action) => {
        console.log('GET BOARD BY UID');
        console.log({ payload: action.payload });
      }
    );
    builder.addMatcher(
      boardApi.endpoints.createNewBoard.matchFulfilled,
      (state, action) => {
        console.log('CREATE NEW BOARD');
        console.log({ payload: action.payload });
      }
    );
  },
});

// export const {  } = slice.actions;
export default slice.reducer;

export const selectBoardValue = (state: RootState) => state.boards;
