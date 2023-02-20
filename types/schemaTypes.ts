/* eslint-disable no-unused-vars */

import mongoose, { SchemaDefinitionProperty } from 'mongoose';

export interface ISubtaskSchema {
  title: SchemaDefinitionProperty<string>;
  isCompleted: SchemaDefinitionProperty<boolean>;
  _id: mongoose.Types.ObjectId;
}

export interface ITaskSchema {
  title: SchemaDefinitionProperty<string>;
  description: SchemaDefinitionProperty<string>;
  colStatus: SchemaDefinitionProperty<string>;
  subtasks: mongoose.Types.ObjectId[];
  _id: mongoose.Types.ObjectId;
}

export interface IColumnSchema extends Document {
  status: SchemaDefinitionProperty<string>;
  tasks: mongoose.Types.ObjectId[];
  _id: mongoose.Types.ObjectId;
}

export interface IBoardSchema extends Document {
  name: SchemaDefinitionProperty<string>;
  columns: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}

export interface IUserSchema extends Document {
  username:
    | SchemaDefinitionProperty<SchemaDefinitionProperty<string> | undefined>
    | undefined;
  email: SchemaDefinitionProperty<string> | undefined;
  boards: mongoose.Types.ObjectId[];
  password: string;
  _id: mongoose.Types.ObjectId;
}
