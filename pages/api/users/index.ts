import { connectMongo, getUserAPI, wrongMethodError } from '@/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );
    if (method === 'GET') {
      return await getUserAPI(req, res);
    }
    if (method === 'POST') {
      // return await createNewUserAPI(req, res);
      return res.status(200).json({ data: JSON.parse(req.body) });
    }

    wrongMethodError(req, res, ['GET', 'POST']);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error user API', error });
  }
}
