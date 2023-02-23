import { IColumnSchema } from '@/types/schemaTypes';
import { model, Model, models, Schema } from 'mongoose';
import { removeEntiteis } from '../serverFunction';
import { Task } from './Task';

interface IColumnMethods extends IColumnSchema {}
interface IColumnModel extends Model<IColumnMethods> {}

const columnSchema: Schema<IColumnMethods> = new Schema({
  status: {
    type: String,
    default: 'Todo',
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

columnSchema.pre('findOne', function (next) {
  this.populate({
    path: 'tasks',
    model: 'Task',
    populate: { path: 'subtasks', model: 'Subtask' },
  });
  next();
});

columnSchema.pre<IColumnSchema>('remove', async function (next) {
  this.tasks.forEach(async (task) => {
    await removeEntiteis(Task, task);
  });

  next();
});

export const Column =
  models?.Column || model<IColumnMethods, IColumnModel>('Column', columnSchema);
