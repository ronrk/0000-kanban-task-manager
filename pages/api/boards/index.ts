import {
  connectMongo,
  createNewBoardAPI,
  generateTemplateBoardAPI,
  getBoardByUID,
  wrongMethodError,
} from '@/database';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );
    if (method === 'GET') {
      if (query.template === 'true') {
        return await generateTemplateBoardAPI(req, res);
      }
      return await getBoardByUID(req, res);
    }
    if (method === 'POST') {
      return await createNewBoardAPI(req, res);
    }
    wrongMethodError(req, res, ['GET', 'POST']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
