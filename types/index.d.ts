/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
export enum ColType {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}
export type TCol = ColType[];
export interface IUser {
  name: string;
  _id: ObjectId;
}

export interface ISubtask {
  title: string;
  status: boolean;
}
export interface ISubtaskWithId extends ISubtask {
  _id: ObjectId;
  taskId: ObjectId;
  boardId: ObjectId;
}

export interface IColumn {
  title: ColType;
}
export interface IColumnWithId extends IColumn {
  _id: ObjectId | string;
  boardId: ObjectId;
}

export interface ITask {
  description: string;
  title: string;
}
export interface ITaskWithId extends ITask {
  _id: ObjectId;
  columnId: ObjectId;
  boardId: ObjectId;
}

export interface IBoard {
  name: string;
  columnsId: mongoose.Types.ObjectId[];
}

export interface IBoardWithId extends IBoard {
  _id: ObjectId;
  userId: ObjectId;
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
