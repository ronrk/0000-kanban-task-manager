import { IBoard, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { boardApi, RootState, setActiveUser } from '..';

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
      console.log({ CHANGEACTIVEBOARDS: action.payload });
      state.activeBoard = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(setActiveUser, (state, action) => {
      console.log({ boardSliceSetActiveUser: action.payload });
      if (!action.payload) {
        return;
      }
      state.data = action.payload.boards;
    });

    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchPending,
      (state) => {
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardsByUID.matchPending,
      (state) => {
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.createNewBoard.matchFulfilled,
      (state, action) => {
        console.log({ boardCreateNewBoard: action.payload });
        /*         state.activeBoard = action.payload.data;
        state.data.push(action.payload.data); */
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardById.matchFulfilled,
      (state, action) => {
        console.log({ boardSliceGetBoard: action.payload });
        state.activeBoard = action.payload.data;

        state.status = StatusType.FULLFILED;
      }
    );
    builder.addMatcher(
      boardApi.endpoints.getBoardsByUID.matchFulfilled,
      (state, action) => {
        console.log({ boardSliceGetBoardsByUID: action.payload });
        if (action.payload.data.length > 0) {
          state.data = action.payload.data;
          state.activeBoard =
            action.payload.data[action.payload.data.length - 1];
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
      boardApi.endpoints.getBoardsByUID.matchRejected,
      (state, action) => {
        state.status = StatusType.ERROR;
        console.log(action.payload);
      }
    );
  },
});

export const { changeActiveBoard } = boardSlice.actions;

export const selectBoardValue = (state: RootState) => state.board;
export default boardSlice.reducer;
