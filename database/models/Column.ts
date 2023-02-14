import mongoose, { model, models, Schema } from 'mongoose';

const ColumnSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Board must have a name'],
  },
  columnsId: { type: [mongoose.Types.ObjectId], ref: 'Task' },
});

const Columns = models.column || model('column', ColumnSchema);

export default Columns;
