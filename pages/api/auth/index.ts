import { connectMongo, wrongMethodError } from '@/database';
import {
  loginUserAPI,
  logoutUserAPI,
  registerUserAPI,
} from '@/database/controllers/authController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );
    if (method === 'POST') {
      if (query.auth === 'login') {
        console.log('LOGIN');
        return await loginUserAPI(req, res);
      }
      if (query.auth === 'register') {
        console.log('REGISTER API');
        return await registerUserAPI(req, res);
      }
      if (query.auth === 'logout') {
        return await logoutUserAPI(req, res);
      }
    }
    return wrongMethodError(req, res, ['POST']);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error user API', error });
  }
}

export { authOptions } from './[...nextauth]';
