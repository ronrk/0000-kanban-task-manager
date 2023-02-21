import { IColumnSchema } from '@/types/schemaTypes';
import { model, Model, models, Schema } from 'mongoose';

interface IColumnMethods extends IColumnSchema {}
interface IColumnModel extends Model<IColumnMethods> {}

const columnSchema: Schema<IColumnMethods> = new Schema({
  status: {
    type: String,
    default: 'Todo',
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export const Column =
  models?.Column || model<IColumnMethods, IColumnModel>('Column', columnSchema);
