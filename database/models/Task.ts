import { Model, model, models, Schema } from 'mongoose';
import { removeEntiteis } from '../serverFunction';
import { ISubtaskSchema, ITaskSchema } from './types';

// TYPES MODEL

interface ISubtaskMethods {}
interface ITaskMethods {}

type SubtaskModel = Model<ISubtaskSchema, {}, ISubtaskMethods>;
type TaskModel = Model<ITaskSchema, {}, ITaskMethods>;

// SUBTASK MODEL

const subtaskSchema: Schema = new Schema<
  ISubtaskSchema,
  SubtaskModel,
  ISubtaskMethods
>({
  title: { type: String, required: [true, 'Subtask must have a title'] },
  isCompleted: { type: Boolean, default: false },
});

export const Subtask: Model<ISubtaskSchema> =
  models.Subtask || model('Subtask', subtaskSchema);

// TASK MODEL

const taskSchema: Schema = new Schema<ITaskSchema, TaskModel, ITaskMethods>({
  title: { type: String, required: [true, 'Task must have a title'] },
  description: String,
  colStatus: {
    type: String,
    required: [true, 'Task must have a colStatusType [`Todo`,`Doing`,`Done`]'],
  },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }],
});

taskSchema.pre('findOne', function (next) {
  console.log('FIND TASK');
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
  models.Task || model('Task', taskSchema);
