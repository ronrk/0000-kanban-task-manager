/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { ColType } from './index';

export type TCol = ColType[];

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  boards: IBoard[];
}

export interface IBoard {
  name: string;
  columns: IColumn[];
  user: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}
export interface IColumn {
  status: ColType;
  _id: mongoose.Types.ObjectId;
  tasks: ITask[];
}
export interface ITask {
  title: string;
  description: string;
  _id: mongoose.Types.ObjectId;
  subtasks: ISubtask[];
  colStatus: ColType;
}

export interface ISubtask {
  title: string;
  isCompleted: boolean;
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
