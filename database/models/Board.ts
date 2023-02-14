import mongoose, { model, models, Schema } from 'mongoose';

const BoardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Board must have a name'],
  },
  columnsId: { type: [mongoose.Types.ObjectId], ref: 'Column' },
});

const Boards = models.board || model('board', BoardSchema);

export default Boards;
