import { IColumnSchema } from '@/types';
import { model, models, Schema } from 'mongoose';

const ColumnSchema = new Schema<IColumnSchema>({
  name: {
    type: String,
    required: [true, 'Column must have a name'],
  },
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

const Columns = models?.Column || model<IColumnSchema>('Column', ColumnSchema);

export default Columns;
