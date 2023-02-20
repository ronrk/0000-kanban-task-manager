import { ITask, StatusType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface ITaskState {
  data: ITask[];
  status: StatusType;
}
const initialState: ITaskState = {
  data: [],
  status: StatusType.IDLE,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const selectTaskValue = (state: RootState) => state;
export default taskSlice.reducer;
