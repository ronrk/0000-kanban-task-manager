/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { ColType } from './index';

export type TCol = ColType[];

export interface IUser {
  name: string;
  boards?: [];
}

export interface ISubtask {
  title: string;
  status: boolean;
}

export interface IColumn {
  name: ColType;
  _id: mongoose.Types.ObjectId;
  board: mongoose.Types.ObjectId;
  tasks: mongoose.Types.ObjectId[];
}

export interface ITask {
  description: string;
  title: string;
}

export interface IBoard {
  name: string;
  columns: IColumn[];
  userId: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}

export interface IError {
  status: boolean;
  statusCode?: number;
  msg: string;
}

export interface initialeData {
  boards: IBoard[];
  user: IUser | null;
  columns: IColumn[];
  tasks: ITask[];
  subtasks: ISubtask[];
}
