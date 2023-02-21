import { IBoardSchema } from '@/types/schemaTypes';
import { Model, model, models, Schema } from 'mongoose';
import { removeEntiteis } from '../serverFunction';
import { Column } from './Column';
import { User } from './User';

// TYPES MODEL

interface IBoardMethods extends IBoardSchema {}
interface IBoardModel extends Model<IBoardMethods> {}

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
  const user = await User.findById(this.user);
  const updatedBoards = user.boards.filter((board: IBoardSchema) => {
    return board._id.toString() !== this._id.toString();
  });
  const newUser = await User.findOneAndUpdate(
    { _id: user._id },
    { boards: updatedBoards },
    { new: true }
  );
  // console.log({ newUser: newUser.boards, board: this, updatedBoards }, 'AFTER');

  next();
});
export const Board =
  models?.Board || model<IBoardMethods, IBoardModel>('Board', boardScehma);
