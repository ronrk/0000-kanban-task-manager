import { Model, model, models, Schema } from 'mongoose';
import { Board } from './Board';
import { IUserSchema } from './types';

// TYPE MODEL

interface IUserMethods {}

type UserModel = Model<IUserSchema, {}, IUserMethods>;

// USER MODEL

const userSchema: Schema = new Schema<IUserSchema, UserModel, IUserMethods>({
  username: {
    type: String,
    unique: [true, 'The username you picked as been already taken'],
    required: [true, 'User must have a username'],
  },
  email: {
    type: String,
    unique: [true, 'The email you picked as been already registered...'],
    required: [true, 'User must have a email'],
  },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

userSchema.pre('findOne', function (next) {
  this.populate('boards');
  next();
});

userSchema.pre<IUserSchema>('remove', async function (next): Promise<void> {
  console.log('USER PRE REMOVE');
  this.boards.forEach(async (board) => {
    const foundedBoard = await Board.findById(board);
    if (!foundedBoard) {
      next();
      return;
    }
    await foundedBoard.remove();
  });
  next();
});

export const User: Model<IUserSchema> =
  models.User || model('User', userSchema);
