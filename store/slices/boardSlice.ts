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
  reducers: {
    changeActiveBoard: (state, action) => {
      const foundBoard = state.boards.find(
        (board) => board._id === action.payload
      );
      if (foundBoard) {
        state.currentBoard = foundBoard;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      boardApi.endpoints.getBoardsByUID.matchPending,
      (state) => {
        console.log('PENDING');
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchPending,
      (state) => {
        console.log('PENDING');
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.createNewBoard.matchPending,
      (state) => {
        console.log('PENDING');
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.deleteBoardById.matchPending,
      (state) => {
        console.log('PENDING');
        state.status = StatusType.PENDING;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchFulfilled,
      (state) => {
        state.status = StatusType.FULLFILED;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardsByUID.matchFulfilled,
      (state, action) => {
        state.boards = action.payload.data;
        if (action.payload.data.length > 0 && !state.currentBoard) {
          state.currentBoard = action.payload.data[0];
        }
        if (state.currentBoard) {
          const updateBoardIdx = state.boards.findIndex(
            (board) => board._id === state.currentBoard!._id
          );

          if (updateBoardIdx !== -1) {
            state.currentBoard = state.boards[updateBoardIdx];
          } else {
            state.currentBoard = state.boards[0];
          }
        }
        state.status = StatusType.FULLFILED;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.createNewBoard.matchFulfilled,
      (state, action) => {
        state.status = StatusType.FULLFILED;
        state.boards = action.payload.data;
        state.currentBoard =
          action.payload.data[action.payload.data.length - 1];
      }
    );

    builder.addMatcher(
      boardApi.endpoints.deleteBoardById.matchFulfilled,
      (state) => {
        state.status = StatusType.FULLFILED;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.getBoardsByUID.matchRejected,
      (state, action) => {
        console.log({ payload: action.payload, error: action.error });
        state.status = StatusType.ERROR;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchRejected,
      (state, action) => {
        console.log({ payload: action.payload, error: action.error });
        state.status = StatusType.ERROR;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.createNewBoard.matchRejected,
      (state, action) => {
        console.log({ payload: action.payload, error: action.error });
        state.status = StatusType.ERROR;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.deleteBoardById.matchRejected,
      (state, action) => {
        console.log({ payload: action.payload, error: action.error });
        state.status = StatusType.ERROR;
      }
    );
  },
});

export const { changeActiveBoard } = slice.actions;
export default slice.reducer;

export const selectBoardValue = (state: RootState) => state.boards;
