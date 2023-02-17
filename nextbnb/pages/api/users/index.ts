import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectMongo,
  server404Error,
  User,
  wrongMethodError,
} from '../../../lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );
    if (method === 'GET') {
      const user = await User.findById(query.uid);
      if (!user) {
        server404Error(res, `Cant find user with id :${query.uid}`);
        return;
      }
      return res.status(200).json({ message: 'Get user By UID', user });
    }
    if (method === 'POST') {
      if (!body) {
        server404Error(res, 'createNewUser: no data on req.body');
        return;
      }
      const newUser = await User.create(body);
      return res.status(200).json({ message: 'Create new user', newUser });
    }

    wrongMethodError(req, res, ['GET', 'POST']);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error user API', error });
  }
}
