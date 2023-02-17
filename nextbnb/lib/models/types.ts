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

export interface IColumnsSchema extends Document {
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
  username: SchemaDefinitionProperty<string>;
  email: SchemaDefinitionProperty<string>;
  boards: mongoose.Types.ObjectId[];
}
