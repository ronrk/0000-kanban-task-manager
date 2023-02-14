import { model, models, Schema } from 'mongoose';

const SubtaskSchema = new Schema({
  title: { type: String, required: [true, 'Subtask must have a title'] },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Subtasks = models.subtask || model('Subtask', SubtaskSchema);

export default Subtasks;
