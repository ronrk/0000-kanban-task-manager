import { Model, model, models, Schema } from 'mongoose';
import { removeEntiteis } from '../serverFunction';
import { IBoardSchema, IColumnsSchema } from './types';

// TYPES MODEL

interface IColumnMethods {}
interface IBoardMethods {}

type ColumnModel = Model<IColumnsSchema, {}, IColumnMethods>;
type BoardModel = Model<IBoardSchema, {}, IBoardMethods>;

// COLUMN MODEL

const columnSchema: Schema = new Schema<
  IColumnsSchema,
  ColumnModel,
  IColumnMethods
>({
  status: {
    type: String,
    default: 'Todo',
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export const Column: Model<IColumnsSchema> =
  models.Column || model('Column', columnSchema);

// BOARD MODEL

const boardScehma: Schema = new Schema<IBoardSchema, BoardModel, IBoardMethods>(
  {
    name: String,
    columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cant sign new board without user signed in'],
    },
  }
);
boardScehma.pre('find', function (next) {
  console.log('FIND ALL BOARDS');
  this.populate({
    // path: 'columns',
    // model: 'Column',
    // populate: {
    //   path: 'tasks',
    //   model: 'Task',
    //   populate: { path: 'subtasks', model: 'Subtask' },
    // },
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
export const Board: Model<IBoardSchema> =
  models.Board || model('Board', boardScehma);
