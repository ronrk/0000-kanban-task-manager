// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { IBoardWithId } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { board?: IBoardWithId };
}

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  const { query, method, body } = req;
  switch (method) {
    case 'PATCH':
      if (!body) {
        serverNoDataOnBodyError(res);
        break;
      }
      res
        .status(200)
        .json({ message: 'Update board', boardId: query.boardId, board: body });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'Delete board', boardId: query.boardId });
      break;
    default:
      serverWrongMethodError(res, ['PATCH', 'DELETE'], method || '');
      break;
  }
}
