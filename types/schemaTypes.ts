/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { ColType } from './index';

export interface IUserSchema {
  name: string;
  _id: mongoose.Types.ObjectId;
  boards?: mongoose.Types.ObjectId[];
}

export interface ISubtaskSchema {
  title: string;
  isCompleted: boolean;
  _id: mongoose.Types.ObjectId;
  task: mongoose.Types.ObjectId;
}

export interface IColumnSchema {
  name: ColType;
  tasks: mongoose.Types.ObjectId[];
  board: mongoose.Types.ObjectId;
}

export interface ITaskSchema {
  description: string;
  title: string;
  _id: mongoose.Types.ObjectId;
  column: mongoose.Types.ObjectId;
  subtasks: mongoose.Types.ObjectId[];
  status: string;
}

export interface IBoardSchema {
  name: string;
  columns: mongoose.Types.ObjectId[];
  userId?: mongoose.Types.ObjectId;
}
