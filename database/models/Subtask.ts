import mongoose, { model, models, Schema } from 'mongoose';

const SubtaskSchema = new Schema({
  title: { type: String, required: [true, 'Subtask must have a title'] },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  task: { type: mongoose.SchemaTypes.ObjectId, ref: 'Task' },
});

const Subtasks = models.Subtask || model('Subtask', SubtaskSchema);

export default Subtasks;
