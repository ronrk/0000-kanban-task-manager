import { IColumn, ITask, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState, taskApi } from '..';

const initialState = {
  tasks: [],
  currentColumn: null,
  status: StatusType.IDLE,
} as { tasks: ITask[]; currentColumn: IColumn | null; status: StatusType };

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentColumn: (state, action) => {
      state.currentColumn = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      taskApi.endpoints.getTasksByColId.matchPending,
      (state) => {
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.getTasksByColId.matchFulfilled,
      (state) => {
        state.status = StatusType.FULLFILED;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.getTasksByColId.matchRejected,
      (state) => {
        state.status = StatusType.ERROR;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.createNewTask.matchPending,
      (state) => {
        state.status = StatusType.PENDING;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.createNewTask.matchFulfilled,
      (state) => {
        state.status = StatusType.FULLFILED;
      }
    );
    builder.addMatcher(
      taskApi.endpoints.createNewTask.matchRejected,
      (state) => {
        state.status = StatusType.ERROR;
      }
    );
  },
});

export const { setCurrentColumn } = taskSlice.actions;
export const selectTaskValue = (state: RootState) => state.tasks;
export default taskSlice.reducer;
