import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw 'Cant find connection string to DB';
    }
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    if (connection.readyState === 1) {
      console.log('Connected To Database');
    }
  } catch (error) {
    console.log('Cant connect to database');
    console.log({ error });
    return Promise.reject(error);
  }
};

export default connectMongo;
