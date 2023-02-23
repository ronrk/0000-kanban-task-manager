import { IUserSchema } from '@/types/schemaTypes';
import bcrypt from 'bcryptjs';
import { Model, model, models, Schema } from 'mongoose';
import { Board } from './Board';

// TYPE MODEL

interface IUserMethods extends IUserSchema {
  comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserMethods> {}

// USER MODEL

const userSchema: Schema<IUserMethods> = new Schema({
  username: {
    type: String,
    unique: [true, 'The username you picked as been already taken'],
    required: [true, 'User must have a username'],
    minlength: 2,
    maxlength: 15,
  },
  email: {
    type: String,
    unique: [true, 'The email you picked as been already registered...'],
    required: [true, 'User must have a email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 4,
  },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

userSchema.methods.comparePassword = async function (password: string) {
  console.log('COMPARING PASSWORDS');
  const isMatch = bcrypt
    .compare(password, this.password)
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
  return isMatch;
};

userSchema.pre('save', async function (next) {
  console.log('USER PRE SAVE');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.toString(), salt);
  next();
});
userSchema.pre('findOne', function (next) {
  this.populate('boards');
  next();
});

userSchema.pre<IUserSchema>('remove', async function (next): Promise<void> {
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

export const User =
  models?.User || model<IUserMethods, IUserModel>('User', userSchema);
