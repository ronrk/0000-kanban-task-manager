import { Model, model, models, Schema } from 'mongoose';
import { removeEntiteis } from '../serverFunction';
import { IBoardSchema, IColumnsSchema } from './types';

// TYPES MODEL

interface IColumnMethods extends IColumnsSchema {}
interface IBoardMethods extends IBoardSchema {}

interface IColumnModel extends Model<IColumnMethods> {}
interface IBoardModel extends Model<IBoardMethods> {}

// COLUMN MODEL

const columnSchema: Schema<IColumnMethods> = new Schema({
  status: {
    type: String,
    default: 'Todo',
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export const Column =
  models?.Column || model<IColumnMethods, IColumnModel>('Column', columnSchema);

// BOARD MODEL

const boardScehma: Schema<IBoardMethods> = new Schema({
  name: String,
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cant sign new board without user signed in'],
  },
});
boardScehma.pre('find', function (next) {
  console.log('FIND ALL BOARDS');
  this.populate({
    path: 'columns',
    model: 'Column',
    populate: {
      path: 'tasks',
      model: 'Task',
      populate: { path: 'subtasks', model: 'Subtask' },
    },
  });
  next();
});

boardScehma.pre<IBoardSchema>('remove', async function (next) {
  console.log('BOARD PRE REMOVE');
  this.columns.forEach(async (column) => {
    removeEntiteis(Column, column);
  });
  next();
});
export const Board =
  models?.Board || model<IBoardMethods, IBoardModel>('Board', boardScehma);
