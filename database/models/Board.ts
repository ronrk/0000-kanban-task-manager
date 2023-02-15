import { IBoardSchema } from '@/types';
import { Model, model, models, Schema } from 'mongoose';

interface ISchemaMethods {
  getBoardWithColumns(): any;
}
type IBoardModel = Model<IBoardSchema, {}, ISchemaMethods>;

const BoardSchema = new Schema<IBoardSchema, IBoardModel, ISchemaMethods>({
  name: {
    type: String,
    required: [true, 'Board must have a name'],
  },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
});

BoardSchema.methods.getBoardWithColumns = function () {
  console.log('HIHIHIHI');
  return this;
};
/* BoardSchema.methods.sayHi = function () {
  console.log(`Hi ${this.name}`);
}; */

const Boards =
  models?.Board || model<IBoardSchema, IBoardModel>('Board', BoardSchema);

export default Boards;

/* BoardSchema.statics.findByName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};
// Board.findByName('Some Name')

BoardSchema.methods.sayHi = function () {
  console.log(`Hi. my name is ${this.name}`);
};
// Board.sayHi()

BoardSchema.virtual('namedEmail').get(function () {
  return `${this.name} `;
});

BoardSchema.pre('save', function (next) {
  // SOME LOGIC
  next();
});

BoardSchema.pre('remove', function (next) {
  // SOME LOGIC
  next();
});

BoardSchema.post('save', function (doc,next) {
  // SOME LOGIC this = doc
  next();
}); */
