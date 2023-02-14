import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI || '');

    if (connection.readyState === 1) {
      console.log('Database is ready');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
