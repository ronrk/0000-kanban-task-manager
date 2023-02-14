import mongoose, { model, models, Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task must hava a title'],
  },
  description: String,
  status: String,
  subtasks: { type: [mongoose.Types.ObjectId], ref: 'Subtask' },
});

const Tasks = models.task || model('Task', TaskSchema);

export default Tasks;
