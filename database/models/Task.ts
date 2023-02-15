import mongoose, { model, models, Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task must hava a title'],
  },
  description: String,
  status: String,
  subtasks: { type: [mongoose.SchemaTypes.ObjectId], ref: 'Subtask' },
  column: { type: mongoose.SchemaTypes.ObjectId, ref: 'Column' },
});

const Tasks = models.Task || model('Task', TaskSchema);

export default Tasks;
