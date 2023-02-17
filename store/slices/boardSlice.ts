import { IBoard, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { boardApi, RootState, setActiveUser, userApi } from '..';

interface IBoardState {
  data: IBoard[];
  status: StatusType;
  activeBoard: IBoard | null;
}

const initialState: IBoardState = {
  data: [],
  activeBoard: null,
  status: StatusType.IDLE,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    changeActiveBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(setActiveUser, (state, action) => {
      state.activeBoard = action.payload.boards[0];
      state.data = action.payload.boards;
    });
    builder.addMatcher(
      userApi.endpoints.getUserByUID.matchFulfilled,
      (state, action) => {
        console.log({ action: action.payload });
        state.activeBoard = action.payload.boards[0];
        state.data = action.payload.boards;
      }
    );

    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchPending,
      (state) => {
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchFulfilled,
      (state, action) => {
        if (!state.activeBoard && action.payload.length > 0) {
          state.activeBoard = action.payload[0];
        }

        state.status = StatusType.FULLFILED;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchRejected,
      (state, action) => {
        state.status = StatusType.ERROR;
        console.log({ error: action.error, payload: action.payload });
      }
    );
    builder.addMatcher(
      boardApi.endpoints.createNewBoard.matchFulfilled,
      (state, action) => {
        state.activeBoard = action.payload.newBoard;
        state.data.push(action.payload.newBoard);
      }
    );
  },
});

export const { changeActiveBoard } = boardSlice.actions;

export const selectBoardValue = (state: RootState) => state.board;
export default boardSlice.reducer;
