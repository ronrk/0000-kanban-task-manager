import { ISubtaskSchema, ITaskSchema } from '@/types/schemaTypes';
import { Model, model, models, Schema } from 'mongoose';
import { removeEntiteis } from '../serverFunction';

// TYPES MODEL

interface ISubtaskMethods extends ISubtaskSchema {}
interface ITaskMethods extends ITaskSchema {}

interface ISubtaskModel extends Model<ISubtaskMethods> {}
interface ITaskModel extends Model<ITaskMethods> {}

// SUBTASK MODEL

const subtaskSchema: Schema<ISubtaskMethods> = new Schema({
  title: { type: String, required: [true, 'Subtask must have a title'] },
  isCompleted: { type: Boolean, default: false },
});

export const Subtask: Model<ISubtaskSchema> =
  models?.Subtask ||
  model<ISubtaskMethods, ISubtaskModel>('Subtask', subtaskSchema);

// TASK MODEL

const taskSchema: Schema<ITaskSchema> = new Schema({
  title: { type: String, required: [true, 'Task must have a title'] },
  description: String,
  colStatus: {
    type: String,
    required: [true, 'Task must have a colStatusType [`Todo`,`Doing`,`Done`]'],
  },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }],
});

taskSchema.pre('findOne', function (next) {
  this.populate({
    path: 'subtasks',
    model: 'Subtask',
  });
  next();
});

taskSchema.pre<ITaskSchema>('remove', async function (next) {
  this.subtasks.forEach(async (subtask) => {
    removeEntiteis(Subtask, subtask);
  });
  next();
});

export const Task: Model<ITaskSchema> =
  models?.Task || model<ITaskMethods, ITaskModel>('Task', taskSchema);
